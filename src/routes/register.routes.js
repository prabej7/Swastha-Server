const { Router } = require("express");
const checkUser = require("../middlewares/checkUser.middleware");
const User = require("../models/user.model");
const { hashSync } = require("bcrypt");

const register = Router();

register.post("/", checkUser("register"), (req, res) => {
  const { username, email, password } = req.body;
  (async () => {
    try {
      const newUser = new User({
        username: username,
        email: email,
        password: hashSync(password, 12),
        role: "user",
      });

      const savedUser = await newUser.save();
      res.status(201).json({
        id: savedUser._id,
      });
    } catch (error) {
      res.status(404).json({ error: { error } });
    }
  })();
});

module.exports = register;
