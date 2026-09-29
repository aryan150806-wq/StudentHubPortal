// ==========================================================
// StudentHub Portal - Practical 4
// JavaScript DOM Manipulation, Event Handling & UI Interactivity
// ==========================================================


// ==========================================================
// 1. HAMBURGER MENU
// ==========================================================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {

        // Toggle mobile navigation menu
        navMenu.classList.toggle("active");

        // Update accessibility state
        const isOpen = navMenu.classList.contains("active");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}


// ==========================================================
// 2. LIGHT / DARK THEME SWITCHER
// ==========================================================

const themeButton = document.getElementById("themeButton");

// Apply previously saved theme when page loads
const savedTheme = localStorage.getItem("studentHubTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeButton) {
        themeButton.textContent = "☀️";
        themeButton.setAttribute("aria-label", "Switch to light mode");
    }
}

// Change theme when button is clicked
if (themeButton) {

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        // Save theme preference
        localStorage.setItem(
            "studentHubTheme",
            isDark ? "dark" : "light"
        );

        // Update button
        themeButton.textContent = isDark ? "☀️" : "🌙";

        themeButton.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    });
}


// ==========================================================
// 3. COLLAPSIBLE FAQ
// ==========================================================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        // Toggle current FAQ
        question.classList.toggle("active");

        if (answer) {
            answer.classList.toggle("show");
        }

        // Update accessibility information
        const expanded = question.classList.contains("active");

        question.setAttribute("aria-expanded", expanded);
    });
});


// ==========================================================
// 4. MODAL POPUP
// ==========================================================

const modal = document.getElementById("modal");
const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");


// Open modal
if (openModalButton && modal) {

    openModalButton.addEventListener("click", () => {

        modal.classList.add("show");

        // Prevent background scrolling
        document.body.style.overflow = "hidden";

        // Move keyboard focus to close button
        if (closeModalButton) {
            closeModalButton.focus();
        }
    });
}


// Close modal
if (closeModalButton && modal) {

    closeModalButton.addEventListener("click", closeModal);
}


// Close modal when clicking outside the modal content
if (modal) {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            closeModal();
        }
    });
}


// Close modal using Escape key
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && modal) {
        closeModal();
    }
});


function closeModal() {

    modal.classList.remove("show");

    // Restore scrolling
    document.body.style.overflow = "";

    // Return focus to open button
    if (openModalButton) {
        openModalButton.focus();
    }
}


// ==========================================================
// 5. IMAGE / CONTENT SLIDER
// ==========================================================

const slides = document.querySelectorAll(".slide");
const previousButton = document.getElementById("previousSlide");
const nextButton = document.getElementById("nextSlide");

let currentSlide = 0;


// Display selected slide
function showSlide(index) {

    if (slides.length === 0) {
        return;
    }

    // Handle first slide
    if (index < 0) {
        currentSlide = slides.length - 1;
    }

    // Handle last slide
    else if (index >= slides.length) {
        currentSlide = 0;
    }

    else {
        currentSlide = index;
    }

    // Hide all slides
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    // Show current slide
    slides[currentSlide].classList.add("active");
}


// Previous slide
if (previousButton) {

    previousButton.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });
}


// Next slide
if (nextButton) {

    nextButton.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });
}


// Automatically change slide every 5 seconds
if (slides.length > 1) {

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}


// ==========================================================
// 6. NOTIFICATION BANNER
// ==========================================================

const notificationBanner = document.getElementById("notificationBanner");
const closeNotification = document.getElementById("closeNotification");

if (closeNotification && notificationBanner) {

    closeNotification.addEventListener("click", () => {

        notificationBanner.classList.add("hidden");

    });
}


// ==========================================================
// 7. DYNAMIC STUDENTHUB NOTIFICATION
// ==========================================================

const notificationButton =
    document.getElementById("notificationButton");

const notificationCount =
    document.getElementById("notificationCount");


if (notificationButton) {

    notificationButton.addEventListener("click", () => {

        alert("You have 3 new notifications.");
        
        // Remove notification count after viewing
        if (notificationCount) {
            notificationCount.textContent = "0";
        }
    });
}


// ==========================================================
// 8. SEARCH / FILTER NOTES
// ==========================================================

const searchInput = document.getElementById("searchInput");
const noteCards = document.querySelectorAll(".note-card");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchText = searchInput.value.toLowerCase();

        noteCards.forEach((card) => {

            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchText)) {
                card.style.display = "";
            }

            else {
                card.style.display = "none";
            }
        });
    });
}


// ==========================================================
// 9. DYNAMIC CURRENT YEAR
// ==========================================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// ==========================================================
// 10. ACTIVE NAVIGATION LINK
// ==========================================================

const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigationLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });
});


// ==========================================================
// 11. FORM VALIDATION
// ==========================================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        if (
            name &&
            email &&
            message &&
            name.value.trim() !== "" &&
            email.value.trim() !== "" &&
            message.value.trim() !== ""
        ) {

            alert("Message submitted successfully!");

            contactForm.reset();

        }

        else {

            alert("Please fill all required fields.");

        }
    });
}


// ==========================================================
// 12. PAGE LOAD MESSAGE
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "StudentHub Portal JavaScript loaded successfully."
    );

});
