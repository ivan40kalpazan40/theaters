const router = require('express').Router();
const userServices = require('../services/userServices');
const playServices = require('../services/playServices');
const { jwtSign } = require('../services/generalServices');

const { SECRET, COOKIE_NAME } = require('../config/constants');
const { isLogged, isGuest } = require('../middleware/authMiddleware');
const renderHome = async (req, res) => {
  try {
    const plays = await playServices.getAll();
    let allPlays = plays.map((x) => x._doc);
    res.render('user/index', { user: req.user, plays: allPlays });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const renderLogin = (req, res) => {
  res.render('user/login', { user: req.user });
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
  res.render('user/register', { user: req.user });
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
router.get('/', isLogged, renderHome);
router.get('/login', isGuest, renderLogin);
router.get('/register', isGuest, renderRegister);
router.get('/logout', isLogged, logoutUser);
router.post('/login', isGuest, loginUser);
router.post('/register', isGuest, registerUser);

module.exports = router;
