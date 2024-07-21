const { Router } = require("express");
const User = require("../models/user.model");

const getUser = Router();

getUser.get("/:id", (req, res) => {
  (async () => {
    try {
      const user = await User.findOne({ _id: req.params.id }).populate(
        "patients"
      );
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  })();
});

module.exports = getUser;
