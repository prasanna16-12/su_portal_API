const Joi = require('joi');

// Define middleware for validation
const validateuserBasicData = (req, res, next) => {
    const schema = Joi.object({
        // Define validation schema for request data

        first_name: Joi.string().max(50).required(),
        email: Joi.string().max(50).required(),
        mobile: Joi.string().max(50).required(),
        role: Joi.string().valid('MANAGER', 'SUPPLIER', 'ADMIN', 'BUYER').required(),
        last_name: Joi.string().max(50).required(),
        vendor_reg_code: Joi.number().min(-1).max(9999999999),
        manager_ID: Joi.number().min(-1).max(9999999999)
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

module.exports = validateuserBasicData