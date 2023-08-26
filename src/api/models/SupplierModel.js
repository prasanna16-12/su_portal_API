const async = require("async");
const pool = require("./DataBase");
const verification = require("../helpers/NotifyUtils");

module.exports = {
  addUpdateDetailsStaggingTable: (data) => {
    const modifierID = data.modifierID;
    const approverID = data.approverID;
    const vendorID = data.vendorID;
    const updateArray = data.update_details;

    //console.log(supplierID, updateArray);

    return new Promise((resolve, reject) => {
      async.forEachOf(
        updateArray,
        function (_updateArray, i, inner_callback) {
          pool.getConnection((error, conn) => {
            if (error) return reject(error);
            conn.query(
              "call usp_insert_update_details_to_staging(?, ?, ?, ?, ?, ?, ?);",
              [
                modifierID,
                approverID,
                vendorID,
                _updateArray.tab_name,
                _updateArray.field_name,
                _updateArray.field_value,
                _updateArray.field_old_value,
              ],
              (error, results) => {
                if (error) return reject(error);

                conn.destroy();
                inner_callback(null);
              }
            );
          });
        },
        function (err) {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        }
      );
    });
  },
};
