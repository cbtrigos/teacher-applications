var mysql      = require('mysql');
const bcrypt = require('bcrypt');
var {db} = require('../authentication/mysql.json')

  //                                 CONNECTING TO MYSQL

var connection = mysql.createConnection(db);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } } );


exports.save = function(req,res){
    var now = new Date();
    var application={ //application_id
        "applicant_id":req.body.applicant_id,
        "application_type":req.body.application_type,
        "employing_authority":req.body.employing_authority,
        "school_name":req.body.school_name,
        "other_names":req.body.other_names,
        "mobile_number":req.body.mobile_number, 
        "nationality": req.body.nationality, 
        "pin_code": req.body.pin_code,
        "nassit": req.body.nassit,
        "qualifications": req.body.qualifications,
        "special_skills": req.body.special_skills,
        "created": now,
        "last_edited": now,
        "last_name":req.body.last_name, 
        "email":req.body.email, 
        "sex": req.body.sex, 
    }

    connection.query('INSERT INTO applications SET ?',application, function (error, results, fields) {
    if (error) {
        res.status(400).send("error occured")

    }else{
        res.status(201).send("application registered sucessfully")
    }}
    );
    ;
};

exports.submit = function(req,res){
    application_id = req.body.application_id
    last_edited = Date()
    connection.query('SELECT * FROM applications WHERE application_id = ?',application_id, function (error, results, fields) {
        if (error) {
          res.status(400).send("couldn't find application")
        }else{
          if(results.length >0){ 
            connection.query('UPDATE applications SET submitted = ? WHERE application_id = ?',['True', application_id], function (error, results, fields) {
                if (error) {
                    res.status(400).send("error occured")
            
                }else{
                    res.status(201).send("application submitted sucessfully")
                }
            })
         
        }
    }}
    );
}