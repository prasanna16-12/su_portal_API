const Joi = require("joi").extend(require("@joi/date"));

// Define middleware for validation
const validation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    //vendor_reg_code: Joi.number().max(999999).required().allow(null),
    material_ID: Joi.number().max(999999).required().allow(null),
    from_date: Joi.date().format("YYYY-MM-DD").iso().required().allow(null),
    status: Joi.valid("PUBLISHED", "AWARDED", "HOLD", "CLOSED", "EXPIRED").required().allow(null),
    rfq_from:Joi.number().max(999999).required().allow(null),
    rfq_to: Joi.number().max(999999).required().allow(null),
    bid_status: Joi.valid("NO BID", "SUBMIT").required().allow(null),
  });

  const { error, value } = schema.validate(req.body, { convert: true }); // Validate request data

  //console.log(value);

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
