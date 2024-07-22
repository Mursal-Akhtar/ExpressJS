const mongoose = require("mongoose");
const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const formRoutes = require("./src/Route/Form.route");
const userRoutes = require("./src/Route/User.route");
const app = express();
const bcrypt = require("bcrypt");
env.config();
const port = 5000;
const dbString = process.env.DB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(dbString).then(() => console.log("connected to DB"));
app.use(cors());
app.use(express.json());

app.use("/api", formRoutes);
app.use("/user", userRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const router = express.Router();
module.exports = router;
