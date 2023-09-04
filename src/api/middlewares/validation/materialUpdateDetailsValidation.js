const Joi = require("joi");

// Define middleware for validation
const vendorUpdateDetails = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    modifiedByID: Joi.number().required(),
    materialID: Joi.number().required(),
    field_name: Joi.string().max(200).required().valid('description','unit_of_measure','material_group','material_type','warehouse_location','rate','ERP_no','manufacturer_no','HSN_code','specification','assembly','base_material','is_active','batch_managed','currency','serialised','conversion_factor_to','conversion_factor_from_value','conversion_factor_to_value'),
    field_value: Joi.string().max(200).required(),
    field_old_value: Joi.string().max(200).required().allow(null),
    //tab_name: Joi.string().max(200).required(),
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

module.exports = vendorUpdateDetails;
