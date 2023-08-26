const Joi = require("joi");

// Define middleware for validation
const validateUserLoginData = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    email: Joi.string().email().required(),
    password: Joi.string().max(50).required(),
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

module.exports = validateUserLoginData;
