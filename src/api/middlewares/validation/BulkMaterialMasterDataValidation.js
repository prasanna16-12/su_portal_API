const Joi = require("joi");
//const buyerModel = require("../../models/BuyerModel");
const BulkUpload = require("../../models/BulkUpload")
const UOM_LOV = require("../../ListOfValues/UOM_LOV");

const materialMasterDataValidation = async (obj) => {
  const schema = Joi.object({
    // Define validation schema for request data
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
    ERP_no: Joi.string().max(100).required(),
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
        "Platinum"
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
    dtp_buy: Joi.string().length(1).required().valid(1, 0).allow(null),
  });

  const { error } = schema.validate(obj); // Validate request data

  //console.log(req.body);

  if (error) {
    // If validation fails, send an error response
    return { details: error.details[0].message, status: false };
  }

  if (obj.ERP_no !== null) {
    // check if already present or not
    let { is_exist } = await BulkUpload.MaterialMasterBulkDataDuplicateCheck(
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
