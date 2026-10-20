<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/db_mysqli.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../html/login.html');
    exit;
}

$studentId = trim($_POST['studentId'] ?? '');
$password = $_POST['password'] ?? '';

if ($studentId === '' || $password === '') {
    header('Location: ../html/login.html?message=required');
    exit;
}

$stmt = $conn->prepare(
    'SELECT student_id, name, email, program, semester, password, role
     FROM students
     WHERE student_id = ?
     LIMIT 1'
);

if (!$stmt) {
    header('Location: ../html/login.html?message=database');
    exit;
}

$stmt->bind_param('s', $studentId);

if (!$stmt->execute()) {
    $stmt->close();
    header('Location: ../html/login.html?message=database');
    exit;
}

$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user || !password_verify($password, $user['password'])) {
    header('Location: ../html/login.html?message=invalid');
    exit;
}

$role = $user['role'] ?? 'student';
if (!in_array($role, ['student', 'admin'], true)) {
    header('Location: ../html/login.html?message=denied');
    exit;
}

// Prevent session fixation by generating a new session ID after login.
session_regenerate_id(true);

$_SESSION['user_id'] = $user['student_id'];
$_SESSION['student_id'] = $user['student_id'];
$_SESSION['name'] = $user['name'];
$_SESSION['email'] = $user['email'];
$_SESSION['program'] = $user['program'];
$_SESSION['semester'] = $user['semester'];
$_SESSION['role'] = $role;
$_SESSION['last_activity'] = time();

if ($role === 'admin') {
    header('Location: ../html/admin_dashboard.php');
} else {
    header('Location: ../html/dashboard.php');
}
exit;
?>
