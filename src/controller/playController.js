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
      author: req.user,
    });
    res.redirect('/user');
  } catch (error) {
    console.log(error.message);
    res.redirect('/user');
  }
};

const renderDetails = async (req, res) => {
  const playId = req.params.id;
  try {
    const play = await playServices.getOne(playId);
    const isAuthor = await play.isAuthor(req.user._id);
    res.render('play/details', { user: req.user, isAuthor, play: play._doc });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const deletePlay = async (req, res) => {
  const playId = req.params.id;
  try {
    await playServices.deleteOne(playId);
    res.redirect('/user');
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};
const renderEdit = async (req, res) => {
  const playId = req.params.id;
  try {
    const play = await playServices.getOne(playId);
    res.render('play/edit', { user: req.user, play: play._doc });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

router.get('/create', isLogged, renderCreate);
router.get('/:id/details', isLogged, renderDetails);
router.get('/:id/delete', isLogged, deletePlay);
router.get('/:id/edit', isLogged, renderEdit);
router.post('/create', isLogged, createPlay);

module.exports = router;
