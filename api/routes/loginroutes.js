var mysql      = require('mysql');
const bcrypt = require('bcrypt');
var {db} = require('../authentication/mysql.json')

  //                                 CONNECTING TO MYSQL

const pass = db 
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
      "gender": req.body.gender
    }
    connection.query('SELECT * FROM applicants WHERE email = ?',[applicants['email']], function (error, results, fields) {
    if(results.length >0) {
          console.log('error ocurred', error)
          res.status(201).send("email already used")

        }
    else {
        connection.query('INSERT INTO applicants SET ?',applicants, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.status(400).send("error occured")

        }else{
          res.status(201).send("user registered sucessfully")
        }}
        );}
      });
};
   


  //                                 LOGIN

  // When a user logs in with their email and password, we do the following: 
  // (1) make a mysql request to get any users with that email --> if no send email d.n.e error, else continue
  // (2) check the passwords against each other --> if no send error, else return login successful
  exports.login = function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    console.log(email, password)
    connection.query('SELECT * FROM applicants WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      res.status(400).send('error occured')
    }else{
      if(results.length >0){ 
        if(bcrypt.compareSync(password, results[0].password)) {
          res.status(200).send('login successful')
         } else {
          res.status(204).send("email and password do not match")
         }
      }
      else{
        res.status(404).send("email does not exist")
      }
    }
    });
  }



  // authenticate 
  exports.authenticate = function(req,res){
    res.status(666).send('user')
  }

  connection.on('error', function() {});
