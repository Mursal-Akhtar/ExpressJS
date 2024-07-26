const express = require("express");
const {
  adduserdata,
  getuser,
  //   setTkn,
} = require("../Controller/User.controller");

const router = express.Router();

router.post("/signup", adduserdata);
router.post("/signin", getuser);
// router.post("/tkn", setTkn);

module.exports = router;
