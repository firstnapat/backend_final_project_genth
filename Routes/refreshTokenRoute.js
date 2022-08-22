const express = require('express');
const refreshTokenRoutes = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

refreshTokenRoutes.get('/', refreshTokenController.handleRefreshToken);

module.exports = refreshTokenRoutes;