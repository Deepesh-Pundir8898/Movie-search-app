document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get("imdbID");

    if (imdbID) {
        fetchMovieDetails(imdbID);
    }
});

function fetchMovieDetails(imdbID) {
    const apiKey = '292bcb80'; // Replace with your OMDB API key
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("movie-title").textContent = data.Title;
            document.getElementById("movie-poster").src = data.Poster !== 'N/A' ? data.Poster : 'placeholder.jpg';
            document.getElementById("movie-plot").textContent = data.Plot;
            document.getElementById("movie-released").textContent = data.Released;
            document.getElementById("movie-genre").textContent = data.Genre;
            document.getElementById("movie-director").textContent = data.Director;
            document.getElementById("movie-actors").textContent = data.Actors;
            document.getElementById("movie-rating").textContent = data.imdbRating;
        });
}
