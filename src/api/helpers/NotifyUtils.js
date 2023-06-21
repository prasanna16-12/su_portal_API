const NodeMailerConfig = require('../../config/NodeMailerConfig')
const client = require('twilio')(process.env.Account_SID, process.env.Auth_Token);
const nodemailer = require('nodemailer')

module.exports = {
    sendOTP: (phone, message) => {
        //console.log(OTP, name, phone, valid)
        client.messages.create({
            body: message,//'Hi ' + name + ' Your OTP is ' + OTP + '\nAn email has been sent to you with registration link.\nOTP will be valid for ' + valid,
            from: process.env.Twilio_phone_number,
            to: phone
        })
            .then(message => console.log(message.sid))
            .catch()
    },

    sendMAIL: (from, to, subject, text) => {


        let transporter = nodemailer.createTransport({
            NodeMailerConfig
        });

        const mailOptions = {
            from: 'prasanna89kale@gmail.com',
            to: 'prasanna89kale@gmail.com',
            subject: 'Subject of your email',
            text: 'Content of your email'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) { throw error }
            console.log(info.messageId);
        });
    }
}