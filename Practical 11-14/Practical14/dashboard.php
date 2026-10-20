<?php
require_once "db.php";

requireAdmin();

// Get dashboard statistics
$userCount = $conn->query(
    "SELECT COUNT(*) AS total FROM users"
)->fetch_assoc()["total"];

$studentCount = $conn->query(
    "SELECT COUNT(*) AS total FROM students"
)->fetch_assoc()["total"];

$eventCount = $conn->query(
    "SELECT COUNT(*) AS total FROM events"
)->fetch_assoc()["total"];

$registrationCount = $conn->query(
    "SELECT COUNT(*) AS total FROM registrations"
)->fetch_assoc()["total"];

// Get latest registrations
$registrations = $conn->query("
    SELECT registrations.id,
           students.name AS student_name,
           events.title AS event_title,
           registrations.registered_at
    FROM registrations
    INNER JOIN students
        ON registrations.student_id = students.id
    INNER JOIN events
        ON registrations.event_id = events.id
    ORDER BY registrations.registered_at DESC
    LIMIT 5
");

// Get recent audit logs
$logs = $conn->query("
    SELECT audit_logs.action,
           audit_logs.created_at,
           users.username
    FROM audit_logs
    LEFT JOIN users ON audit_logs.user_id = users.id
    ORDER BY audit_logs.id DESC
    LIMIT 10
");

// Generate menu according to role
$menuItems = [];

if ($_SESSION["role"] === "admin") {
    $menuItems = [
        "Dashboard" => "#dashboard",
        "Users" => "#users",
        "Students" => "#students",
        "Events" => "#events",
        "Registrations" => "#registrations",
        "Audit Logs" => "#audit"
    ];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
</head>

<body>

    <h1>Admin Dashboard</h1>

    <p>
        Welcome, <?php echo clean($_SESSION["username"]); ?>
    </p>

    <p>
        Role: <?php echo clean($_SESSION["role"]); ?>
    </p>

    <nav>
        <h3>Dynamic Menu</h3>

        <?php foreach ($menuItems as $name => $link) { ?>
            <a href="<?php echo $link; ?>">
                <?php echo clean($name); ?>
            </a>
            |
        <?php } ?>

        <a href="logout.php">Logout</a>
    </nav>

    <hr>

    <section id="dashboard">

        <h2>Dashboard Statistics</h2>

        <p>Total Users: <?php echo $userCount; ?></p>

        <p>Total Students: <?php echo $studentCount; ?></p>

        <p>Total Events: <?php echo $eventCount; ?></p>

        <p>Total Registrations: <?php echo $registrationCount; ?></p>

    </section>

    <hr>

    <section id="registrations">

        <h2>Latest Registrations</h2>

        <table border="1" cellpadding="8">

            <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Event Name</th>
                <th>Registration Date</th>
            </tr>

            <?php while ($row = $registrations->fetch_assoc()) { ?>

                <tr>
                    <td><?php echo clean($row["id"]); ?></td>

                    <td><?php echo clean($row["student_name"]); ?></td>

                    <td><?php echo clean($row["event_title"]); ?></td>

                    <td><?php echo clean($row["registered_at"]); ?></td>
                </tr>

            <?php } ?>

        </table>

    </section>

    <hr>

    <section id="audit">

        <h2>Audit Logs</h2>

        <table border="1" cellpadding="8">

            <tr>
                <th>Username</th>
                <th>Activity</th>
                <th>Date and Time</th>
            </tr>

            <?php while ($row = $logs->fetch_assoc()) { ?>

                <tr>
                    <td>
                        <?php echo clean($row["username"] ?? "Unknown"); ?>
                    </td>

                    <td><?php echo clean($row["action"]); ?></td>

                    <td><?php echo clean($row["created_at"]); ?></td>
                </tr>

            <?php } ?>

        </table>

    </section>

</body>
</html>