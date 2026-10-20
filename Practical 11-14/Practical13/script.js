const form = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const message = document.getElementById("message");
const loading = document.getElementById("loading");

const studentId = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const apiURL = "api.php";

// Display messages
function showMessage(text, success) {
    message.textContent = text;
    message.style.color = success ? "green" : "red";
}

// Load student records
async function loadStudents() {

    loading.textContent = "Loading students...";

    try {

        const response = await fetch(apiURL);
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error("Unable to load students.");
        }

        studentTable.innerHTML = "";

        result.data.forEach(student => {

            const row = document.createElement("tr");

            const values = [
                student.id,
                student.name,
                student.email,
                student.course
            ];

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actionCell = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => {
                editStudent(student);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                deleteStudent(student.id);
            });

            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);

            row.appendChild(actionCell);

            studentTable.appendChild(row);
        });

        loading.textContent = result.data.length === 0
            ? "No student records found."
            : "";

    } catch (error) {

        loading.textContent = error.message;
    }
}

// Add or update student
form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const id = studentId.value;

    const data = {
        action: id ? "update" : "add",
        id: id,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value.trim()
    };

    submitBtn.disabled = true;

    try {

        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        showMessage(result.message, result.success);

        if (response.ok && result.success) {
            form.reset();
            studentId.value = "";
            submitBtn.textContent = "Add Student";
            cancelBtn.hidden = true;

            loadStudents();
        }

    } catch (error) {

        showMessage("Server communication failed.", false);

    } finally {

        submitBtn.disabled = false;
    }
});

// Edit student
function editStudent(student) {

    studentId.value = student.id;
    nameInput.value = student.name;
    emailInput.value = student.email;
    courseInput.value = student.course;

    submitBtn.textContent = "Update Student";
    cancelBtn.hidden = false;

    showMessage("Editing student ID: " + student.id, true);
}

// Cancel update
cancelBtn.addEventListener("click", function() {

    form.reset();
    studentId.value = "";

    submitBtn.textContent = "Add Student";
    cancelBtn.hidden = true;

    showMessage("", true);
});

// Delete student
async function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    try {

        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "delete",
                id: id
            })
        });

        const result = await response.json();

        showMessage(result.message, result.success);

        if (response.ok && result.success) {
            loadStudents();
        }

    } catch (error) {

        showMessage("Unable to delete student.", false);
    }
}

// Load records when page opens
loadStudents();