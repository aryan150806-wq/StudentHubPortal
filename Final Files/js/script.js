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

// ==========================================================
// PRACTICAL 6 - FETCH API, SEARCH, FILTER, SORT & PAGINATION
// ==========================================================

(function () {
    const dataPage = document.getElementById("eventsContainer");
    if (!dataPage) return;

    // Local fallback data keeps the page usable when data.html is opened
    // directly with file:// because browsers may block local Fetch requests.
    const fallbackData = {
        events: [{"id": 1, "title": "Orientation Day", "category": "Academic", "date": "2026-08-10", "venue": "Main Auditorium", "status": "Upcoming"}, {"id": 2, "title": "Coding Club Meetup", "category": "Technical", "date": "2026-08-14", "venue": "Lab 3", "status": "Upcoming"}, {"id": 3, "title": "Independence Day Celebration", "category": "Cultural", "date": "2026-08-15", "venue": "Central Ground", "status": "Completed"}, {"id": 4, "title": "Web Development Workshop", "category": "Technical", "date": "2026-08-20", "venue": "Seminar Hall", "status": "Upcoming"}],
        students: [{"id": 1, "name": "Aarav Patel", "course": "B.Tech IT", "semester": 3, "email": "aarav.patel@studenthub.edu", "city": "Vadodara"}, {"id": 2, "name": "Diya Shah", "course": "B.Tech CSE", "semester": 3, "email": "diya.shah@studenthub.edu", "city": "Ahmedabad"}, {"id": 3, "name": "Rohan Mehta", "course": "B.Tech IT", "semester": 5, "email": "rohan.mehta@studenthub.edu", "city": "Surat"}, {"id": 4, "name": "Anaya Desai", "course": "B.Tech CSE", "semester": 3, "email": "anaya.desai@studenthub.edu", "city": "Rajkot"}],
        faqs: [{"id": 1, "question": "How do I access my dashboard?", "answer": "Open the Dashboard page from the navigation menu.", "category": "Account"}, {"id": 2, "question": "How can I register on StudentHub?", "answer": "Open Register and complete the required student details.", "category": "Account"}, {"id": 3, "question": "Can I switch to dark mode?", "answer": "Yes. Use the theme button in the header.", "category": "Interface"}, {"id": 4, "question": "Where can I see my courses?", "answer": "Open the Courses page from the navigation menu.", "category": "Academic"}]
    };

    let fallbackUsed = false;

    const state = {
        events: { data: [], page: 1, size: 5 },
        students: { data: [], page: 1, size: 5 },
        faqs: { data: [], page: 1, size: 5 }
    };

    function showStatus(message, type) {
        const box = document.getElementById("jsonStatus");
        if (!box) return;
        box.innerHTML = "<span>" + message + "</span>";
        box.classList.toggle("status-success", type === "success");
        box.classList.toggle("status-error", type === "error");
    }

    async function fetchJSON(file, key) {
        try {
            const response = await fetch("../json/" + file, { cache: "no-store" });
            if (!response.ok) throw new Error("HTTP " + response.status);
            return await response.json();
        } catch (error) {
            console.info("Local JSON Fetch fallback for " + file + ":", error.message);
            fallbackUsed = true;
            return fallbackData[key];
        }
    }

    function fillSelect(id, values) {
        const select = document.getElementById(id);
        if (!select) return;
        values.sort((a, b) => a.localeCompare(b)).forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
    }

    function paginate(items, page, size) {
        const totalPages = Math.max(1, Math.ceil(items.length / size));
        const safePage = Math.min(page, totalPages);
        return { items: items.slice((safePage - 1) * size, safePage * size), totalPages, page: safePage };
    }

    function renderPagination(id, current, total, callback) {
        const box = document.getElementById(id);
        if (!box) return;
        box.innerHTML = "";
        if (total <= 1) return;
        const previous = document.createElement("button");
        previous.type = "button"; previous.textContent = "Previous"; previous.disabled = current === 1;
        previous.addEventListener("click", () => callback(current - 1));
        box.appendChild(previous);
        const label = document.createElement("span");
        label.textContent = " Page " + current + " of " + total + " ";
        box.appendChild(label);
        const next = document.createElement("button");
        next.type = "button"; next.textContent = "Next"; next.disabled = current === total;
        next.addEventListener("click", () => callback(current + 1));
        box.appendChild(next);
    }

    function applySort(items, value, field) {
        return [...items].sort((a, b) => {
            let av = a[field], bv = b[field];
            if (field === "date" || field === "semester") return value.endsWith("asc") ? (av > bv ? 1 : av < bv ? -1 : 0) : (av < bv ? 1 : av > bv ? -1 : 0);
            return value.endsWith("asc") ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
        });
    }

    function renderEvents() {
        const s = state.events;
        const query = document.getElementById("eventSearch").value.toLowerCase().trim();
        const category = document.getElementById("eventCategory").value;
        const sort = document.getElementById("eventSort").value;
        let items = s.data.filter(e => (!query || [e.title,e.category,e.venue,e.status].join(" ").toLowerCase().includes(query)) && (category === "all" || e.category === category));
        items = applySort(items, sort, sort.startsWith("date") ? "date" : "title");
        const page = paginate(items, s.page, s.size); s.page = page.page;
        document.getElementById("eventsContainer").innerHTML = page.items.map(e => `<article class="data-card"><h3>${escapeHTML(e.title)}</h3><p><strong>Category:</strong> ${escapeHTML(e.category)}</p><p><strong>Date:</strong> ${escapeHTML(e.date)}</p><p><strong>Venue:</strong> ${escapeHTML(e.venue)}</p><p><strong>Status:</strong> ${escapeHTML(e.status)}</p></article>`).join("") || "<p>No events found.</p>";
        renderPagination("eventsPagination", page.page, page.totalPages, p => { s.page=p; renderEvents(); });
    }

    function renderStudents() {
        const s = state.students;
        const query = document.getElementById("studentSearch").value.toLowerCase().trim();
        const course = document.getElementById("studentCourse").value;
        const sort = document.getElementById("studentSort").value;
        let items = s.data.filter(x => (!query || [x.name,x.course,x.email,x.city].join(" ").toLowerCase().includes(query)) && (course === "all" || x.course === course));
        items = applySort(items, sort, sort.startsWith("semester") ? "semester" : "name");
        const page = paginate(items, s.page, s.size); s.page = page.page;
        document.getElementById("studentsContainer").innerHTML = page.items.map(x => `<article class="data-card"><h3>${escapeHTML(x.name)}</h3><p><strong>Course:</strong> ${escapeHTML(x.course)}</p><p><strong>Semester:</strong> ${escapeHTML(x.semester)}</p><p><strong>Email:</strong> ${escapeHTML(x.email)}</p><p><strong>City:</strong> ${escapeHTML(x.city)}</p></article>`).join("") || "<p>No students found.</p>";
        renderPagination("studentsPagination", page.page, page.totalPages, p => { s.page=p; renderStudents(); });
    }

    function renderFAQs() {
        const s = state.faqs;
        const query = document.getElementById("faqSearch").value.toLowerCase().trim();
        const category = document.getElementById("faqCategory").value;
        const sort = document.getElementById("faqSort").value;
        let items = s.data.filter(x => (!query || [x.question,x.answer,x.category].join(" ").toLowerCase().includes(query)) && (category === "all" || x.category === category));
        items = applySort(items, sort, "question");
        const page = paginate(items, s.page, s.size); s.page = page.page;
        document.getElementById("faqsContainer").innerHTML = page.items.map(x => `<article class="data-card"><h3>${escapeHTML(x.question)}</h3><p>${escapeHTML(x.answer)}</p><span class="data-tag">${escapeHTML(x.category)}</span></article>`).join("") || "<p>No FAQs found.</p>";
        renderPagination("faqsPagination", page.page, page.totalPages, p => { s.page=p; renderFAQs(); });
    }

    async function initializeData() {
        document.getElementById("eventsLoading").hidden = false;
        const [events, students, faqs] = await Promise.all([fetchJSON("events.json", "events"), fetchJSON("students.json", "students"), fetchJSON("faqs.json", "faqs")]);
        state.events.data = events; state.students.data = students; state.faqs.data = faqs;
        fillSelect("eventCategory", [...new Set(events.map(e => e.category))]);
        fillSelect("studentCourse", [...new Set(students.map(s => s.course))]);
        fillSelect("faqCategory", [...new Set(faqs.map(f => f.category))]);
        document.getElementById("eventsLoading").hidden = true;
        document.getElementById("studentsLoading").hidden = true;
        document.getElementById("faqsLoading").hidden = true;
        renderEvents(); renderStudents(); renderFAQs();
        showStatus(fallbackUsed
            ? "✓ Data loaded using the local fallback because direct file:// JSON Fetch is restricted by the browser. Search, filter, sort and pagination are ready."
            : "✓ JSON datasets loaded successfully using Fetch API. Search, filter, sort and pagination are ready.", "success");
    }

    ["eventSearch","eventCategory","eventSort"].forEach(id => document.getElementById(id).addEventListener("change", () => { state.events.page=1; renderEvents(); }));
    ["studentSearch","studentCourse","studentSort"].forEach(id => document.getElementById(id).addEventListener("change", () => { state.students.page=1; renderStudents(); }));
    ["faqSearch","faqCategory","faqSort"].forEach(id => document.getElementById(id).addEventListener("change", () => { state.faqs.page=1; renderFAQs(); }));

    initializeData().catch(error => {
        console.error(error);
        showStatus("Unable to load the JSON datasets.", "error");
    });
})();


