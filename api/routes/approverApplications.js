
var mysql = require('mysql');
var {db} = require('../authentication/mysql.json')

//                                 CONNECTING TO MYSQL

var connection = mysql.createConnection(db);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } } );


//              GET A LIST OF ALL APPLICATIONS FOR AN APPROVER (user type = 2,3,4)

exports.getApproverApplications_1 = function(req,res){ //first approver <--> user type 2
  const user_id = req.body.user_id
  const user_type = req.body.user_type
  last_edited = Date()
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
    if (error) {
          res.status(400).send("error in authenticating user")
        }else{
            if (results.length===1 && results[0].user_type===user_type) {
              connection.query('SELECT * FROM applications WHERE submitted = ?', 'true', function (error, results, fields) {
                  if (error) {
                    res.status(400).send('failed to pull application')
                  }else{
                      var alreadyApproved = []
                      var toApprove = []
                      results.forEach(app =>{
                        if (app.approver_1!==null) {
                          alreadyApproved.push(app)}
                          else toApprove.push(app)
                        })
                        res.status(200).send({
                          'alreadyApproved': alreadyApproved,
                          'toApprove': toApprove
                        })
                      }})
            }
          else {
            res.status(400).send("user not authorized")

          }
            }
  })
}

exports.getApproverApplications_2 = async function(req,res){ //first approver <--> user type 2
  const user_id = req.body.user_id
  const user_type = req.body.user_type

  last_edited = Date()
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
      if (error) {
          res.status(400).send("error in authenticating user")
        }else{
            if (results.length===1 && results[0].user_type===user_type) { //select all APPROVED by user 2
              connection.query('SELECT * FROM applications, approver_1 WHERE applications.application_id = approver_1.application_id AND applications.approver_1=? ', "true", function (error, results, fields) {
                  if (error) {
                    res.status(400).send({
                      message: "error in pulling applications to approve"})
                  }
                  else{
                      let alreadyApproved = []
                      let toApprove = []
                          results.forEach(app =>{
                          if (app.approver_2!==null) {
                            alreadyApproved.push(app)
                          }
                          else {
                            toApprove.push(app)
                          }

                        })
                    res.status(200).send({
                      'alreadyApproved': alreadyApproved,
                      'toApprove': toApprove
                    })
                  }
                
                
                })
            }
            }
  })
}

exports.getApproverApplications_3 = async function(req,res){ //first approver <--> user type 2
  const user_id = req.body.user_id
  const user_type = req.body.user_type

  last_edited = Date()
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
      if (error) {
          res.status(400).send("error in authenticating user")
        }else{
            if (results.length===1 && results[0].user_type===user_type) { //select all APPROVED by user 2
              connection.query(
                'SELECT * FROM applications, approver_1, approver_2' +
                ' WHERE applications.application_id = approver_1.application_id '+
                ' AND  applications.application_id = approver_2.application_id'+
                ' AND applications.approver_1=? AND applications.approver_2 =?', ["true", "true"], function (error, results, fields) {
                  if (error) {
                    res.status(400).send({
                      message: "error in pulling applications to approve"})
                  }
                  else{
                      let alreadyApproved = []
                      let toApprove = []
                          results.forEach(app =>{
                          if (app.approver_3!==null) {
                            alreadyApproved.push(app)
                          }
                          else {
                            toApprove.push(app)
                          }

                        })
                    res.status(200).send({
                      'alreadyApproved': alreadyApproved,
                      'toApprove': toApprove
                    })
                  }
                
                
                })
            }
            }
  })
}



