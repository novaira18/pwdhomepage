const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = "ZNFKVMJ3uEmel3Kxik9jR1dLR1y4qAI1vEc5YvKXMOY"; 
let page = 1;
let searchQuery = '';
const gallery = document.getElementById('gallery');
const searchBar = document.getElementById('search-bar');
const loadMoreBtn = document.getElementById('load-more');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');
const likeBtn = document.getElementById('like-btn');
const shareBtn = document.getElementById('share-btn');

// Function to fetch images based on the search query
const fetchImages = async (query = '', page = 1) => {
    try {
        const response = await fetch(`${API_URL}?client_id=${API_KEY}&page=${page}&query=${query}&per_page=15`);
        const data = await response.json();

        if (data.results.length === 0) {
            alert('No results found!');
            return;
        }

        data.results.forEach(image => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('gallery-item');
            imageElement.innerHTML = `
                <img src="${image.urls.small}" alt="${image.alt_description}">
                <div class="overlay">
                    <button class="button" onclick="viewImage('${image.urls.regular}')">View</button>
                    <button class="button" onclick="saveImage('${image.id}')">Save</button>
                </div>
            `;
            gallery.appendChild(imageElement);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
};

// Function to show image in full-screen mode
const viewImage = (src) => {
    modal.style.display = 'block';
    modalImg.src = src;
};

// Close the modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalImg.src = '';
});

// Load more images when the button is clicked
loadMoreBtn.addEventListener('click', () => {
    page++;
    fetchImages(searchQuery, page);
});

// Real-time search functionality
searchBar.addEventListener('input', (event) => {
    searchQuery = event.target.value.trim();
    if (searchQuery.length === 0) {
        gallery.innerHTML = ''; // Clear the gallery if search query is empty
        return;
    }

    gallery.innerHTML = ''; // Clear current gallery
    page = 1;
    fetchImages(searchQuery, page);
});

// Save image to collection (dummy function)
const saveImage = (id) => {
    alert(`Image ${id} saved to your collection!`);
};

// Initial load of images (optional, without search query)
fetchImages('', page);
