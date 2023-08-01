const notify = require('../helpers/NotifyUtils')
const newOTPTemplate = require('../emailTemplate/ContactPerson/NewOTP')
const pool = require('./DataBase')

module.exports = {



    addSupplierCompanyDetails: (data) => {
        return new Promise((resolve, reject) => {
            let {
                vendor_company_name,
                vendor_company_name2,
                vendor_street,
                vendor_street2,
                vendor_house,
                vendor_city,
                vendor_dist,
                vendor_pincode,
                vendor_cty_key,
                vendor_region,
                vendor_pobox,
                vendor_langkey,
                vendor_contact,
                vendor_mobile,
                vendor_email,
                vendor_website,
                vendor_namecheque,
                vendor_industry,
                vendor_legal,
                vendor_pan,
                vendor_country,
                vendor_pay_terms,
                vendor_list_pay,
                vendor_purchase_order,
                vendor_incoterms1,
                vendor_incoterms2,
                vendor_bankkey,
                vendor_accountno,
                vendor_bankname,
                vendor_ifsc,
                vendor_branch,
                vendor_bankcity,
                vendor_vat_regno,
                vendor_gst,
                vendor_tin,
                vendor_ecc,
                vendor_ex_reg,
                vendor_typeofvendor,
                vendor_ssi_status,
                vendor_cenvat,
                vendor_iso,
                vendor_typeofvendor1,
                vendor_currency1,
                vendor_lang,
                vendor_esg_rating,
                vendor_esg_avg,
                vendor_l0name,
                vendor_l0designation,
                vendor_l0mobile,
                vendor_l0email,
                vendor_l3name,
                vendor_l3designation,
                vendor_l3mobile,
                vendor_l3email,
                vendor_l2name,
                vendor_l2designation,
                vendor_l2mobile,
                vendor_l2email,
                vendor_l1name,
                vendor_l1designation,
                vendor_l1mobile,
                vendor_l1email,
                vendor_upi_id,
                buyer_ID,
                vendor_dnb_code,
                contact_person_id } = data
            //console.log(data);
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_contact_person_add_company_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
                    [vendor_company_name,
                        vendor_company_name2,
                        vendor_street,
                        vendor_street2,
                        vendor_house,
                        vendor_city,
                        vendor_dist,
                        vendor_pincode,
                        vendor_cty_key,
                        vendor_region,
                        vendor_pobox,
                        vendor_langkey,
                        vendor_contact,
                        vendor_mobile,
                        vendor_email,
                        vendor_website,
                        vendor_namecheque,
                        vendor_industry,
                        vendor_legal,
                        vendor_pan,
                        vendor_country,
                        vendor_pay_terms,
                        vendor_list_pay,
                        vendor_purchase_order,
                        vendor_incoterms1,
                        vendor_incoterms2,
                        vendor_bankkey,
                        vendor_accountno,
                        vendor_bankname,
                        vendor_ifsc,
                        vendor_branch,
                        vendor_bankcity,
                        vendor_vat_regno,
                        vendor_gst,
                        vendor_tin,
                        vendor_ecc,
                        vendor_ex_reg,
                        vendor_typeofvendor,
                        vendor_ssi_status,
                        vendor_cenvat,
                        vendor_iso,
                        vendor_typeofvendor1,
                        vendor_currency1,
                        vendor_lang,
                        vendor_esg_rating,
                        vendor_esg_avg,
                        vendor_l0name,
                        vendor_l0designation,
                        vendor_l0mobile,
                        vendor_l0email,
                        vendor_l3name,
                        vendor_l3designation,
                        vendor_l3mobile,
                        vendor_l3email,
                        vendor_l2name,
                        vendor_l2designation,
                        vendor_l2mobile,
                        vendor_l2email,
                        vendor_l1name,
                        vendor_l1designation,
                        vendor_l1mobile,
                        vendor_l1email,
                        vendor_upi_id,
                        buyer_ID,
                        vendor_dnb_code,
                        contact_person_id
                    ],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results)
                    }
                )
            })
        })
    },

    authenticateContactPerson: (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_supplier_details(?);',
                    [data.contactPerson_ID],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0][0])
                    }
                )
            })

        })
    },

    newOTP: (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                let _OTP = Math.floor(Math.random() * 900000) + 100000
                conn.query(
                    'CALL usp_get_newOTP(?,?);',
                    [data.contactPerson_ID, _OTP],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        let {
                            supp_ID,
                            supp_name,
                            supp_email,
                            OTP,
                            link_status,
                            supp_company_name,
                        } = results[0][0]
                        
                        notify.sendMAIL(
                            'Verification',
                            [supp_email],
                            newOTPTemplate.getSubject(),
                            null,
                            //newOTPTemplate.getHTMLMailTemplate(name, company_name, OTP, supp_ID),  // Future implementation
                            newOTPTemplate.getTEXTMailTemplate(supp_name, supp_company_name, OTP, supp_ID)
                        )
                        return resolve(true)
                    }
                )
            })

        })
    },

    verifyContactPerson: (obj, OTP) => {

        let authStatus =  'Success'


        if (obj === undefined) { //no such supplier present
            authStatus = 'No such a user present'
        }
        else {
            let validDateTime = new Date(obj.OTP_validity_TS); // Valid Date

            if (obj.link_status === 0) {
                authStatus = 'link expired'
            }
            else {
                if (validDateTime.getTime() > new Date().getTime()) { // valid TS
                    if (obj.OTP === OTP) { //valid OTP
                        authStatus = 'Success'
                        
                    }
                    else {
                        authStatus = 'Incorrect OTP'
                    }

                } else { // Invalid TS
                    authStatus = 'OTP expired'
                }
            }
        }
        return authStatus

    },
}