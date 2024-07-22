const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: [true, "email required."],
  },
  password: String,
  rememberme: String,
});

module.exports = mongoose.model("user", UserSchema, "User-info");
