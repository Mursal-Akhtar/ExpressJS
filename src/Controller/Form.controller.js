const { request } = require("express");
const PatientModel = require("../Model/Form.model");

exports.addformdata = (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      bday,
      language,
      hft,
      hinch,
      weight,
      smoking,
      surgeries,
      medication,
      occupation,
      hobbies,
      email,
      telno,
    } = req.body;

    const newForm = new PatientModel({
      firstName,
      lastName,
      gender,
      bday,
      language,
      hft,
      hinch,
      weight,
      smoking,
      surgeries,
      medication,
      occupation,
      hobbies,
      email,
      telno,
    });

    const form = newForm.save();
    if (!form) {
      return res.status(400).json({ msg: "unsuccessfull Insertion" });
    } else {
      return res.status(201).json({ msg: "Successfull Insertion" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.getformdata = async (req, res) => {
  try {
    const allforms = await PatientModel.find({});
    if (allforms) {
      return res.status(200).json({ msg: "forms fetched", forms: allforms });
    }
    return res.status(404).json({ msg: "forms not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.getspecificformdata = async (req, res) => {
  try {
    const forms = await PatientModel.findOne({ _id: req.params.id });
    if (forms) {
      return res.status(200).json({ msg: "ID found & fetched", forms: forms });
    }
    return res
      .status(404)
      .json({ msg: "ID not found in Records", forms: forms });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
exports.updateformdata = async (req, res) => {
  try {
    const update = await PatientModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.status(200).json({ msg: "forms fetched", forms: update });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
