const express = require('express');
const bodyParser = require('body-parser');
const login = require('./routes/loginroutes');
const applicantApplications = require('./routes/applicantApplications');
const approverApps = require('./routes/approverApplications');
const openingRequesters = require('./routes/openingRequesters');
const masterAccount = require('./routes/masterAccount');
const account = require('./routes/account');
const contact = require('./routes/contact');
const openings = require('./routes/jobOpenings');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our upload module apis' });
});

// pulling job openings
router.get('/get-job-openings', openings.getJobOpenings);
router.post('/post-job-openings', openings.postJobOpenings);
router.post('/new_job_opening', openings.createJobOpening);


// creating accounts & logging in
router.post('/register', login.register);
router.post('/approver-request', login.approverRegistration);
router.post('/login', login.login);

// modifying your account
router.post('/password-forgot', account.forgotPassword);
router.post('/reset-valid', account.resetValid);
router.post('/reset-password', account.resetPassword);
router.post('/change-password', account.changePassword);
router.post('/change-name', account.changeName);
router.post('/change-email', account.changeEmail);
router.post('/change-mobile', account.changeMobile);

// applicants applying
router.post('/begin-application', applicantApplications.begin);
router.post('/save-application', applicantApplications.save);
router.post('/submit-application', applicantApplications.submit);
router.post('/delete-application', applicantApplications.delete);
router.post('/get-user-applications',applicantApplications.getApplicantApplications);

// approvers approving
router.post(
  '/get-approver-applications-1',
  approverApps.getApproverApplications_1,
);
router.post(
  '/approve-approver-applications-1',
  approverApps.submitApproverApplications_1,
);
router.post(
  '/reject-approver-applications-1',
  approverApps.rejectApproverApplications_1,
);

router.post(
  '/get-approver-applications-2',
  approverApps.getApproverApplications_2,
);
router.post(
  '/approve-approver-applications-2',
  approverApps.submitApproverApplications_2,
);
router.post(
  '/reject-approver-applications-2',
  approverApps.rejectApproverApplications_2,
);
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%% DELETE THIS SECTION %%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// router.post(
//   '/get-approver-applications-3',
//   approverApps.getApproverApplications_3,
// );
// router.post(
//   '/approve-approver-applications-3',
//   approverApps.submitApproverApplications_3,
// );
// router.post(
//   '/reject-approver-applications-3',
//   approverApps.rejectApproverApplications_3,
// );
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%% DELETE THIS SECTION %%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// contact/help
router.post('/outside-contact', contact.sendEmail);

// not yet verified admin
router.post('/get-my-opening-request', openingRequesters.getOpeningRequest);

// get master account information
router.post('/get-all-opening-requests', masterAccount.getallOpeningRequests);
router.post('/get-all-openings', masterAccount.getallOpenings);
router.post('/get-all-applications', masterAccount.getallApplications);
router.post('/get-all-users', masterAccount.getallUsers);
router.post('/get-user', masterAccount.getUser)
router.post('/get-opening', masterAccount.getOpening)
router.post('/update-user', masterAccount.updateUser);
router.post('/update-opening', masterAccount.updateOpening);

router.post('/approve-opening', masterAccount.approveOpening);
router.post('/reject-opening', masterAccount.rejectOpening);


// router.post('get-application', masterAccount.getApplication)

app.use('/api', router);

app.listen(5000);
