const { COOKIE_NAME, SECRET } = require('../config/constants');
const { jwtVerify } = require('../services/generalServices');

exports.auth = function (req, res, next) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    return next();
  }
  jwtVerify(token, SECRET).then((resolveToken) => {
    req.user = resolveToken;
    next();
  });
};

exports.isLogged = function (req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect('/user/login');
};

exports.isGuest = function (req, res, next) {
  if (!req.user) {
    return next();
  }
  res.redirect('/user');
};
