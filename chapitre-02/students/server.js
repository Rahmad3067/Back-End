const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env"
});
const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to MongoDB !");
});

app.use(express.json());

const studentsSchema = new mongoose.Schema({
  name: String,
})

const Students = mongoose.model("students", studentsSchema);
app.post("/students", async (req, res) => {
	await Students.create(req.body);
	res.json({
		message: "Students List",
	})
})

app.get("/students", async (req, res) => {
  const allStudnets =  await Students.find();
  res.json({
    message: "Student's List",
    data: allStudnets,
  })
})

app.listen(process.env.PORT, () => {
    console.log("Listening on Port");
});