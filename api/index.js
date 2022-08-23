const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("../configs/config");

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Read .env file
require("dotenv").config();

if (config.isVercel) {
  app.use(async (req, res, next) => {
    try {
      // process.env : read environment variables
      await mongoose.connect(config.mongoUri, config.mongoOptions);
      console.log("Connected to MongoDB");
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  });
}

// Body parser to parse json in request body for us
app.use(bodyParser.json());
// CORS
app.use(cors());

// /activities
const activityRoutes = require("../Routes/activitiesRoute");
app.use("/activities", activityRoutes);

// /users
const userRoutes = require("../Routes/userRoute");
app.use("/users", userRoutes);

// /auth
const authRoutes = require("../Routes/authRoute");
app.use("/auth", authRoutes);

// /refresh
const refreshTokenRoutes = require("../Routes/refreshTokenRoute");
app.use("/refresh", refreshTokenRoutes);

// /logout
const logoutRoutes = require("../Routes/logoutRoute");
app.use("/logout", logoutRoutes);

module.exports = app;
