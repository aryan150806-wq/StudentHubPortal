<?php
require_once __DIR__ . '/../php/auth.php';
require_role('student');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudentHub - Student Dashboard</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <div class="header-top">
            <div class="logo-container">
                <img src="../images/logo.jpg" alt="StudentHub Portal Logo">
                <h1>StudentHub Portal</h1>
            </div>
            <div class="header-actions">
                <button id="themeButton" class="icon-button" type="button" aria-label="Switch to dark mode">🌙</button>
                <button id="menuButton" class="menu-button" type="button" aria-controls="navMenu" aria-expanded="false" aria-label="Open navigation menu">☰</button>
            </div>
        </div>
        <nav id="navMenu" aria-label="Main Navigation">
            <a class="nav-link" href="index.html">Home</a>
            <a class="nav-link" href="dashboard.php">Dashboard</a>
            <a class="nav-link" href="courses.html">Courses</a>
            <a class="nav-link" href="attendance.html">Attendance</a>
            <a class="nav-link" href="assignments.html">Assignments</a>
            <a class="nav-link" href="results.html">Results</a>
            <a class="nav-link" href="profile.html">Profile</a>
            <a class="nav-link" href="contact.html">Contact</a>
            <a class="nav-link" href="events.html">Events</a>
            <a class="nav-link" href="../php/logout.php">Logout</a>
        </nav>
    </header>

    <main>
        <section>
            <h2>Welcome, <?= h($_SESSION['name']) ?></h2>
            <p><strong>Student ID:</strong> <?= h($_SESSION['student_id']) ?></p>
            <p><strong>Email:</strong> <?= h($_SESSION['email']) ?></p>
            <p><strong>Program:</strong> <?= h($_SESSION['program']) ?></p>
            <p><strong>Semester:</strong> <?= h($_SESSION['semester']) ?></p>
            <p><strong>Role:</strong> Student</p>
        </section>

        <section class="card-container">
            <h2>Academic Summary</h2>
            <article><h3>Attendance</h3><p>View your attendance information.</p><a href="attendance.html">View Attendance</a></article>
            <article><h3>Assignments</h3><p>Check your pending assignments.</p><a href="assignments.html">View Assignments</a></article>
            <article><h3>Results</h3><p>View your academic results.</p><a href="results.html">View Results</a></article>
        </section>

        <section>
            <h2>Session Information</h2>
            <p>Your dashboard is protected by PHP session authentication. The session expires after 15 minutes of inactivity.</p>
        </section>
    </main>

    <footer><p>&copy; 2026 StudentHub Portal</p></footer>
    <script src="../js/script.js"></script>
</body>
</html>
