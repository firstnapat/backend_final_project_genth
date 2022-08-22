const express = require('express');
const logoutRoutes = express.Router();
const logoutController = require('../Controllers/logoutController');

logoutRoutes.get('/', logoutController.handleLogout);

module.exports = logoutRoutes;