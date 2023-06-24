const pool = require('./DataBase')
const passwordUtils = require('../helpers/PasswordUtils')
const notify = require('../helpers/NotifyUtils')

module.exports = {


    createNewUser: (req) => {
        const password = passwordUtils.randomPassword()

        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'CALL usp_create_user(?,?,?,?,?,?,?,?);',
                    [req.first_name, req.email.toLowerCase(), req.mobile, req.role, passwordUtils.hashPassword(password), req.last_name, req.vendor_reg_code, req.manager_ID],
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()
                        if (results[0][0].ID != -1) {
                            notify.sendOTP(req.mobile, `Password is ${password}, Username is ${req.email}`)
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
                    'call usp_get_all_users();',
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

    updateUser: (data) => {

        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) return reject(error)
                conn.query(
                    'call usp_update_user(?,?,?,?,?,?,?,?,?,?);',
                    [data.first_name, data.email, data.mobile, data.user_ID, data.role, data.last_name, data.vendor_reg_code, data.manager_ID, data.is_active, data.is_deleted,],
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
                    'call usp_get_manager_vendor_metadata();',
                    (error, results) => {

                        if (error) return reject(error)

                        conn.destroy()

                        return resolve(seperateManagerVendor(results[0]))
                    }
                )
            })

        })

        function seperateManagerVendor(data){
            let newObjArr = {
                VENDOR : [],
                MANAGER : []
            } 

            data.forEach(element => {
                if (element.type === "Vendor"){
                    newObjArr.VENDOR.push({ code: element.supp_vendor_reg_code, name: element.supp_company_name })
                }
                else{
                    newObjArr.MANAGER.push({ code: element.supp_vendor_reg_code, name: element.supp_company_name })
                }
            });
            //console.log(newObjArr);
            return newObjArr;
        }
    },

    


}
