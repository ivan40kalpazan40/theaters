const Play = require('../models/Play');

const create = async (play) => await Play.create(play);

const playServices = { create };
module.exports = playServices;
