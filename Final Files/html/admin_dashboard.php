<?php
require_once __DIR__ . '/../php/auth.php';
require_role('admin');
require_once __DIR__ . '/../php/db_mysqli.php';

$totalStudents = 0;
$result = $conn->query("SELECT COUNT(*) AS total FROM students");
if ($result) {
    $row = $result->fetch_assoc();
    $totalStudents = (int)($row['total'] ?? 0);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudentHub - Admin Dashboard</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <div class="header-top">
            <div class="logo-container">
                <img src="../images/logo.jpg" alt="StudentHub Portal Logo">
                <h1>StudentHub Portal - Admin</h1>
            </div>
            <div class="header-actions">
                <button id="themeButton" class="icon-button" type="button" aria-label="Switch to dark mode">🌙</button>
                <button id="menuButton" class="menu-button" type="button" aria-controls="navMenu" aria-expanded="false" aria-label="Open navigation menu">☰</button>
            </div>
        </div>
        <nav id="navMenu" aria-label="Main Navigation">
            <a class="nav-link" href="index.html">Home</a>
            <a class="nav-link" href="admin_dashboard.php">Admin Dashboard</a>
            <a class="nav-link" href="contact.html">Contact</a>
            <a class="nav-link" href="../php/logout.php">Logout</a>
        </nav>
    </header>

    <main>
        <section>
            <h2>Welcome, <?= h($_SESSION['name']) ?></h2>
            <p><strong>Account:</strong> <?= h($_SESSION['student_id']) ?></p>
            <p><strong>Role:</strong> Administrator</p>
        </section>
        <section>
            <h2>Portal Overview</h2>
            <article class="card">
                <h3>Total Registered Students</h3>
                <p><?= $totalStudents ?></p>
            </article>
            <p>This page is accessible only to accounts assigned the admin role.</p>
        </section>
    </main>

    <footer><p>&copy; 2026 StudentHub Portal</p></footer>
    <script src="../js/script.js"></script>
</body>
</html>
