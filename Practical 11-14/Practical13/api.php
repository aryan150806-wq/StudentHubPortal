<?php

header("Content-Type: application/json");

require_once "db.php";

$method = $_SERVER["REQUEST_METHOD"];

// GET: Fetch all students
if ($method == "GET") {

    $sql = "SELECT * FROM students ORDER BY id DESC";
    $result = $conn->query($sql);

    $students = [];

    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $students
    ]);

    exit;
}

// POST: Add, Update or Delete
if ($method == "POST") {

    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Invalid JSON data."
        ]);
        exit;
    }

    $action = $input["action"] ?? "";

    // ADD STUDENT
    if ($action == "add") {

        $name = trim($input["name"] ?? "");
        $email = trim($input["email"] ?? "");
        $course = trim($input["course"] ?? "");

        if ($name == "" || $email == "" || $course == "") {
            echo json_encode([
                "success" => false,
                "message" => "All fields are required."
            ]);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([
                "success" => false,
                "message" => "Enter a valid email address."
            ]);
            exit;
        }

        $stmt = $conn->prepare(
            "INSERT INTO students (name, email, course) VALUES (?, ?, ?)"
        );

        $stmt->bind_param("sss", $name, $email, $course);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Student added successfully."
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Unable to add student."
            ]);
        }

        exit;
    }

    // UPDATE STUDENT
    if ($action == "update") {

        $id = filter_var($input["id"] ?? null, FILTER_VALIDATE_INT);
        $name = trim($input["name"] ?? "");
        $email = trim($input["email"] ?? "");
        $course = trim($input["course"] ?? "");

        if (!$id || $name == "" || $email == "" || $course == "") {
            echo json_encode([
                "success" => false,
                "message" => "Valid ID and all fields are required."
            ]);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([
                "success" => false,
                "message" => "Enter a valid email address."
            ]);
            exit;
        }

        $stmt = $conn->prepare(
            "UPDATE students SET name=?, email=?, course=? WHERE id=?"
        );

        $stmt->bind_param("sssi", $name, $email, $course, $id);

        if ($stmt->execute() && $stmt->affected_rows >= 0) {
            echo json_encode([
                "success" => true,
                "message" => "Student updated successfully."
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Unable to update student."
            ]);
        }

        exit;
    }

    // DELETE STUDENT
    if ($action == "delete") {

        $id = filter_var($input["id"] ?? null, FILTER_VALIDATE_INT);

        if (!$id) {
            echo json_encode([
                "success" => false,
                "message" => "Valid student ID is required."
            ]);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM students WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute() && $stmt->affected_rows > 0) {
            echo json_encode([
                "success" => true,
                "message" => "Student deleted successfully."
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Student not found or could not be deleted."
            ]);
        }

        exit;
    }

    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid action."
    ]);

    exit;
}

// Unsupported HTTP method
http_response_code(405);

echo json_encode([
    "success" => false,
    "message" => "Method not allowed."
]);

?>