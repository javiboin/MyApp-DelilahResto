require("dotenv").config();
const bcryptjs = require('bcryptjs');

const createHash = async (passwordToConvert) => {
    const newHash = await bcryptjs.hash(passwordToConvert, 8);
    return newHash;
};

module.exports = { createHash };