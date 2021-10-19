const router = require('express').Router();
const playServices = require('../services/playServices');
const userServices = require('../services/userServices');
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
    const youLiked = await play.youLiked(req.user._id);
    res.render('play/details', {
      user: req.user,
      isAuthor,
      youLiked,
      play: play._doc,
    });
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

const editPlay = async (req, res) => {
  const playId = req.params.id;
  const { title, description, imageUrl, isPublic } = req.body;
  try {
    await playServices.editOne(playId, {
      title,
      description,
      imageUrl,
      isPublic: Boolean(isPublic),
    });
    res.redirect('/user');
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const likePlay = async (req, res) => {
  const playId = req.params.id;
  try {
    const play = await playServices.getOne(playId);
    const user = await userServices.getUser(req.user.username);
    await play.like(user);
    await user.addLikedPlay(playId);
    res.redirect(`/play/${playId}/details`);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

router.get('/create', isLogged, renderCreate);
router.get('/:id/details', isLogged, renderDetails);
router.get('/:id/delete', isLogged, deletePlay);
router.get('/:id/edit', isLogged, renderEdit);
router.get('/:id/like', isLogged, likePlay);
router.post('/create', isLogged, createPlay);
router.post('/:id/edit', isLogged, editPlay);

module.exports = router;
