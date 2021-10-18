const router = require('express').Router();

const renderHome = (req, res) => {
  res.render('index', { user: req.user });
};

router.get('/', renderHome);

module.exports = router;
