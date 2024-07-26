const { request } = require("express");
const UserModel = require("../Model/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Typically a value between 10 and 12
const jwt = require("jsonwebtoken");

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
    let user;
    try {
      user = await UserModel.findOne({ email: email });
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      return res.status(401).json({ msg: "Email or Password not found" });
    }
    user.rememberme = rememberme;
    user.save();
    const usr = JSON.parse(JSON.stringify(user));
    usr.password = null;
    const jwtKey = process.env.JWT_KEY;
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        {
          email: user.email,
        },
        jwtKey,
        { expiresIn: "2h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    usr.token = token;
    return res.status(200).json({ msg: "Login successful", usr });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// exports.setTkn = async (req, res) => {
//   try {
//     let { firstName, lastName, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = new UserModel({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });
//     const user = newUser.save();
//     if (!user) {
//       return res.status(400).json({ msg: "unsuccessfull Insertion" });
//     } else {
//       return res.status(201).json({ msg: "Successfull Insertion" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Server Error" });
//   }
// };
