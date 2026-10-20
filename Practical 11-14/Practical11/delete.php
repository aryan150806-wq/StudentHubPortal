<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

    if (!$id || $id <= 0) {
        header("Location: index.php?message=Invalid student ID");
        exit();
    }

    $stmt = $conn->prepare("DELETE FROM students WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {

        if ($stmt->affected_rows > 0) {
            header("Location: index.php?message=Student deleted successfully");
        } else {
            header("Location: index.php?message=Student record not found");
        }

    } else {
        header("Location: index.php?message=Failed to delete student");
    }

    $stmt->close();
    exit();

} else {
    header("Location: index.php");
    exit();
}

$conn->close();
?>