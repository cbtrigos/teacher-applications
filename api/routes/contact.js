var mysql = require('mysql');
var {db} = require('../authentication/mysql.json')
var {emailAuth } = require('../authentication/emailAuth.json')
const nodemailer = require('nodemailer');

  //                                 CONNECTING TO MYSQL

var connection = mysql.createConnection(db);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } } );

//                           SENDING CONTACT-US PAGE EMAIL
exports.sendEmail = function(req,res){
    var toSend = {
        'email': req.body.email,
        'name': req.body.name,
        'message':req.body.message,
        'subject':req.body.subject,
        'sent': new Date()
    }
  
      connection.query('INSERT INTO contact_us_emails SET ?', toSend, function (error, results, fields) {
        if (error) {
          res.status(400).send({
            message: "Error occured when sending your email"});
          res.end();
        }
        else {
        const transporter = nodemailer.createTransport(emailAuth.authentication);
        const mailOptions = {
            from: emailAuth.applicationEmail, 
            to: emailAuth.applicationEmail, 
            cc: toSend.email,
            subject: toSend.subject, 
            text: toSend.message +
              `\n \n You are receiving a copy of the email you submitted on the SL teacher web application portal. \n` +
              `This notice is automatically generated. Thank you for your questions. You'll hear from us soon. `+
              `Good luck!`
          };

        

        transporter.sendMail(mailOptions, function(err, info) {
           if(err) {
            return res.status(200).send({
              message: 'Failed to send email. Please check your connection and try again.'})
           } 
           else {
            return res.status(200).send({
              message: "Email sent! You'll receive a copy soon."});
           }
        });
 

          
          
  
        }
      }
    )
}
  