const notify = require('../helpers/NotifyUtils')
const newOTPTemplate = require('../emailTemplate/ContactPerson/NewOTP')
const pool = require('./DataBase')

module.exports = {



    addSupplierCompanyDetails: (data) => {
        return new Promise((resolve, reject) => {
            let {
                supp_company_name,
                supp_company_name2,
                supp_street,
                supp_street2,
                supp_house,
                supp_city,
                supp_dist,
                supp_pincode,
                supp_cty_key,
                supp_region,
                supp_pobox,
                supp_langkey,
                supp_contact,
                supp_landline,
                supp_email,
                supp_website,
                supp_namecheque,
                supp_industry,
                supp_legal,
                supp_pan,
                supp_country,
                supp_pay_terms,
                supp_list_pay,
                supp_purchase_order,
                supp_incoterms1,
                supp_incoterms2,
                supp_bankkey,
                supp_accountno,
                supp_bankname,
                supp_ifsc,
                supp_branch,
                supp_bankcity,
                supp_vat_regno,
                supp_gst,
                supp_tin,
                supp_ecc,
                supp_ex_reg,
                supp_typeofvendor,
                supp_ssi_status,
                supp_cenvat,
                supp_iso,
                supp_typeofvendor1,
                supp_currency1,
                supp_legal_nature,
                supp_lang,
                supp_esg_rating,
                supp_esg_avg,
                supp_l0name,
                supp_l0designation,
                supp_l0mobile,
                supp_l0email,
                supp_l3name,
                supp_l3designation,
                supp_l3mobile,
                supp_l3email,
                supp_l2name,
                supp_l2designation,
                supp_l2mobile,
                supp_l2email,
                supp_l1name,
                supp_l1designation,
                supp_l1mobile,
                supp_l1email,
                supp_upi_id } = data
            console.log(data);
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_add_supplier_comp_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
                    [supp_company_name,
                        supp_company_name2,
                        supp_street,
                        supp_street2,
                        supp_house,
                        supp_city,
                        supp_dist,
                        supp_pincode,
                        supp_cty_key,
                        supp_region,
                        supp_pobox,
                        supp_langkey,
                        supp_contact,
                        supp_landline,
                        supp_email,
                        supp_website,
                        supp_namecheque,
                        supp_industry,
                        supp_legal,
                        supp_pan,
                        supp_country,
                        supp_pay_terms,
                        supp_list_pay,
                        supp_purchase_order,
                        supp_incoterms1,
                        supp_incoterms2,
                        supp_bankkey,
                        supp_accountno,
                        supp_bankname,
                        supp_ifsc,
                        supp_branch,
                        supp_bankcity,
                        supp_vat_regno,
                        supp_gst,
                        supp_tin,
                        supp_ecc,
                        supp_ex_reg,
                        supp_typeofvendor,
                        supp_ssi_status,
                        supp_cenvat,
                        supp_iso,
                        supp_typeofvendor1,
                        supp_currency1,
                        supp_legal_nature,
                        supp_lang,
                        supp_esg_rating,
                        supp_esg_avg,
                        supp_l0name,
                        supp_l0designation,
                        supp_l0mobile,
                        supp_l0email,
                        supp_l3name,
                        supp_l3designation,
                        supp_l3mobile,
                        supp_l3email,
                        supp_l2name,
                        supp_l2designation,
                        supp_l2mobile,
                        supp_l2email,
                        supp_l1name,
                        supp_l1designation,
                        supp_l1mobile,
                        supp_l1email,
                        supp_upi_id],
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
                    [data.Supplier_ID],
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
                    [data.Supplier_ID, _OTP],
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
                            [supp_email],
                            newOTPTemplate.getSubject(supp_name),
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