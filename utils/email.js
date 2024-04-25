/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');

exports.sendEmail = async options => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // mail options
  const mailOptions = {
    from: 'Kashaf <kashaf.dawood@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text
  };

  //send mail
  await transporter.sendMail(mailOptions);
};
