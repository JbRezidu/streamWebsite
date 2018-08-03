'use strict';
const express = require('express');
const router = express.Router();
const userController = require('api/user/user.controller');

router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
module.exports = router;
