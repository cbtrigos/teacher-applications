const mysql = require('mysql');
const nodemailer = require('nodemailer');
const { db } = require('../authentication/mysql.js');
const { emailAuth } = require('../authentication/emailAuth.json');

//                                 CONNECTING TO MYSQL

const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});

exports.getJobOpenings = function (req, res) {
  connection.query('SELECT * FROM job_openings WHERE closed = ? and live = ?', ['false', 'true'], (
    error,
    results,
  ) => {
    if (error) {
        res.status(400).send('error in getting openings');
    } 
    else  {
        res.status(200).send({
            openings: results,
            });

     } 
    }
  );
};

exports.postJobOpenings = function (req, res) {
const search = req.body.search
connection.query('SELECT * FROM job_openings WHERE closed = ? and live = ? and emis_code = ?', ['false', 'true', search], (
  error,
  results,
) => {
  if (error) {
      res.status(400).send('error in getting openings');
  } 
  else  {
      res.status(200).send({
          openings: results,
          });

   } 
  }
);
};

exports.createJobOpening = function (req, res) {
  const today = new Date();
  const submission = {
    contact_name: req.body.name_title + ' ' + req.body.first_name + ' ' + req.body.last_name,
    contact_email: req.body.email,
    contact_mobile: req.body.mobile_number,
    contact_title: req.body.title,
    contact_DOB: req.body.DOB, 
    opening_created: today,
    opening_additional_info: req.body.additional_info, 
    school: req.body.school,
    school_type: req.body.school_type,
    emis_code: req.body.emis_code,
    title_proposed_appt: req.body.title_proposed_appt,
    date_proposed_appt: req.body.date_proposed_appt,
    reasons_proposed_appt: req.body.reasons_proposed_appt,
    pupil_enrollment: req.body.pupil_enrollment,
    number_of_teachers: req.body.number_of_teachers,
    on_payroll: req.body.on_payroll,
    tq_JSS: req.body.tq_JSS,
    tq_SSS: req.body.tq_SSS,
    tq_vocational: req.body.tq_vocational,
    tq_primary: req.body.tq_primary,
    grade_requested: req.body.grade_requested,
    district: req.body.district,
    qualifications_required: req.body.qualifications_required,
    live: 'false'
  };

  const toSend = {
    email: submission.contact_email,
    name: submission.contact_name,
    subject: 'You teacher opening has been received',
    sent: new Date(),
  }; 

    connection.query('INSERT INTO job_openings SET ?', submission, (
      error
    ) => {
      if (error) {
        res
          .status(200)
          .send('An error occured. Please refresh and try again. ');
      } else {


        const transporter = nodemailer.createTransport(emailAuth.authentication);
        const mailOptions = {
          from: emailAuth.applicationEmail,
          to: toSend.email,
          subject: toSend.subject,
          text:
            `Dear ${toSend.name},
            \nThis email is to confirm that we have received your teacher opening "${submission.title_proposed_appt}" for the following school: ${submission.school}.\n\nThe details of the school information and position will be reviewed soon.`
            + '\n\nYou will be notified via email as soon as there is an update. Please note that this notice is automatically generated.' 
            + '\n\nThank you! You\'ll hear from us soon. '
            + 'Good luck!',
        };
  
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            return res.status(200).send('Your opening has been received.',
            );
          }
          return res.status(200).send("Job Opening submitted sucessfully")

        });

      }
    });
}