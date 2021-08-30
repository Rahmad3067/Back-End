const express = require('express');
const app = express();


var authors = [
    {
        name: "Lawrence Nowell",
        nationality: "UK",
        books: ["Beowulf"]
    },
    {
        name: "William Shakespeare",
        nationality: "UK",
        books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
    },
    {
        name: "Charles Dickens",
        nationality: "US",
        books: ["Oliver Twist", "A Christmas Carol"]
    },
    {
        name: "Oscar Wilde",
        nationality: "UK",
        books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
    },
]
// Ex1
const port = 8000;
app.listen(port, () => {
    console.log("server is ready on port " + port);
});

app.get('/', (req, res) =>{
    res.send("Authors API");
});
// EX2
app.get('/authors/:id', (req, res) => {
    let num = req.params.id;
    let num2 = num - 1
    res.send(`${authors[num2].name}, ${authors[num2].nationality}`)
  });

//Ex3
app.get('/authors/:id/books', (req, res) => {
    let num = req.params.id;
    let num2 = num - 1
    res.send(`${authors[num2].books}`)
  });

// EX4
// first part
app.get('/json/authors/:id', (req, res) => {
    let num = req.params.id;
    let name = authors[num].name
    let nationality = authors[num].nationality
    res.json({
      name: name,
      nationality : nationality
    });
  });


// second part
app.get('/json/authors/:id/books', (req, res) => {
    let num = req.params.id;
    let books = authors[num].books
    res.json({
      books: books
    });
  });



  
  

