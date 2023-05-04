const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyJWT');
const dashboardController = require('../controllers/dashboardController.js');
const loginController = require('../controllers/loginController');

router.get('/', dashboardController.getDashboard);
router.get('/', loginController.getDashboard);

module.exports = router;
