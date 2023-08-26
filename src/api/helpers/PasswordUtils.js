const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
  hashPassword: (password) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },

  randomPassword: () => {
    return Math.random().toString(36).slice(2);
  },

  comparePassword: (userEnteredPassWord, hasedPassWord) => {
    //console.log(userEnteredPassWord, ActualPassWord);
    return compareSync(userEnteredPassWord, hasedPassWord);
  },
};
