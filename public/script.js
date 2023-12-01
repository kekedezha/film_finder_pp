// API key for TMBD API use
const tmdbKey = '8ce65be17096ef26fc4f976606cdfb77';
// Base URL for TMBD
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

// Async function to get movie genres TMBD has available
const getGenres = async() => {
    // Genre request endpoint
    const genreRequestEndpoint = '/genre/movie/list';
    // Query string that will be appended to end of url 
    const requestParam = `?api_key=${tmdbKey}`;
    // Full url to get movie genres
    const urlToFetch = tmdbBaseUrl+genreRequestEndpoint+requestParam;

    try {
        // Await GET request and save promise to response
        const response = await fetch(urlToFetch);
        // If promise has a truthy value then execute if statement
        if(response.ok) {
            // Await the response promise to be converted to a json object.
            const jsonResponse = await response.json();
            // Store the genres part of the json object to a variable
            const genres = jsonResponse.genres;
            // Return the genres stored value, which is an array of genres
            return genres;
        }
    } catch(error) {
        console.log(error);
    }
};

// Async function to fetch a list of movies based on the genre selected 
const getMovies = async() => {
    // Get selectedGenre value from index.html
    const selectedGenre = getSelectedGenre();
    // Movie discover endpoint
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&${selectedGenre}`;
    const urlToFetch = tmdbBaseUrl+discoverMovieEndpoint+requestParams;

    try {
        const response = await fetch(urlToFetch);

        if(response.ok) {
            const jsonResponse = await response.json();
            // console.log(jsonResponse);
            const movies = jsonResponse.results;

            return movies;
        }

    } catch(error) {
        console.log(error);
    };

};

const getMovieInfo = async(movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParam = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParam;

    try {
        const response = await fetch(urlToFetch);

        if(response.ok) {
            const movieInfo = await response.json();
            // console.log(jsonResponse);

            return movieInfo;
        }

    } catch(error) {
        console.log(error);
    };
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;