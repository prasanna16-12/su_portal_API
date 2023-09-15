const pool = require("./DataBase");
const async = require("async");
module.exports = {
  createRFQHeader: (data, createdBy) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_create_RFQ_header( ?,?,?,?,?,?,?,?,?)",
          [
            data.indent_ID,
            data.status,
            createdBy,
            data.indent_name,
            data.payment_terms,
            data.inco_terms,
            data.quote_deadline,
            data.site,
            data.terms_and_condition,
          ],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            conn.destroy();
            return resolve(result[0]);
          }
        );
      });
    });
  },

  addRFQLineItems: (data, RFQHeaderID) => {
    return new Promise((resolve, reject) => {
      async.forEachOf(
        data,
        function (_data, i, inner_callback) {
          pool.getConnection((error, conn) => {
            if (error) return reject(error);
            conn.query(
              "call usp_add_lineItem(?, ?, ?, ?, ?, ?, ?,?);",
              [
                _data.material_ID,
                _data.quantity,
                _data.delivery_date,
                _data.material_specification,
                _data.is_service,
                _data.service_description,
                RFQHeaderID,
                _data.is_GST,
              ],
              (error, results) => {
                if (error) return reject(error);

                conn.destroy();
                console.log(results[0]);
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

  addRFQVendors: (vendors, RFQHeaderID) => {
    return new Promise((resolve, reject) => {
      async.forEachOf(
        vendors,
        function (vendor, i, inner_callback) {
          pool.getConnection((error, conn) => {
            if (error) return reject(error);
            conn.query(
              "call usp_add_vendors(?, ?);",
              [
                vendor,
                RFQHeaderID
              ],
              (error, results) => {
                if (error) return reject(error);

                conn.destroy();
                console.log(results[0]);
                inner_callback(null);
              }
            );
          });
        },
        function (err) {
          if (err) {
            return reject(err);
          } else {
            return resolve(vendors);
          }
        }
      );
    });
  },
};
