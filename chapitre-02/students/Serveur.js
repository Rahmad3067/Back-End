const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const students = [
	{ name: "Laura" },
	{ name: "Yangchen" },
	{ name: "Emran" },
	{ name: "Julien" },
	{ name: "Elodie" },
	{ name: "Anthony" },
	{ name: "Artha" },
	{ name: "Asad" },
	{ name: "Kévin" },
];

app.get('/students', (req, res) => {
    res.send(students)
});

app.post('/students', (req, res) => {
    console.log(req.body)
    const userInfo = req.body;
    console.log(userInfo);

    students.push(userInfo)
    res.json(students);
})







app.listen(PORT, () => {
	console.log(`Server started, listening on port ${PORT}`);
});