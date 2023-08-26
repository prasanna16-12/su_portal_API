const Joi = require("joi");

// Define middleware for validation
const validateNewUserBasicData = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data

    user_first_name: Joi.string().max(50).required(),
    user_email: Joi.string().email().required(),
    user_mobile: Joi.string().max(50).required(),
    user_role: Joi.string()
      .valid("MANAGER", "SUPPLIER", "ADMIN", "BUYER")
      .required(),
    user_last_name: Joi.string().max(50).required(),
    vendor_reg_code: Joi.number(),
    manager_ID: Joi.number(),
    Permission_ID: Joi.array().items(Joi.string().max(10)).min(1).required(),
  });

  const { error } = schema.validate(req.body); // Validate request data

  if (error) {
    // If validation fails, send an error response
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // If validation succeeds, move to the next middleware or route handler
  next();
};

module.exports = validateNewUserBasicData;
