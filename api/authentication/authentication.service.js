'use strict';

const User = require('api/user/user.model');
const randToken = require('rand-token');

const checkAuthentication = async ({ token, user }) => {
  const connectedUser = await User.findOne()
    .select('-password -__v')
    .where('pseudo')
    .equals(user)
    .where('token')
    .equals(token)
    .exec();
  if (!connectedUser) {
    return {
      error: {
        httpCode: 403,
        message: 'Mauvaise authentification',
      },
    };
  }
  return connectedUser.toObject();
};

const login = async (password) => {
  let connectedUser = await User.findOne()
    .where('password')
    .equals(password)
    .select('-password')
    .exec();

  if (!connectedUser) {
    return {
      errror: {
        httpCode: 404,
        message: 'Aucun utilisateur avec ce mot de passe',
      },
    };
  }
  // generate token
  const token = randToken.generate(64);
  // save token in the database
  connectedUser.token = token;
  connectedUser = await connectedUser.save();
  return {
    connectedUser: {
      pseudo: connectedUser.pseudo,
      color: connectedUser.color,
      roles: connectedUser.roles,
    },
    token: connectedUser.token,
  };
};

const logout = async (user) => {
  const connectedUser = await User.findOne()
    .select('pseudo')
    .where('pseudo')
    .equals(user)
    .exec();

  if (!connectedUser) {
    return {
      error: {
        httpCode: 404,
        message: 'Utilisateur non trouvé',
      },
    };
  }
  connectedUser.token = undefined;
  await connectedUser.save();
};

module.exports = {
  checkAuthentication,
  login,
  logout,
};
