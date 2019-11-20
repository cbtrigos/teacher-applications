var mysql = require('mysql');
var {db} = require('../authentication/mysql.json')

  //                                 CONNECTING TO MYSQL

var connection = mysql.createConnection(db);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } } );
//                                  REGISTER AN APPLICATION
exports.begin = function(req,res) {
  var now = new Date();
  var application={ //application_id
    "user_id":req.body.user_id,
    "application_type":req.body.application_type,
    "created": now,
    "last_edited": now,
    "first_name":req.body.first_name,
    "last_name":req.body.last_name, 
    "email":req.body.email, 
    "sex": req.body.sex, 
}
  connection.query('INSERT INTO applications SET ?',application, function (error, results, fields) {
    if (error) {
        res.status(400).send("error occured")

    }else{
      connection.query('SELECT * FROM applications WHERE user_id = ? and application_type = ?',[application.user_id, application.application_type], function (error, results, fields) {
        if (error) {
          res.status(400).send("couldn't find application")
        }else{
          if(results.length >0){ 
            res.status(201).send({
              message: "application registered sucessfully", 
              application_id: results[0].application_id,
              created: results[0].created})
        }
    }}
    );
    }}
    );}
//                                  UPDATE AN APPLICATION

exports.save = function(req,res){
    var now = new Date();
    var application={ //application_id
        "application_id": req.body.application_id,
        "user_id":req.body.user_id,
        "application_type":req.body.application_type,
        "employing_authority":req.body.employing_authority,
        "school_name":req.body.school_name,
        "other_names":req.body.other_names,
        "mobile_number":req.body.mobile_number, 
        "nationality": req.body.nationality, 
        "prev_appt": req.body.prev_appt,
        "pin_code": req.body.pin_code,
        "nassit": req.body.nassit,
        "qualifications": req.body.qualifications,
        "special_skills": req.body.special_skills,
        "last_edited": now,
        "last_name":req.body.last_name, 
        "email":req.body.email, 
        "sex": req.body.sex, 
    }

    connection.query('UPDATE applications SET application_type = ?, employing_authority = ?, school_name =?, other_names= ?, mobile_number = ?, nationality = ?, prev_appt = ?, pin_code = ?, nassit = ?, qualifications = ?, special_skills = ?, last_edited = ?, last_name = ?, email = ?, sex =? WHERE application_id = ?',
    [application.application_type, application.employing_authority, application.school_name, application.other_names, application.mobile_number, application.nationality, application.prev_appt, application.pin_code, application.nassit, application.qualifications, application.special_skills, application.last_edited, application.last_name, application.email, application.sex, application.application_id], function (error, results, fields) {
    if (error) {
        res.status(400).send("error occured")
    }else{
        res.status(201).send("application updated sucessfully")
    }}
  );
};
//                                  SUBMIT THE APPLICATION

exports.submit = function(req,res){
    application_id = req.body.application_id
    last_edited = new Date()
    connection.query('UPDATE applications SET submitted = ?, last_edited=? WHERE application_id = ?',['true', last_edited, application_id], function (error, results, fields) {
      if (error) {
        console.log(error)
          res.status(400).send("couldn't find application")
        }else{
          res.status(200).send("application submitted successfully")
    }}
    );
}

//                                  DELETE THE APPLICATION

exports.delete = function(req,res){
  application_id = req.body.application_id
  connection.query('DELETE FROM applications WHERE application_id = ?',application_id, function (error, results, fields) {
    if (error) {
      console.log(error)
        res.status(400).send("couldn't delete application")
      }else{
        res.status(200).send('application deleted successfully')
  }}
  );
}


//                             GET A LIST OF ALL APPLICATIONS FOR A USER

exports.get = function(req,res){
  user_id = req.body.user_id
  last_edited = Date()
  connection.query('SELECT * FROM applications WHERE user_id = ?',user_id, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.status(400).send("error in getting applications")
      }else{
         var submitted = []
         var drafts = []
         results.forEach(app =>{
           if (app.submitted==="true") {
             submitted.push(app)}
             else drafts.push(app)
            })
            res.status(200).send({
              'submittedApps': submitted,
              'incompleteApps': drafts
            })
         }}
  );
}