exports.submitApproverApplications_1 = function(req,res){
  const user_id = req.body.user_id
  const user_type = req.body.user_type
  const today = new Date()
  const applicant_id = req.body.application.user_id
  console.log(req.body.mobile_number)
  const submission = {
    approver_id: req.body.application.approver_id, 
    application_id: req.body.application.application_id, 
    school_id: req.body.application.school_id,                
    title_proposed_appt: req.body.application.title_proposed_appt,        
    date_proposed_appt: req.body.application.date_proposed_appt,         
    reasons_proposed_appt: req.body.application.reasons_proposed_appt,      
    current_pupil_enrollment: req.body.application.current_pupil_enrollment,   
    on_payroll: req.body.application.on_payroll,            
    JSS_level_qualified: req.body.application.JSS_level_qualified, 
    SSS_level_qualified: req.body.application.SSS_level_qualified,  
    approver_1_name: req.body.application.approver_1_name,  
    signed: req.body.application.signed,
    mobile_1_number: req.body.application.mobile_number,
    date: today, 
    approved: 'true'
  }
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
  if (error) {
        res.status(400).send("error finding user")
      }else{
          if (user_type===1 && results[0].user_type===user_type) {
//user is authenticated 
              connection.query('SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted=?', [applicant_id, submission.application_id, 'true'], function (error, results, fields) {
                if (error) {
                  res.status(400).send('user with that application was not found')
                }
                else 
               { connection.query('UPDATE applications SET approver_1 = ?, approver_1_decision=? WHERE application_id = ?',['true', today, submission.application_id], function (error, results, fields) {
                if (error) {
                    res.status(400).send("couldn't find application")
                  }else{
                    
                    connection.query('INSERT INTO approver_1 SET ?',submission, function (error, results, fields) {
                      if (error) {
                          res.status(400).send("Error occured in submitting approval request")
                  
                      }else{
                        res.status(200).send("Submitted Approval Successfully")
                      }})
              }}
              );}
          })

          }
        else {
          res.status(400).send("user not authorized")

        }
          }


        })




}
exports.submitApproverApplications_2 = function(req,res){
  const user_id = req.body.user_id
  const user_type = req.body.user_type
  const today = new Date()
  const applicant_id = req.body.application.applicant_id

  const submission = {
    approver_id: req.body.application.approver_id, 
    application_id: req.body.application.application_id, 
    approver_2_name: req.body.application.approver_2_name,  
    grade: req.body.application.grade, 
    teacher_salary: req.body.application.teacher_salary,
    date: today, 
    signed: req.body.application.signed, 
    approved: 'true'
  }
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
  if (error) {
        res.status(400).send("error finding user")
      }else{
          if (user_type===2 && results[0].user_type===user_type ) {
//user is authenticated 
              connection.query('SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted=? and approver_1 = ?', [applicant_id, submission.application_id, 'true', 'true'], function (error, results, fields) {
                if (error) {
                  res.status(400).send('user with that application was not found')
                }
                else 
               { connection.query('UPDATE applications SET approver_2 = ?, approver_2_decision=? WHERE application_id = ?',['true', today, submission.application_id], function (error, results, fields) {
                if (error) {
                    res.status(400).send("couldn't find application")
                  }else{
                    
                    connection.query('INSERT INTO approver_2 SET ?', submission, function (error, results, fields) {
                      if (error) {
                          res.status(400).send("Error occured in submitting approval request")
                  
                      }else{
                        res.status(200).send("Submitted Approval Successfully")
                      }})
              }}
              );}
          })

          }
        else {
          res.status(400).send("user not authorized")

        }
          }
})




}
exports.submitApproverApplications_3 = function(req,res){
  const user_id = req.body.user_id
  const user_type = req.body.user_type
  const today = new Date()
  const applicant_id = req.body.application.applicant_id

  const submission = {
    approver_id: req.body.application.approver_id, 
    application_id: req.body.application.application_id, 
    approver_3_name: req.body.application.approver_3_name,  
    date: today, 
    approved: 'true',
    signed: req.body.application.signed, 
  }
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
  if (error) {
        res.status(400).send("error finding user")
      }else{
          if (user_type===3 && results[0].user_type===user_type ) {
              connection.query('SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted=? and approver_1 = ? and approver_2 = ?', [applicant_id, submission.application_id, 'true', 'true', 'true'], function (error, results, fields) {
                if (error) {
                  res.status(400).send('user with that application was not found')
                }
                else 
               { connection.query('UPDATE applications SET approver_3 = ?, approver_3_decision=? WHERE application_id = ?',['true', today, submission.application_id], function (error, results, fields) {
                if (error) {
                    res.status(400).send("couldn't find application")
                  }else{
                    
                    connection.query('INSERT INTO approver_3 SET ?', submission, function (error, results, fields) {
                      if (error) {
                          res.status(400).send("Error occured in submitting approval request")
                  
                      }else{
                        res.status(200).send("Submitted Approval Successfully")
                      }})
              }}
              );}
          })

          }
        else {
          res.status(400).send("user not authorized")

        }
          }
})




}

