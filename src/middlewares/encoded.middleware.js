require("dotenv").config();
const bcryptjs = require('bcryptjs');

const createHash = async (passwordToConvert) => {
  const newHash = await bcryptjs.hash(passwordToConvert, 8);
  return newHash;
};

const compareHash = async (password, hashToConvert) => {
    const compare = await bcryptjs.compare(password, hashToConvert);
    return compare;
  }

module.exports = { createHash, compareHash };