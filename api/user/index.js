'use strict';
const express = require('express');
const router = express.Router();
const userController = require('api/user/user.controller');
const authenticationController = require('api/authentication/authentication.controller');
const ROLES = require('shared/enums/roles.enum');

router.get(
  '/users',
  authenticationController.checkAuthentication,
  authenticationController.checkRoles([ROLES.ADMIN]),
  userController.getUsers
);

router.get(
  '/streamers',
  authenticationController.checkAuthentication,
  authenticationController.checkRoles([ROLES.ADMIN]),
  userController.getStreamers
);

router.post(
  '/user',
  authenticationController.checkAuthentication,
  authenticationController.checkRoles([ROLES.ADMIN]),
  userController.createUser
);
module.exports = router;
