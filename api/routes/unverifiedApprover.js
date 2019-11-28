var mysql = require('mysql');
var {db} = require('../authentication/mysql.json')

  //                                 CONNECTING TO MYSQL

var connection = mysql.createConnection(
  db
);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } } );

//                  unverified admin seeing their approval request
exports.getApproverRequest = function(req,res){ 
const user_id = req.body.user_id
const user_type = req.body.user_type
last_edited = Date()

connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
    if (error) {
        res.status(400).send("error in authenticating user")
        }else{
            if (results.length===1 && results[0].user_type===user_type) {
            connection.query('SELECT * FROM approver_requests WHERE user_id = ?', user_id, function (error, results, fields) {
                if (error) {
                    res.status(400).send('failed to pull application')
                }else{
                        res.status(200).send({
                        'approverRequest': results[0],
                        })
                    }})
            }
        else {
            res.status(400).send("user not authorized")

        }
            }
})
}