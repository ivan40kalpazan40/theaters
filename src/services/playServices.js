const Play = require('../models/Play');

const create = async (play) => await Play.create(play);
const getAll = async () => {
  const plays = await Play.find({});
  return plays;
};

const getOne = async (id) => await Play.findOne({ _id: id });

const playServices = { create, getAll, getOne };
module.exports = playServices;
