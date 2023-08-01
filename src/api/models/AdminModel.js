const pool = require('./DataBase')
const passwordUtils = require('../helpers/PasswordUtils')
const notify = require('../helpers/NotifyUtils')

const userEmailTemplate = require('../emailTemplate/User/Welcome')

module.exports = {


    createNewUser: (req) => {
        const password = passwordUtils.randomPassword()

        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_admin_add_user(?,?,?,?,?,?,?,?,?);',
                    [req.user_first_name, req.user_email.toLowerCase(), req.user_mobile, req.user_role, passwordUtils.hashPassword(password), req.user_last_name, req.vendor_reg_code, req.manager_ID, JSON.stringify(req.Permission_ID)],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        if (results[0][0].ID != -1) {
                            notify.sendMAIL('User Registration',[{ name: req.user_first_name, address: req.user_email.toLowerCase() }], userEmailTemplate.getSubject(), null, userEmailTemplate.getTEXTMailTemplate(req.user_first_name, password))
                        }

                        //console.log(results[0]);
                        return resolve(results[0])
                    }
                )
            })

        })
    },

    getAllUsers: () => {

        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call usp_admin_get_all_users();',
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()


                        // change supp_vendor_reg_code -> vendor_reg_code
                        let newObj = results[0]
                        newObj.map(renameTOvendor_reg_code)


                        return resolve(newObj)
                    }
                )
            })

        })

        // change supp_vendor_reg_code -> vendor_reg_code
        function renameTOvendor_reg_code(obj) {

            obj["vendor_reg_code"] = obj["supp_vendor_reg_code"]
            delete obj["supp_vendor_reg_code"]

        }

    },

    updateUser: (data) => {

        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call usp_admin_update_user(?,?,?,?,?,?,?,?,?,?,?);',
                    [data.user_first_name, data.user_email, data.user_mobile, data.user_ID, data.user_role, data.user_last_name, data.vendor_reg_code, data.manager_ID, data.is_active, data.is_deleted, JSON.stringify(data.Permission_ID)],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()

                        //console.log(results[0]);
                        return resolve(results[0])
                    }
                )
            })

        })
    },

    managerVendorInfo: () => {

        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call usp_get_user_vendor_metadata();',
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        //console.log(results[0])
                        return resolve(seperateManagerVendor(results[0]))
                    }
                )
            })

        })

        function seperateManagerVendor(data) {
            let newObjArr = {
                VENDOR: [],
                MANAGER: [],
                BUYER: [],
                SUPPLIER: []
            }
            data.forEach(element => {
                if (element.type === "Vendor") {
                    newObjArr.VENDOR.push({ code: element.vendor_reg_code, name: element.vendor_company_name })
                }
                else if (element.type === "Manager") {
                    newObjArr.MANAGER.push({ code: element.vendor_reg_code, name: element.vendor_company_name })
                }
                else if (element.type === "Buyer") {
                    newObjArr.BUYER.push({ code: element.vendor_reg_code, name: element.vendor_company_name })
                }
                else if (element.type === "Supplier") {
                    newObjArr.SUPPLIER.push({ code: element.vendor_reg_code, name: element.vendor_company_name })
                }
            });
            //console.log(newObjArr);
            return newObjArr;
        }
    },




}
