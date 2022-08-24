const express = require("express");

const userRoutes = express.Router();

const userController = require("../Controllers/userController");

const profileController = require("../Controllers/profileController");

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:user_id", userController.getUserById);
userRoutes.post("/", userController.createUser);
userRoutes.post("/profile", profileController.addUserProfile);

module.exports = userRoutes;