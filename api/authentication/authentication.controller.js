'use strict';

const authenticationService = require('./authentication.service');
const _intersection = require('lodash/intersection');

const checkAuthentication = async (req, res, next) => {
  const result = await authenticationService.checkAuthentication({
    token: req.headers.token,
    user: req.headers.user,
  });
  if ((result || {}).error) {
    return res.status(result.error.httpCode).json(result.error.message);
  }
  req.params.user = result;
  next();
};

const checkRoles = (roles) => {
  return async (req, res, next) => {
    const connectedUser = req.params.user;
    if (_intersection(connectedUser.roles, roles).length === 0) {
      // the role is not present for the current user
      return res.status(403).json('Vous n\'avez pas le bon role pour réaliser cette opération !');
    }
    next();
  };
};

const login = async (req, res, next) => {
  const connectedUser = await authenticationService.login(req.body.password);
  if (connectedUser.error) {
    return res.status(connectedUser.error.httpCode).json(connectedUser.error.message);
  }
  return res.status(200).json(connectedUser);
};

const logout = async (req, res, next) => {
  const result = await authenticationService.logout(req.headers.user);
  if ((result || {}).error) {
    return res.status(result.error.httpCode).json(result.error.message);
  }
  return res.send(204);
};

module.exports = {
  login,
  logout,
  checkAuthentication,
  checkRoles,
};
