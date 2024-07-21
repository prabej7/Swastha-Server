const { Router } = require("express");
const checkUser = require("../middlewares/checkUser.middleware");
const User = require("../models/user.model");
const { compareSync } = require("bcrypt");

const login = Router();

login.post("/", checkUser("login"), (req, res) => {
  (async () => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (compareSync(password, user.password)) {
        return res.status(200).json({ msg: "Successfully loged in!" });
      } else {
        return res
          .status(404)
          .json({ error: "Username or password is wrong!" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  })();
});

module.exports = login;
