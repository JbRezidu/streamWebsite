'use strict';
const express = require('express');
const router = express.Router();
const slotController = require('api/day/day.controller');
const authenticationController = require('api/authentication/authentication.controller');

router.get('/days', slotController.getDays);
router.post('/day', authenticationController.checkAuthentication, slotController.createDay);
module.exports = router;