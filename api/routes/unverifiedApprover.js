const mysql = require('mysql');
const { db } = require('../authentication/mysql.json');

//                                 CONNECTING TO MYSQL

const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});

//                  unverified admin seeing their approval request
exports.getApproverRequest = function (req, res) {
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
        'SELECT * FROM approver_requests WHERE user_id = ?',
        user_id,
        (error, results) => {
          if (error) {
            res.status(400).send('failed to pull application');
          } else {
            res.status(200).send({
              approverRequest: results[0],
            });
          }
        },
      );
    } else {
      res.status(400).send('user not authorized');
    }
  });
};
