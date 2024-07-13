const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  bday: String,
  language: String,
  hft: Number,
  hinch: Number,
  weight: Number,
  smoking: String,
  surgeries: String,
  medication: String,
  occupation: String,
  hobbies: String,
  email: {
    type: String,
    unique: true,
    required: [true, "email required."],
  },
  telno: Number,
});

module.exports = mongoose.model("form", FormSchema, "intakeForm");
