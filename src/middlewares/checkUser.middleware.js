const User = require("../models/user.model");
const checkUser = (route) => {
  return async (req, res, next) => {
    const isUser = await User.findOne({
      $or: [
        { username: req.body.username },
        { username: req.body.emai },
        { email: req.body.username },
        { email: req.body.email },
      ],
    });

    if (isUser) {
      if (route == "register") {
        return res
          .status(404)
          .json({ error: "User with same credentials already exists." });
      } else {
        return next();
      }
    } else {
      if (route == "register") {
        next();
      } else {
        return res.status(404).json({ error: "User does't exists exists." });
      }
    }
  };
};

module.exports = checkUser;
