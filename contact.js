document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        modal.style.display = "flex"; // Show modal
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Hide modal
        form.reset(); // Reset form fields
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Close modal on outside click
        }
    });
});
