const { Router } = require("express");
const upload = require("../../config/multer");
const uploadToCloud = require("../../utils/upload.utils");

const updateProfilePic = Router();
updateProfilePic.post("/", upload.single("file"), async (req, res) => {
  console.log(await uploadToCloud(req.file));
});

module.exports = updateProfilePic;
