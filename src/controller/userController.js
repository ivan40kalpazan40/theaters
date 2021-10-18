const router = require('express').Router();
const userServices = require('../services/userServices');
const { jwtSign } = require('../services/generalServices');

const { SECRET, COOKIE_NAME } = require('../config/constants');

const renderHome = (req, res) => {
  res.render('user/index');
};

const renderLogin = (req, res) => {
  res.render('user/login');
};

const logoutUser = (req, res) => {
  res.clearCookie(COOKIE_NAME).redirect('/');
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userServices.login(username, password);
    const token = await jwtSign(
      { _id: user._id, username: user.username },
      SECRET,
      { expiresIn: '1d' }
    );
    res.cookie(COOKIE_NAME, token).redirect('/user');
  } catch (error) {
    console.log(error.message);
    res.redirect('/user/login');
  }
};
const renderRegister = (req, res) => {
  res.render('user/register');
};

const registerUser = async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    const user = await userServices.register(
      username,
      password,
      repeatPassword
    );
    res.redirect('/user/login');
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
router.get('/', renderHome);
router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.get('/logout', logoutUser);
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
