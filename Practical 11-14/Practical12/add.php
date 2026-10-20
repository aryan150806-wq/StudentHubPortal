
<?php
require_once "db.php";
requireAdmin();

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $title = trim($_POST["title"]);
    $description = trim($_POST["description"]);
    $event_date = $_POST["event_date"];
    $location = trim($_POST["location"]);
    $status = $_POST["status"];

    $poster = null;

    if (
        $title == "" || $description == "" ||
        $event_date == "" || $location == ""
    ) {
        $message = "Please fill in all required fields.";

    } elseif (!in_array($status, ["Upcoming", "Ongoing", "Completed"], true)) {
        $message = "Invalid event status.";

    } else {

        $date = DateTime::createFromFormat("Y-m-d", $event_date);

        if (!$date || $date->format("Y-m-d") !== $event_date) {
            $message = "Invalid event date.";
        }
    }

    // Check poster upload
    if ($message == "" && isset($_FILES["poster"])
        && $_FILES["poster"]["error"] != UPLOAD_ERR_NO_FILE) {

        if ($_FILES["poster"]["error"] != UPLOAD_ERR_OK) {
            $message = "Poster upload failed.";

        } elseif ($_FILES["poster"]["size"] > 2 * 1024 * 1024) {
            $message = "Poster size must not exceed 2 MB.";

        } else {

            $allowedTypes = [
                "image/jpeg" => "jpg",
                "image/png" => "png",
                "image/webp" => "webp"
            ];

            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $fileType = $finfo->file($_FILES["poster"]["tmp_name"]);

            if (!isset($allowedTypes[$fileType])) {
                $message = "Only JPG, PNG and WEBP files are allowed.";

            } else {

                $poster = uniqid("poster_", true) . "." . $allowedTypes[$fileType];

                $destination = "uploads/" . $poster;

                if (!move_uploaded_file(
                    $_FILES["poster"]["tmp_name"],
                    $destination
                )) {
                    $message = "Unable to upload poster.";
                    $poster = null;
                }
            }
        }
    }

    // Insert event into database
    if ($message == "") {

        $stmt = $conn->prepare(
            "INSERT INTO events
            (title, description, event_date, location, status, poster)
            VALUES (?, ?, ?, ?, ?, ?)"
        );

        $stmt->bind_param(
            "ssssss",
            $title,
            $description,
            $event_date,
            $location,
            $status,
            $poster
        );

        if ($stmt->execute()) {

            header("Location: index.php?message=" .
                urlencode("Event added successfully."));
            exit;

        } else {

            if ($poster != null && file_exists("uploads/" . $poster)) {
                unlink("uploads/" . $poster);
            }

            $message = "Failed to add event.";
        }

        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Event</title>
</head>
<body>

<h1>Add New Event</h1>

<p><?php echo clean($message); ?></p>

<form method="POST" action="add.php" enctype="multipart/form-data">

    <label>Event Title:</label>
    <input type="text" name="title" required>

    <br><br>

    <label>Description:</label>
    <textarea name="description" required></textarea>

    <br><br>

    <label>Event Date:</label>
    <input type="date" name="event_date" required>

    <br><br>

    <label>Location:</label>
    <input type="text" name="location" required>

    <br><br>

    <label>Status:</label>

    <select name="status" required>
        <option value="Upcoming">Upcoming</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
    </select>

    <br><br>

    <label>Upload Poster:</label>
    <input type="file" name="poster"
           accept=".jpg,.jpeg,.png,.webp">

    <p>Allowed formats: JPG, PNG, WEBP. Maximum size: 2 MB.</p>

    <button type="submit">Add Event</button>

</form>

<br>

<a href="index.php">Back to Events</a>

</body>
</html>
