'use strict';
const express = require('express');
const router = express.Router();
const gameController = require('api/game/game.controller');
const authenticationController = require('api/authentication/authentication.controller');

router.get('/games', gameController.getGames);
module.exports = router;