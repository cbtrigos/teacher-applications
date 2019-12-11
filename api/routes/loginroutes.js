const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { db } = require('../authentication/mysql.json');

//                                 CONNECTING TO MYSQL

const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});

//                                 APPLICANT REGISTRATION

exports.register = function (req, res) {
  const today = new Date();
  const hash_password = bcrypt.hashSync(req.body.password, 12);
  const applicants = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hash_password,
    created: today,
    modified: today,
    user_type: req.body.user_type,
    birth_date: req.body.birth_date,
    gender: req.body.gender,
    mobile_number: req.body.mobile_number,
  };
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [applicants.email],
    (error, results) => {
      if (results.length > 0) {
        res.status(201).send('Email already in use. Try logging in.');
      } else {
        connection.query('INSERT INTO users SET ?', applicants, (
          error,
        ) => {
          if (error) {
            res
              .status(400)
              .send('An error occured. Please refresh and try again. ');
          } else {
            connection.query(
              'SELECT * FROM users WHERE email = ?',
              [applicants.email],
              (error, results) => {
                if (error) {
                  res.status(400).send('error occured');
                } else if (results.length > 0) {
                  res.status(200).send({
                    message: 'user registered sucessfully',
                    user: {
                      user_id: results[0].user_id,
                      first_name: results[0].first_name,
                      last_name: results[0].last_name,
                      email: results[0].email,
                      birth_date: results[0].birth_date,
                      gender: results[0].gender,
                      created: results[0].created,
                      mobile_number: results[0].mobile_number,
                      user_type: results[0].user_type,
                    },
                  });
                }
              },
            );
          }
        });
      }
    },
  );
};

//                                 LOGIN
exports.login = function (req, res) {
  const { email } = req.body;
  const { password } = req.body;
  connection.query('SELECT * FROM users WHERE email = ?', [email], (
    error,
    results,
  ) => {
    if (error) {
      res.status(200).send({
        message: 'Error occured. Please refresh and try again.',
      });
    } else if (results.length > 0) {
      if (bcrypt.compareSync(password, results[0].password)) {
        res.status(200).send({
          message: 'login successful',
          user: {
            user_id: results[0].user_id,
            first_name: results[0].first_name,
            last_name: results[0].last_name,
            email: results[0].email,
            birth_date: results[0].birth_date,
            mobile_number: results[0].mobile_number,
            gender: results[0].gender,
            created: results[0].created,
            user_type: results[0].user_type,
          },
        });
      } else {
        res.status(200).send({
          message: 'Incorrect. Please try again.',
        });
      }
    } else {
      res.status(200).send({
        message: 'Incorrect. Please try again.',
      });
    }
  });
};

//                                 APPROVER REGISTRATION

exports.approverRegistration = function (req, res) {
  const today = new Date();
  const hash_password = bcrypt.hashSync(req.body.password, 12);
  const registration = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hash_password,
    created: today,
    user_type: req.body.user_type,
    birth_date: req.body.birth_date,
    gender: req.body.gender,
    mobile_number: req.body.mobile_number,
  };
  const approvalRequest = {
    created: today,
    title: req.body.title,
    school_name: req.body.school_name,
    emis_code: req.body.emis_code,
  };

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [registration.email],
    (error, results) => {
      if (results.length > 0) {
        res.status(201).send('Email already in use. Try logging in.');
      } else {
        connection.query('INSERT INTO users SET ?', registration, (
          error,
        ) => {
          if (error) {
            res
              .status(400)
              .send(
                'An error occured registering you. Please refresh and try again. ',
              );
          } else {
            connection.query(
              'SELECT * FROM users WHERE email = ?',
              [registration.email],
              (error, results) => {
                if (error) {
                  res.status(400).send('error occured');
                } else if (results.length > 0) {
                  connection.query(
                    'INSERT INTO approver_requests SET ?, user_id = ?',
                    [approvalRequest, results[0].user_id],
                    (error, results) => {
                      if (error) {
                        res
                          .status(400)
                          .send(
                            'An error occured submitting your request. Please refresh and try again. ',
                          );
                      } else {
                        res.status(200).send({
                          message: 'user registered sucessfully',
                          user: {
                            user_id: results[0].user_id,
                            first_name: results[0].first_name,
                            last_name: results[0].last_name,
                            email: results[0].email,
                            birth_date: results[0].birth_date,
                            gender: results[0].gender,
                            created: results[0].created,
                            mobile_number: results[0].mobile_number,
                            user_type: results[0].user_type,
                          },
                        });
                      }
                    },
                  );
                }
              },
            );
          }
        });
        // }
        // })
      }
    },
  );
};
connection.on('error', () => {});
