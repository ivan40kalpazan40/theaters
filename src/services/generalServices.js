const util = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SALT_ROUNDS, SECRET } = require('../config/constants');

exports.repeatPassValidator = (password, repeatPassword) => {
  return (
    password === repeatPassword &&
    password !== null &&
    password !== '' &&
    repeatPassword !== null &&
    repeatPassword !== ''
  );
};

exports.hashPassword = (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

exports.compareHashed = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

exports.jwtSign = util.promisify(jwt.sign);
exports.jwtVerify = util.promisify(jwt.verify);

exports.errorHandler = function (error, req, res, render) {
  console.log(error.message);
  res.locals.error = error.message;
  res.render(render, { user: req.user, error: res.locals.error });
};
