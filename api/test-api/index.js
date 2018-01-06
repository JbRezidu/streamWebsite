'use strict';
const express = require('express');
const router = express.Router();
const testController = require('api/test-api/test-controller');

router.get('/test', testController.getTest);

module.exports = router;