/* ===== PRACTICAL 6 ===== */
(function () {
    const container = document.getElementById("dataContainer");
    if (!container) return;

    const dataType = document.getElementById("dataType");
    const searchBox = document.getElementById("searchBox");
    const filterBox = document.getElementById("filterBox");
    const sortBox = document.getElementById("sortBox");
    const status = document.getElementById("dataStatus");
    const previous = document.getElementById("previousButton");
    const next = document.getElementById("nextButton");
    const pageInfo = document.getElementById("pageInfo");

    let records = [];
    let page = 1;
    const perPage = 4;

    const fallback = {"events":[{"id":1,"title":"Tech Fest 2026","date":"2026-10-15","category":"Technical","location":"CHARUSAT Campus"},{"id":2,"title":"Coding Contest","date":"2026-10-20","category":"Competition","location":"Computer Lab 1"},{"id":3,"title":"Web Development Workshop","date":"2026-10-25","category":"Workshop","location":"Seminar Hall"},{"id":4,"title":"Sports Day","date":"2026-11-02","category":"Sports","location":"University Ground"},{"id":5,"title":"AI Seminar","date":"2026-11-08","category":"Seminar","location":"Auditorium"},{"id":6,"title":"Hackathon 2026","date":"2026-11-15","category":"Competition","location":"Innovation Lab"},{"id":7,"title":"Photography Contest","date":"2026-11-20","category":"Cultural","location":"Main Block"},{"id":8,"title":"Career Guidance Session","date":"2026-11-25","category":"Career","location":"Seminar Hall"},{"id":9,"title":"Cyber Security Workshop","date":"2026-12-03","category":"Workshop","location":"Computer Lab 2"},{"id":10,"title":"Annual Cultural Fest","date":"2026-12-10","category":"Cultural","location":"University Ground"},{"id":11,"title":"Cloud Computing Seminar","date":"2026-12-15","category":"Technical","location":"Auditorium"},{"id":12,"title":"Robotics Exhibition","date":"2026-12-18","category":"Technical","location":"Innovation Lab"},{"id":13,"title":"Resume Building Workshop","date":"2027-01-05","category":"Career","location":"Seminar Hall"},{"id":14,"title":"Inter College Cricket","date":"2027-01-12","category":"Sports","location":"University Ground"},{"id":15,"title":"Music and Dance Night","date":"2027-01-20","category":"Cultural","location":"Main Stage"}],"students":[{"id":101,"name":"Aarav Patel","email":"aarav.patel@example.com","course":"BTech IT","year":2},{"id":102,"name":"Riya Shah","email":"riya.shah@example.com","course":"BTech CSE","year":2},{"id":103,"name":"Dev Mehta","email":"dev.mehta@example.com","course":"BTech IT","year":3},{"id":104,"name":"Neha Joshi","email":"neha.joshi@example.com","course":"BTech CE","year":2},{"id":105,"name":"Karan Desai","email":"karan.desai@example.com","course":"BTech CSE","year":3},{"id":106,"name":"Ishita Trivedi","email":"ishita.trivedi@example.com","course":"BTech IT","year":1},{"id":107,"name":"Manav Shah","email":"manav.shah@example.com","course":"BTech CE","year":4},{"id":108,"name":"Anaya Patel","email":"anaya.patel@example.com","course":"BTech CSE","year":2},{"id":109,"name":"Dhruv Parmar","email":"dhruv.parmar@example.com","course":"BTech IT","year":3},{"id":110,"name":"Mira Dave","email":"mira.dave@example.com","course":"BTech CE","year":1},{"id":111,"name":"Vivaan Joshi","email":"vivaan.joshi@example.com","course":"BTech CSE","year":4},{"id":112,"name":"Diya Mehta","email":"diya.mehta@example.com","course":"BTech IT","year":2},{"id":113,"name":"Yash Patel","email":"yash.patel@example.com","course":"BTech CE","year":3},{"id":114,"name":"Kiara Shah","email":"kiara.shah@example.com","course":"BTech CSE","year":1},{"id":115,"name":"Harsh Trivedi","email":"harsh.trivedi@example.com","course":"BTech IT","year":4}],"faqs":[{"id":1,"question":"What is StudentHub?","answer":"StudentHub is a portal for managing student information and activities."},{"id":2,"question":"How do I register?","answer":"Open the Register page and fill in the required details."},{"id":3,"question":"How do I login?","answer":"Use your registered email and password on the Login page."},{"id":4,"question":"Where can I see events?","answer":"Events can be viewed in the StudentHub event section."},{"id":5,"question":"Can I update my profile?","answer":"Yes, profile information can be updated from the Profile page."},{"id":6,"question":"Where can I check attendance?","answer":"Open the Attendance page to view attendance information."},{"id":7,"question":"Where are my results?","answer":"Your academic results are available on the Results page."},{"id":8,"question":"How can I contact StudentHub?","answer":"Use the Contact page to send your message."},{"id":9,"question":"Can I search student records?","answer":"Yes, the student data section provides a search option."},{"id":10,"question":"What data can be loaded from JSON?","answer":"StudentHub can load events, students, and FAQ data from JSON files."},{"id":11,"question":"How can I search events?","answer":"Use the search box on the Events page to find an event."},{"id":12,"question":"Can I filter student data?","answer":"Yes, student records can be filtered by course."},{"id":13,"question":"Can JSON data be sorted?","answer":"Yes, the Data Explorer provides A-Z and Z-A sorting."},{"id":14,"question":"What is pagination?","answer":"Pagination divides many records into smaller pages for easier viewing."},{"id":15,"question":"What is Fetch API?","answer":"Fetch API is used to request and read data from JSON files."}]};

    function loadData() {
        status.textContent = "Loading JSON data...";
        fetch("../json/" + dataType.value + ".json")
            .then(response => {
                if (!response.ok) throw new Error("JSON file not found");
                return response.json();
            })
            .then(data => {
                records = data;
                status.textContent = "JSON data loaded successfully.";
                page = 1;
                setFilter();
                showData();
            })
            .catch(() => {
                records = fallback[dataType.value];
                status.textContent = "Using local data because direct file access blocked Fetch.";
                page = 1;
                setFilter();
                showData();
            });
    }

    function setFilter() {
        filterBox.innerHTML = '<option value="all">All</option>';
        let values = [];
        if (dataType.value === "events") values = [...new Set(records.map(x => x.category))];
        if (dataType.value === "students") values = [...new Set(records.map(x => x.course))];

        values.forEach(value => {
            filterBox.innerHTML += `<option value="${value}">${value}</option>`;
        });
    }

    function nameOf(item) {
        return item.title || item.name || item.question;
    }

    function showData() {
        let result = records.filter(item =>
            JSON.stringify(item).toLowerCase().includes(searchBox.value.toLowerCase())
        );

        if (filterBox.value !== "all") {
            if (dataType.value === "events")
                result = result.filter(item => item.category === filterBox.value);
            if (dataType.value === "students")
                result = result.filter(item => item.course === filterBox.value);
        }

        if (sortBox.value === "asc")
            result.sort((a,b) => nameOf(a).localeCompare(nameOf(b)));
        if (sortBox.value === "desc")
            result.sort((a,b) => nameOf(b).localeCompare(nameOf(a)));

        const totalPages = Math.max(1, Math.ceil(result.length / perPage));
        if (page > totalPages) page = totalPages;

        const start = (page - 1) * perPage;
        const current = result.slice(start, start + perPage);

        container.innerHTML = current.length
            ? current.map(makeCard).join("")
            : "<p>No matching records found.</p>";

        pageInfo.textContent = `Page ${page} of ${totalPages}`;
        previous.disabled = page === 1;
        next.disabled = page === totalPages;
    }

    function makeCard(item) {
        if (dataType.value === "events") return `
            <article class="data-card">
                <h3>${item.title}</h3>
                <p><strong>Date:</strong> ${item.date}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Location:</strong> ${item.location}</p>
            </article>`;

        if (dataType.value === "students") return `
            <article class="data-card">
                <h3>${item.name}</h3>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Course:</strong> ${item.course}</p>
                <p><strong>Year:</strong> ${item.year}</p>
            </article>`;

        return `
            <article class="data-card">
                <h3>${item.question}</h3>
                <p>${item.answer}</p>
            </article>`;
    }

    searchBox.addEventListener("input", () => { page = 1; showData(); });
    filterBox.addEventListener("change", () => { page = 1; showData(); });
    sortBox.addEventListener("change", () => { page = 1; showData(); });

    dataType.addEventListener("change", () => {
        searchBox.value = "";
        sortBox.value = "default";
        page = 1;
        loadData();
    });

    previous.addEventListener("click", () => {
        if (page > 1) { page--; showData(); }
    });

    next.addEventListener("click", () => {
        const totalPages = Math.max(1, Math.ceil(records.length / perPage));
        if (page < totalPages) { page++; showData(); }
    });

    loadData();
})();
