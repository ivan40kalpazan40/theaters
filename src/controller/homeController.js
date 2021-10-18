const router = require('express').Router();
const { isGuest } = require('../middleware/authMiddleware');

const renderHome = (req, res) => {
  res.render('index', { user: req.user });
};

router.get('/', isGuest, renderHome);

module.exports = router;
