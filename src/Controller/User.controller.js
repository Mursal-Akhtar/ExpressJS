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
    if (user.password === password) {
      const filter = { email: email };
      const update = { rememberme: rememberme };

      //   const doc = await UserModel.findOneAndUpdate(filter, update, {
      //     new: true,
      //   });
      user.rememberme = rememberme;
      user.save();
      //   if (doc) {
      return res.status(200).json({ msg: "ID found & fetched", user: user });
      //   }
    }
    return res
      .status(404)
      .json({ msg: "Email or password not found in Records", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
// exports.getformdata = async (req, res) => {
//   try {
//     const allforms = await UserModel.find({});
//     if (allforms) {
//       return res.status(200).json({ msg: "forms fetched", forms: allforms });
//     }
//     return res.status(404).json({ msg: "forms not found" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Server Error" });
//   }
// };

// exports.updateformdata = async (req, res) => {
//   try {
//     const update = await UserModel.findByIdAndUpdate(req.params.id, req.body);
//     return res.status(200).json({ msg: "forms fetched", forms: update });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Server Error" });
//   }
// };
