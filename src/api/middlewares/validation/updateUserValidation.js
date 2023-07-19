const Joi = require('joi');

// Define middleware for validation
const validateUpdateUserBasicData = (req, res, next) => {
    const schema = Joi.object({
        // Define validation schema for request data

        user_first_name: Joi.string().max(50).required(),
        user_email: Joi.string().email().max(50).required(),
        user_mobile: Joi.string().max(50).required(),
        user_role: Joi.string().valid('MANAGER', 'SUPPLIER', 'ADMIN', 'BUYER').required(),
        user_last_name: Joi.string().max(50).required(),
        vendor_reg_code: Joi.number(),
        manager_ID: Joi.number(),
        user_ID: Joi.number().required(),
        is_active: Joi.number().required(),
        is_deleted: Joi.number().required(),
        Permission_ID: Joi.array().items(Joi.string().max(10)).min(1)
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

module.exports = validateUpdateUserBasicData