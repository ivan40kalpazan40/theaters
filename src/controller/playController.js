const router = require('express').Router();

const renderCreate = (req, res) => {
  res.render('play/create', { user: req.user });
};

router.get('/create', renderCreate);

module.exports = router;
