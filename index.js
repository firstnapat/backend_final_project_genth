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

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.listen(config.port , () => {
  console.log("Express server listening on port " + config.port);
});