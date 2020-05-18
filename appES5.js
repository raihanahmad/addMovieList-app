// MOVIE CONSTRUCTOR
function Movie(movieName, author, released) {
  this.movieName = movieName;
  this.author = author;
  this.released = released;
}

// UI CONSTRUCTOR FOR PROTOTYPE
function UI() {}

// ALERT MESSAGE PROTOTYPE OBJECT
UI.prototype.showMessage = function (message, alert) {
  // TARGET UI ELEMENTS
  const container = document.getElementById("container");
  const form = document.getElementById("form");

  // CREATE HTML ELEMENT
  const messageDiv = document.createElement("div");

  // ADD CLASS
  messageDiv.className = `${alert}`;

  // ADD TEXTCONTENT
  messageDiv.appendChild(document.createTextNode(message));

  // INSERT TO THE PLACE
  container.insertBefore(messageDiv, form);

  // SET TIME FUNCTION
  setTimeout(function () {
    messageDiv.remove();
  }, 2000);
};

// CREATE MOVIE PROTOTYE
UI.prototype.createMovieItem = function (movie) {
  const movieList = document.querySelector("#table-body");

  // CREATE TR
  const row = document.createElement("tr");

  // INSERT CONTENT
  row.innerHTML = `
  <td>${movie.movieName}</td>
  <td>${movie.author}</td>
  <td>${movie.released}</td>
  <td><a href="#" class = "delete">x</a></td>
  `;

  // APPEND
  movieList.appendChild(row);
};

// CLEAR INPUT FILD
UI.prototype.clearFild = function () {
  document.getElementById("movie-name").value = "";
  document.getElementById("author").value = "";
  document.getElementById("released").value = "";
};

// EVENT LISTENER FOR ADD MOVIE
document.getElementById("form").addEventListener("submit", function (e) {
  // DECLARE VARIABLE AND ASSIGN VALUE
  const movieName = document.getElementById("movie-name").value;
  const author = document.getElementById("author").value;
  const released = document.getElementById("released").value;

  // CREATE A NEW OBJECT WITH CONSTRUCTOR
  const movie = new Movie(movieName, author, released);

  const ui = new UI();

  // SHOW ALERT MESSAGE IF INPUT VALUE IS EMTY
  if (movieName === "" || author === "" || released === "") {
    ui.showMessage("Please Fill Out All Input Form", "error");
  }
  // ELSE ADD MOVIE TO THE LIST
  else {
    // CREATE MOVIE AND ADD
    ui.createMovieItem(movie);

    // ADD SUCCESS MESSAGE
    ui.showMessage("Your movie successfully added.", "success");

    // CLEAR INPUT FILD
    ui.clearFild();
  }

  e.preventDefault();
});

// EVENT LISTENER FOR DELETE MOVIE
document.querySelector("#table-body").addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentElement.parentElement.remove();

    // FOR ADDING MESSAGE
    const ui = new UI();

    ui.showMessage("Romove successful.", "success");
  }

  e.preventDefault();
});