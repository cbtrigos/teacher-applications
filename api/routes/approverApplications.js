
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
                    }else{
                       var alreadyApproved = []
                       var toApprove = []
                       results.forEach(app =>{
                         if (app.approver_2!==null) {
                            alreadyApproved.push(app)}
                           else toApprove.push(app)
                          })
                          res.status(200).send({
                            'alreadyApproved': alreadyApproved,
                            'toApprove': toApprove
                          })
                       }})
             }
             }
    })
  }

  exports.getApproverApplications_2 = function(req,res){ //first approver <--> user type 2
    const user_id = req.body.user_id
    const user_type = req.body.user_type

    last_edited = Date()
    connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
        if (error) {
            res.status(400).send("error in authenticating user")
          }else{
             if (results.length===1 && results[0].user_type===user_type) { //select all APPROVED by user 2
                connection.query('SELECT * FROM applications WHERE approver_2 = ?', 'true', function (error, results, fields) {
                    if (error) {
                      res.status(400).send({
                        message: "error in pulling applications to approve"})
                    }else{
                       var alreadyApproved = []
                       var toApprove = []
                       results.forEach(app =>{ // for each of these apps, check if you already approved them
                        // add on the information that the second approver included
                        // then push them 
                        connection.query('SELECT * FROM approver_2 WHERE application_id = ?', app.application_id, function (error, results, fields) {
                          if (error) {
                            res.status(200).send({
                              message: "error pulling the previous approver's information"})
                          }
                          else{
                            app['approver_2_results']=results
                            if (app.approver_3!==null) {
                              alreadyApproved.push(app)
                            }
                            else toApprove.push(app)
                            res.status(200).send({
                              'alreadyApproved': alreadyApproved,
                              'toApprove': toApprove
                            })
                             }})
                        

                          })
                       }})
             }
             }
    })
  }

  exports.getApproverApplications_3 = function(req,res){ //first approver <--> user type 2
    const user_id = req.body.user_id
    const user_type = req.body.user_type

    last_edited = Date()
    connection.query('SELECT * FROM users WHERE user_id = ?', user_id, function (error, results, fields) {
        if (error) {
            res.status(400).send("error in authenticating user")
          }else{
             if (results.length===1 && results[0].user_type===user_type) { //select all APPROVED by user 2
                connection.query('SELECT * FROM applications WHERE approver_3 = ?', 'true', function (error, results, fields) {
                    if (error) {
                      res.status(400).send({
                        message: "error in pulling applications to approve"})
                    }else{
                       var alreadyApproved = []
                       var toApprove = []
                       results.forEach(app =>{ 
                        connection.query('SELECT * FROM approver_2 WHERE application_id = ?', app.application_id, function (error, results2, fields) {
                          if (error) {
                            res.status(200).send({
                              message: "error pulling the previous approver's information"})
                          }
                          else{
                            app['approver_2_results']=results2 //now app has approver_2 results added to it. now we add user 3 

                            connection.query('SELECT * FROM approver_3 WHERE application_id = ?', app.application_id, function (error, results3, fields) {
                              if (error) {
                                res.status(200).send({
                                  message: "error pulling the previous approver's information"})
                              }
                              else{
                                app['approver_3_results']=results3 //now app has approver_3 results added to it. now we add user 3 
                                if (app.approver_4!==null) {
                                  alreadyApproved.push(app)
                                }
                                else toApprove.push(app)
                                res.status(200).send({
                                  'alreadyApproved': alreadyApproved,
                                  'toApprove': toApprove
                                })
                                 }
              
                                })
                             }
                            
                            })
                          })
                       }})
             }
             }
    })
  }


