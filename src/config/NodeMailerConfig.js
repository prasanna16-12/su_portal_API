const NodeMailerConfig = {
    host: 'smtp.gamil.com',
    port: 456,
    secure: true,
    auth: {
        user: String(process.env.EMAIL),
        pass: String(process.env.PASS)
    },
    service: 'gmail'
}

module.exports = NodeMailerConfig