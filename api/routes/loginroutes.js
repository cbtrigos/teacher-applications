var mysql = require('mysql');
const bcrypt = require('bcrypt');
var {db} = require('../authentication/mysql.json')

  //                                 CONNECTING TO MYSQL

var connection = mysql.createConnection(
  db
);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } } );



  //                                 REGISTRATION 

  // When a user registers, we do the following: 
  // (1) check if the email is already used. if yes, return error, else continue
  // (2) hash password and submit input request --> 
  exports.register = function(req,res){
    var today = new Date();
    let hash_password = bcrypt.hashSync(req.body.password, 12);
    var applicants={
      "first_name":req.body.first_name,
      "last_name":req.body.last_name,
      "email":req.body.email,
      "password":hash_password,
      "created":today,
      "modified":today, 
      "birth_date": req.body.birth_date, 
      "gender": req.body.gender,
      "mobile_number": req.body.mobile_number
    }
    connection.query('SELECT * FROM users WHERE email = ?',[applicants['email']], function (error, results, fields) {
    if(results.length >0) {
      res.status(201).send("Email already in use. Try logging in.")
        }
    else {
        connection.query('INSERT INTO users SET ?',applicants, function (error, results, fields) {
        if (error) {
          res.status(400).send("An error occured. Please refresh and try again. ")

        }else{
            connection.query('SELECT * FROM users WHERE email = ?',[applicants['email']], function (error, results, fields) {
              if (error) {
                res.status(400).send('error occured')
              }else{
                if(results.length >0){
                    res.status(200).send(
                      {message:'user registered sucessfully', 
                      user: {
                        user_id: results[0].user_id, 
                        first_name: results[0].first_name, 
                        last_name: results[0].last_name, 
                        email: results[0].email, 
                        birth_date: results[0].birth_date, 
                        gender: results[0].gender, 
                        created: results[0].created,
                        mobile_number: results[0].mobile_number,
                        user_type: results[0].user_type 
                      }})
                  } 
                }
              })
        }}
        );}
      });
};
   

  //                                 LOGIN
  exports.login = function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
        res.status(200).send({
          message: 'Error occured. Please refresh and try again.'})
      }
      else{
        if(results.length >0){
          if(bcrypt.compareSync(password, results[0].password)) {
            res.status(200).send(
              {message:'login successful', 
              user: {
                user_id: results[0].user_id, 
                first_name: results[0].first_name, 
                last_name: results[0].last_name, 
                email: results[0].email, 
                birth_date: results[0].birth_date, 
                mobile_number: results[0].mobile_number,
                gender: results[0].gender, 
                created: results[0].created,
                user_type: results[0].user_type 
              }})
          } else {
            res.status(200).send({
              message: 'Incorrect. Please try again.'})
          }
        }
        else{
          res.status(200).send({
            message: 'Incorrect. Please try again.'}) 
          }
      }
    });
  }


  connection.on('error', function() {});