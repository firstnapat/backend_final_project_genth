const express = require('express');
const logoutRoutes = express.Router();
const logoutController = require('../controllers/logoutController');

logoutRoutes.get('/', logoutController.handleLogout);

module.exports = logoutRoutes;