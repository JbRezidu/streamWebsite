'use strict';
const express = require('express');
const router = express.Router();
const slotController = require('api/slot/slot.controller');
const authenticationController = require('api/authentication/authentication.controller');
const ROLES = require('shared/enums/roles.enum');

router.get('/slots', slotController.getSlots);

router.post(
  '/slot',
  authenticationController.checkAuthentication,
  authenticationController.checkRoles([ROLES.ADMIN, ROLES.STREAMER]),
  slotController.createSlot
);
router.post(
  '/slot/add',
  authenticationController.checkAuthentication,
  authenticationController.checkRoles([ROLES.ADMIN, ROLES.STREAMER]),
  slotController.createSlotAndAddToDay
);

router.delete(
  '/slot',
  authenticationController.checkAuthentication,
  authenticationController.checkRoles([ROLES.ADMIN, ROLES.STREAMER]),
  slotController.deleteSlotAndRemoveFromDay
);

module.exports = router;
