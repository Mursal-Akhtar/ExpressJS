const express = require("express");
const { adduserdata, getuser } = require("../Controller/User.controller");

const router = express.Router();

router.post("/signup", adduserdata);
router.post("/signin", getuser);

module.exports = router;
