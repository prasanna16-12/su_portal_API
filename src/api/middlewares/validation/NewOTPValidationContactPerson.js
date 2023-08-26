const Joi = require("joi");

// Define middleware for validation
const optDataValidation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    contactPerson_ID: Joi.number().required(),
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

module.exports = optDataValidation;
