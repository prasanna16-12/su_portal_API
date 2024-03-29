const Joi = require("joi");
const UOM_LOV = require("../../ListOfValues/UOM_LOV");

// Define middleware for validation
const MaterialMasterDetailsValidation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data

    // to disable link get contact person id also TODO
    description: Joi.string().max(2000).required(),
    unit_of_measure: Joi.string()
      .max(100)
      .required()
      .valid(...UOM_LOV.values),//"GM", "KG", "EA", "LTR", "MTR", "BAG", "BOTTLE"),
    material_group: Joi.string()
      .max(100)
      .required()
      .valid(
        "Machined Components",
        "Stationary",
        "Office Furniture",
        "Maintenance",
        "Fastener"
      ),
    material_type: Joi.string()
      .max(100)
      .required()
      .valid(
        "Raw Material",
        "Spares & Consumables",
        "Semifirnished Material",
        "Service Material",
        "Finished Material"
      ),
    warehouse_location: Joi.string().max(100).required().allow(null),
    rate: Joi.number().required(),
    ERP_no: Joi.string().max(100).required().allow(null),
    manufacturer_no: Joi.string().max(100).required().allow(null),
    HSN_code: Joi.string().max(100).required(),
    specification: Joi.string().max(2000).required().allow(null),
    assembly: Joi.string().length(1).required().valid(1, 0),
    batch_managed: Joi.string().length(1).required().valid(1, 0).allow(null),
    base_material: Joi.string()
      .max(100)
      .required()
      .valid(
        "Steel",
        "Cast Iron",
        "Copper",
        "Alluminiumn",
        "Brass",
        "Gold",
        "Silver",
        "Platinum",
        "NA"
      )
      .allow(null),
    currency: Joi.string().max(100).required(),
    serialised: Joi.string().length(1).required().valid(1, 0).allow(null),
    conversion_factor_to: Joi.string()
      .max(100)
      .required()
      .valid(...UOM_LOV.values)
      .allow(null),
    conversion_factor_from_value: Joi.number()
      .max(1000)
      .precision(2)
      .required()
      .allow(null),
    conversion_factor_to_value: Joi.number()
      .max(1000)
      .precision(2)
      .required()
      .allow(null),
    rate_UOM: Joi.string().max(100).required().allow(null),
    is_active: Joi.string().length(1).required().valid(1, 0),
    dtp_buy: Joi.string().length(1).required().valid(1, 0).allow(null),
  });

  const { error, value } = schema.validate(req.body, { convert: false }); // Validate request data

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

module.exports = MaterialMasterDetailsValidation;