exports.rejectApproverApplications_1 = function(req,res){
const user_id = req.body.user_id
const user_type = req.body.user_type
const today = new Date()
const applicant_id = req.body.application.user_id

const submission = {
  rejection_1_reason: req.body.application.rejection_reason,
  approver_1_name: req.body.application.approver_name, 
  approver_id: req.body.application.approver_id, 
  application_id: req.body.application.application_id, 
  signed: req.body.application.signed, 
  date: today, 
  approved: 'false'
}
connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
if (error) {
      res.status(400).send("error finding user")
    }else{
        if (user_type===1 && results[0].user_type===user_type) {
            //user is authenticated 
            connection.query('SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted=?', [applicant_id, submission.application_id, 'true'], function (error, results, fields) {
              if (error) {
                res.status(400).send('user with that application was not found')
              }
              else 
              { connection.query('UPDATE applications SET approver_1 = ?, approver_1_decision=?, rejection_reason = ? WHERE application_id = ?',['false', today, submission.rejection_1_reason, submission.application_id], function (error, results, fields) {
              if (error) {
                  res.status(400).send("couldn't find application")
                }else{
                  
                  connection.query('INSERT INTO approver_1 SET ?',submission, function (error, results, fields) {
                    if (error) {
                        res.status(400).send("error occured in rejection approval request")
                
                    }else{
                      res.status(200).send("Rejected Successfully")
                    }})
            }}
            );}
        })

        }
      else {
        res.status(400).send("user not authorized")

      }
        }
})




}
exports.rejectApproverApplications_2 = function(req,res){
  const user_id = req.body.user_id
  const user_type = req.body.user_type
  const today = new Date()
  const applicant_id = req.body.application.user_id
  
  const submission = {
    rejection_2_reason: req.body.application.rejection_reason,
    approver_2_name: req.body.application.approver_name, 
    approver_id: req.body.application.approver_id, 
    application_id: req.body.application.application_id, 
    signed: req.body.application.signed, 
    date: today, 
    approved: 'false'
  }
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
    if (error) {
        res.status(400).send("error finding user")
      }else{
          if (user_type===2 && results[0].user_type===user_type) {
              connection.query('SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted = ? and approver_1 = ?', [applicant_id, submission.application_id, 'true', 'true'], function (error, results, fields) {
                if (error) {
                  res.status(400).send('user with that application was not found')
                }
                else 
                { 
                  connection.query('UPDATE applications SET approver_2 = ?, approver_2_decision=?, rejection_reason = ? WHERE application_id = ?',['false', today, submission.rejection_2_reason, submission.application_id], function (error, results, fields) {
                if (error) {
                    res.status(400).send("couldn't find application")
                  }else{
                    
                    connection.query('INSERT INTO approver_2 SET ?',submission, function (error, results, fields) {
                      if (error) {
                          res.status(400).send("error occured in rejection approval request")
                  
                      }else{
                        res.status(200).send("Rejected Successfully")
                      }})
              }}
              );}
          })
  
          }
        else {
          res.status(400).send("user not authorized")
  
        }
          }
  })
  
  
  
  
  }
exports.rejectApproverApplications_3 = function(req,res){
  const user_id = req.body.user_id
  const user_type = req.body.user_type
  const today = new Date()
  const applicant_id = req.body.application.user_id
  
  const submission = {
    rejection_3_reason: req.body.application.rejection_reason,
    approver_3_name: req.body.application.approver_name, 
    approver_id: req.body.application.approver_id, 
    application_id: req.body.application.application_id, 
    signed: req.body.application.signed, 
    date: today, 
    approved: 'false'
  }
  connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
    if (error) {
        res.status(400).send("error finding user")
      }else{
          if (user_type===3 && results[0].user_type===user_type) {
              connection.query('SELECT * FROM applications WHERE user_id = ? and application_id=? and submitted = ? and approver_1 = ? and approver_2 = ?', [applicant_id, submission.application_id, 'true', 'true', 'true'], function (error, results, fields) {
                if (error) {
                  res.status(400).send('User with that approved application was not found')
                }
                else 
                { 
                  connection.query('UPDATE applications SET approver_3 = ?, approver_3_decision=?, rejection_reason =? WHERE application_id = ?',['false', today, submission.rejection_3_reason, submission.application_id], function (error, results, fields) {
                if (error) {
                    res.status(400).send("couldn't find application")
                  }else{
                    
                    connection.query('INSERT INTO approver_3 SET ?',submission, function (error, results, fields) {
                      if (error) {
                          res.status(400).send("error occured in rejection approval request")
                  
                      }else{
                        res.status(200).send("Rejected Successfully")
                      }})
              }}
              );}
          })
  
          }
        else {
          res.status(400).send("user not authorized")
  
        }
          }
  })
  
  
  
  
  }

// exports.saveApproverApplications_1 = function(req, res) {
//   var now = new Date();
//   var app= {
//     approver_id: req.body.approver_id, 
//     application_id: req.body.application_id, 
//     school_id: req.body.school_id, 
//     title_proposed_appt: req.body.title_proposed_appt, 
//     date_proposed_appt: req.body.date_proposed_appt, 
//     reasons_proposed_appt: req.body.reasons_proposed_appt, 
//     current_pupil_enrollment: req.body.current_pupil_enrollment, 
//     on_payroll: req.body.on_payroll, 
//     JSS_level_qualified: req.body.JSS_level_qualified,
//     SSS_level_qualified: req.body.SSS_level_qualified, 
//     approver_1_name: req.body.approver_1_name, 
//     signed: req.body.signed, 
//     date: req.body.date, 
//   }
//   connection.query('UPDATE approver_1 SET approver_id = ?, school_id = ?, title_proposed_appt =?, date_proposed_appt = ?, reasons_proposed_appt = ?, current_pupil_enrollment = ?, on_payroll = ?, JSS_level_qualified = ?, SSS_level_qualified =?, approver_1_name = ?, signed =?, date = ? WHERE application_id =?',
//   [app.approver_id, app.school_id,app.title_proposed_appt, app.date_proposed_appt, app.reasons_proposed_appt, app.current_pupil_enrollment, app.on_payroll, app.JSS_level_qualified, app.SSS_level_qualified, app.approver_1_name, app.signed, app.date, app.application_id], function (error, results, fields) {
//   if (error) {
//       res.status(400).send("error occured")
//   }else{
//       res.status(201).send("application updated sucessfully")
//   }}
//   );
// };
