<?php
include "db.php";

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

if (!$id || $id <= 0) {
    die("Invalid student ID.");
}

$message = "";

$stmt = $conn->prepare("SELECT * FROM students WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$student = $result->fetch_assoc();

$stmt->close();

if (!$student) {
    die("Student not found.");
}

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
            "UPDATE students
             SET name = ?, email = ?, course = ?
             WHERE id = ?"
        );

        $stmt->bind_param("sssi", $name, $email, $course, $id);

        if ($stmt->execute()) {
            header("Location: index.php?message=Student updated successfully");
            exit();
        } else {
            $message = "Failed to update student. Email may already exist.";
        }

        $stmt->close();

        $student['name'] = $name;
        $student['email'] = $email;
        $student['course'] = $course;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Student</title>
</head>
<body>

<h1>Edit Student Details</h1>

<form method="POST">

    <label>Name:</label><br>
    <input type="text" name="name"
           value="<?php echo htmlspecialchars($student['name']); ?>"
           required>
    <br><br>

    <label>Email:</label><br>
    <input type="email" name="email"
           value="<?php echo htmlspecialchars($student['email']); ?>"
           required>
    <br><br>

    <label>Course:</label><br>

    <select name="course" required>
        <option value="Computer Engineering"
            <?php if ($student['course'] == "Computer Engineering") echo "selected"; ?>>
            Computer Engineering
        </option>

        <option value="Information Technology"
            <?php if ($student['course'] == "Information Technology") echo "selected"; ?>>
            Information Technology
        </option>

        <option value="Mechanical Engineering"
            <?php if ($student['course'] == "Mechanical Engineering") echo "selected"; ?>>
            Mechanical Engineering
        </option>

        <option value="Electrical Engineering"
            <?php if ($student['course'] == "Electrical Engineering") echo "selected"; ?>>
            Electrical Engineering
        </option>

        <option value="Civil Engineering"
            <?php if ($student['course'] == "Civil Engineering") echo "selected"; ?>>
            Civil Engineering
        </option>
    </select>

    <br><br>

    <button type="submit">Update Student</button>

</form>

<p><?php echo htmlspecialchars($message); ?></p>

<br>
<a href="index.php">Back to Student List</a>

</body>
</html>