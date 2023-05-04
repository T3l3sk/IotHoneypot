const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyJWT');
const userController = require('../controllers/userController.js');
const { route } = require('./dashboard');

router.get('/', userController.getUse);

module.exports = router; 
