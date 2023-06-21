const pool = require('./DataBase')
const async = require('async')

module.exports = {

    getUpdateDetailsStaggingTable: (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_get_update_details_from_stagging(?);',
                    [id],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    },

    approveUpdateDetailsMasterTable: (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_update_aprroved_details_master(?);',
                    [id],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    },

    addContactPerson: (data) => {
        return new Promise((resolve, reject) => {
            let { name, email, phone } = data
            let OTP = Math.floor(Math.random() * 900000) + 100000
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_create_supplier(?,?,?,?)',
                    [name, email, phone, OTP],
                    (error, results) => {

                        if (error) return reject(error)
                        // otp verification
                        //verification.sendOTP(OTP, results[0][0].supp_name, results[0][0].supp_mobile, results[0][0].OTP_validity_TS)

                        // email
                        //verification.sendMAIL(results[0][0].supp_name, results[0][0].supp_email, results[0][0].supp_ID)
                        conn.destroy()
                        return resolve(results[0][0].supp_ID)
                    }
                )
            })

        })
    },
    

    addSupplierCompDetails: (data) => {
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
                supp_l1email } = data

            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_add_supplier_comp_details(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
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
                        supp_l1email],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results)
                    }
                )
            })

        })
    },

    allPendingApproval: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_get_all_pending_approval_supp_com_details();',
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })
        })
    },

    CompanyDetails: (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_get_supplier_com_details(?);',
                    [id],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })
        })
    },

    allPendingApprovalWithPrevStatus: (data) => {

        return new Promise((resolve, reject) => {
            async.forEachOf(data, function (_data, i, inner_callback) {
                pool.getConnection((error, conn) => {
                    if (error) return reject(error)
                    conn.query(
                        'call usp_get_previous_status(?, ?);',
                        [_data.supp_vendor_reg_code, _data.current_status],
                        (error, results) => {

                            if (error) return reject(error)

                            conn.destroy()

                            data[i].previous_status = results[0]
                            inner_callback(null)

                        }
                    )
                })

            }, function (err) {
                if (err) {
                    return reject(err)
                } else {

                    return resolve(data)
                }
            })
        })
    },

    changeStatus: (data, action) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call usp_change_status_AP1_AP2_AP3(?, ?);',
                    [data.supp_reg_code, action],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    },

    changeStatusID1: (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL `usp_change_status_ID1`(?, ?, ?, ?, ?);',
                    [data.supp_reg_code, data.Purchaser, data.Previous_Vendor_Code, data.Diverse_Supplier, data.Search_Term],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    },


    addNDAfile: (suppRegCode, filePath, fileObj) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call usp_file_Upload(?, ?, ?, ?);',
                    [suppRegCode, 'NDA', filePath, fileObj.mimetype],
                    (error, results) => {

                        if (error) return reject(error)
                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    },

    getNDAfile: (suppRegCode) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call usp_get_file(?,?);',
                    [suppRegCode, 'NDA'],
                    (error, results) => {

                        if (error) return reject(error)
                        conn.destroy()
                        return resolve(results[0])
                    }
                )
            })

        })
    },

    
}