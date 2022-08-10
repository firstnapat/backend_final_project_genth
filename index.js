const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Read .env file
require("dotenv").config();

app.use(async (req, res, next) => {
  try {
    // process.env : read environment variables
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Connected to MongoDB')
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// /activities
const activityRoutes = require("./Routes/activitiesRoute");
app.use("/activities", activityRoutes);

// /users
const userRoutes = require("./Routes/userRoute");
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});