'use strict';
const express = require('express');
const router = express.Router();
const authenticationController = require('api/authentication/authentication.controller');

router.post('/login', authenticationController.login);
router.post('/logout', authenticationController.logout);
module.exports = router;