// ==========================================================
// STUDENTHUB PORTAL - PRACTICAL 4 + PRACTICAL 5
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================================
    // 1. HAMBURGER MENU
    // ======================================================

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", function () {

            const opened =
                navMenu.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                opened
            );
        });

        navMenu.querySelectorAll(".nav-link").forEach(function (link) {

            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }


    // ======================================================
    // 2. LIGHT / DARK MODE
    // ======================================================

    const themeButton =
        document.getElementById("themeButton");

    let savedTheme = "light";

    try {
        savedTheme =
            localStorage.getItem("studentHubTheme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeButton() {

        if (!themeButton) return;

        const darkMode =
            document.body.classList.contains("dark-mode");

        themeButton.textContent =
            darkMode ? "☀️" : "🌙";
    }

    updateThemeButton();

    if (themeButton) {

        themeButton.addEventListener("click", function () {

            const darkMode =
                document.body.classList.toggle("dark-mode");

            try {
                localStorage.setItem(
                    "studentHubTheme",
                    darkMode ? "dark" : "light"
                );
            } catch (error) {
                console.log("Theme preference could not be saved.");
            }

            updateThemeButton();
        });
    }


    // ======================================================
    // 3. ACTIVE NAVIGATION
    // ======================================================

    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

    document.querySelectorAll(".nav-link").forEach(function (link) {

        const page =
            (link.getAttribute("href") || "")
            .split("#")[0];

        if (page === currentPage) {
            link.classList.add("active");
        }
    });


    // ======================================================
    // 4. FAQ ACCORDION
    // ======================================================

    document.querySelectorAll(".faq-question")
        .forEach(function (question) {

            question.addEventListener("click", function () {

                const answer =
                    question.nextElementSibling;

                question.classList.toggle("active");

                if (answer) {
                    answer.classList.toggle("show");
                }
            });

        });


    // ======================================================
    // 5. MODAL POPUP
    // ======================================================

    const modal =
        document.getElementById("modal");

    const openModal =
        document.getElementById("openModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalDone =
        document.getElementById("modalDone");

    function showModal() {

        if (!modal) return;

        modal.hidden = false;
    }

    function hideModal() {

        if (!modal) return;

        modal.hidden = true;
    }

    if (openModal) {
        openModal.addEventListener(
            "click",
            showModal
        );
    }

    if (closeModal) {
        closeModal.addEventListener(
            "click",
            hideModal
        );
    }

    if (modalDone) {
        modalDone.addEventListener(
            "click",
            hideModal
        );
    }

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                hideModal();
            }

        });
    }


    // ======================================================
    // 6. CONTENT SLIDER
    // ======================================================

    const slides =
        document.querySelectorAll(".slide");

    const previousSlide =
        document.getElementById("previousSlide");

    const nextSlide =
        document.getElementById("nextSlide");

    let currentSlide = 0;

    function showSlide(index) {

        if (slides.length === 0) return;

        currentSlide =
            (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });
    }

    if (slides.length > 0) {
        showSlide(0);
    }

    if (previousSlide) {

        previousSlide.addEventListener("click", function () {
            showSlide(currentSlide - 1);
        });
    }

    if (nextSlide) {

        nextSlide.addEventListener("click", function () {
            showSlide(currentSlide + 1);
        });
    }


    // ======================================================
    // 7. NOTIFICATION BANNER
    // ======================================================

    const notificationBanner =
        document.getElementById("notificationBanner");

    const closeNotification =
        document.getElementById("closeNotification");

    if (closeNotification && notificationBanner) {

        closeNotification.addEventListener(
            "click",
            function () {
                notificationBanner.classList.add("hidden");
            }
        );
    }


    // ======================================================
    // 8. NOTIFICATION COUNT
    // ======================================================

    const notificationButton =
        document.getElementById("notificationButton");

    const notificationCount =
        document.getElementById("notificationCount");

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                if (notificationCount) {
                    notificationCount.textContent = "0";
                }

            }
        );
    }


    // ======================================================
    // 9. ASSIGNMENT SEARCH
    // ======================================================

    const searchInput =
        document.getElementById("searchInput");

    const noteCards =
        document.querySelectorAll(".note-card");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase();

            noteCards.forEach(function (card) {

                const text =
                    card.textContent.toLowerCase();

                card.style.display =
                    text.includes(searchText)
                        ? ""
                        : "none";
            });
        });
    }


    // ======================================================
    // 10. PRACTICAL 5 - REGISTRATION VALIDATION
    // ======================================================

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        const name =
            document.getElementById("name");

        const studentId =
            document.getElementById("studentId");

        const email =
            document.getElementById("email");

        const phone =
            document.getElementById("phone");

        const program =
            document.getElementById("program");

        const semester =
            document.getElementById("semester");

        const password =
            document.getElementById("password");


        // Regular expressions
        const nameRegex =
            /^[A-Za-z ]{2,50}$/;

        const studentIdRegex =
            /^[0-9]{2}[A-Za-z]{3}[0-9]{3}$/;

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex =
            /^[6-9][0-9]{9}$/;

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*!]).{8,}$/;


        // --------------------------------------------------
        // ERROR FUNCTION
        // --------------------------------------------------

        function error(field, message) {

            if (!field) return false;

            const errorBox =
                document.getElementById(
                    field.id + "Error"
                );

            if (errorBox) {
                errorBox.textContent = message;
            }

            field.classList.add("input-error");

            return false;
        }


        function clearError(field) {

            if (!field) return;

            const errorBox =
                document.getElementById(
                    field.id + "Error"
                );

            if (errorBox) {
                errorBox.textContent = "";
            }

            field.classList.remove("input-error");
        }


        // --------------------------------------------------
        // NAME
        // --------------------------------------------------

        function validateName() {

            if (!name) return true;

            if (!nameRegex.test(name.value.trim())) {
                return error(
                    name,
                    "Please enter a valid name."
                );
            }

            clearError(name);
            return true;
        }


        // --------------------------------------------------
        // STUDENT ID
        // --------------------------------------------------

        function validateStudentId() {

            if (!studentId) return true;

            if (!studentIdRegex.test(
                studentId.value.trim()
            )) {
                return error(
                    studentId,
                    "Please enter a valid Student ID."
                );
            }

            clearError(studentId);
            return true;
        }


        // --------------------------------------------------
        // EMAIL
        // --------------------------------------------------

        function validateEmail() {

            if (!email) return true;

            if (!emailRegex.test(
                email.value.trim()
            )) {
                return error(
                    email,
                    "Please enter a valid email."
                );
            }

            clearError(email);
            return true;
        }


        // --------------------------------------------------
        // MOBILE
        // --------------------------------------------------

        function validatePhone() {

            if (!phone) return true;

            if (!phoneRegex.test(
                phone.value.trim()
            )) {
                return error(
                    phone,
                    "Enter a valid 10-digit mobile number."
                );
            }

            clearError(phone);
            return true;
        }


        // --------------------------------------------------
        // PROGRAM
        // --------------------------------------------------

        function validateProgram() {

            if (!program) return true;

            if (program.value === "") {
                return error(
                    program,
                    "Please select a course."
                );
            }

            clearError(program);
            return true;
        }


        // --------------------------------------------------
        // SEMESTER
        // --------------------------------------------------

        function validateSemester() {

            if (!semester) return true;

            if (semester.value === "") {
                return error(
                    semester,
                    "Please enter your semester."
                );
            }

            clearError(semester);
            return true;
        }


        // --------------------------------------------------
        // PASSWORD
        // --------------------------------------------------

        function validatePassword() {

            if (!password) return true;

            if (!passwordRegex.test(password.value)) {

                return error(
                    password,
                    "Password must contain 8+ characters, uppercase, lowercase, number and special character."
                );
            }

            clearError(password);
            return true;
        }


        // --------------------------------------------------
        // REAL-TIME VALIDATION
        // --------------------------------------------------

        if (name) {
            name.addEventListener(
                "blur",
                validateName
            );
        }

        if (studentId) {
            studentId.addEventListener(
                "blur",
                validateStudentId
            );
        }

        if (email) {
            email.addEventListener(
                "blur",
                validateEmail
            );
        }

        if (phone) {
            phone.addEventListener(
                "blur",
                validatePhone
            );
        }

        if (program) {
            program.addEventListener(
                "change",
                validateProgram
            );
        }

        if (semester) {
            semester.addEventListener(
                "change",
                validateSemester
            );
        }

        if (password) {
            password.addEventListener(
                "blur",
                validatePassword
            );
        }


        // --------------------------------------------------
        // SUBMIT
        // --------------------------------------------------

        registerForm.addEventListener(
            "submit",
            function (event) {

                const valid =
                    validateName() &&
                    validateStudentId() &&
                    validateEmail() &&
                    validatePhone() &&
                    validateProgram() &&
                    validateSemester() &&
                    validatePassword();

                if (!valid) {
                    event.preventDefault();
                }

            }
        );
    }


    // ======================================================
    // 11. CURRENT YEAR
    // ======================================================

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    // ======================================================
    // TEST MESSAGE
    // ======================================================

    console.log(
        "StudentHub Practical 4 + Practical 5 loaded successfully."
    );

});
