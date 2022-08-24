const Activities = require("../Models/activitiesModel");
const { cloudinary } = require('../configs/cloudinary.config');

const { v4: uuidv4 } = require("uuid");

const getAllActivities = async (req, res, next) => {
  const activities = await Activities.find();
  
  res.send(activities);
};

const getActivityById = async (req, res, next) => {
  const { activity_id } = req.params;
  
  const activity = await Activities.findOne({ activity_id });
  
  if (!activity) {
    return res.status(404).send({ message: "Activity not found" });
  }

  res.status(200).send(activity);
};

const getActivityByUsername = async (req, res, next) => {
  const activity = await Activities.find({
    username: req.params.username,
  });
  res.send(activity);
};

const User = require("../Models/userModel");
const { request } = require("express");

const createActivity = async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  const fileStr = req.body.img.data;
  const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "immifit",
  });
  console.log(uploadResponse);
  try {
    const newActivity = new Activities({
      img: {
        name: req.body.img.name,
        id: '',
        url: '',
        contentType: req.body.img.contentType,
      },
      activity_id: uuidv4(),
      username: user.username,
      user_id: user.user_id,
      ...req.body,
    });
    newActivity.img.id = uploadResponse.asset_id;
    newActivity.img.url = uploadResponse.secure_url;
    await newActivity.save();
    res.status(200).send(newActivity)
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const editActivityById = async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  const fileStr = req.body.img.data;
  const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "immifit",
  });
  console.log(uploadResponse);
  try {
    const newActivity = new Activities({
      img: {
        name: req.body.img.name,
        id: '',
        url: '',
        contentType: req.body.img.contentType,
      },
      activity_id: req.param.activity_id,
      username: user.username,
      user_id: user.user_id,
      ...req.body,
    });
    newActivity.img.id = uploadResponse.asset_id;
    newActivity.img.url = uploadResponse.secure_url;
    await newActivity.save();
    res.status(200).send(newActivity)
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const removeActivityById = async (req, res, next) => {
  const { activity_id } = req.params;
  
  const activity = await Activities.findOne({ activity_id });
  
  if (!activity) {
    return res.status(404).send({ message: "Activity not found" });
  }

  await req.activity.remove();

  res.status(204).send();
};

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByUsername,
  createActivity,
  editActivityById,
  removeActivityById,
};