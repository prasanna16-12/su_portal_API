const Joi = require("joi");

// Define middleware for validation
const validateChangeStatus = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    vendor_reg_code: Joi.number().min(100000).max(999999).required(),
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

module.exports = validateChangeStatus;
