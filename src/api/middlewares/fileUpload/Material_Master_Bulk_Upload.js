const multer = require("multer");
const path = require("path");
// Define middleware for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(process.cwd(), "/UploadedFiles/"));
    cb(null, path.join(process.cwd(), "/UploadedFiles/"));
  },
  filename: function (req, file, cb) {
    //console.log(req.user_info)
    const buyer_code = req.user_info.user_ID;
    cb(
      null,
      buyer_code +
        "_Material_Master" +
        Date.now() +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const multerFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  let fileTypes = [".xlsx", ".numbers"];
  let fileExt = path.extname(file.originalname);
  //console.log(fileExt, fileTypes);

  if (fileTypes.includes(fileExt)) {
    cb(null, true);
  }
  cb(null, false);
  //cb(new Error('I don\'t have a clue!'));
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});

module.exports = upload;
