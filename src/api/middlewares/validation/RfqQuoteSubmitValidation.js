const Joi = require("joi").extend(require("@joi/date"));

// Define middleware for validation
const validation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    vendor_reg_code: Joi.number(),
    rfq_header_ID: Joi.number()
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

module.exports = validation;
