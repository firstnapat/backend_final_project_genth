const mongoose = require("mongoose");

const activitiesSchema = new mongoose.Schema({
  activity_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
  },
  activity_type: {
    required: true,
    type: String,
    enum: ["Running", "Swimming", "Weigth training"],
  },
  title: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: String,
}, {
  timestamps: true,
});

const activitiesModel = new mongoose.model("Activities", activitiesSchema);

module.exports = activitiesModel;