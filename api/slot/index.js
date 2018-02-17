'use strict';
const express = require('express');
const router = express.Router();
const slotController = require('api/slot/slot.controller');
const authenticationController = require('api/authentication/authentication.controller');

router.get('/slots', slotController.getSlots);
router.post('/slot', slotController.createSlot);
router.post('/slot/add', authenticationController.checkAuthentication, slotController.createSlotAndAddToDay);
module.exports = router;