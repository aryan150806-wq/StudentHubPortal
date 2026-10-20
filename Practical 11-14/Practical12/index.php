
<?php
require_once "db.php";
requireAdmin();

$message = $_GET["message"] ?? "";

$result = $conn->query("SELECT * FROM events ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Event Management</title>
</head>
<body>

<h1>Event Management System</h1>

<p>
    Welcome, <?php echo clean($_SESSION["admin_username"]); ?>
    |
    <a href="logout.php">Logout</a>
</p>

<p><?php echo clean($message); ?></p>

<a href="add.php">Add New Event</a>

<h2>All Events</h2>

<?php if ($result->num_rows > 0): ?>

<table border="1" cellpadding="8">

    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Date</th>
        <th>Location</th>
        <th>Status</th>
        <th>Poster</th>
        <th>Actions</th>
    </tr>

    <?php while ($event = $result->fetch_assoc()): ?>

    <tr>
        <td><?php echo $event["id"]; ?></td>

        <td><?php echo clean($event["title"]); ?></td>

        <td><?php echo clean($event["description"]); ?></td>

        <td><?php echo clean($event["event_date"]); ?></td>

        <td><?php echo clean($event["location"]); ?></td>

        <td><?php echo clean($event["status"]); ?></td>

        <td>
            <?php if (!empty($event["poster"])): ?>

                <img
                    src="uploads/<?php echo rawurlencode($event["poster"]); ?>"
                    width="100"
                    alt="Event Poster"
                >

            <?php else: ?>

                No Poster

            <?php endif; ?>
        </td>

        <td>

            <a href="edit.php?id=<?php echo $event["id"]; ?>">
                Edit
            </a>

            <form method="POST" action="delete.php"
                  onsubmit="return confirm('Are you sure you want to delete this event?');">

                <input type="hidden" name="id"
                       value="<?php echo $event["id"]; ?>">

                <button type="submit">Delete</button>

            </form>

        </td>
    </tr>

    <?php endwhile; ?>

</table>

<?php else: ?>

<p>No events available.</p>

<?php endif; ?>

</body>
</html>
