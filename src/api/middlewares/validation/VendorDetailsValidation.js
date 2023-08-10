const Joi = require('joi');

// Define middleware for validation
const vendorUpdateDetails = (req, res, next) => {
    const schema = Joi.object({
        // Define validation schema for request data
        modifiedByID: Joi.number().required(),
        vendorID:Joi.number().required(),
        field_name: Joi.string().max(100).required(),
        field_value: Joi.string().max(100).required(),
        field_old_value: Joi.string().max(100).required().allow(null),
        tab_name:Joi.string().max(100).required()

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

module.exports = vendorUpdateDetails