const User = require("../Models/userModel");

const addUserProfile = async (req, res, next) => {
    const foundedUser = await User.findOne({ username: req.body.username }).exec();

    const profile = {
        profile: {
            about: req.body.about,
            gender: req.body.gender,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            bmi: req.body.bmi,
        }
    }

    await foundedUser.updateOne(profile);
    res.status(200).send();
}

module.exports = {
    addUserProfile
};