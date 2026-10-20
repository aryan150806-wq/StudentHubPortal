<?php
include "db.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $course = $_POST['course'];

    $allowedCourses = [
        "Computer Engineering",
        "Information Technology",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Civil Engineering"
    ];

    if ($name == "" || $email == "" || $course == "") {
        $message = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = "Enter a valid email address.";
    } elseif (!in_array($course, $allowedCourses)) {
        $message = "Invalid course selected.";
    } else {

        $stmt = $conn->prepare(
            "INSERT INTO students (name, email, course)
             VALUES (?, ?, ?)"
        );

        $stmt->bind_param("sss", $name, $email, $course);

        if ($stmt->execute()) {
            header("Location: index.php?message=Student added successfully");
            exit();
        } else {
            $message = "Failed to add student. Email may already exist.";
        }

        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Student</title>
</head>
<body>

<h1>Add New Student</h1>

<form method="POST">

    <label>Name:</label><br>
    <input type="text" name="name" required>
    <br><br>

    <label>Email:</label><br>
    <input type="email" name="email" required>
    <br><br>

    <label>Course:</label><br>

    <select name="course" required>
        <option value="">Select Course</option>
        <option value="Computer Engineering">Computer Engineering</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Electrical Engineering">Electrical Engineering</option>
        <option value="Civil Engineering">Civil Engineering</option>
    </select>

    <br><br>

    <button type="submit">Add Student</button>

</form>

<p><?php echo htmlspecialchars($message); ?></p>

<br>
<a href="index.php">Back to Student List</a>

</body>
</html>