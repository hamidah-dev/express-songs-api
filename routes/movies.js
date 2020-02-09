const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json())

let movies = [];

// Movies API
//return list of all movies
app.get('/', (req, res) => {
    res.status(200).json(movies);
  });
  
  //create a new movie, and return new movie
  app.post('/', (req, res) => {
    let newmovie = {
      id: movies.length + 1,
      name: req.body.name,
      artist: req.body.artist 
    }
    movies.push(newmovie);
    res.status(201).json(newmovie);
  });
  
  //return a movie with id 
  app.get('/:movieId', (req, res) => {
    let movie = movies.find(movie => movie.id == parseInt(req.params.movieId));
    res.status(200).json(movie);
  });
  
  //edit a movie with id, and return edited movie
  app.put('/:movieId', (req, res) => {
    console.log(req.params.id)
    let movie = movies.find(movie => movie.id === parseInt(req.params.movieId));
    movie.name = req.body.name;
    movie.artist = req.body.artist;
    res.status(200).json(movie);
  });
  
  //delete a movie with id, and return deleted movie
  app.delete("/:movieId", (req, res) => {
    let movieToDelete = movies.find(movie => movie.id === parseInt(req.params.movieId));
    let index = movies.indexOf(movieToDelete);
    movies.splice(index, 1);
    res.status(200).json(movieToDelete);
  });

module.exports = router
  
module.exports = app
  