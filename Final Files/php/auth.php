<?php
// Practical 10: shared session handling and access-control functions.

$sessionLifetime = 60; // 1 minutes of inactivity.

if (session_status() !== PHP_SESSION_ACTIVE) {
    // Local XAMPP uses HTTP. Enable secure=true when deployed over HTTPS.
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => false,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

// Automatically end a session after 1 minutes without activity.
if (isset($_SESSION['last_activity']) &&
    (time() - $_SESSION['last_activity']) > $sessionLifetime) {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'],
            $params['domain'] ?? '', $params['secure'], $params['httponly']);
    }
    session_destroy();
    header('Location: ../html/login.html?message=timeout');
    exit;
}

if (isset($_SESSION['user_id'])) {
    $_SESSION['last_activity'] = time();
}

function require_login(): void
{
    if (empty($_SESSION['user_id'])) {
        header('Location: login.html?message=denied');
        exit;
    }
}

function require_role(string $requiredRole): void
{
    require_login();
    if (($_SESSION['role'] ?? '') !== $requiredRole) {
        header('Location: login.html?message=denied');
        exit;
    }
}

function h($value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}
?>
