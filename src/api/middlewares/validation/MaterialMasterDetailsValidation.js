const Joi = require("joi");

// Define middleware for validation
const MaterialMasterDetailsValidation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data

    // to disable link get contact person id also TODO
    description: Joi.string().max(100).required(),
    UoM: Joi.string().max(100).required(),
    material_group: Joi.string().max(100).required(),
    material_type: Joi.string().max(100).required(),
    conversion_factor: Joi.string().max(100).required(),
    WH_location: Joi.string().max(100).required(),
    rate: Joi.string().max(100).required(),
    batch: Joi.string().max(100).required(),
    ERP_no: Joi.string().max(100).required().allow(null),
    manufacturer_no: Joi.string().max(100).required(),
    HSN_code: Joi.string().max(100).required(),
    specification: Joi.string().max(1000).required(),
    assembly: Joi.string().length(1).required().valid('Y', 'N'),
    base_material: Joi.string().max(100).required(),
  });

  const { error } = schema.validate(req.body); // Validate request data

  //console.log(req.body);

  if (error) {
    // If validation fails, send an error response
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // If validation succeeds, move to the next middleware or route handler
  next();
};

module.exports = MaterialMasterDetailsValidation;
