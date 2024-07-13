const {
  addformdata,
  getformdata,
  getspecificformdata,
  updateformdata,
} = require("../Controller/Form.controller");

const express = require("express");

const router = express.Router();

router.post("/save", addformdata);
router.get("/getall", getformdata);
router.get("/getone/:id", getspecificformdata);
router.put("/update/:id", updateformdata);

module.exports = router;
