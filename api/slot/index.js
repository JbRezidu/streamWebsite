'use strict';
const express = require('express');
const router = express.Router();
const slotController = require('api/slot/slot.controller');

router.get('/slots', slotController.getSlots);
router.post('/slot', slotController.createSlot);
router.post('/slot/add', slotController.createSlotAndAddToDay);
module.exports = router;