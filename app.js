const mongoose = require("mongoose");
const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const routes = require("./src/Route/index");
const app = express();
const bcrypt = require("bcrypt");
env.config();
const port = 5000;
const dbString = process.env.DB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(dbString).then(() => console.log("connected to DB"));
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
