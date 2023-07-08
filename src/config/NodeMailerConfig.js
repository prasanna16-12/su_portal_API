require('dotenv').config();

const NodeMailerConfig = {
    
    service: process.env.SERVICE,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PWD
    }
    
}


module.exports = NodeMailerConfig