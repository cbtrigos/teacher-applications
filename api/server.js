var express    = require("express");
var login = require('./routes/loginroutes');
var application = require('./routes/application');
var account = require('./routes/account')
var contact = require('./routes/contact')
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
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
router.post('/authenticate', login.authenticate)


router.post('/password-forgot', account.forgotPassword)
router.post('/reset-valid', account.resetValid)
router.post('/reset-password', account.resetPassword)
router.post('/change-password', account.changePassword)
router.post('/change-name', account.changeName)
router.post('/change-email', account.changeEmail)

router.post('/begin-application', application.begin)
router.post('/save-application', application.save)
router.post('/submit-application', application.submit)
router.post('/delete-application', application.delete)
router.post('/my-applications', application.get)

router.post('/outside-contact', contact.sendEmail)

app.use('/api', router);

app.listen(5000);