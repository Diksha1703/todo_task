const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

exports.sendReminder = async (email, subject, text) => {
  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject, text });
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Failed to send email', err);
    throw err;
  }
};
