const mysql = require('mysql');
const { db } = require('../authentication/mysql.json');

//                                 CONNECTING TO MYSQL

const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});

//              GET A LIST OF ALL APPLICATIONS FOR AN APPROVER (user type = 2,3,4)

exports.getApproverApplications_1 = async function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  last_edited = Date();
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error in authenticating user');
    } else if (results.length === 1 && results[0].user_type === user_type) {

      connection.query(
        'SELECT * FROM applications apps LEFT JOIN job_openings jo ON apps.job_opening=jo.opening_key where apps.submitted= ?',
        'true',
        (error, results, fields) => {
          if (error) {
            res.status(400).send('failed to pull application');
          } else {
            
            const alreadyApproved = [];
            const toApprove = [];
            results.forEach((app) => {
              if (app.approver_1 !== null) {
                alreadyApproved.push(app);
              } else toApprove.push(app);
            });
            res.status(200).send({
              alreadyApproved,
              toApprove,
            });
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};
exports.getApproverApplications_2 = async function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;

  last_edited = Date();
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error in authenticating user');
    } else if (results.length === 1 && results[0].user_type === user_type) {
      connection.query(
        'SELECT * FROM applications apps INNER JOIN approver_1 apps1 ON apps.application_id = apps1.app_id AND apps.approver_1= ? LEFT JOIN job_openings jo ON apps.job_opening=jo.opening_key;',
        'true',
        (error, results) => {
          if (error) {
            res.status(400).send({
              message: 'error in pulling applications to approve',
            });
          } else {
            const alreadyApproved = [];
            const toApprove = [];
            results.forEach((app) => {
              if (app.approver_2 !== null) {
                alreadyApproved.push(app);
              } else {
                toApprove.push(app);
              }
            });
            res.status(200).send({
              alreadyApproved,
              toApprove,
            });
          }
        },
      );
    }
  });
};

