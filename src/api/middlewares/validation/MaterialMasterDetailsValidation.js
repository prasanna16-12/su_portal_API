const Joi = require("joi");
const UOM_LOV = require("../../ListOfValues/UOM_LOV");

// Define middleware for validation
const MaterialMasterDetailsValidation = (req, res, next) => {
  const schema = Joi.object({
    // Define validation schema for request data
    description: Joi.string().max(2000).required(),
    unit_of_measure: Joi.string()
      .max(100)
      .required()
      .valid(...UOM_LOV.values), //"GM", "KG", "EA", "LTR", "MTR", "BAG", "BOTTLE"),
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
    warehouse_location: Joi.string().max(100).empty("").default(null),
    rate: Joi.number().required(),
    ERP_no: Joi.string().max(100).empty("").default(null),
    manufacturer_no: Joi.string().max(100).empty("").default(null),
    HSN_code: Joi.string().max(100).required(),
    specification: Joi.string().max(2000).empty("").default(null),
    assembly: Joi.string().length(1).valid("1", "0").required(),
    batch_managed: Joi.string()
      .length(1)
      .valid("1", "0")
      .empty("")
      .default(null),
    base_material: Joi.string()
      .max(100)
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
      .empty("")
      .default(null),
    currency: Joi.string()
      .max(100)
      .valid("INR", "USD", "GBP", "EUR")
      .required(),
    serialised: Joi.string().length(1).valid("1", "0").empty("").default(null),
    conversion_factor_to: Joi.string()
      .max(100)
      .valid(...UOM_LOV.values)
      .empty("")
      .default(null),
    conversion_factor_from_value: Joi.number()
      .max(1000)
      .precision(2)
      .empty("")
      .default(null),
    conversion_factor_to_value: Joi.number()
      .max(1000)
      .precision(2)
      .empty("")
      .default(null),
    rate_UOM: Joi.string()
      .max(100)
      .required()
      .valid(...UOM_LOV.values),
    dtp_buy: Joi.string().length(1).valid("1", "0").empty("").default(null),
  });

  const { error, value } = schema.validate(req.body, { convert: true }); // Validate request data

  req.body = value;

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
