const { Router } = require("express");
const upload = require("../config/multer");
const checkUser = require("../middlewares/checkUser.middleware");
const User = require("../models/user.model");
const document = Router();

document.post("/", upload.single("file"), (req, res) => {
  (async () => {
    try {
      if (!req.file) {
        return res.status(404).json({ error: "No file was provided!" });
      }
      const user = await User.findOne({ _id: req.body.id });
      user.documents.push(req.file.filename);
      await user.save();
      res.status(200).json({ msg: "Document updated successfully!" });
    } catch (err) {
      return res.status(404).json(err);
    }
  })();
});

module.exports = document;
