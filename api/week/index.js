'use strict';
const express = require('express');
const router = express.Router();
const weekController = require('api/week/week.controller');
const authenticationController = require('api/authentication/authentication.controller');
const ROLES = require('shared/enums/roles.enum');

router.get('/weeks', weekController.getWeeks);
router.get('/weekByDate/:date', weekController.getWeekByDate);
router.post(
  '/week',
  authenticationController.checkAuthentication,
  authenticationController.checkRoles([ROLES.ADMIN, ROLES.STREAMER]),
  weekController.createWeek
);
router.post('/instanciateCurrentWeek', weekController.instanciateCurrentWeek);
module.exports = router;
