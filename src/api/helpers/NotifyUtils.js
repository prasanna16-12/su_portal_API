const nodemailer = require("nodemailer");

const NodeMailerConfig = require("../../config/NodeMailerConfig");

module.exports = {
  sendMAIL: (_from_name, _to, _subject, _HTML = null, _text = null) => {
    let transporter = nodemailer.createTransport(NodeMailerConfig());

    const mailOptions = {
      from: { name: _from_name, address: process.env.EMAIL },
      to: _to,
      subject: _subject,
      text: _text,
      html: _HTML,
      generateTextFromHTML: true,
    };

    transporter.sendMail(mailOptions, (error, response) => {
      error ? 
      console.log(error) : 
      console.log(response.messageId);
      transporter.close();
    });
  },
};
