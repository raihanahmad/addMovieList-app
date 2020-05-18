// CREATE MOVIE CONSTRUCTOR WITH CLASS
class Movie {
  constructor(movieName, author, released) {
    this.movieName = movieName;
    this.author = author;
    this.released = released;
  }
}

// UI CONSTRUTOR FOR PROTOTYPE METHOD
class UI {
  // ALERT MESSAGE METHOD
  showMessage(message, alert) {
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
  }

  // CREATE MOVIE METHOD
  createMovieItem(movie) {
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
  }

  // DELETE MOVIE
  deleteMovie(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();

      this.showMessage("Romove successful.", "success");
    }
  }

  // CLEAR INPUT FILD
  clearFild() {
    document.getElementById("movie-name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("released").value = "";
  }

}

// STOR TO LOCAL STORAGE
class Store {
  // GET MOVIES
  static getMovies() {
    let movies;

    if (localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
  }

  // DISPLAY MOVIES
  static displayMovies() {
    const movies = Store.getMovies();

    movies.forEach(function (movie) {
      const ui = new UI();

      ui.createMovieItem(movie);
    })
  }

  // ADD MOVIES TO LS
  static addMOvie(movie) {
    const movies = Store.getMovies();

    movies.push(movie);

    localStorage.setItem('movies', JSON.stringify(movies));
  }

  // REMOVE MOVIES
  static removeMovie(released) {
    const movies = Store.getMovies();

    movies.forEach(function (movie, index) {
      if (movie.released === released) {
        movies.splice(index, 1);

        localStorage.setItem('movies', JSON.stringify(movies));
      }
    })
  }
}

// DOM LOAD EVENT LISTEENR
document.addEventListener('DOMContentLoaded', Store.displayMovies());

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
  } else {
    // CREATE MOVIE AND ADD
    ui.createMovieItem(movie);

    // ADD MOVIE TO LS
    Store.addMOvie(movie);

    // ADD SUCCESS MESSAGE
    ui.showMessage("Your movie successfully added.", "success");

    // CLEAR INPUT FILD
    ui.clearFild();
  }

  e.preventDefault();
});

// EVENT LISTENER FOR DELETE MOVIE
document.querySelector("#table-body").addEventListener("click", function (e) {
  // FOR ADDING MESSAGE
  const ui = new UI();

  // DELETE MOVIE
  ui.deleteMovie(e.target);

  // REMOVE FROM LS
  Store.removeMovie(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});