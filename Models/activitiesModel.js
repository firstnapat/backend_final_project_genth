const mongoose = require("mongoose");

const activitiesSchema = new mongoose.Schema({
  activity_id: {
    type: String,
    required: true,
  },
  username: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
  },
  activity_type: {
    required: true,
    type: String,
    enum: ["Running", "Swimming", "Weigth training"],
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  comment: String,
}, {
  timestamps: true,
});

const activitiesModel = new mongoose.model("Activities", activitiesSchema);

module.exports = activitiesModel;