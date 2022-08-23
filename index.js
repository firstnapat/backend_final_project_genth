const app = require("./api/index");
const mongoose = require('mongoose');
const cors = require("cors");
const config = require('./configs/config');

if (config.isVercel) {
  app.use(async (req, res, next) => {
    try {
      // process.env : read environment variables
      await mongoose.connect(config.mongoUri, config.mongoOptions);
      console.log('Connected to MongoDB')
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  });
}

app.use();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(config.port , () => {
  console.log("Express server listening on port " + config.port);
});