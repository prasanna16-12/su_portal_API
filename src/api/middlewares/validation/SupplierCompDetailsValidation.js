const Joi = require('joi');

// Define middleware for validation
const validateVendorBasicData = (req, res, next) => {
    const schema = Joi.object({
        // Define validation schema for request data

        // to disable link get contact person id also TODO
        vendor_company_name: Joi.string().max(200).required(),
        vendor_company_name2: Joi.string().max(200).required(),
        vendor_street: Joi.string().max(200).required(),
        vendor_street2: Joi.string().max(200).required(),
        vendor_house: Joi.string().max(200),
        vendor_city: Joi.string().max(200).required(),
        vendor_dist: Joi.string().max(200),
        vendor_pincode: Joi.string().max(200).required(),
        vendor_cty_key: Joi.string().max(200).required(),
        vendor_region: Joi.string().max(200).required(),
        vendor_pobox: Joi.string().max(200),
        vendor_langkey: Joi.string().max(200).required(),
        vendor_contact: Joi.string().max(200).required(),
        vendor_mobile: Joi.string().max(200),
        vendor_email: Joi.string().email().max(200).required(),
        vendor_website: Joi.string().max(200),
        vendor_namecheque: Joi.string().max(200).required(),
        vendor_industry: Joi.string().max(200).required(),
        vendor_legal: Joi.string().max(200).required(),
        vendor_pan: Joi.string().max(200).required(),
        vendor_country: Joi.string().max(200),
        vendor_pay_terms: Joi.string().max(200).required(),
        vendor_list_pay: Joi.string().max(200).required(),
        vendor_purchase_order: Joi.string().max(200).required(),
        vendor_incoterms1: Joi.string().max(200).required(),
        vendor_incoterms2: Joi.string().max(200).required(),
        vendor_bankkey: Joi.string().max(200),
        vendor_accountno: Joi.string().max(200),
        vendor_bankname: Joi.string().max(200),
        vendor_ifsc: Joi.string().max(200),
        vendor_branch: Joi.string().max(200),
        vendor_bankcity: Joi.string().max(200),
        vendor_vat_regno: Joi.string().max(200).required(),
        vendor_gst: Joi.string().max(200).required(),
        vendor_tin: Joi.string().max(200).required(),
        vendor_ecc: Joi.string().max(200),
        vendor_ex_reg: Joi.string().max(200),
        vendor_typeofvendor: Joi.string().max(200),
        vendor_ssi_status: Joi.string().max(200),
        vendor_cenvat: Joi.string().max(200),
        vendor_iso: Joi.string().max(200).required(),
        vendor_typeofvendor1: Joi.string().max(200),
        vendor_currency1: Joi.string().max(200),
        vendor_lang: Joi.string().max(200),
        vendor_esg_rating: Joi.string().max(200),
        vendor_esg_avg: Joi.string().max(200),
        vendor_l0name: Joi.string().max(200),
        vendor_l0designation: Joi.string().max(200),
        vendor_l0mobile: Joi.string().max(200),
        vendor_l0email: Joi.string().email().max(200),
        vendor_l3name: Joi.string().max(200),
        vendor_l3designation: Joi.string().max(200),
        vendor_l3mobile: Joi.string().max(200),
        vendor_l3email: Joi.string().email().max(200),
        vendor_l2name: Joi.string().max(200),
        vendor_l2designation: Joi.string().max(200),
        vendor_l2mobile: Joi.string().max(200),
        vendor_l2email: Joi.string().email().max(200),
        vendor_l1name: Joi.string().max(200),
        vendor_l1designation: Joi.string().max(200),
        vendor_l1mobile: Joi.string().max(200),
        vendor_l1email: Joi.string().email().max(200),
        buyer_ID: Joi.number().required(),
        vendor_upi_id: Joi.string().max(200),
        vendor_dnb_code: Joi.string().max(200),
        contact_person_id: Joi.number().required(),
        vendor_segmentation:Joi.string().max(200),
        vendor_company_size:Joi.string().max(200)
    });

    const { error } = schema.validate(req.body); // Validate request data

    //console.log(req.body);

    if (error) {
        // If validation fails, send an error response
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    // If validation succeeds, move to the next middleware or route handler
    next();
};

module.exports = validateVendorBasicData