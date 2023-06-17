const Joi = require('joi');

// Define middleware for validation
const validatePasswordResetData = (req, res, next) => {
    const schema = Joi.object({
        // Define validation schema for request data
        email: Joi.string().max(50).required(),
        old_password: Joi.string().max(50).required(),
        new_password: Joi.string().max(50).required(),
    });

    const { error } = schema.validate(req.body); // Validate request data

    if (error) {
        // If validation fails, send an error response
        return res.status(400).json({
            message: error.details[0].message,
            stack: error.stack
        });
    }

    // If validation succeeds, move to the next middleware or route handler
    next();
};

module.exports = validatePasswordResetData