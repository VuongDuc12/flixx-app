const global = {
    currentPage : window.location.pathname,

}

async function displayPopularMovie(){
    const {results} = await fetchAPIData('movie/popular');
    results.forEach(show => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
        <a href="show-details.html?id=${show.id}">
         ${
            show.poster_path 
            ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.title}"
          />`

          : 
          `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="show Title"
        />`
         }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.title}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.firt_air_date}</small>
          </p>
        </div>
      `;
      document.querySelector('#popular-movies').appendChild(div);
    });
}   

async function displayPopularShows(){
    const {results} = await fetchAPIData('tv/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
         ${
            movie.poster_path 
            ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`

          : 
          `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
         }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
      `;
      document.querySelector('#popular-shows').appendChild(div);
    });
}   

//fetch data from tmdb api

async function fetchAPIData(endpoint){
    const API_KEY ='3fd2be6f0c70a2a598f084ddfb75487c';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner();
    const response = await fetch( `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    hideSpinner();
    return data;
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')
}

//Highlight active link
function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
}

// Init app

function init() {
    switch (global.currentPage) {
        case '/':
           
        case '/index.html':
                displayPopularMovie();
                break;
        case '/shows.html':
           displayPopularShows();
            break;
        case '/movie-details.html':
                console.log('Movie Details');
                break;
        case '/tv-details.html':
            console.log('tv Details');
            break;    
        case '/search.html':
                console.log('search');
                break; 
    }
    highlightActiveLink();
}
init();