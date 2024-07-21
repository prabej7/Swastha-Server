const { genSaltSync, hashSync, compareSync } = require("bcrypt");

const hashPassword = (password) => {
  const hash = hashSync(password, 12);
  return hash;
};

const comparePassword = (password, hash) => {
  const result = compareSync(password, hash);
  return result;
};

console.log(hashPassword("123"));

console.log(
  compareSync(
    "123",
    "$2b$12$mX7MbcFxP.88x1U7kwtfn.JAuxPBg.kk8ixwl9Sl5S0QsRQURVLPu"
  )
);
