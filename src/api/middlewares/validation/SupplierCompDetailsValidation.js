const Joi = require('joi');

// Define middleware for validation
const validateSupplierBasicData = (req, res, next) => {
    const schema = Joi.object({
        // Define validation schema for request data

        supp_company_name: Joi.string().max(100).required(),
        supp_company_name2: Joi.string().max(100).required(),
        supp_street: Joi.string().max(100).required(),
        supp_street2: Joi.string().max(100).required(),
        supp_house: Joi.string().max(100),
        supp_city: Joi.string().max(100).required(),
        supp_dist: Joi.string().max(100),
        supp_pincode: Joi.string().max(100).required(),
        supp_cty_key: Joi.string().max(100).required(),
        supp_region: Joi.string().max(100).required(),
        supp_pobox: Joi.string().max(100),
        supp_langkey: Joi.string().max(100).required(),
        supp_contact: Joi.string().max(100).required(),
        supp_landline: Joi.string().max(100),
        supp_email: Joi.string().max(100).required(),
        supp_website: Joi.string().max(100),
        supp_namecheque: Joi.string().max(100).required(),
        supp_industry: Joi.string().max(100).required(),
        supp_legal: Joi.string().max(100).required(),
        supp_pan: Joi.string().max(100).required(),
        supp_country: Joi.string().max(100),
        supp_pay_terms: Joi.string().max(100).required(),
        supp_list_pay: Joi.string().max(100).required(),
        supp_purchase_order: Joi.string().max(100).required(),
        supp_incoterms1: Joi.string().max(100).required(),
        supp_incoterms2: Joi.string().max(100).required(),
        supp_bankkey: Joi.string().max(100),
        supp_accountno: Joi.string().max(100),
        supp_bankname: Joi.string().max(100),
        supp_ifsc: Joi.string().max(100),
        supp_branch: Joi.string().max(100),
        supp_bankcity: Joi.string().max(100),
        supp_vat_regno: Joi.string().max(100).required(),
        supp_gst: Joi.string().max(100).required(),
        supp_tin: Joi.string().max(100).required(),
        supp_ecc: Joi.string().max(100),
        supp_ex_reg: Joi.string().max(100),
        supp_typeofvendor: Joi.string().max(100),
        supp_ssi_status: Joi.string().max(100),
        supp_cenvat: Joi.string().max(100),
        supp_iso: Joi.string().max(100).required(),
        supp_typeofvendor1: Joi.string().max(100),
        supp_currency1: Joi.string().max(100),
        supp_legal_nature: Joi.string().max(100),
        supp_lang: Joi.string().max(100),
        supp_esg_rating: Joi.string().max(100),
        supp_esg_avg: Joi.string().max(100),
        supp_l0name: Joi.string().max(100),
        supp_l0designation: Joi.string().max(100),
        supp_l0mobile: Joi.string().max(100),
        supp_l0email: Joi.string().max(100),
        supp_l3name: Joi.string().max(100),
        supp_l3designation: Joi.string().max(100),
        supp_l3mobile: Joi.string().max(100),
        supp_l3email: Joi.string().max(100),
        supp_l2name: Joi.string().max(100),
        supp_l2designation: Joi.string().max(100),
        supp_l2mobile: Joi.string().max(100),
        supp_l2email: Joi.string().max(100),
        supp_l1name: Joi.string().max(100),
        supp_l1designation: Joi.string().max(100),
        supp_l1mobile: Joi.string().max(100),
        supp_l1email: Joi.string().max(100),
        supp_upi_id: Joi.string().max(100)
    });

    const { error } = schema.validate(req.body); // Validate request data

    if (error) {
        // If validation fails, send an error response
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    // If validation succeeds, move to the next middleware or route handler
    next();
};

module.exports = validateSupplierBasicData