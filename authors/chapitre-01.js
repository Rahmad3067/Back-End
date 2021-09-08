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

const authorsSchema = new mongoose.Schema({
  name: String,
  nationality: String,
  books: Array,
})

const Authors = mongoose.model("authors", authorsSchema);
app.post("/", async (req, res) => {
  console.log("Author");
  console.log(req.body)
  await Authors.create(req.body);
  res.json({
    message: "Authors List"
  })
})


// Ex1
app.get("/", async(req, res) => {
  const newAuthors = await Authors.find();
  res.json({
    message: "Authors",
    data: newAuthors,
  })
})

//Ex2
app.get("/authors/:id", async(req, res) => {
  const author = await Authors.findById(req.params.id);
  res.json({
    message: "Authors By Nationality",
    data: (`${author.name}, ${author.nationality}`)
  })
})


//Ex3
app.get("/authors/:id/books", async(req, res) => {
  const author = await Authors.findById(req.params.id);
  res.json({
    message: "Author's Books",
    data: author.books
  })
})
// Ex part 4 is already answered with MongoDB with 

// EX4
// first part
// app.get('/json/authors/:id', (req, res) => {
//     let num = req.params.id;
//     let name = authors[num].name
//     let nationality = authors[num].nationality
//     res.json({
//       name: name,
//       nationality : nationality
//     });
//   });


// second part
// app.get('/json/authors/:id/books', (req, res) => {
//     let num = req.params.id;
//     let books = authors[num].books
//     res.json({
//       books: books
//     });
//   });






  app.listen(process.env.PORT, () => {
    console.log("Listening on Port");
});


  
  

