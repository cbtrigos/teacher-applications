const mysql = require("mysql");
const nodemailer = require("nodemailer");
const { db } = require("../authentication/mysql.js");
const { emailAuth } = require("../authentication/emailAuth.js");
const moment = require("moment");

//                                 CONNECTING TO MYSQL

const connection = mysql.createConnection(db);
connection.connect(err => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});
//                                  REGISTER AN APPLICATION
exports.begin = function(req, res) {
  const now = moment().format("YYYY-MM-DD hh:mm:ss");
  const application = {
    user_id: req.body.user_id,
    job_opening: req.body.job_opening,
    created: now,
    mobile_number: req.body.mobile_number,
    last_edited: now,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    sex: req.body.sex,
    birth_date: req.body.birth_date,
    job_title: req.body.job_title
  };

  connection.query(
    "SELECT * FROM applications WHERE user_id = ? and job_opening= ? and rejection_reason is null",
    [application.user_id, application.job_opening],
    (error, results) => {
      if (error) {
        res.status(400).send("error in getting applications");
      } else if (results.length > 0) {
        res
          .status(200)
          .send(
            "You already have an application for this position started or submitted so you may not start another"
          );
      } else {
        connection.query(
          "INSERT INTO applications SET ?",
          application,
          error => {
            if (error) {
              res.status(400).send("error occured");
            } else {
              connection.query(
                "SELECT * FROM applications WHERE user_id = ? and job_opening = ? and created=?",
                [
                  application.user_id,
                  application.job_opening,
                  application.created
                ],
                (error, results) => {
                  if (error) {
                    res.status(400).send("couldn't find application");
                  } else if (results.length > 0) {
                    res.status(201).send({
                      message: "application registered sucessfully",
                      application_id: results[0].application_id,
                      created: results[0].created
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};
//                                  UPDATE AN APPLICATION

exports.save = function(req, res) {
  const now = new Date();
  const application = {
    application_id: req.body.application_id,
    user_id: req.body.user_id,
    job_opening: req.body.job_opening,
    school_name: req.body.school_name,
    other_names: req.body.other_names,
    mobile_number: req.body.mobile_number,
    birth_date: req.body.birth_date,
    nationality: req.body.nationality,
    national_id: req.body.national_id,
    prev_appt: req.body.prev_appt,
    school_district: req.body.school_district,
    pin_code: req.body.pin_code,
    nassit: req.body.nassit,
    qualifications: req.body.qualifications,
    certificates: req.body.certificates,
    special_skills: req.body.special_skills,
    last_edited: now,
    last_name: req.body.last_name,
    email: req.body.email,
    sex: req.body.sex
  };
  connection.query(
    "UPDATE applications SET job_opening = ?, school_district =?, school_name =?, other_names= ?, mobile_number = ?, nationality = ?, prev_appt = ?, pin_code = ?, nassit = ?, qualifications = ?, certificates =?, special_skills = ?, last_edited = ?, last_name = ?, email = ?, sex =?, national_id=? WHERE application_id = ?",
    [
      application.job_opening,
      application.school_district,
      application.school_name,
      application.other_names,
      application.mobile_number,
      application.nationality,
      application.prev_appt,
      application.pin_code,
      application.nassit,
      application.qualifications,
      application.certificates,
      application.special_skills,
      application.last_edited,
      application.last_name,
      application.email,
      application.sex,
      application.national_id,
      application.application_id
    ],
    error => {
      if (error) {
        res.status(400).send("error occured");
      } else {
        res.status(201).send("application updated sucessfully");
      }
    }
  );
};
//                                  SUBMIT THE APPLICATION

exports.submit = function(req, res) {
  email = req.body.email;
  application = req.body.application;
  application_id = application.application_id;
  last_edited = new Date();

  const toSend = {
    email: application.email,
    name: application.first_name,
    subject: "Thank you for your submission!",
    sent: new Date()
  };

  connection.query(
    "UPDATE applications SET submitted = ?, last_edited=? WHERE application_id = ?",
    ["true", last_edited, application_id],
    (error, results) => {
      if (error) {
        res.status(400).send("couldn't find application");
      } else {
        const transporter = nodemailer.createTransport(
          emailAuth.authentication
        );
        const mailOptions = {
          from: emailAuth.applicationEmail,
          to: toSend.email,
          subject: toSend.subject,
          text:
            `Dear ${toSend.name},
            \nThis email is to confirm that we have received your teacher application #${application_id} for the following school: ${application.school_name}.\n\nYour application will be reviewed soon.` +
            "\n\nYou will be notified via email as soon as there is an update. Please note that this notice is automatically generated." +
            "\n\nThank you! You'll hear from us soon. " +
            "Good luck!"
        };

        transporter.sendMail(mailOptions, (err, results) => {
          if (err) {
            return res.status(200).send("Your opening has been received.");
          } else
            return res.status(200).send("application submitted successfully");
        });
      }
    }
  );
};

//                                  DELETE THE APPLICATION

exports.delete = function(req, res) {
  application_id = req.body.application_id;
  connection.query(
    "DELETE FROM applications WHERE application_id = ?",
    application_id,
    (error, results) => {
      if (error) {
        res.status(400).send("couldn't delete application");
      } else {
        res.status(200).send("application deleted successfully");
      }
    }
  );
};

//                             GET A LIST OF ALL APPLICATIONS FOR AN APPLICANT (user type=1)

exports.getApplicantApplications = function(req, res) {
  user_id = req.body.user_id;
  last_edited = Date();
  connection.query(
    "SELECT * FROM applications WHERE user_id = ?",
    user_id,
    (error, results) => {
      if (error) {
        res.status(400).send("error in getting applications");
      } else {
        const incompleteApps = [];
        const submittedApps = [];
        results.forEach(app => {
          if (app.submitted === "true") {
            submittedApps.push(app);
          } else incompleteApps.push(app);
        });
        res.status(200).send({
          incompleteApps,
          submittedApps
        });
      }
    }
  );
};
