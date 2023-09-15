const Joi = require("joi").extend(require("@joi/date"));

// Define middleware for validation
const validation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data

    indent_ID: Joi.number().max(999999).required(),
    status: Joi.valid("PUBLISHED", "DRAFT").required(),
    indent_name: Joi.string().max(100).required(),
    payment_terms: Joi.string().max(100).required(),
    inco_terms: Joi.string().max(100).required(),
    quote_deadline: Joi.date().format("YYYY-MM-DD").iso().required(),
    site: Joi.string().max(100).required(),
    terms_and_condition:Joi.string().max(1000).required().allow(null),

    line_items: Joi.array()
      .items({
        material_ID: Joi.number().max(999999).required(),
        quantity: Joi.string().max(100).required(),
        delivery_date: Joi.date().format("YYYY-MM-DD").iso().required(),
        material_specification: Joi.string().max(1000).required(),
        is_service: Joi.valid(1, 0).required(),
        service_description: Joi.string().max(1000).required().allow(null),
        is_GST:Joi.valid(1, 0).required().allow(null),
      })
      .required(),

    vendors: Joi.array().items(Joi.number().max(999999).required()).required(),
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
