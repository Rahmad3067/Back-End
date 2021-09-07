const express = require('express');
const debug = require('./middlewares/debug')
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


const superHerosSchema = new mongoose.Schema({
    name: String,
    power: Array,
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String,
})

const SuperHeros = mongoose.model("superHeros", superHerosSchema);
app.post("/heroes", async (req, res) => {
    console.log("SuperHeros")
    console.log(req.body)
    await SuperHeros.create(req.body);
    res.json({
        message:"Heroes Created and Added...",
    })
})

app.use(debug);

app.get("/heroes", async (req, res) => {
    const superHeros = await SuperHeros.find();
    res.json({
        message: "Heroes List",
        data: superHeros,
    })
})

app.get("/heroes/:name", async (req, res) => {
    const superHeros = await SuperHeros.find();
    let param = req.params.name;
    const newHeroes = superHeros.filter((hero) =>
        hero.name.toLocaleLowerCase().replace(' ','') === param.toLocaleLowerCase());
    res.json({
        message: "Hero by the name...",
        data: newHeroes,
    })
});

app.get("/heroes/:name/power", async (req, res) => {
    const superHeros = await SuperHeros.find();
    let param = req.params.name;
    const hero = superHeros.find((obj) => obj.name.toLocaleLowerCase().replace(' ', "")=== param.toLocaleLowerCase());

    res.json({
                status: 'Ok',
                data: hero.power
            })
})

app.listen(process.env.PORT, () => {
	console.log("Server started, listening on port");
});
