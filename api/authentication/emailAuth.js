const dotenv = require("dotenv");
dotenv.config();

const emailAuth = {
  authentication: {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  applicationEmail: process.env.EMAIL_EMAIL
};

module.exports = Object.freeze({
  emailAuth: emailAuth
});
