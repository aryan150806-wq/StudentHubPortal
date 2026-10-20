
<?php
session_start();

$conn = new mysqli("localhost", "root", "", "practical12_db");

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

// Check whether admin is logged in
function requireAdmin() {
    if (!isset($_SESSION["admin_id"])) {
        header("Location: login.php");
        exit;
    }
}

// Escape output before displaying it
function clean($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, "UTF-8");
}
?>
