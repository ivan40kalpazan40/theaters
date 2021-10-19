const Play = require('../models/Play');

const create = async (play) => await Play.create(play);
const getAll = async () => await Play.find({});

const getOne = async (id) => await Play.findOne({ _id: id });
const deleteOne = async (id) => await Play.findOneAndRemove({ _id: id });
const editOne = async (id, update) =>
  await Play.findByIdAndUpdate(id, update, { runValidators: true });

const playServices = { create, getAll, getOne, deleteOne, editOne };
module.exports = playServices;
