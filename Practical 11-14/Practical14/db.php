<?php
session_start();

$conn = new mysqli("localhost", "root", "", "practical14_db");

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

// Check whether the logged-in user is an admin
function requireAdmin() {
    if (!isset($_SESSION["user_id"]) ||
        !isset($_SESSION["role"]) ||
        $_SESSION["role"] !== "admin") {

        header("Location: login.php?error=access");
        exit;
    }
}

// Record important activities
function logAction($conn, $userId, $action) {
    $stmt = $conn->prepare(
        "INSERT INTO audit_logs (user_id, action) VALUES (?, ?)"
    );

    $stmt->bind_param("is", $userId, $action);
    $stmt->execute();
    $stmt->close();
}

// Safely display database values
function clean($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, "UTF-8");
}
?>