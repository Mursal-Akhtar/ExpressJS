const mongoose = require("mongoose");
const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const formRoutes = require("./src/Route/Form.route");
const app = express();
env.config();
const port = 5000;
const dbString = process.env.DB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(dbString).then(() => console.log("connected to DB"));
app.use(cors());
app.use(express.json());

app.use("/api", formRoutes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const router = express.Router();
module.exports = router;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// const PatientModel = require("./src/Model/Form.model");

// const db = query;
// mongoose.connect(db);

// app.get("/save", function (req, res) {
//   const newForm = new PatientModel({
// firstName: "Mursal",
// lastName: "Akhtar",
// gender: "Male",
// bday: "2024-07-03",
// language: "English",
// hft: 4,
// hinch: 5,
// weight: 200,
// smoking: "1",
// surgeries: "No",
// medication: "N",
// occupation: "ASE",
// hobbies: "Cricket",
// email: "mursal@gmail.com",
// telno: 2123123,
//   });
//   const form = newForm.save();
//   if (!form) {
//     console.log("not inserted");
//   } else {
//     console.log("inserted");
//   }
// });
