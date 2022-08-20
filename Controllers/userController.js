const User = require("../Models/userModel");
const bcrypt = require('bcrypt');

const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res, next) => {
  const { user, password } = req.body;
  if (!user || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict 

  try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const getAllUsers = async (req, res, next) => {
  const user = await User.find();

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
};

const getUserById = async (req, res, next) => {
  const { user_id } = req.params;

  const user = await User.findOne({ user_id });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.send(user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};