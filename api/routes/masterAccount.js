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

exports.getallApproverRequests = function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  last_edited = Date();

  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error in authenticating user');
    } else if (
      results.length === 1
        && user_type === 5
        && results[0].user_type === user_type
    ) {
      connection.query(
        'SELECT * FROM approver_requests, users WHERE approver_requests.approved = ? and approver_requests.user_id=users.user_id',
        'pending',
        (error, results) => {
          if (error) {
            res.status(400).send('failed to pull applications');
          } else {
            res.status(200).send({
              toApprove: results,
            });
          }
        },
      );
    } else {
      console.log(error);

      res.status(400).send('user not authorized');
    }
  });
};

exports.getallUsers = function (req, res) {
const { user_id } = req.body;
const { user_type } = req.body;
last_edited = Date();
connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
  error,
  results,
) => {
  if (error) {
    res.status(400).send('error in authenticating user');
  } else if (
    results.length === 1
      && user_type === 5
      && results[0].user_type === user_type
  ) {
    connection.query(
      'SELECT * FROM users',
      (error, results) => {
        if (error) {
          res.status(400).send('failed to pull users');
        } else {
          res.status(200).send({
            users: results,
          });
        }
      },
    );
  } else {
    res.status(400).send('user not authorized');
  }
});
};

exports.getallApplications = function (req, res) {
  const { user_id } = req.body;
  const { user_type } = req.body;
  last_edited = Date();
  
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, (
    error,
    results,
  ) => {
    if (error) {
      res.status(400).send('error in authenticating user');
    } else if (
      results.length === 1
        && user_type === 5
        && results[0].user_type === user_type
    ) {
      connection.query(
        'SELECT * FROM applications apps LEFT JOIN approver_1 a1 ON apps.application_id=a1.application_id LEFT JOIN approver_2 a2 ON apps.application_id=a2.application_id LEFT JOIN approver_3 a3 ON apps.application_id= a3.application_id',
        (error, results) => {
          if (error) {
            res.status(400).send('failed to pull applications');
          } else {
            console.log(results)
            res.status(200).send({
              applications: results,
            });
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};

 