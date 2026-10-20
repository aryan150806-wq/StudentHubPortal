<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Management System</title>
</head>

<body>

    <h1>Student Management System</h1>

    <h2>Add / Update Student</h2>

    <form id="studentForm">

        <input type="hidden" id="studentId">

        <label>Name:</label>
        <input type="text" id="name" required>
        <br><br>

        <label>Email:</label>
        <input type="email" id="email" required>
        <br><br>

        <label>Course:</label>
        <input type="text" id="course" required>
        <br><br>

        <button type="submit" id="submitBtn">Add Student</button>

        <button type="button" id="cancelBtn" hidden>
            Cancel Update
        </button>

    </form>

    <p id="message" aria-live="polite"></p>

    <h2>Student Records</h2>

    <p id="loading">Loading students...</p>

    <table border="1" cellpadding="8">

        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody id="studentTable"></tbody>

    </table>

    <script src="script.js"></script>

</body>
</html>