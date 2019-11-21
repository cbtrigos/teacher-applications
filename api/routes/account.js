var mysql = require('mysql');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var moment = require('moment');
const bcrypt = require('bcrypt');
var {db} = require('../authentication/mysql.json')
var {emailAuth} = require('../authentication/emailAuth.json')




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

  connection.query('SELECT * FROM users WHERE email = ?',email, function (error, results, fields) {
  if(results.length == 0) { 
        isInDatabase = false 
      }
      
  else {
    var request = {
      'id': token,
      'user_id': results[0].user_id,
      'expires': moment().add(1, 'hour').format("YYYY-MM-DD hh:mm:ss")
    }


    connection.query('INSERT INTO password_change_requests SET ?', request, function (error, results, fields) {
      if (error) {
        res.status(400).json("insertion into password_change_requests failed");
        res.end();
      }
        const transporter = nodemailer.createTransport(emailAuth.authentication);
      
      const mailYesAccount = {
        from: emailAuth.applicationEmail, 
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
          from: emailAuth.applicationEmail, 
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
        const user_id = results[0].user_id
        connection.query('UPDATE users SET password = ? WHERE user_id = ?', [hash_password, user_id], function (error, results, fields) {
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

//   //                                 CHANGE NAME 
exports.changeName = function(req,res){
  var changeName = {
    prev_first_name: req.body.prev_first_name,
    prev_last_name:req.body.prev_last_name, 
    first_name:req.body.first_name,
    last_name:req.body.last_name, 
    expires: moment().add(60, 'days').format("YYYY-MM-DD hh:mm:ss"), 
    user_id:req.body.user_id  
  }


  connection.query('SELECT * FROM name_change_requests WHERE user_id = ?',changeName.user_id, function (error, results, fields) {
    if (results.length!==0) {
      var today = moment().format("YYYY-MM-DD hh:mm:ss")
      results.forEach(app => {
        let valid = moment(app.expires).isBefore(today) //if the stored date, when you can change your name again, is after today, you can't change
        if(!valid) {
          res.status(200).send(
            {message: 'Name changed within the last 60 days. Please wait the full 60 days before attempting to change again.'
          })}
        else {
          connection.query('INSERT INTO name_change_requests SET ?', changeName, function (error, results, fields) {
            if (error) { 
              res.status(200).send({message:"Failed to update name. Please refresh and try again."})
            } 
            else { 
                connection.query('UPDATE users SET first_name = ?, last_name=? WHERE user_id = ?', [changeName.first_name, changeName.last_name, changeName.user_id], function (error, results, fields) {
                  if (error) {
                    res.status(200).send({message:"Failed to update name. Please refresh and try again."})
                  } else {
                    res.status(200).send({message: "Name updated sucessfully. "})
                  }
                  })
                }
              })
      
        }
         })}
    else {
      connection.query('INSERT INTO name_change_requests SET ?', changeName, function (error, results, fields) {
        if (error) { 
          res.status(200).send({message:"Failed to update name. Please refresh and try again."})
        } 
        else { 
            connection.query('UPDATE users SET first_name = ?, last_name=? WHERE user_id = ?', [changeName.first_name, changeName.last_name, changeName.user_id], function (error, results, fields) {
              if (error) {
                res.status(200).send({message:"Failed to update name. Please refresh and try again."})
              } else {
                res.status(200).send({message: "Name updated sucessfully. Please log out and back in to reflect updates."})
              }
              })
            }
          })
  
    }
    })
  }

//   //                                 CHANGE EMAIL
exports.changeEmail = function(req,res){
  var changeEmail = {
    prev_email: req.body.prev_email,
    email:req.body.email, 
    expires: moment().add(60, 'days').format("YYYY-MM-DD hh:mm:ss"), 
    user_id:req.body.user_id  
  }


  connection.query('SELECT * FROM email_change_requests WHERE user_id = ?',changeEmail.user_id, function (error, results, fields) {
    if (results.length!==0) {
      var today = moment().format("YYYY-MM-DD hh:mm:ss")
      results.forEach(app => {
        let valid = moment(app.expires).isBefore(today) 
        if(!valid) {
          res.status(200).send(
            {message: 'Email changed within the last 60 days. Please wait the full 60 days before attempting to change again.'
          })}
        else {
          connection.query('INSERT INTO email_change_requests SET ?', changeEmail, function (error, results, fields) {
            if (error) { 
              res.status(200).send({message:"Failed to update email. Please refresh and try again."})
            } 
            else { 
                connection.query('UPDATE users SET email = ? WHERE user_id = ?', [changeEmail.email, changeEmail.user_id], function (error, results, fields) {
                  if (error) {
                    res.status(200).send({message:"Failed to update email. Please refresh and try again."})
                  } else {
                    res.status(200).send({message: "Email updated sucessfully. Please log out and back in to reflect updates."})
                  }
                  })
                }
              })
        }
         })}
    else {
      connection.query('INSERT INTO email_change_requests SET ?', changeEmail, function (error, results, fields) {
        if (error) { 
          res.status(200).send({message:"Failed to update email. Please refresh and try again."})
        } 
        else { 
            connection.query('UPDATE users SET email = ? WHERE user_id = ?', [changeEmail.email, changeEmail.user_id], function (error, results, fields) {
              if (error) {
                res.status(200).send({message:"Failed to update email. Please refresh and try again."})
              } else {
                res.status(200).send({message: "Email updated sucessfully. "})
              }
              })
            }
          })
  
    }
    })
  }

//   //                                 CHANGE EMAIL
exports.changeMobile = function(req,res){
  console.log(req.body)
  var changeMobile = {
    prev_mobile_number: req.body.prev_mobile_number,
    mobile_number:req.body.mobile_number, 
    expires: moment().add(30, 'days').format("YYYY-MM-DD hh:mm:ss"), 
    user_id:req.body.user_id  
  }


  connection.query('SELECT * FROM mobile_change_requests WHERE user_id = ?',changeMobile.user_id, function (error, results, fields) {
    if (error) {console.log(error)}
    else if (results.length!==0) {
      var today = moment().format("YYYY-MM-DD hh:mm:ss")
      results.forEach(app => {
        let valid = moment(app.expires).isBefore(today) 
        if(!valid) {
          res.status(200).send(
            {message: 'Mobile changed within the last 30 days. Please wait the full 30 days before attempting to change again.'
          })}
        else {
          connection.query('INSERT INTO mobile_change_requests SET ?', changeMobile, function (error, results, fields) {
            if (error) { 
              res.status(200).send({message:"Failed to update mobile. Please refresh and try again."})
            } 
            else { 
                connection.query('UPDATE users SET mobile_number = ? WHERE user_id = ?', [changeMobile.mobile_number, changeMobile.user_id], function (error, results, fields) {
                  if (error) {
                    res.status(200).send({message:"Failed to update mobile number. Please refresh and try again."})
                  } else {
                    res.status(200).send({message: "Mobile number updated sucessfully. Please log out and back in to reflect updates."})
                  }
                  })
                }
              })
        }
         })}
    else {
      connection.query('INSERT INTO mobile_change_requests SET ?', changeMobile, function (error, results, fields) {
        if (error) { 
          console.log(error)

          res.status(200).send({message:"Failed to update mobile number. Please refresh and try again."})
        } 
        else { 
            connection.query('UPDATE users SET mobile_number = ? WHERE user_id = ?', [changeMobile.mobile_number, changeMobile.user_id], function (error, results, fields) {
              if (error) {
                res.status(200).send({message:"Failed to update mobile number. Please refresh and try again."})
              } else {
                res.status(200).send({message: "Mobile number updated sucessfully. Please log out and back in to reflect updates."})
              }
              })
            }
          })
  
    }
    })
  }

//                        CHANGE PASSWORD

exports.changePassword = function(req,res){ 

  const password = req.body.password
  const current_password = req.body.current_password
  const user_id = req.body.user_id  
  
  let hash_password = bcrypt.hashSync(password, 12);

  connection.query('SELECT * FROM users WHERE user_id = ?',user_id, function (error, results, fields) {
    if(results.length >0){
      if(bcrypt.compareSync(current_password, results[0].password)) {
        connection.query('UPDATE users SET password = ? WHERE user_id = ?', [hash_password, user_id], function (error, results, fields) {
        if (error) {
          res.status(200).send({
            message: "Couldn't update password. Please refresh and try again."})
        } else {
          res.status(202).send({
            message: 'Password updated successfully.'})
        }
        })
      }
    else {
      res.status(200).send({
        message: 'Incorrect current password. Please try again.'
      })
    }
    }
    else{ 
      res.status(500).send({
        message: 'Error occured in finding your account.'
      })
    }
  
  });
}

