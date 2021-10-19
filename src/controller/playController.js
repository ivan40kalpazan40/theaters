const router = require('express').Router();
const playServices = require('../services/playServices');
const { isLogged } = require('../middleware/authMiddleware');

const renderCreate = (req, res) => {
  res.render('play/create', { user: req.user });
};

const createPlay = async (req, res) => {
  const { title, description, imageUrl, isPublic } = req.body;
  try {
    const play = await playServices.create({
      title,
      description,
      imageUrl,
      isPublic: Boolean(isPublic),
    });
    res.redirect('/user');
  } catch (error) {
    console.log(error.message);
    res.redirect('/user');
  }
};

router.get('/create', isLogged, renderCreate);
router.post('/create', isLogged, createPlay);

module.exports = router;
