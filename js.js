const gridContainer = document.getElementsByClassName('gallery-image')[0];
const searchButton = document.getElementById('search');
const searchInput = document.getElementById('input');
const clearButton = document.getElementById('clear');

const apiKey = 'xCQgIul9J5ppK63cmh_3d6L5I_jVRBk1XBEBumQ6NZA';
const apiUrl = 'https://api.unsplash.com';

searchButton.addEventListener('click', handleSearch);
clearButton.addEventListener('click', handleClear);
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
getRandomImages();
function getRandomImages() {
  const randomUrl = `${apiUrl}/photos/random?count=10&client_id=${apiKey}`;

  fetch(randomUrl)
    .then(response => response.json())
    .then(data => {
      clearGrid();

      data.forEach(result => {
        const imageUrl = result.urls.regular;
        addImageToGrid(imageUrl);
      });
    })
    .catch(error => {
      console.error('Ошибка при получении изображений:', error);
    });
}

function searchImages(query) {
  const searchUrl = `${apiUrl}/search/photos?query=${query}&client_id=${apiKey}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      clearGrid();

      data.results.forEach(result => {
        const imageUrl = result.urls.regular;
        addImageToGrid(imageUrl);
      });
    })
    .catch(error => {
      console.error('Ошибка при получении изображений:', error);
    });
}

function handleSearch() {
    const query = searchInput.value;
    searchImages(query);
  
    // Скрыть значок поиска и показать значок очистки
    searchButton.style.display = 'none';
    clearButton.style.display = 'inline-block';
  }

  searchInput.addEventListener('input', function() {
    if (searchInput.value !== '') {
      searchButton.style.display = 'none';
      clearButton.style.display = 'inline-block';
    } else {
      searchButton.style.display = 'inline-block';
      clearButton.style.display = 'none';
    }
  });

function handleClear() {
  searchInput.value = '';
  searchButton.style.display = 'inline-block';
  clearButton.style.display = 'none';
  getRandomImages();
}

function clearGrid() {
  gridContainer.innerHTML = '';
}

function addImageToGrid(imageUrl) {
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.className = 'img';

  gridContainer.appendChild(imgElement);
}