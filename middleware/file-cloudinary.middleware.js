const multer = require("multer");
// const path = require("path");

//!old Mendefinisikan gimana cara nyimpen file-nya
const storage = multer.diskStorage({});

//!old Membuat upload middleware
module.exports = multer({ storage: storage })