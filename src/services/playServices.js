const Play = require('../models/Play');

const create = async (play) => await Play.create(play);
const getAll = async () => {
  const plays = await Play.find({}).lean();
  return plays;
};

const playServices = { create, getAll };
module.exports = playServices;
