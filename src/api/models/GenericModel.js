const pool = require("./DataBase");

module.exports = {
  VendorMetaData: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query("CALL usp_get_vendor_metadata;", (error, result) => {
          if (error) return reject(error);

          conn.destroy();
          //console.log(result);
          return resolve(result[0]);
        });
      });
    });
  },

  VendorMetaDataByID: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_get_vendor_metadata_by_id(?);",
          [id],
          (error, result) => {
            if (error) return reject(error);

            conn.destroy();
            //console.log(result[0],result[1]);
            let obj = result[0][0] ? result[0][0] : {};

            obj["Supplier"] = result[1];
            //console.log(obj);
            return resolve(obj);
          }
        );
      });
    });
  },

  BuyerMetaDataByID: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_get_buyer_metadata_by_id(?);",
          [id],
          (error, result) => {
            if (error) return reject(error);

            conn.destroy();
            //console.log(result);
            let obj = result[0][0] ? result[0][0] : {};
            obj["Vendor"] = result[1];
            //console.log(obj);
            return resolve(obj);
          }
        );
      });
    });
  },

  BuyerVendorDataByID: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_get_buyer_vendor_data_by_buyer_id(?);",
          [id],
          (error, result) => {
            if (error) return reject(error);

            conn.destroy();
            //console.log(result);
            let obj = result[0][0] ? result[0][0] : {};
            obj["Vendor"] = result[1];
            //console.log(obj);
            return resolve(obj);
          }
        );
      });
    });
  },

  ManagerMetaDataByID: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_get_manager_metadata_by_id(?);",
          [id],
          (error, result) => {
            if (error) return reject(error);

            conn.destroy();
            //console.log(result);
            let obj = result[0][0] ? result[0][0] : {};
            obj["Buyer"] = result[1];
            //console.log(obj);
            return resolve(obj);
          }
        );
      });
    });
  },

  ManagerBuyerVendorInfoByManagerID: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_get_manager_metadata_by_id(?);",
          [id],
          (error, result) => {
            if (error) return reject(error);

            conn.destroy();
            //console.log(result);
            let obj = result[0][0] ? result[0][0] : {};
            obj["Buyer"] = result[1];
            //console.log(obj);
            return resolve(obj);
          }
        );
      });
    });
  },

  SupplierMetaDataByID: (id) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query(
          "CALL usp_get_supplier_metadata_by_id(?);",
          [id],
          (error, result) => {
            if (error) return reject(error);

            conn.destroy();
            //console.log(result);
            let obj = result[0][0] ? result[0][0] : {};
            obj["Vendor"] = result[1];
            obj["Buyer"] = result[2];
            //console.log(obj);
            return resolve(obj);
          }
        );
      });
    });
  },

  materialMetadata: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query("CALL usp_get_material_metadata;", (error, result) => {
          if (error) return reject(error);

          conn.destroy();
          //console.log(result);
          return resolve(result[0]);
        });
      });
    });
  },


  RFQMetadata: () => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, conn) => {
        if (error) return reject(error);
        conn.query("CALL usp_get_RFQ_metadata;", (error, result) => {
          if (error) return reject(error);

          conn.destroy();
          //console.log(result);
          return resolve(result[0]);
        });
      });
    });
  },


};
