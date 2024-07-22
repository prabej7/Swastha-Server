const { Router } = require("express");
const User = require("../models/user.model");

const getAllUser = Router();

getAllUser.get("/", (req, res) => {
  (async () => {
    try {
      const allUser = await User.find();
      return res.status(200).json(allUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  })();
});

module.exports = getAllUser;
