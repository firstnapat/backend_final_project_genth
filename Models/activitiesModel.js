const mongoose = require("mongoose");

const activitiesSchema = new mongoose.Schema({
  img: {
    name: {
      type: String,
      required: true,
    },
    data: Buffer,
    contentType: String
  },
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
    enum: ["Running", "Cycling", "Swimming", "Weight training", "Walking"],
  },
  title: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  description: String,
}, {
  timestamps: true,
});

const activitiesModel = new mongoose.model("Activities", activitiesSchema);

module.exports = activitiesModel;