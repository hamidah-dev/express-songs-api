const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
/* 
+ implement an app.param() handler that grabs the :id from the path of an incomming request
+ extract the search logic and place it in this handler
+ save the song found into req.song 
+ refactor the 3 routes to use req.song instead
+ run all the tests to ensure that you have not broken anything  */

let songs = [];

app.param("id", (req, res, next, id) => {
  // do whatever you like with the userId, e.g. looking up the user profile in database
  const artist = "Kelly";
  const song = { id, artist };

  console.log(`req.song is originally: ${req.song}`);
  // and you can set new information in the request object
  req.song = song;
  console.log(`req.song is now: ${req.song}`);

  // now let the next handler to process the request
  next();
});

app.get("/songs/:id", (req, res) => {
  // now you have access to the req.user that was created in the previous handler
  const song = req.song;
  res.send(
    `Got the request for user ${song.artist} whose id is ${song.id}`
  );
});

//return list of all songs
app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

//create a new song, and return new song
app.post('/songs', (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist 
  }
  songs.push(newSong);
  res.status(201).json(newSong);
});

//return a song with id 
app.get('/songs/:id', (req, res) => {
  let song = songs.find(song => song.id == parseInt(req.params.id));
  res.status(200).json(song);
});

//edit a song with id, and return edited song
app.put('/songs/:id', (req, res) => {
  let song = songs.find(song => song.id === parseInt(req.params.id));
  song.name = req.body.name;
  song.artist = req.body.artist;
  res.status(200).json(song);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  let songToDelete = songs.find(song => song.id === parseInt(req.params.id));
  let index = songs.indexOf(songToDelete);
  songs.splice(index, 1);
  res.status(200).json(songToDelete);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app
