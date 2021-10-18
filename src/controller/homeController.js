const router = require('express').Router();

const renderHome = (req, res) => {
  res.render(req.user ? 'index-logged' : 'index');
};

router.get('/', renderHome);

module.exports = router;
