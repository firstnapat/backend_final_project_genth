const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    required: true,
    type: String,
    select: false,
  }
}, {
  timestamps: true,
});

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;