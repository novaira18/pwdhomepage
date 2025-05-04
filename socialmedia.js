document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon');

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.add('bounce');
            setTimeout(() => icon.classList.remove('bounce'), 800);
        });
    });
});
