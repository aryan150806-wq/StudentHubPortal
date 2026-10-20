
<?php
require_once "db.php";
requireAdmin();

$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);

if (!$id) {
    die("Invalid event ID.");
}

// Fetch existing event
$stmt = $conn->prepare("SELECT * FROM events WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$event = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$event) {
    die("Event not found.");
}

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $title = trim($_POST["title"]);
    $description = trim($_POST["description"]);
    $event_date = $_POST["event_date"];
    $location = trim($_POST["location"]);
    $status = $_POST["status"];

    // Keep the existing poster by default
    $poster = $event["poster"];
    $newPosterUploaded = false;

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

    // Validate replacement poster
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

                if (move_uploaded_file(
                    $_FILES["poster"]["tmp_name"],
                    "uploads/" . $poster
                )) {
                    $newPosterUploaded = true;

                } else {
                    $message = "Unable to upload poster.";
                    $poster = $event["poster"];
                }
            }
        }
    }

    // Update database
    if ($message == "") {

        $stmt = $conn->prepare(
            "UPDATE events SET
            title = ?, description = ?, event_date = ?,
            location = ?, status = ?, poster = ?
            WHERE id = ?"
        );

        $stmt->bind_param(
            "ssssssi",
            $title,
            $description,
            $event_date,
            $location,
            $status,
            $poster,
            $id
        );

        if ($stmt->execute()) {

            $stmt->close();

            // Delete old poster after successful update
            if ($newPosterUploaded && !empty($event["poster"])) {

                $oldPoster = "uploads/" . $event["poster"];

                if (file_exists($oldPoster)) {
                    unlink($oldPoster);
                }
            }

            header("Location: index.php?message=" .
                urlencode("Event updated successfully."));
            exit;

        } else {

            if ($newPosterUploaded && file_exists("uploads/" . $poster)) {
                unlink("uploads/" . $poster);
            }

            $message = "Failed to update event.";
            $stmt->close();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Event</title>
</head>
<body>

<h1>Edit Event</h1>

<p><?php echo clean($message); ?></p>

<form method="POST"
      action="edit.php?id=<?php echo $id; ?>"
      enctype="multipart/form-data">

    <label>Event Title:</label>

    <input type="text" name="title"
           value="<?php echo clean($event["title"]); ?>" required>

    <br><br>

    <label>Description:</label>

    <textarea name="description" required><?php
        echo clean($event["description"]);
    ?></textarea>

    <br><br>

    <label>Event Date:</label>

    <input type="date" name="event_date"
           value="<?php echo clean($event["event_date"]); ?>" required>

    <br><br>

    <label>Location:</label>

    <input type="text" name="location"
           value="<?php echo clean($event["location"]); ?>" required>

    <br><br>

    <label>Status:</label>

    <select name="status" required>

        <?php
        $statuses = ["Upcoming", "Ongoing", "Completed"];

        foreach ($statuses as $option):
        ?>

            <option value="<?php echo clean($option); ?>"
                <?php
                echo ($event["status"] == $option) ? "selected" : "";
                ?>>
                <?php echo clean($option); ?>
            </option>

        <?php endforeach; ?>

    </select>

    <br><br>

    <p>Current Poster:</p>

    <?php if (!empty($event["poster"])): ?>

        <img src="uploads/<?php echo rawurlencode($event["poster"]); ?>"
             width="120" alt="Current Event Poster">

    <?php else: ?>

        <p>No poster uploaded.</p>

    <?php endif; ?>

    <br><br>

    <label>Replace Poster:</label>

    <input type="file" name="poster"
           accept=".jpg,.jpeg,.png,.webp">

    <p>Allowed formats: JPG, PNG, WEBP. Maximum size: 2 MB.</p>

    <button type="submit">Update Event</button>

</form>

<br>

<a href="index.php">Back to Events</a>

</body>
</html>
