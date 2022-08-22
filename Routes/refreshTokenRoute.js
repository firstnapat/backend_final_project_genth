const express = require('express');
const refreshTokenRoutes = express.Router();
const refreshTokenController = require('../Controllers/refreshTokenController');

refreshTokenRoutes.get('/', refreshTokenController.handleRefreshToken);

module.exports = refreshTokenRoutes;