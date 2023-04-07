const imagesUrl = 'https://image.tmdb.org/t/p/w500';
let url = 'https://api.themoviedb.org/3/discover/movie?api_key=ff4159d9ae60fc1c3b3a21d35398a90a';
let searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=ff4159d9ae60fc1c3b3a21d35398a90a&query='



const fragments = document.createDocumentFragment();
const movies = document.querySelector('.movies_list')

const searchInput = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');

const loaderContainer = document.querySelector('loader-container')
const loading = document.createElement('div');
loading.classList.add('loader')
movies.appendChild(loading);

async function formData() {
    
    const searchTerm = searchInput.value;

    if (searchTerm) {
        url = `${searchUrl}${searchTerm}`
    } else{
        url = 'https://api.themoviedb.org/3/discover/movie?api_key=ff4159d9ae60fc1c3b3a21d35398a90a'
    }

    try {
        
        
        const response = await fetch(url)
        const data = await response.json()

        movies.innerHTML ='';

        data.results.map((movie) => {


            
            const image = document.createElement('img')
            image.src = `${imagesUrl}${movie.backdrop_path}`;
            image.alt = movie.title;


            const title = document.createElement('h2');
            title.textContent = movie.title;

            // const textLanguage = document.createElement('p');
            // title.textContent = movie.original_language;
           
            fragments.appendChild(image);
            fragments.appendChild(title);
            // fragments.appendChild(textLanguage);
            
            movies.appendChild(fragments)
            console.log(movie);
        })
        
    } catch (error) {
        console.error(error)
    }
}

setTimeout(() => {
    formData();
}, 1000)

searchBtn.addEventListener('click' ,() =>{
formData();
});
searchInput.addEventListener('keypress', (event) => {
   if ( event.key === 'Enter') {
    formData()
   }
} )