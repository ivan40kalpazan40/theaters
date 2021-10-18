const User = require('../models/User');
const {
  repeatPassValidator,
  hashPassword,
  compareHashed,
} = require('./generalServices');

const getUser = async (username) => await User.findOne({ username });

const login = async (username, password) => {
  const user = await getUser(username);
  if (!Boolean(user)) {
    throw new Error('Please enter valid username and password.');
  }
  const isValid = await compareHashed(password, user.password);
  if (!isValid) {
    throw new Error('Please enter valid username and password.');
  }
  return user;
};

const register = async (username, password, repeatPassword) => {
  const user = await getUser(username);
  if (Boolean(user)) {
    throw new Error('Username is already taken!');
  }
  if (!repeatPassValidator(password, repeatPassword)) {
    throw new Error('Please enter valid password!');
  }
  const hashed = await hashPassword(password);
  return await User.create({ username, password: hashed });
};

const userServices = { register, login };
module.exports = userServices;
