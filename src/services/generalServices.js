const util = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS, SECRET } = require('../config/constants');

exports.repeatPassValidator = (password, repeatPassword) => {
  return password === repeatPassword;
};

exports.hashPassword = (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

exports.compareHashed = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

exports.jwtSign = util.promisify(jwt.sign);
