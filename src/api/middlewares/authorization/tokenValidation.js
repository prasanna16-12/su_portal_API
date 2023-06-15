const { varify, verify } = require('jsonwebtoken');

// Define middleware for validation
const validateToken = (req, res, next) => {
    let token = req.get('authorization')
    if (token) {
        //console.log(token);
        token = token.slice(7) //removing bearer from front
        verify(token, process.env.KEY, (error, decoded) => {
            if (error) {
                // If validation fails, send an error response
                return res.status(400).json({
                    message: error,
                    stack: error.stack
                });
            } else {
                next();
            }
        })
    }
    else {
        return res.status(401).json({
            message: 'Access denied! unauthorized'
        });
    }



};

module.exports = validateToken