const Joi = require("joi").extend(require("@joi/date"));

// Define middleware for validation
const validation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    quote_deadline: Joi.date().format("YYYY-MM-DD").iso().required(),
    
    line_items: Joi.array()
      .items({
        rfq_line_item_ID: Joi.number().max(999999).required(),
        delivery_date: Joi.date().format("YYYY-MM-DD").iso().required(),
        is_delete: Joi.valid(1, 0).required()
      })
      .required(),
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
