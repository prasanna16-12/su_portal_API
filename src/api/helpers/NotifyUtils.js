require('dotenv').config();
const NodeMailerConfig = require('../../config/NodeMailerConfig')
const nodemailer = require('nodemailer')

module.exports = {

    sendMAIL: (_to, _subject, _HTML=null, _text =null) => {


        let transporter = nodemailer.createTransport(
            NodeMailerConfig
        );

        const mailOptions = {
            from: { name: 'Supplier Registration', address: process.env.EMAIL },
            to: _to,
            subject: _subject,
            text: _text,
            html: _HTML
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) { console.log(error); }

            //console.log(info.messageId);
        });
    }
}