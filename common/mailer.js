var nodemailer = require('nodemailer');
var mailer;

if (process.env.MAIL_URL) {
  mailer = nodemailer.createTransport(process.env.MAIL_URL);
}

if (process.env.MAILGUN_SMTP_SERVER) {
  mailer = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_SERVER,
    port: process.env.MAILGUN_SMTP_PORT,
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD
    }
  });
}

exports.sendMail = mailer.sendMail.bind(mailer);
