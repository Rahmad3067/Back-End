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

app.patch("/heroes/:name/powers", async(req, res) => {
    const name = req.params.name;
    const newPower = req.body.newPower
    // Here we call our array and then updateOne to only update the matching filter
    await SuperHeros.updateOne(
        //Then we add power by a condition that if name we enter is the name we looking for and then we update and add a new power
        {name : name },
        // Then we use this Method to add the new Power in the place of the power
        { $push: { power: newPower } }
     )
    res.json({
        status: "Ok",
        message: "Power added !",
        data: newPower
    })
})






app.listen(process.env.PORT, () => {
	console.log("Server started, listening on port");
});
