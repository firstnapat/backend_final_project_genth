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

const corsOptions ={
  origin: 'http://127.0.0.1:5173', 
  credentials:true,            
  //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.listen(config.port , () => {
  console.log("Express server listening on port " + config.port);
});