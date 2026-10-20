<?php
require_once __DIR__ . '/auth.php';

// Clear session variables.
$_SESSION = [];

// Remove the session cookie from the browser.
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $params['path'],
        $params['domain'] ?? '', $params['secure'], $params['httponly']);
}

// Destroy the server-side session.
session_destroy();

header('Location: ../html/login.html?message=logout');
exit;
?>
