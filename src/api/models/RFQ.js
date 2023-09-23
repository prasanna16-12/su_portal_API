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
              [vendor, RFQHeaderID],
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

  getlistViewRFQ: (data, buyer_ID) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "call usp_get_RFQ_header_ID_List_view(?, ?, ?, ?, ?, ?, ?);",
          [
            data.vendor_reg_code,
            buyer_ID,
            data.status,
            data.from_date,
            data.material_ID,
            data.rfq_from,
            data.rfq_to,
          ],
          (error, results) => {
            if (error) return reject(error);

            conn.destroy();
            //console.log(results);
            return resolve(results);
          }
        );
      });
    });
  },

  getlistViewSupplierRFQ: (data, SupplierID) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "call usp_get_RFQ_header_ID_List_view_supplier( ?, ?, ?, ?, ?, ?);",
          [
            SupplierID,
            data.status,
            data.from_date,
            data.material_ID,
            data.rfq_from,
            data.rfq_to,
          ],
          (error, results) => {
            if (error) return reject(error);

            conn.destroy();
            //console.log(results);
            return resolve(results);
          }
        );
      });
    });
  },

  getlistViewRFQDetails: (RFQList) => {
    return new Promise((resolve, reject) => {
      async.forEachOf(
        RFQList,
        function (RFQ, i, inner_callback) {
          pool.getConnection((error, conn) => {
            if (error) return reject(error);
            conn.query(
              "call usp_get_RFQ_details_List_view(?);",
              [RFQ.rfq_header_ID],
              (error, results) => {
                if (error) return reject(error);

                conn.destroy();

                RFQList[i]["line_items"] = results[1];
                RFQList[i]["vendors"] = results[2];
                //console.log(RFQList);
                inner_callback(null);
              }
            );
          });
        },
        function (err) {
          if (err) {
            return reject(err);
          } else {
            return resolve(RFQList);
          }
        }
      );
    });
  },

  getRFQDetailsByID: (rfq_header_ID) => {
    return new Promise((resolve, reject) => {
      let data = {};

      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "call usp_get_RFQ_details_List_view(?);",
          [rfq_header_ID],
          (error, results) => {
            if (error) return reject(error);

            conn.destroy();

            //console.log(results[0]);
            data = results[0][0];
            data["line_items"] = results[1];
            data["vendors"] = results[2];
            //console.log(RFQList);
            resolve(data);
          }
        );
      });
    });
  },

  modifyDraftRFQ: (data, RFQ_ID) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL modify_draft_RFQ(?,?,?,?,?,?,?,?,?)",
          [
            RFQ_ID,
            data.indent_ID,
            data.status,
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
            return resolve(result);
          }
        );
      });
    });
  },

  updateRFQ: (data, createdBy, RFQ_ID) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL update_RFQ_header(?,?,?)",
          [RFQ_ID, data.quote_deadline, createdBy],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            conn.destroy();
            //console.log(result);
            return resolve(result[0][0]);
          }
        );
      });
    });
  },

  updateRFQLineItems: (data, updatedRFQ) => {
    return new Promise((resolve, reject) => {
      updatedRFQ["UpdatedLineItems"] = [];
      async.forEachOf(
        data,
        function (_data, i, inner_callback) {
          pool.getConnection((error, conn) => {
            if (error) return reject(error);
            conn.query(
              "call update_RFQ_LineItem(?, ?, ?);",
              [_data.rfq_line_item_ID, _data.delivery_date, _data.is_delete],
              (error, results) => {
                if (error) return reject(error);

                conn.destroy();
                console.log(results[0][0]);
                updatedRFQ["UpdatedLineItems"].push(results[0][0]);
                inner_callback(null);
              }
            );
          });
        },
        function (err) {
          if (err) {
            return reject(err);
          } else {
            return resolve(updatedRFQ);
          }
        }
      );
    });
  },

  changeStatusRFQ: (RFQ_ID, action) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) reject(error);
        conn.query(
          "CALL update_RFQ_status(?,?)",
          [RFQ_ID, action],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            conn.destroy();
            //console.log(result);
            return resolve(result[0][0]);
          }
        );
      });
    });
  },
};
