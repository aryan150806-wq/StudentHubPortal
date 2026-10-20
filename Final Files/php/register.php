
<?php
// StudentHub Practical 9: Secure User Registration

// Include the existing database connection.
require_once 'db_mysqli.php';

// Function to safely display messages.
function e($value) {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$errors = [];
$success = false;
$savedName = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get form data.
    $name = trim($_POST['name'] ?? '');
    $studentId = trim($_POST['studentId'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $program = trim($_POST['program'] ?? '');
    $semester = trim($_POST['semester'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';

    // ---------------- BACKEND VALIDATION ----------------

    if (!preg_match('/^[A-Za-z ]{2,50}$/', $name)) {
        $errors[] = 'Enter a valid name.';
    }

    if (!preg_match('/^[0-9]{2}[A-Za-z]{3}[0-9]{3}$/', $studentId)) {
        $errors[] = 'Invalid Student ID. Example: 25DCE191.';
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Enter a valid email address.';
    }

    if (!preg_match('/^[6-9][0-9]{9}$/', $phone)) {
        $errors[] = 'Enter a valid 10-digit mobile number.';
    }

    if (!in_array($program, ['B.Tech', 'BCA', 'MCA'], true)) {
        $errors[] = 'Select a valid program.';
    }

    if (
        filter_var($semester, FILTER_VALIDATE_INT) === false ||
        (int)$semester < 1 ||
        (int)$semester > 8
    ) {
        $errors[] = 'Semester must be between 1 and 8.';
    }

    if (!preg_match(
        '/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*!]).{8,}$/',
        $password
    )) {
        $errors[] = 'Password must contain at least 8 characters, uppercase, lowercase, number and special character.';
    }

    if ($password !== $confirmPassword) {
        $errors[] = 'Passwords do not match.';
    }

    // ---------------- DATABASE INSERTION ----------------

    if (empty($errors)) {

        // Escape user input before using it in SQL queries.
        $studentIdSafe = $conn->real_escape_string($studentId);
        $nameSafe = $conn->real_escape_string($name);
        $emailSafe = $conn->real_escape_string($email);
        $phoneSafe = $conn->real_escape_string($phone);
        $programSafe = $conn->real_escape_string($program);

        $semesterValue = (int)$semester;

        // Check for duplicate Student ID or email.
        $checkQuery = "SELECT student_id FROM students
                       WHERE student_id = '$studentIdSafe'
                       OR email = '$emailSafe'";

        $checkResult = $conn->query($checkQuery);

        if (!$checkResult) {
            $errors[] = 'Unable to check existing registration.';
        } elseif ($checkResult->num_rows > 0) {
            $errors[] = 'This Student ID or email is already registered.';
        } else {

            // Hash the password before storing it.
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $passwordSafe = $conn->real_escape_string($passwordHash);

            // Insert registration details into the students table.
            $insertQuery = "INSERT INTO students
                (student_id, name, email, phone, program, semester, password)
                VALUES (
                    '$studentIdSafe',
                    '$nameSafe',
                    '$emailSafe',
                    '$phoneSafe',
                    '$programSafe',
                    $semesterValue,
                    '$passwordSafe'
                )";

            if ($conn->query($insertQuery)) {
                $success = true;
                $savedName = $name;
            } else {
                $errors[] = 'Registration failed. Please try again.';
            }
        }
    }

} else {
    $errors[] = 'Please submit the registration form.';
}

if (!empty($errors)) {
    http_response_code(422);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudentHub - Registration Result</title>
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <main class="registration-result">
        <section>

            <?php if ($success): ?>

                <h1>Registration Successful!</h1>

                <p class="form-success show">
                    Thank you, <?= e($savedName) ?>.
                    Your account has been created successfully.
                </p>

                <p>Your details have been saved in the StudentHub database.</p>

            <?php else: ?>

                <h1>Registration Not Completed</h1>

                <div class="error-message status-error" role="alert">
                    <ul>
                        <?php foreach ($errors as $message): ?>
                            <li><?= e($message) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>

            <?php endif; ?>

            <p>
                <a href="../html/register.html">
                    Return to Registration Form
                </a>
            </p>

            <p>
                <a href="../html/index.html">
                    Return to StudentHub Home
                </a>
            </p>

        </section>
    </main>
</body>
</html>
