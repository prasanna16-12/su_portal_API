const Joi = require('joi');

// Define middleware for validation
const validateUpdateDetails = (req, res, next) => {
    const schema = Joi.object({
        // Define validation schema for request data
        supp_reg_code: Joi.number().min(100000).max(999999).required(),
        update_details: Joi.array().items({
            field_name: Joi.string().max(100).required(),
            field_value: Joi.string().max(100).required(),
            field_old_value: Joi.string().max(100).required()
        })
    });

    const { error } = schema.validate(req.body); // Validate request data

    if (error) {
        // If validation fails, send an error response
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    // If validation succeeds, move to the next middleware or route handler
    next();
};

module.exports = validateUpdateDetails