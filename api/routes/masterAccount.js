const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { db } = require("../authentication/mysql.js");
const nodemailer = require("nodemailer");
const { emailAuth } = require("../authentication/emailAuth.js");

//                                 CONNECTING TO MYSQL

const connection = mysql.createConnection(db);
connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});

exports.getallOpeningRequests = function(req, res) {
  const { user_id, user_type } = req.body;
  last_edited = Date();

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query(
          "SELECT * FROM job_openings WHERE live = ? and reviewed = ?",
          ["false", "false"],
          (error, results) => {
            if (error) {
              res.status(400).send("failed to pull applications");
            } else {
              res.status(200).send({
                toApprove: results
              });
            }
          }
        );
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};

exports.getallUsers = function(req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  last_edited = Date();
  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query("SELECT * FROM users", (error, results) => {
          if (error) {
            res.status(400).send("failed to pull users");
          } else {
            res.status(200).send({
              users: results
            });
          }
        });
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};

exports.getallApplications = function(req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  last_edited = Date();

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query(
          "SELECT * FROM applications apps LEFT JOIN approver_1 a1 ON apps.application_id=a1.app_id LEFT JOIN approver_2 a2 ON apps.application_id=a2.app_id where apps.submitted=?",
          "true",
          (error, results) => {
            if (error) {
              res.status(400).send("failed to pull applications");
            } else {
              res.status(200).send({
                applications: results
              });
            }
          }
        );
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};

exports.getallOpenings = function(req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  last_edited = Date();

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query("SELECT * FROM job_openings", (error, results) => {
          if (error) {
            res.status(400).send("failed to pull openings");
          } else {
            res.status(200).send({
              openings: results
            });
          }
        });
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};
exports.getUser = function(req, res) {
  const { user_id, user_type, searched } = req.body;
  last_edited = Date();

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query(
          "SELECT * FROM users where user_id=?",
          searched,
          (error, results) => {
            if (error) {
              res.status(400).send("failed to pull user");
            } else if (results.length === 1) {
              res.status(200).send({
                selectedUser: results[0]
              });
            }
          }
        );
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};
exports.getOpening = function(req, res) {
  const { user_id, user_type, searched } = req.body;
  last_edited = Date();

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query(
          "SELECT * FROM job_openings where opening_key=?",
          searched,
          (error, results) => {
            if (error) {
              res.status(400).send("failed to pull opening");
            } else if (results.length === 1) {
              res.status(200).send({
                selectedOpening: results[0]
              });
            }
          }
        );
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};

exports.updateOpening = function(req, res) {
  const { opening_key, type, user_id, user_type } = req.body;
  last_edited = Date();

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query(
          "SELECT * FROM job_openings where opening_key = ?",
          opening_key,
          (error, results) => {
            if (error) {
              res.status(400).send("failed to pull opening");
            } else {
              if (results.length === 1) {
                if (results[0].live === type) {
                  res.status(200).send("Opening is already that type");
                } else {
                  connection.query(
                    "UPDATE job_openings SET live = ? where opening_key = ?",
                    [type, opening_key],
                    (error, results) => {
                      if (error) {
                        res.status(400).send("failed to pull opening");
                      } else {
                        res.status(200).send("Success");
                      }
                    }
                  );
                }
              }
            }
          }
        );
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};
exports.updateUser = function(req, res) {
  const { changed_id, user_id, type, user_type } = req.body;
  last_edited = Date();

  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query(
          "SELECT * FROM users where user_id = ?",
          changed_id,
          (error, results) => {
            if (error) {
              res.status(400).send("failed to pull users");
            } else {
              if (results.length === 1) {
                if (results[0].user_type === type) {
                  res.status(200).send("User is already that type");
                } else {
                  connection.query(
                    "UPDATE users SET user_type = ? where user_id = ?",
                    [type, changed_id],
                    (error, results) => {
                      if (error) {
                        res.status(400).send("failed to pull users");
                      } else {
                        res.status(200).send("Success");
                      }
                    }
                  );
                }
              }
            }
          }
        );
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};

exports.approveOpening = function(req, res) {
  const { opening, user_id, user_type } = req.body;
  const toSend = {
    email: opening.contact_email,
    name: opening.contact_name,
    subject: "Your job opening is now live!"
  };
  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query(
          "SELECT * FROM job_openings where opening_key = ?",
          opening.opening_key,
          (error, results) => {
            if (error) {
              res.status(400).send("failed to pull opening");
            } else {
              if (results.length === 1) {
                connection.query(
                  "UPDATE job_openings SET live = ?, reviewed = ? where opening_key = ?",
                  ["true", "true", opening.opening_key],
                  (error, results) => {
                    if (error) {
                      res.status(400).send("failed to approve job opening");
                    } else {
                      const transporter = nodemailer.createTransport(
                        emailAuth.authentication
                      );
                      const mailOptions = {
                        from: emailAuth.applicationEmail,
                        to: toSend.email,
                        subject: toSend.subject,
                        text:
                          `Dear ${toSend.name},
                        \nThis email is to confirm that your teacher opening "${opening.title_proposed_appt}" for the following school: ${opening.school} has been APPROVED.\n` +
                          "\n\nThe listing is now live on the site and applications are being accepted to fill the position. \nPlease note that this notice is automatically generated." +
                          "\n\nThank you!\n" +
                          "Good luck!"
                      };

                      transporter.sendMail(mailOptions, err => {
                        if (err) {
                          return res
                            .status(200)
                            .send(
                              "Email failed to send to contact but it was approved.."
                            );
                        }
                        return res.status(200).send("Success");
                      });
                    }
                  }
                );
              }
            }
          }
        );
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};

exports.rejectOpening = function(req, res) {
  const { opening, rejection_reason, user_id, user_type } = req.body;
  const toSend = {
    email: opening.contact_email,
    name: opening.contact_name,
    subject: "Your job opening has been rejected"
  };
  connection.query(
    "SELECT * FROM users WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in authenticating user");
      } else if (
        results.length === 1 &&
        user_type === 5 &&
        results[0].user_type === user_type
      ) {
        connection.query(
          "SELECT * FROM job_openings where opening_key = ?",
          opening.opening_key,
          (error, results) => {
            if (error) {
              res.status(400).send("failed to pull opening");
            } else {
              if (results.length === 1) {
                connection.query(
                  "UPDATE job_openings SET live = ?, reviewed = ?,  opening_rejection_reason = ? where opening_key = ?",
                  ["false", "true", rejection_reason, opening.opening_key],
                  (error, results) => {
                    if (error) {
                      res.status(400).send("failed to reject job opening");
                    } else {
                      const transporter = nodemailer.createTransport(
                        emailAuth.authentication
                      );
                      const mailOptions = {
                        from: emailAuth.applicationEmail,
                        to: toSend.email,
                        subject: toSend.subject,
                        text:
                          `Dear ${toSend.name},
                        \nThis email is to inform you that your teacher opening "${opening.title_proposed_appt}" for the following school: ${opening.school} has been REJECTED for the following reason:.\n` +
                          `"${rejection_reason}"` +
                          "\nYou are welcome to submit another request. \nPlease note that this notice is automatically generated." +
                          "\n\nThank you!\n" +
                          "Good luck!"
                      };

                      transporter.sendMail(mailOptions, err => {
                        if (err) {
                          return res
                            .status(200)
                            .send(
                              "Email failed to send to contact but it was rejected.."
                            );
                        }
                        return res.status(200).send("Success");
                      });
                    }
                  }
                );
              }
            }
          }
        );
      } else {
        res.status(400).send("user not authorized");
      }
    }
  );
};
