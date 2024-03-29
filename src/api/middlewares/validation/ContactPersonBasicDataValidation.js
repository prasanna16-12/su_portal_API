const Joi = require("joi");

// Define middleware for validation
const validateContactPersonBasicData = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    name: Joi.string().min(3).max(50).required(),
    company_name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    buyer_ID: Joi.number().required(),
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

module.exports = validateContactPersonBasicData;
