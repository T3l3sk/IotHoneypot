const express = require('express');
const router = express.Router();
const quitController = require('../controllers/quitController.js');

router.get('/', quitController.quitFunction);

module.exports=router