const multer = require("multer");
const { generate } = require("randomstring");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, generate(6) + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
