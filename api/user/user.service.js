'use strict';
const User = require('api/user/user.model');
const ROLES = require('shared/enums/roles.enum');

const getUsers = async () => {
  return await User.find().exec();
};

const getStreamers = async () => {
  return await User.find({roles: ROLES.STREAMER}).exec();
};

const createUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

module.exports = {
  getUsers,
  getStreamers,
  createUser,
};
