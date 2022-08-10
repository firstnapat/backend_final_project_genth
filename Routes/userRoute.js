const express = require("express");

const userRoutes = express.Router();

const userController = require("../Controllers/userController");

userRoutes.get("/:user_id", userController.getUserById);
userRoutes.post("/", userController.createUser);

module.exports = userRoutes;