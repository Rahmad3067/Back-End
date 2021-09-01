const { name } = require('ci-info');
const { names } = require('debug');
const express = require('express');
const { all } = require('proxy-addr');
const app = express();

const PORT = 4000;

app.use(express.json());

const superHeros = [
    {
        name: "Iron Man",
        power: ["money"],
        color: "red",
        isAlive: true,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "Thor",
        power: ["electricty", "worthy"],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "Daredevil",
        power: ["blind"],
        color: "red",
        isAlive: false,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]


app.use(function(req, res, next) {
    console.log("middleware is done");
    next(); 
  });


app.post('/superHeros', function (req, res) {
    const heroInfo = req.body;
    console.log(heroInfo);
    superHeros.push(heroInfo)
    res.json(superHeros);
  });

  app.get('/heros', (req, res) => {
      const newHeros = superHeros.map(hero => {
        return hero.name
      })
    res.json(newHeros);
});

app.get('/heros/:name', (req, res) => {
    let param = req.params.name;
    var singleHero = superHeros.filter(function(hero) {
        return param === hero.name
    })
        res.json(singleHero)
})
// app.listen(PORT, function() {
// 	console.log(`Server started, listening on port ${PORT}`);
// });
app.listen(PORT, () => {
	console.log(`Server started, listening on port ${PORT}`);
});

app.get('/heroes/:name/powers', (req, res) => {
    let param = req.params.name;
    let hero = superHeros.filter(param.powers)
    res.json(hero)
})