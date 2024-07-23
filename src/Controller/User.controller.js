const { request } = require("express");
const UserModel = require("../Model/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Typically a value between 10 and 12

exports.adduserdata = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const user = newUser.save();
    if (!user) {
      return res.status(400).json({ msg: "unsuccessfull Insertion" });
    } else {
      return res.status(201).json({ msg: "Successfull Insertion" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.getuser = async (req, res) => {
  try {
    const { email, password, rememberme } = req.body;
    const user = await UserModel.findOne({ email: email });
    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }
    user.password = null;
    user.rememberme = rememberme;
    user.save();
    return res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
