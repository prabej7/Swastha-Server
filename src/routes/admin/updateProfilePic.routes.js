const { Router } = require("express");
const upload = require("../../config/multer");

const updateProfilePic = Router();
updateProfilePic.post("/", upload.single("file"), (req, res) => {
    
});

module.exports = updateProfilePic;
