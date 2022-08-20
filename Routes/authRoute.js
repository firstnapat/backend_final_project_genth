const express = require('express');
const authRoutes = express.Router();
const authController = require('../Controllers/authController');

authRoutes.post('/', authController.handleLogin);

module.exports = authRoutes;