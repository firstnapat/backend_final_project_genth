const Activities = require("../Models/activitiesModel");

const { v4: uuidv4 } = require("uuid");

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

const getAllActivities = async (req, res, next) => {
  const activities = await Activities.find();
  res.send(activities);
};

const getActivityById = async (req, res, next) => {
  res.send(req.activity);
};

const User = require("../Models/userModel");

const createActivity = async (req, res, next) => {
  const user = await User.findOne({
    "username": req.body.username,
  });
  try {
    const newActivity = new Activities({
      img: {
        data: req.files,
        contentType: 'image/png',
      },
      activity_id: uuidv4(),
      username: user.username,
      user_id: user.user_id,
      ...req.body,
    });
    await newActivity.save();
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
}

const editActivityById = async (req, res, next) => {
  const { activity_type, title, date, duration, description } = req.body;

  if (activity_type) req.activity.activity_type = activity_type;
  if (title) req.activity.title = title;
  if (date) req.activity.date = date;
  if (duration) req.activity.duration = duration;
  if (description) req.activity.description = description;

  await req.activity.save();

  res.send(req.activity);
};

const removeActivityById = async (req, res, next) => {
  await req.activity.remove();

  res.status(204).send();
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  editActivityById,
  removeActivityById,
};