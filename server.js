const express = require('express');
const path = require('path');
// const api = require('./public/assets/js/index');
let dataBase = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const fs = require('fs')
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use('/api', api);

// http://localhost:3001/notes

// VIEW ROUTES ----- GET Route for homepage
// forward slash / means no extra endpoint
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//------- END view routes
// Start controller/api routes
app.get('/api/notes', (req, res) => {
  res.json(dataBase);
});

app.post('/api/notes', (req, res) => {
  // Model for making a new note with unique id 
  newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random() * 9999)
  }

  dataBase.push(newNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(dataBase))
  res.json(dataBase)
})

app.delete('/api/notes/:id', (req, res) => {
  let index = dataBase.findIndex(item => item.id === req.query.id);
  dataBase.splice(index, 1);
  fs.writeFileSync('./db/db.json', JSON.stringify(dataBase))
  res.json(dataBase)
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
