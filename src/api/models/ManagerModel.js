const pool = require("./DataBase");

module.exports = {
  changeStatus: (data, action) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "call usp_change_status_AP1_AP2_AP3(?, ?, ?);",
          [data.body.vendor_reg_code, action, data.user_info.user_ID],
          (error, results) => {
            if (error) return reject(error);

            conn.destroy();
            return resolve(results[0]);
          }
        );
      });
    });
  },

  updateVendorData: (data) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "call usp_vendor_details_direct_update_by_manager(?, ?, ?, ?, ?, ?);",
          [
            data.body.modifiedByID,
            data.body.vendorID,
            data.body.field_name,
            data.body.field_value,
            data.body.field_old_value,
            data.body.tab_name,
          ],
          (error, results) => {
            if (error) return reject(error);

            conn.destroy();
            return resolve(results[0]);
          }
        );
      });
    });
  },
};
