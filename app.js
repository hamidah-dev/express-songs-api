const express = require('express');
const app = express();
const PORT = 3000;


const songsRouter = require("./routes/songs");
const moviesRouter = require("./routes/movies");

app.use("/songs", songsRouter);
app.use("/movies", moviesRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app