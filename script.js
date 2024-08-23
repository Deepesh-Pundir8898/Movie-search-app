// const key="292bcb80";
// const url =" https://www.omdbapi.com/?&apikey=292bcb80&s=love&page=1"
const apiKey = '292bcb80'; 
let currentPage = 1;
let totalPages = 1;
const debounceTimeout = 500;
let debounceTimer;

const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies-container');
const pagination = document.getElementById('pagination');
const movieDetailsModal = document.getElementById('movie-details');
const movieContent = document.getElementById('movie-content');
const closeBtn = document.querySelector('.close');

document.addEventListener("DOMContentLoaded", function() {
    searchMovies(localStorage.getItem('searchInput'),currentPage)
})


searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        currentPage = 1;
        searchMovies(searchInput.value, currentPage);
    }, debounceTimeout);
});



function searchMovies(query, page) {
    if (query.trim() === '') return;

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                console.log(data); 
                if(searchInput.value !==""){

                    localStorage.setItem("searchInput",searchInput.value);
                }

                displayMovies(data.Search);
                totalPages = Math.ceil(data.totalResults / 10);
                displayPagination(totalPages);
            } else {
                moviesContainer.innerHTML = '<p>No movies found.</p>';
                pagination.innerHTML = '';
            }
        });
}

function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <button onclick="redirectToDetailsPage('${movie.imdbID}')">Details</button>
            </div>
        `;
        moviesContainer.appendChild(movieCard);
    });
}

function redirectToDetailsPage(imdbID) {
    window.location.href = `details.html?imdbID=${imdbID}`;
}

function displayPagination(totalPages) {
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('span');
        pageLink.classList.add('page-link');
        pageLink.textContent = i;
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', () => {
            currentPage = i;
            // searchMovies(searchInput.value, currentPage);
            searchMovies(localStorage.getItem('searchInput'), currentPage);

        });
        pagination.appendChild(pageLink);
    }
}

// function showMovieDetails(imdbID) {
//     fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
//         .then(response => response.json())
//         .then(data => {
//             movieContent.innerHTML = `
//                 <h2>${data.Title}</h2>
//                 <img src="${data.Poster !== 'N/A' ? data.Poster : 'placeholder.jpg'}" alt="${data.Title}">
//                 <p>${data.Plot}</p>
//                 <p><strong>Released:</strong> ${data.Released}</p>
//                 <p><strong>Genre:</strong> ${data.Genre}</p>
//                 <p><strong>Director:</strong> ${data.Director}</p>
//                 <p><strong>Actors:</strong> ${data.Actors}</p>
//                 <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
//             `;
//             movieDetailsModal.style.display = 'flex';
//         });
// }

// closeBtn.addEventListener('click', () => {
//     movieDetailsModal.style.display = 'none';
// });

// window.addEventListener('click', (event) => {
//     if (event.target === movieDetailsModal) {
//         movieDetailsModal.style.display = 'none';
//     }
// });
