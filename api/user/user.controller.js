'use strict';
const userService = require('./user.service');

const getUsers = async (req, res, next) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
  
};

const getStreamers = async (req, res, next) => {
  const streamers = await userService.getStreamers();
  return res.status(200).json(streamers);
}

const createUser = async (req, res, next) => {
  const newUser = await userService.createUser(req.body);
  return res.status(200).json(newUser);
};

module.exports = {
  getUsers,
  createUser,
  getStreamers,
};
