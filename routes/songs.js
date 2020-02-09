const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json())

let songs = [];

//Songs API

app.param('id', (req, res, next, id) => {
  let song = songs.find(song => song.id === parseInt(id));
  req.song = song;
  next();
});

//return list of all songs
app.get('/', (req, res) => {
  res.status(200).json(songs);
});

//create a new song, and return new song
app.post('/', (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist 
  }
  songs.push(newSong);
  res.status(201).json(newSong);
});

//return a song with id 
app.get('/:id', (req, res) => {
  res.status(200).json(req.song);
});

//edit a song with id, and return edited song
app.put('/:id', (req, res) => {
  req.song.name = req.body.name;
  req.song.artist = req.body.artist;
  res.status(200).json(req.song);
});

//delete a song with id, and return deleted song
app.delete("/:id", (req, res) => {
  let songToDelete = req.song
  let index = songs.indexOf(songToDelete);
  songs.splice(index, 1);
  res.status(200).json(songToDelete);
});

module.exports = router

module.exports = app