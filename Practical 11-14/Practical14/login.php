<?php
require_once "db.php";

if (isset($_SESSION["user_id"]) && $_SESSION["role"] === "admin") {
    header("Location: dashboard.php");
    exit;
}

$message = "";

if (isset($_GET["error"]) && $_GET["error"] === "access") {
    $message = "Access denied. Only administrators can access the dashboard.";
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $username = trim($_POST["username"] ?? "");
    $password = $_POST["password"] ?? "";

    if ($username === "" || $password === "") {
        $message = "Please enter username and password.";
    } else {

        $stmt = $conn->prepare(
            "SELECT id, username, password, role FROM users WHERE username = ?"
        );

        $stmt->bind_param("s", $username);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($user = $result->fetch_assoc()) {

            if (password_verify($password, $user["password"])) {

                if ($user["role"] !== "admin") {
                    logAction(
                        $conn,
                        $user["id"],
                        "Denied dashboard access for non-admin user"
                    );

                    $message = "Access denied. Admin privileges required.";

                } else {

                    session_regenerate_id(true);

                    $_SESSION["user_id"] = $user["id"];
                    $_SESSION["username"] = $user["username"];
                    $_SESSION["role"] = $user["role"];

                    logAction(
                        $conn,
                        $user["id"],
                        "Admin logged in"
                    );

                    header("Location: dashboard.php");
                    exit;
                }

            } else {
                $message = "Invalid username or password.";
            }

        } else {
            $message = "Invalid username or password.";
        }

        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Admin Login</title>
</head>

<body>

    <h1>Admin Login</h1>

    <p><?php echo clean($message); ?></p>

    <form method="POST">

        <label>Username:</label>
        <input type="text" name="username" required>
        <br><br>

        <label>Password:</label>
        <input type="password" name="password" required>
        <br><br>

        <button type="submit">Login</button>

    </form>

    <p>Demo Username: admin</p>
    <p>Demo Password: password</p>

</body>
</html>