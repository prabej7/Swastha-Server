require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "123";

const setUser = (payload) => {
  if (!secretKey) return "Please provide secret key!";
  if (!payload) return "Please provide the data!";
  return jwt.sign(payload, secretKey);
};

const getData = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  setUser,
  getData,
};
