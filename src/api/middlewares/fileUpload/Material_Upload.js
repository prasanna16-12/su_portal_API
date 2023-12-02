const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Define middleware for file upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    // check if directory exist or not
    const dir = path.join(process.cwd(), "/UploadedFiles/Material");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    //const reg_code = req.params.id;
    if (file.fieldname === "catalogue") {
      cb(null, Date.now() + "_" + "catalogue." + file.mimetype.split("/")[1]);
    } else if (file.fieldname === "product_image") {
      cb(
        null,
        Date.now() +
          "_" +
          //req.user_info.user_ID +
          "product_image." +
          file.mimetype.split("/")[1]
      );
    }
  },
});

const multerFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  if (file.fieldname === "catalogue") {
    let fileTypes = [".pdf"];
    let fileExt = path.extname(file.originalname);
    //console.log(fileExt, fileTypes);

    if (fileTypes.includes(fileExt)) {
      cb(null, true);
    }
    cb(null, false);
  }
  if (file.fieldname === "product_image") {
    let fileTypes = [".jpg"];
    let fileExt = path.extname(file.originalname);
    //console.log(fileExt, fileTypes);

    if (fileTypes.includes(fileExt)) {
      cb(null, true);
    }
    cb(null, false);
  }
  //cb(new Error('I don\'t have a clue!'), false);
  //throw new Error('I don\'t have a clue!')
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

module.exports = upload;
