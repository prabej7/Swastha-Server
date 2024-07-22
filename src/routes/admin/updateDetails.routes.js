const { Router } = require("express");
const User = require("../../models/user.model");
const upload = require("../../config/multer");
const deleteFile = require("../../utils/deleteFile.utils");
const updateDetails = Router();

updateDetails.post("/", upload.single("file"), (req, res) => {
  (async () => {
    try {
      const { username, email, fullName, id, address } = req.body;

      let updateFields = {};
      if (username !== undefined) updateFields.username = username;
      if (email !== undefined) updateFields.email = email;
      if (fullName !== undefined) updateFields.fullName = fullName;
      if (address !== undefined) updateFields.address = address;

      if (Object.keys(updateFields).length > 0) {
        await User.updateOne({ _id: id }, { $set: updateFields });
      }

      if (req.file) {
        const user = await User.findOne({ _id: id });
        const oldImg = user.dp;
        deleteFile(oldImg);
        await User.updateOne({ _id: id }, { $set: { dp: req.file.filename } });
      }
      res.status(200).send({ msg: "User updated successfully" });
    } catch (error) {
      console.error(error);
    }
  })();
});

module.exports = updateDetails;
