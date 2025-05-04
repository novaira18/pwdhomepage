function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Close the menu when clicking anywhere on the page
document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdownMenu');
    const menuButton = document.querySelector('.menu');

    // Check if the clicked element is NOT the menu or menu button
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.style.display = 'none';
    }
});
function redirectWithSlide(event, linkElement) {
    event.preventDefault(); // Prevent the default anchor behavior
    const url = linkElement.href;

    // Find the closest card and add the slide class to it
    const card = linkElement.closest('.card');
    card.classList.add('slide');

    // Redirect after the slide animation completes (0.8s)
    setTimeout(() => {
        window.location.href = url; // Redirect to the target page
    }, 800);
}

function redirectWithSlide(event, linkElement) {
    event.preventDefault(); // Prevent the default anchor behavior
    const url = linkElement.href;

    // Optionally add animations or slides here
    
    window.location.href = url; // Redirect to the target page
}
