// MOVIE CONSTRUCTOR
function Movie(movieName, author, released) {
  this.movieName = movieName;
  this.author = author;
  this.released = released;
}

// UI CONSTRUCTOR FOR PROTOTYPE
function UI() {}

// CREATE MOVIE PROTOTYE
UI.prototype.createMovieItem = function (movie) {
  const movieList = document.querySelector('#table-body');

  // CREATE TR
  const row = document.createElement('tr');

  // INSERT CONTENT
  row.innerHTML = `
  <td>${movie.movieName}</td>
  <td>${movie.author}</td>
  <td>${movie.released}</td>
  <td><a href="#" class = "delete">x</a></td>
  `;

  // APPEND
  movieList.appendChild(row);
}

// CLEAR INPUT FILD
UI.prototype.clearFild = function () {
  document.getElementById('movie-name').value = '';
  document.getElementById('author').value = '';
  document.getElementById('released').value = '';
}

// EVENT LESTENER
document.getElementById('form').addEventListener('submit', function (e) {
  // DECLARE VARIABLE AND ASSIGN VALUE
  const movieName = document.getElementById('movie-name').value;
  const author = document.getElementById('author').value;
  const released = document.getElementById('released').value;

  // CREATE A NEW OBJECT WITH CONSTRUCTOR
  const movie = new Movie(movieName, author, released);

  const ui = new UI();

  // CREATE MOVIE AND ADD
  ui.createMovieItem(movie);

  // CLEAR INPUT FILD
  ui.clearFild();

  e.preventDefault;
})