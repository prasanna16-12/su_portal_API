const express = require("express");
const BuyerRouter = express.Router();
const BuyerController = require("../controllers/BuyerController");
const SupplierController = require("../controllers/SupplierController");

/* validation */
const validateContactPersonBasicData = require("../middlewares/validation/ContactPersonBasicDataValidation");

const StatusChangeValidation = require("../middlewares/validation/StatusChangeValidation");
const SupplierInternalDataValidation = require("../middlewares/validation/SupplierInternalDataValidation");
const MaterialMasterDetailsValidation = require("../middlewares/validation/MaterialMasterDetailsValidation");
const supplierUpdatedDetailsValidation = require("../middlewares/validation/UpdateDetailsValidation");
const materialUpdateDetailsValidation = require("../middlewares/validation/materialUpdateDetailsValidation");
const createRFQvalidation = require("../middlewares/validation/RfqMasterDetailsValidation");
const listViewRFQvalidation = require("../middlewares/validation/RfqListViewValidation");
const updateRFQValidation = require("../middlewares/validation/RfqUpDateDetailsValidation");
// permission
const sendRegLink = require("../middlewares/permission/sendRegLink");

// file upload
const NDA_Upload = require("../middlewares/fileUpload/NDA_Upload");
const Material_Master_bulk_Upload = require("../middlewares/fileUpload/Material_Master_Bulk_Upload");

BuyerRouter
  /* get supplier update details (pending for approval) using buyer ID */
  .get("/Update/:id", BuyerController.getUpdateDetails)

  /* add approved update fields using update ID*/
  .post("/Update/approve/:id", BuyerController.approveUpdateDetails)

  /* add reject update fields update ID*/
  .post("/Update/reject/:id", BuyerController.rejectUpdateDetails)

  /* Add contact person with basic details */
  .post(
    "/ContactPerson",
    validateContactPersonBasicData,
    sendRegLink,
    BuyerController.addContactPerson
  )

  /* approve status to AP1 */
  .put("/Approve/AP1", StatusChangeValidation, BuyerController.changeStatus)

  /* approve status to ID1 */
  .put(
    "/Approve/ID1",
    SupplierInternalDataValidation,
    BuyerController.changeStatusID1
  )

  /* get company details */
  // .get('/SupplierCompany/:id', BuyerController.CompanyDetails)   -> moved to generic

  /* upload NDA */
  .post(
    "/NDA_document/:id",
    NDA_Upload.single("uploadedFile"),
    BuyerController.fileUpload_NDA
  )

  /* download NDA */
  .get("/NDA_document/:id", BuyerController.fileDownload_NDA)

  /* updated and insert details into -> tbl_supplier_details_update (Buyers internal data)  */
  .put(
    "/Update",
    supplierUpdatedDetailsValidation,
    SupplierController.addUpdateDetails
  )

  /* add material master data */
  .post(
    "/material",
    MaterialMasterDetailsValidation,
    BuyerController.addMaterialMasterData
  )

  .get("/material", BuyerController.getAllMaterialMasterDetails)

  /* update material master data */
  .put(
    "/material/:id",
    materialUpdateDetailsValidation,
    BuyerController.updateMaterialMaster
  )

  /* get material details by ID*/
  .get("/material/:id", BuyerController.materialDataByID)

  /* upload material validation before upload*/
  // .post(
  //   "/material/bulk/validate",
  //   Material_Master_bulk_Upload.single("uploadedFile"),
  //   BuyerController.validate_FileUpload_Bulk_Material_Master
  // )

  /* upload material */
   .post(
     "/material/bulk/upload",
     Material_Master_bulk_Upload.single("uploadedFile"),
     BuyerController.fileUpload_Bulk_Material_Master
   )

  /* create RFQ 
     buyer can create RFQ in DRAFT as well as in PUBLISH staus
  */
  .post("/rfq", createRFQvalidation, BuyerController.createRFQ)

  .post("/rfq/draft/:id", createRFQvalidation, BuyerController.modifyDraftRFQ)

  .post("/rfq/update/:id", updateRFQValidation, BuyerController.updateRFQ)
  /* List view RFQ */
  .post("/rfq/listView", listViewRFQvalidation, BuyerController.listViewRFQ)

  .post("/rfq/:id/close", BuyerController.close)
  .post("/rfq/:id/unhold", BuyerController.unhold)
  .post("/rfq/:id/hold", BuyerController.hold);

module.exports = BuyerRouter;
