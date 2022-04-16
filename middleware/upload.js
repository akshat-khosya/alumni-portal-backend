const path = require("path");
const multer = require("multer");
const { access, mkdirSync } = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${+Date.now()}`);
  },
});
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf" ) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('Only .pdf, .png, .jpg and .jpeg format allowed!'));
    }
  },
  dest: "./uploads/",
}).single("upload");

exports.upload=upload;
