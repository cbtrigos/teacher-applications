var express    = require("express");
var login = require('./routes/loginroutes');
var applicantApplications = require('./routes/applicantApplications');
var approverApplications = require('./routes/approverApplications');
var unverifiedApprover = require('./routes/unverifiedApprover')
var masterAccount = require('./routes/masterAccount')
var account = require('./routes/account');
var contact = require('./routes/contact');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

//creating accounts & logging in
router.post('/register',login.register);
router.post('/approver-request',login.approverRegistration);
router.post('/login',login.login)

// modifying your account
router.post('/password-forgot', account.forgotPassword)
router.post('/reset-valid', account.resetValid)
router.post('/reset-password', account.resetPassword)
router.post('/change-password', account.changePassword)
router.post('/change-name', account.changeName)
router.post('/change-email', account.changeEmail)
router.post('/change-mobile', account.changeMobile)

// applicants applying
router.post('/begin-application', applicantApplications.begin)
router.post('/save-application', applicantApplications.save)
router.post('/submit-application', applicantApplications.submit)
router.post('/delete-application', applicantApplications.delete)
router.post('/get-user-applications', applicantApplications.getApplicantApplications)

// approvers approving
router.post('/get-approver-applications-1', approverApplications.getApproverApplications_1)
router.post('/approve-approver-applications-1', approverApplications.submitApproverApplications_1)
router.post('/reject-approver-applications-1', approverApplications.rejectApproverApplications_1)

router.post('/get-approver-applications-2', approverApplications.getApproverApplications_2)
router.post('/approve-approver-applications-2', approverApplications.submitApproverApplications_2)
router.post('/reject-approver-applications-2', approverApplications.rejectApproverApplications_2)

router.post('/get-approver-applications-3', approverApplications.getApproverApplications_3)
router.post('/approve-approver-applications-3', approverApplications.submitApproverApplications_3)
router.post('/reject-approver-applications-3', approverApplications.rejectApproverApplications_3)

// contact/help
router.post('/outside-contact', contact.sendEmail)

// not yet verified admin 
router.post('/get-my-approver-request', unverifiedApprover.getApproverRequest)

// get master account information 
router.post('/get-all-approver-requests', masterAccount.getallApproverRequests)


app.use('/api', router);

app.listen(5000);