const express = require('express');
const path = require('path');
// const api = require('./public/assets/js/index.js');
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

// Page/view Routes, HTML endpoints
// homepage input '/'
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//END page/view routes
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

    //syncs newNote with db.json file
  dataBase.push(newNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(dataBase))
  res.json(dataBase)
})

app.delete('/api/notes/:id', async (req, res) => {
  //Grabs the id from requested parameter in dataBase
  const db = dataBase;
  const noteId = req.params.id;
  console.log("55", noteId);
  for (let i = 0; i < db.length; i++) {
    const id = parseInt(noteId);
    console.log("58", db[i].id);
    if (db[i].id === id) {
      console.log("60", db[i].id);
      db.splice(i, 1);
      fs.writeFileSync(path.join(__dirname,'./db/db.json'), JSON.stringify(db));
      res.json(db);
    }
  // Find the index of the item with the given ID
  // const noteIndex = dataBase.findIndex(dataBase => { 
  //   const id = parseInt(noteId)
  //   console.log("dataBase.id", typeof (dataBase.id));
  //   console.log("noteId", typeof (id));
  //   dataBase.id === id});
  // // BUG: noteId is calling back fine, this is consoling -1 for invalid index
  // // If the item is found, remove it from the array
  // if (noteIndex !== -1) {
  //   dataBase.splice(noteIndex, 1);
  //   fs.writeFileSync(path.join(__dirname,'./db/db.json'), JSON.stringify(dataBase))
  //   res.json(dataBase)
  // } else {
  //   console.log('Error 404: Note not found');
    //BUG: This error is calling, index is the issue
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
