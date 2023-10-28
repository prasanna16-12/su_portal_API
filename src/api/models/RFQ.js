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

  getlistViewRFQ: (data, buyer_ID, page, limit) => {
    return new Promise((resolve, reject) => {
      let offset = limit * (page - 1);

      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "call usp_get_RFQ_header_ID_List_view_buyer(?, ?, ?, ?, ?, ?, ?, ?, ?);",
          [
            data.vendor_reg_code,
            buyer_ID,
            data.status,
            data.from_date,
            data.material_ID,
            data.rfq_from,
            data.rfq_to,
            offset,
            limit,
          ],
          (error, results) => {
            if (error) return reject(error);

            conn.destroy();
            console.log(results);
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
            //data["vendors"] = results[2];
            //console.log(RFQList);
            resolve(data);
          }
        );
      });
    });
  },

  getRFQDetailsByIDForSupplier: (rfq_header_ID, supplier_ID) => {
    return new Promise((resolve, reject) => {
      let data = {};

      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "call usp_get_RFQ_details_List_view_supplier(?, ?);",
          [rfq_header_ID, supplier_ID],
          (error, results) => {
            if (error) return reject(error);

            conn.destroy();

            //console.log(results);
            data = results[0][0];
            data["line_items"] = results[1] === undefined ? null : results[1];
            //data["vendors"] = results[2]=== undefined ? null : results[2];
            data["Quotations"] = results[3]=== undefined ? null : results[3];
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

  updateRFQ: (data, RFQ_ID) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL update_RFQ_header(?,?)",
          [RFQ_ID, data.quote_deadline],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            conn.destroy();
            //console.log(result);
            return resolve(result);
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

  quoteRFQ: (data, user_ID) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) reject(error);
        conn.query(
          "CALL usp_quote_RFQ(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            data.vendor_reg_code,
            data.rfq_header_ID,
            data.rfq_line_item_ID,
            data.unit_price,
            data.line_total,
            data.freight_charge,
            data.service_charge,
            data.other_charge,
            data.is_tax_included,
            data.grand_line_total,
            data.tax_amount,
            data.payment_terms,
            data.inco_terms,
            data.manufacturer_part_no,
            data.HSN_code,
            data.price_validity_date,
            data.min_order_quantity,
            data.SGST,
            data.CGST,
            data.IGST,
            user_ID,
          ],
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

  updateRfqQuote: (data, quoteID, user_ID) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) reject(error);
        conn.query(
          "CALL usp_update_RFQ_quote(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            quoteID,
            data.vendor_reg_code,
            data.rfq_header_ID,
            data.rfq_line_item_ID,
            data.unit_price,
            data.line_total,
            data.freight_charge,
            data.service_charge,
            data.other_charge,
            data.is_tax_included,
            data.grand_line_total,
            data.tax_amount,
            data.payment_terms,
            data.inco_terms,
            data.manufacturer_part_no,
            data.HSN_code,
            data.price_validity_date,
            data.min_order_quantity,
            data.SGST,
            data.CGST,
            data.IGST,
            user_ID,
          ],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            conn.destroy();
            console.log(result);
            return resolve(result[0][0]);
          }
        );
      });
    });
  },

  compareRFQQuote: (RFQ_ID) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) reject(error);
        conn.query("CALL usp_get_quote(?)", [RFQ_ID], (error, result) => {
          if (error) {
            return reject(error);
          }
          conn.destroy();
          //console.log(result);
          return resolve(result);
        });
      });
    });
  },

  changeQuoteStatus: (data, status) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) reject(error);
        conn.query(
          "CALL usp_change_RFQ_vendor_status(?,?,?)",
          [data.vendor_reg_code, data.rfq_header_ID, status],
          (error, result) => {
            if (error) {
              return reject(error);
            }
            conn.destroy();
            //console.log(result);
            return resolve(result[0]);
          }
        );
      });
    });
  },

  getRFQDetailsByIDForBuyer: (rfq_header_ID) => {
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
};
