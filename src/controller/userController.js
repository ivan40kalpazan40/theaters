const router = require('express').Router();
const userServices = require('../services/userServices');

const renderLogin = (req, res) => {
  res.render('user/login');
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
router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/register', registerUser);

module.exports = router;
