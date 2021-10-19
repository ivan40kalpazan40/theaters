const router = require('express').Router();
const playServices = require('../services/playServices');
const { errorHandler } = require('../services/generalServices');
const { isGuest } = require('../middleware/authMiddleware');

const renderHome = async (req, res) => {
  try {
    const plays = await playServices.getAll();
    let allPlays = plays
      .map((x) => x._doc)
      .sort((a, b) => b.usersLiked.length - a.usersLiked.length)
      .slice(0, 3);
    res.render('index', { user: req.user, plays: allPlays });
  } catch (error) {
    errorHandler(error, req, res, './index');
  }
};

router.get('/', isGuest, renderHome);

module.exports = router;
