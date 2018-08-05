'use strict';
const express = require('express');
const router = express.Router();
const slotController = require('api/day/day.controller');
const authenticationController = require('api/authentication/authentication.controller');
const ROLES = require('shared/enums/roles.enum');

router.get('/days', slotController.getDays);
router.post(
  '/day',
  authenticationController.checkAuthentication,
  authenticationController.checkRoles([ROLES.ADMIN, ROLES.STREAMER]),
  slotController.createDay
);
module.exports = router;
