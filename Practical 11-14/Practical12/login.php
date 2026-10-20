
<?php
require_once "db.php";

$error = "";

if (isset($_SESSION["admin_id"])) {
    header("Location: index.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"] ?? "");
    $password = $_POST["password"] ?? "";

    if ($username === "" || $password === "") {
        $error = "Please enter both username and password.";
    } else {
        $stmt = $conn->prepare(
            "SELECT id, username, password FROM admins WHERE username = ?"
        );

        if (!$stmt) {
            die("SQL Error: " . $conn->error);
        }

        $stmt->bind_param("s", $username);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($admin = $result->fetch_assoc()) {
            if (password_verify($password, $admin["password"])) {
                session_regenerate_id(true);

                $_SESSION["admin_id"] = $admin["id"];
                $_SESSION["admin_username"] = $admin["username"];

                header("Location: index.php");
                exit;
            }
        }

        $error = "Invalid username or password.";
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

<h2>Event Management Admin Login</h2>

<?php if ($error !== ""): ?>
    <p style="color:red;">
        <?php echo clean($error); ?>
    </p>
<?php endif; ?>

<form method="POST" action="login.php">
    <label>Username:</label><br>
    <input type="text" name="username" required>
    <br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required>
    <br><br>

    <button type="submit">Login</button>
</form>

</body>
</html>
