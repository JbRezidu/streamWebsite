'use strict';
const express = require('express');
const router = express.Router();
const slotController = require('api/day/day.controller');

router.get('/days', slotController.getDays);
router.post('/day', slotController.createDay);
module.exports = router;