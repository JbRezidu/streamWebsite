'use strict';
const User = require('api/user/user.model');

const getUsers = (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(users);
  });
};

const createUser = (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save((err, _newUser) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(_newUser);
  });
};

module.exports = {
  getUsers,
  createUser,
};
