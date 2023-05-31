const Joi = require('joi');

// Define middleware for validation
const SupplierAuthValidation = (req, res, next) => {
    const schema = Joi.object({
        // Define validation schema for request data
        Supplier_ID: Joi.number().min(1000000000).max(9999999999).required(),
        OTP: Joi.number().min(1000).max(9999).required(),
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

module.exports = SupplierAuthValidation