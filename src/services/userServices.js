const User = require('../models/User');
const { repeatPassValidator } = require('./generalServices');

const register = async (username, password, repeatPassword) => {
  const user = await User.findOne({ username });
  if (Boolean(user)) {
    throw new Error('Username is not available!');
  }
  if (!repeatPassValidator(password, repeatPassword)) {
    throw new Error('Please enter valid password!');
  }
  // hash pass here
  return await User.create({ username, password });
};

const userServices = { register };
module.exports = userServices;
