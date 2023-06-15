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

    sendMAIL: (emailTo, subject) => {


        let transporter = nodemailer.createTransport({
            NodeMailerConfig
        });

        let message = {
            from: NodeMailerConfig.auth.user,
            to: emailTo,
            subject: subject
            /*html: `<h1>Hi ${name} </h1>
            <p>click on below link</p>
            <a>www.Suportal.com?userID=${ID}</a>`*/
        };

        transporter.sendMail(message, (error, info) => {
            if (error) { throw error }
            console.log(info.messageId);
        });
    }
}