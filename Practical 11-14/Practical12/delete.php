
<?php
require_once "db.php";
requireAdmin();

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: index.php");
    exit;
}

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

if (!$id) {
    header("Location: index.php?message=" .
        urlencode("Invalid event ID."));
    exit;
}

// Find the event and its poster
$stmt = $conn->prepare("SELECT poster FROM events WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$event = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$event) {
    header("Location: index.php?message=" .
        urlencode("Event not found."));
    exit;
}

// Delete event
$stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    // Delete associated poster
    if (!empty($event["poster"])) {

        $posterPath = "uploads/" . $event["poster"];

        if (file_exists($posterPath)) {
            unlink($posterPath);
        }
    }

    $message = "Event deleted successfully.";

} else {

    $message = "Failed to delete event.";

}

$stmt->close();

header("Location: index.php?message=" . urlencode($message));
exit;
?>
