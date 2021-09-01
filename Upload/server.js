const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const PORT = 4000;

const upload = multer({dest: 'public/uploads'});

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({
		status: 'OK',
        message: 'image is showing',
	});
});

const username = [];


app.post('/upload', upload.single('image'),  (req, res) => {
    const newUser = req.query
    username.push(newUser)
    console.log(username);
    console.log(req.file);



    fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname));
    res.send("ok");
  });
  

  









app.listen(PORT, () => {
	console.log(`Server started, listening on port ${PORT}`);
});

