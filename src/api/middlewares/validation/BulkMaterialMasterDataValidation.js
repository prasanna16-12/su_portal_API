const Joi = require("joi");
const buyerModel = require("../../models/BuyerModel");

const materialMasterDataValidation = async (obj) => {
  const schema = Joi.object({
    // Define validation schema for request data
    description: Joi.string().max(1000).required(),
    unit_of_measure: Joi.string()
      .max(100)
      .required()
      .valid("GM", "KG", "EA", "LTR", "MTR", "BAG", "BOTTLE"),
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
    conversion_factor: Joi.string().max(100).required(),
    warehouse_location: Joi.string().max(100).required(),
    rate: Joi.number().required(),
    batch: Joi.number().required(),
    ERP_no: Joi.string().max(100).required().allow(null),
    manufacturer_no: Joi.string().max(100).required(),
    HSN_code: Joi.string().max(100).required(),
    specification: Joi.string().max(1000).required(),
    assembly: Joi.string().length(1).required().valid("Y", "N"),
    batch_managed: Joi.string().length(1).required().valid("Y", "N"),
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
        "Platinum"
      ),
    currency: Joi.string().max(100).required(),
    serialised: Joi.string().length(1).required().valid("Y", "N"),
    conversion_factor_to: Joi.string()
      .max(100)
      .required()
      .valid("GM", "KG", "EA", "LTR", "MTR", "BAG", "BOTTLE"),
    conversion_factor_from_value: Joi.number().max(99).precision(2).required(),
    conversion_factor_to_value: Joi.number().max(99).precision(2).required(),
  });

  const { error } = schema.validate(obj); // Validate request data

  //console.log(req.body);

  if (error) {
    // If validation fails, send an error response
    return { details: error.details[0].message, status: false };
  }

  if (obj.ERP_no !== null) {
    // check if already present or not
    let { is_exist } = await buyerModel.MaterialMasterBulkDataDuplicateCheck(
      obj
    );
    //console.log(is_exist);
    if (is_exist) {
      return {
        details: `Material master data already exist with ERP No - ${obj.ERP_no}`,
        status: false,
      };
    }
  }

  return { details: "valid row", status: true };
};

module.exports = materialMasterDataValidation;
