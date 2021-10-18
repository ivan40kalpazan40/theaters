const router = require('express').Router();
const homeController = require('./controller/homeController');

router.use(homeController);
router.use('*', (req, res) => {
  res.send('<h1>status 404</h1><p>The requested page does not exist.</p>');
});

module.exports = router;
