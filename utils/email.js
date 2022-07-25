const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Admin <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    console.log('env: ', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
      // Sengrid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1. Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3. Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }

  async sendResetPassword() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid only for 10 minutes).'
    );
  }
};

// const sendEmail = async (options) => {
//   // // 1. Create a transporter
//   // const trasnporter = nodemailer.createTransport({
//   //   host: process.env.EMAIL_HOST,
//   //   port: process.env.EMAIL_PORT,
//   //   auth: {
//   //     user: process.env.EMAIL_USERNAME,
//   //     pass: process.env.EMAIL_PASSWORD,
//   //   },
//   // });

//   // // 2. Define email options
//   // const mailOptions = {
//   //   from: 'Admin',
//   //   to: options.email,
//   //   subject: options.subject,
//   //   text: options.message,
//   // };

//   // 3. Send the email
//   await trasnporter.sendMail(mailOptions);
// };
// // module.exports = sendEmail;
