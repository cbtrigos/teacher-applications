var express    = require("express");
var login = require('./routes/loginroutes');
var application = require('./routes/application');
var passchange = require('./routes/passwordchange')
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
router.post('/password-forgot', passchange.forgotpassword)
router.post('/reset-valid', passchange.reset_valid)
router.post('/reset-password', passchange.reset_password)
router.post('/authenticate', login.authenticate)
router.post('/save-application', application.save)
router.post('/submit-application', application.submit)
app.use('/api', router);

app.listen(5000);