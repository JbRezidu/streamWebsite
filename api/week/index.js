'use strict';
const express = require('express');
const router = express.Router();
const weekController = require('api/week/week.controller');

router.get('/weeks', weekController.getWeeks);
router.get('/weekByDate/:date', weekController.getWeekByDate);
router.post('/week', weekController.createWeek);
module.exports = router;
