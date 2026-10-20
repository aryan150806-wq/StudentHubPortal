<?php
include "db.php";

$search = $_GET['search'] ?? '';
$course = $_GET['course'] ?? '';

$sql = "SELECT * FROM students
        WHERE (? = '' OR name LIKE ? OR email LIKE ? OR course LIKE ?)
        AND (? = '' OR course = ?)
        ORDER BY id DESC";

$stmt = $conn->prepare($sql);

$searchValue = "%" . $search . "%";

$stmt->bind_param(
    "ssssss",
    $search,
    $searchValue,
    $searchValue,
    $searchValue,
    $course,
    $course
);

$stmt->execute();
$result = $stmt->get_result();

$courses = [
    "Computer Engineering",
    "Information Technology",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering"
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Management System</title>
</head>
<body>

<h1>Student Management System</h1>

<a href="add.php">Add New Student</a>

<hr>

<h2>Search and Filter Students</h2>

<form method="GET" action="index.php">

    <label>Search by Name, Email or Course:</label>
    <input type="text" name="search"
           value="<?php echo htmlspecialchars($search); ?>">

    <label>Filter by Course:</label>

    <select name="course">
        <option value="">All Courses</option>

        <?php foreach ($courses as $c) { ?>
            <option value="<?php echo htmlspecialchars($c); ?>"
                <?php if ($course == $c) echo "selected"; ?>>
                <?php echo htmlspecialchars($c); ?>
            </option>
        <?php } ?>
    </select>

    <button type="submit">Search</button>
    <a href="index.php">Reset</a>

</form>

<hr>

<h2>Student Records</h2>

<table border="1" cellpadding="8" cellspacing="0">

    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Course</th>
        <th>Actions</th>
    </tr>

    <?php if ($result->num_rows > 0) { ?>

        <?php while ($row = $result->fetch_assoc()) { ?>

            <tr>
                <td><?php echo $row['id']; ?></td>

                <td>
                    <?php echo htmlspecialchars($row['name']); ?>
                </td>

                <td>
                    <?php echo htmlspecialchars($row['email']); ?>
                </td>

                <td>
                    <?php echo htmlspecialchars($row['course']); ?>
                </td>

                <td>
                    <a href="edit.php?id=<?php echo $row['id']; ?>">
                        Edit
                    </a>

                    |

                    <form method="POST" action="delete.php"
                          style="display:inline;"
                          onsubmit="return confirm('Are you sure you want to delete this student?');">

                        <input type="hidden" name="id"
                               value="<?php echo $row['id']; ?>">

                        <button type="submit">Delete</button>

                    </form>
                </td>
            </tr>

        <?php } ?>

    <?php } else { ?>

        <tr>
            <td colspan="5">No student records found.</td>
        </tr>

    <?php } ?>

</table>

<?php
if (isset($_GET['message'])) {
    echo "<p>" . htmlspecialchars($_GET['message']) . "</p>";
}
?>

</body>
</html>

<?php
$stmt->close();
$conn->close();
?>