const router = require('express').Router();
const homeController = require('./controller/homeController');
const userController = require('./controller/userController');
router.use(homeController);
router.use('/user', userController);
router.use('*', (req, res) => {
  res.send('<h1>status 404</h1><p>The requested page does not exist.</p>');
});

module.exports = router;
