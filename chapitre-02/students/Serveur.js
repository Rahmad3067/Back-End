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
    res.json({
		status: 'OK',
		data: students,
	});
});




app.post('/students', (req, res) => {
    const studentInfo = req.body;
    students.push(studentInfo)
    res.json({
		status: 'ok',
		message: 'New student added',
		data: students,
	});
})







app.listen(PORT, () => {
	console.log(`Server started, listening on port ${PORT}`);
});