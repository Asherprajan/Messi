
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { models } = require('mongoose');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'asherprajan@gmail.com', // Your Gmail email address
    pass: 'ltymtzaoajbpednr' // Your Gmail password or an app-specific password
  }
});

// Create a Mailgen instance
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Apr mess',
    link: 'www.aprshoppingworld.shop'
  }
});

function sendRegistrationSuccessEmail(name, email) {
  // Generate the "Registered Successfully" email content using Mailgen
  const emailContent = {
    body: {
      name: name,
      intro: 'Congratulations, you have successfully registered on Apr mess!',
      outro: 'Thank you for choosing Apr mess. If you have any questions or need assistance, please feel free to contact us. asherprajan@gmail.com',
    }
  };

  const emailText = mailGenerator.generatePlaintext(emailContent);
  const emailHTML = mailGenerator.generate(emailContent);

  const mailOptions = {
    from: 'asherprajan@gmail.com',
    to: email, // Registered user's email address
    subject: 'Registration Successful',
    text: emailText,
    html: emailHTML
  };

  // Send the email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error sending email: ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Usage example:
module.exports = {
    sendRegistrationSuccessEmail
}
