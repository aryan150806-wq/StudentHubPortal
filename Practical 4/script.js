/* ==========================================================
   StudentHub Portal - Practical 4
   JavaScript DOM Manipulation, Event Handling & UI Interactivity
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* ---------- Hamburger Navigation ---------- */
    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            const opened = navMenu.classList.toggle("active");
            menuButton.setAttribute("aria-expanded", String(opened));
            menuButton.setAttribute(
                "aria-label",
                opened ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the mobile menu after selecting a page.
        navMenu.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation menu");
            });
        });
    }

    /* ---------- Light / Dark Theme using localStorage ---------- */
    const themeButton = document.getElementById("themeButton");
    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("studentHubTheme") || "light";
    } catch (error) {
        console.warn("localStorage is not available in this browser context.");
    }

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeButton() {
        if (!themeButton) return;
        const dark = document.body.classList.contains("dark-mode");
        themeButton.textContent = dark ? "☀️" : "🌙";
        themeButton.setAttribute(
            "aria-label",
            dark ? "Switch to light mode" : "Switch to dark mode"
        );
        themeButton.setAttribute("title", dark ? "Light mode" : "Dark mode");
    }

    updateThemeButton();

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            const dark = document.body.classList.toggle("dark-mode");
            try {
                localStorage.setItem("studentHubTheme", dark ? "dark" : "light");
            } catch (error) {
                console.warn("Theme preference could not be saved.");
            }
            updateThemeButton();
        });
    }

    /* ---------- Active Navigation Link ---------- */
    const navigationLinks = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navigationLinks.forEach((link) => {
        const linkPage = (link.getAttribute("href") || "").split("#")[0];
        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    /* ---------- FAQ Accordion ---------- */
    document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const expanded = question.getAttribute("aria-expanded") === "true";

            // Close other FAQ answers for a clean accordion experience.
            document.querySelectorAll(".faq-question").forEach((other) => {
                if (other !== question) {
                    other.setAttribute("aria-expanded", "false");
                    other.classList.remove("active");
                    if (other.nextElementSibling) {
                        other.nextElementSibling.classList.remove("show");
                    }
                }
            });

            question.setAttribute("aria-expanded", String(!expanded));
            question.classList.toggle("active", !expanded);
            if (answer) answer.classList.toggle("show", !expanded);
        });
    });

    /* ---------- Modal Popup ---------- */
    const modal = document.getElementById("modal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementById("closeModal");
    const modalDone = document.getElementById("modalDone");
    let lastFocusedElement = null;

    function openModal() {
        if (!modal) return;
        lastFocusedElement = document.activeElement;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        if (closeModalButton) closeModalButton.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.hidden = true;
        document.body.style.overflow = "";
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        }
    }

    if (openModalButton) openModalButton.addEventListener("click", openModal);
    if (closeModalButton) closeModalButton.addEventListener("click", closeModal);
    if (modalDone) modalDone.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal && !modal.hidden) closeModal();
    });

    /* ---------- Content Slider ---------- */
    const slides = Array.from(document.querySelectorAll(".slide"));
    const previousButton = document.getElementById("previousSlide");
    const nextButton = document.getElementById("nextSlide");
    let currentSlide = 0;
    let sliderTimer = null;

    function showSlide(index) {
        if (slides.length === 0) return;
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const active = i === currentSlide;
            slide.classList.toggle("active", active);
            slide.setAttribute("aria-hidden", String(!active));
        });
    }

    function restartSlider() {
        if (sliderTimer) clearInterval(sliderTimer);
        if (slides.length > 1) {
            sliderTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
        }
    }

    if (slides.length > 0) showSlide(0);

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            showSlide(currentSlide - 1);
            restartSlider();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showSlide(currentSlide + 1);
            restartSlider();
        });
    }

    restartSlider();

    /* ---------- Notification Banner ---------- */
    const notificationBanner = document.getElementById("notificationBanner");
    const closeNotification = document.getElementById("closeNotification");

    if (closeNotification && notificationBanner) {
        closeNotification.addEventListener("click", () => {
            notificationBanner.classList.add("hidden");
        });
    }

    /* ---------- Header Notification Counter ---------- */
    const notificationButton = document.getElementById("notificationButton");
    const notificationCount = document.getElementById("notificationCount");

    if (notificationButton) {
        notificationButton.addEventListener("click", () => {
            if (notificationCount) notificationCount.textContent = "0";
            notificationButton.setAttribute("aria-label", "No new notifications");
        });
    }

    /* ---------- Assignment Search ---------- */
    const searchInput = document.getElementById("searchInput");
    const noteCards = document.querySelectorAll(".note-card");

    if (searchInput && noteCards.length > 0) {
        searchInput.addEventListener("input", () => {
            const searchText = searchInput.value.trim().toLowerCase();
            noteCards.forEach((card) => {
                const match = card.textContent.toLowerCase().includes(searchText);
                card.style.display = match ? "" : "none";
            });
        });
    }

    /* ---------- Current Year ---------- */
    const currentYear = document.getElementById("currentYear");
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    /* ---------- Contact Form Validation ---------- */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }
            alert("Message submitted successfully!");
            contactForm.reset();
        });
    }

    /* ---------- Registration Form Validation ---------- */
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!registerForm.checkValidity()) {
                registerForm.reportValidity();
                return;
            }

            const password = registerForm.querySelector("#password");
            if (password && password.value.length < 6) {
                alert("Password must contain at least 6 characters.");
                password.focus();
                return;
            }

            alert("Account details validated successfully!");
        });
    }

    /* ---------- Login Form Validation ---------- */
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }
            alert("Login details validated successfully!");
        });
    }

    console.log("StudentHub Practical 4: JavaScript loaded successfully.");
});
