const express = require("express");
const router = express.Router();
const formRoutes = require("./Form.route");
const userRoutes = require("./User.route");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/User.model");

const verifyToken = async (req, res, next) => {
  const jwtKey = process.env.JWT_KEY;
  if (!req.headers.jwt_token) {
    return res.status(404).json("Authentication error!!");
  }

  jwt.verify(req.headers.jwt_token, jwtKey, async (err, decoded) => {
    if (err) return res.status(404).json("Authentication error!!");
    const { email } = decoded.email;

    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) return res.status(404).json("User not found");
      req.user = user;
      next();
    } catch {
      const error = new Error("Something went wrong");
      return next(error);
    }
  });
};

router.use("/form", verifyToken, formRoutes);
router.use("/user", userRoutes);

module.exports = router;
