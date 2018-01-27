'use strict';
const express = require('express');
const router = express.Router();
const streamerController = require('api/streamer/streamer.controller');

router.get('/streamers', streamerController.getStreamers);
router.post('/streamer', streamerController.createStreamer);
module.exports = router;