exports.submitApproverApplications_1 = function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  const today = new Date();
  const applicant_id = req.body.application.user_id;
  const submission = {
    approver_1_id: req.body.application.approver_id,
    app_id: req.body.application.application_id,
    basic_monthly_salary: req.body.application.basic_monthly_salary,
    basic_yearly_salary: req.body.application.basic_yearly_salary,
    approver_1_name: req.body.application.approver_1_name,
    approver_1_email: req.body.application.approver_1_email,
    approved: 'true',
    date: today,
  };
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error finding user');
    } else if (user_type === 1 && results[0].user_type === user_type) {
      connection.query(
        'SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted=?',
        [applicant_id, submission.app_id, 'true'],
        (error) => {
          if (error) {
            res.status(400).send('user with that application was not found');
          } else {
            connection.query(
              'UPDATE applications SET approver_1 = ?, approver_1_decision=? WHERE application_id = ?',
              ['true', today, submission.app_id],
              (error, results) => {
                if (error) {
                  res.status(400).send("couldn't find application");
                } else {
                  console.log('got here?')
                  connection.query(
                    'INSERT INTO approver_1 SET ?',
                    submission,
                    (errors, results) => {
                      if (errors) {
                        console.log(errors)
                        res.status(400).send('Error occured in submitting approval request');
                      } else {
                        console.log(results)
                        res.status(200).send('Submitted Approval Successfully');
                      }
                    },
                  );
                }
              },
            );
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};
exports.submitApproverApplications_2 = function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  const today = new Date();
  const { applicant_id } = req.body.application;
  const submission = {
    approver_2_id: req.body.application.approver_id,
    app_id: req.body.application.application_id,
    approver_2_name: req.body.application.approver_2_name,
    date: today,
    signed: req.body.application.signed,
    approved: 'true',
  };

  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error finding user');
    } else if (user_type === 2 && results[0].user_type === user_type) {
      connection.query(
        'SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted=? and approver_1 = ?',
        [applicant_id, submission.app_id, 'true', 'true'],
        (error) => {
          if (error) {
            res.status(400).send('user with that application was not found');
          } else {
            connection.query(
              'UPDATE applications SET approver_2 = ?, approver_2_decision=? WHERE application_id = ?',
              ['true', today, submission.app_id],
              (error) => {
                if (error) {
                  res.status(400).send("couldn't find application");
                } else {
                  connection.query(
                    'INSERT INTO approver_2 SET ?',
                    submission,
                    (error) => {
                      if (error) {
                        res
                          .status(400)
                          .send(
                            'Error occured in submitting approval request',
                          );
                      } else {
                        res
                          .status(200)
                          .send('Submitted Approval Successfully');
                      }
                    },
                  );
                }
              },
            );
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};

exports.rejectApproverApplications_1 = function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  const today = new Date();
  const applicant_id = req.body.application.user_id;

  const submission = {
    rejection_1_reason: req.body.application.rejection_reason,
    approver_1_name: req.body.application.approver_name,
    approver_1_email: req.body.application.email,
    approver_1_id: req.body.application.approver_id,
    app_id: req.body.application.application_id,
    date: today,
    approved: 'false',
  };
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error finding user');
    } else if (user_type === 1 && results[0].user_type === user_type) {
      connection.query(
        'SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted=?',
        [applicant_id, submission.app_id, 'true'],
        (error) => {
          if (error) {
            res.status(400).send('user with that application was not found');
          } else {
            connection.query(
              'UPDATE applications SET approver_1 = ?, approver_1_decision=?, rejection_reason = ? WHERE application_id = ?',
              [
                'false',
                today,
                submission.rejection_1_reason,
                submission.app_id,
              ],
              (error) => {
                if (error) {
                  res.status(400).send("couldn't find application");
                } else {
                  connection.query(
                    'INSERT INTO approver_1 SET ?',
                    submission,
                    (error) => {
                      if (error) {
                        res
                          .status(400)
                          .send(
                            'error occured in rejection approval request',
                          );
                      } else {
                        res.status(200).send('Rejected Successfully');
                      }
                    },
                  );
                }
              },
            );
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};
exports.rejectApproverApplications_2 = function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  const today = new Date();
  const applicant_id = req.body.application.user_id;

  const submission = {
    rejection_2_reason: req.body.application.rejection_reason,
    approver_2_name: req.body.application.approver_name,
    approver_2_id: req.body.application.approver_id,
    app_id: req.body.application.application_id,
    signed: req.body.application.signed,
    date: today,
    approved: 'false',
  };
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
    fields,
  ) => {
    if (error) {
      res.status(400).send('error finding user');
    } else if (user_type === 2 && results[0].user_type === user_type) {
      connection.query(
        'SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted = ? and approver_1 = ?',
        [applicant_id, submission.app_id, 'true', 'true'],
        (error) => {
          if (error) {
            res.status(400).send('user with that application was not found');
          } else {
            connection.query(
              'UPDATE applications SET approver_2 = ?, approver_2_decision=?, rejection_reason = ? WHERE application_id = ?',
              [
                'false',
                today,
                submission.rejection_2_reason,
                submission.app_id,
              ],
              (error) => {
                if (error) {
                  res.status(400).send("couldn't find application");
                } else {
                  connection.query(
                    'INSERT INTO approver_2 SET ?',
                    submission,
                    (error) => {
                      if (error) {
                        res
                          .status(400)
                          .send(
                            'error occured in rejection approval request',
                          );
                      } else {
                        res.status(200).send('Rejected Successfully');
                      }
                    },
                  );
                }
              },
            );
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};




// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%% DELETE EVERYTHING BELOW %%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
exports.getApproverApplications_3 = async function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;

  last_edited = Date();
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error in authenticating user');
    } else if (results.length === 1 && results[0].user_type === user_type) {
      connection.query(
        'SELECT * FROM applications, approver_1, approver_2'
            + ' WHERE applications.application_id = approver_1.application_id '
            + ' AND  applications.application_id = approver_2.application_id'
            + ' AND applications.approver_1=? AND applications.approver_2 =?',
        ['true', 'true'],
        (error, results) => {
          if (error) {
            res.status(400).send({
              message: 'error in pulling applications to approve',
            });
          } else {
            const alreadyApproved = [];
            const toApprove = [];
            results.forEach((app) => {
              if (app.approver_3 !== null) {
                alreadyApproved.push(app);
              } else {
                toApprove.push(app);
              }
            });
            res.status(200).send({
              alreadyApproved,
              toApprove,
            });
          }
        },
      );
    }
  });
};
exports.rejectApproverApplications_3 = function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  const today = new Date();
  const applicant_id = req.body.application.user_id;

  const submission = {
    rejection_3_reason: req.body.application.rejection_reason,
    approver_3_name: req.body.application.approver_name,
    approver_3_id: req.body.application.approver_id,
    application_id: req.body.application.application_id,
    signed: req.body.application.signed,
    date: today,
    approved: 'false',
  };
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
    fields,
  ) => {
    if (error) {
      res.status(400).send('error finding user');
    } else if (user_type === 3 && results[0].user_type === user_type) {
      connection.query(
        'SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted = ? and approver_1 = ? and approver_2 = ?',
        [applicant_id, submission.application_id, 'true', 'true', 'true'],
        (error) => {
          if (error) {
            res
              .status(400)
              .send('User with that approved application was not found');
          } else {
            connection.query(
              'UPDATE applications SET approver_3 = ?, approver_3_decision=?, rejection_reason =? WHERE application_id = ?',
              [
                'false',
                today,
                submission.rejection_3_reason,
                submission.application_id,
              ],
              (error) => {
                if (error) {
                  res.status(400).send("couldn't find application");
                } else {
                  connection.query(
                    'INSERT INTO approver_3 SET ?',
                    submission,
                    (error) => {
                      if (error) {
                        res
                          .status(400)
                          .send(
                            'error occured in rejection approval request',
                          );
                      } else {
                        res.status(200).send('Rejected Successfully');
                      }
                    },
                  );
                }
              },
            );
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};
exports.submitApproverApplications_3 = function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  const today = new Date();
  const { applicant_id } = req.body.application;

  const submission = {
    approver_3_id: req.body.application.approver_id,
    application_id: req.body.application.application_id,
    approver_3_name: req.body.application.approver_3_name,
    date: today,
    approved: 'true',
    signed: req.body.application.signed,
  };
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error finding user');
    } else if (user_type === 3 && results[0].user_type === user_type) {
      connection.query(
        'SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted=? and approver_1 = ? and approver_2 = ?',
        [applicant_id, submission.application_id, 'true', 'true', 'true'],
        (error) => {
          if (error) {
            res.status(400).send('user with that application was not found');
          } else {
            connection.query(
              'UPDATE applications SET approver_3 = ?, approver_3_decision=? WHERE application_id = ?',
              ['true', today, submission.application_id],
              (error) => {
                if (error) {
                  res.status(400).send("couldn't find application");
                } else {
                  connection.query(
                    'INSERT INTO approver_3 SET ?',
                    submission,
                    (error) => {
                      if (error) {
                        res
                          .status(400)
                          .send(
                            'Error occured in submitting approval request',
                          );
                      } else {
                        res
                          .status(200)
                          .send('Submitted Approval Successfully');
                      }
                    },
                  );
                }
              },
            );
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};