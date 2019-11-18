// require('dotenv').config();
var mysql = require('mysql');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var moment = require('moment');
const bcrypt = require('bcrypt');
var {db} = require('../authentication/mysql.json')
var {emailAuth, applicationEmail} = require('../authentication/emailAuth.json')




  //                                 CONNECTING TO MYSQL

  var connection = mysql.createConnection(
    db
  );
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
    } } );

//                           EMAILING USER TOKEN FROM FORGOT PASSWORD
exports.forgotPassword = function(req,res){
  var email= req.body.email;
  const token = crypto.randomBytes(64).toString('hex');
  let isInDatabase = true 

  if (email === '') { 
    res.json('email required');
    res.end();
  }

  connection.query('SELECT * FROM applicants WHERE email = ?',email, function (error, results, fields) {
  if(results.length == 0) { 
        isInDatabase = false 
      }
      
  else {
    var request = {
      'id': token,
      'applicant_id': results[0].applicant_id,
      'expires': moment().add(1, 'hour').format("YYYY-MM-DD hh:mm:ss")
    }


    connection.query('INSERT INTO password_change_requests SET ?', request, function (error, results, fields) {
      if (error) {
        res.status(400).json("insertion into password_change_requests failed");
        res.end();
      }
        const transporter = nodemailer.createTransport(emailAuth);
      
      const mailYesAccount = {
        from: applicationEmail, 
        to: email, 
          subject: 'Link to Reset Password', 
          text: 
            `You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n` +
            `Please click on the following link, or paste this into your browser to complete the process within the next hour of receiving it: \n\n` +
            `http://localhost:8080/reset/${token}\n\n` + 
            `If you did not request this, please ignore this email and your password will remain unchanged. \n `+
            `Thank you!`
        };
        const mailNoAccount = {
          from: applicationEmail, 
          to: email, 
          subject: 'Link to Reset Password', 
          text: 
            `You are receiving this because you (or someone else) has requested the reset of the password for the account associated with this email. \n\n` +
            `There is, however, no account associated with this email. \n\n` +
            `If you did not request this, please ignore this email!\n `+
            `Thank you!`
        };

      
      let valid = true;
      let mailOptions = mailYesAccount
      if (!isInDatabase) {mailOptions=mailNoAccount}
      transporter.sendMail(mailOptions, function(err, info) {
         if(err) {
           valid = false; 
         } 
      });
        if (valid) {
          return res.status(200).send('recovery email sent');}
          else {
            return res.status(500).send('Failed to send')
          }
        
        

    
    }
      )
  }
    });

  

};


//                           VERIFYING TOKEN FROM FORGOT PASSWORD

exports.resetValid = function(req,res){
  var token= req.body.id;
  connection.query('SELECT * FROM password_change_requests WHERE id = ?',token, function (error, results, fields) {
    if(results.length >0){ 
      var valid = moment(results[0].expires).isAfter(moment().format("YYYY-MM-DD hh:mm:ss"))
      if(valid) { res.status(200).send('password reset link valid') }
      else {res.status(504).send('link has expired')}
    }
    else{ res.status(501).send('link does not exist') }
  
  });
}
//                        ACTUALLY RESETING PASSWORD FROM FORGOT PASSWORD

exports.resetPassword = function(req,res){ 
  var token = req.body.id;
  let hash_password = bcrypt.hashSync(req.body.password, 12);

  connection.query('SELECT * FROM password_change_requests WHERE id = ?',token, function (error, results, fields) {
    if(results.length >0){ 
      var valid = moment(results[0].expires).isAfter(moment().format("YYYY-MM-DD hh:mm:ss"))
      if(valid) { 
        const applicant_id = results[0].applicant_id
        connection.query('UPDATE applicants SET password = ? WHERE applicant_id = ?', [hash_password, applicant_id], function (error, results, fields) {
        if (error) {
          res.status(500).send("couldn't update password")
        } else {
          res.status(202).send('password updated')
        }
        })
      }
      else {res.status(5044).send('link has expired')}
    }
    else{ res.status(501).send('link does not exist') }
  
  });
}






//   //                                 CHANGE PASSWORD    
//   // once a user has gotten an email to change the password and submits, we:
//   // (1) query the table to ensure the hash of the ID exists 
//   //        if not, send error that the ID doesn't exist else continue 
//   // (2) check the response to verify that the time is < 20 min old 
//   //        if not, send error that the request is too old and to retry the request , else continue 
//   // (3) hash the submitted password and update the applicants.password with the same applicant_id 






