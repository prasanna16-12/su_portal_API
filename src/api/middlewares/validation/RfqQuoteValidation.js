const Joi = require("joi").extend(require("@joi/date"));

// Define middleware for validation
const validation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    vendor_reg_code: Joi.number(),
    rfq_header_ID: Joi.number(),
    rfq_line_item_ID: Joi.number(),
    unit_price: Joi.string().max(100).required(),
    line_total: Joi.string().max(100).required(),
    freight_charge: Joi.string().max(100).required(),
    service_charge: Joi.string().max(100).required(),
    other_charge: Joi.string().max(100).required(),
    is_tax_included: Joi.valid(1, 0).required(),
    grand_line_total: Joi.string().max(100).required(),
    tax_amount: Joi.string().max(100).required(),
    payment_terms: Joi.string().max(100).required(),
    inco_terms: Joi.string().max(100).required(),
    manufacturer_part_no: Joi.string().max(100).required(),
    HSN_code: Joi.string().max(100).required(),
    price_validity_date: Joi.date().format("YYYY-MM-DD").iso().required(),
    min_order_quantity: Joi.string().max(100).required(),
    SGST: Joi.string().max(100).required(),
    CGST: Joi.string().max(100).required(),
    IGST: Joi.string().max(100).required(),
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
