const apiUrl = "http://127.0.0.1:5000";  // Base API URL

// Fetch and display tasks
function fetchTasks() {
    fetch(apiUrl + "/")
        .then(response => response.json())
        .then(tasks => {
            let taskList = document.getElementById("tasks");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                taskList.innerHTML += `
                    <div class="task">
                        <span>${task.task} - ${task.completed ? "✅" : "❌"}</span>
                        <button onclick="updateTask('${task.task}')">Complete</button>
                        <button onclick="deleteTask('${task.task}')">Delete</button>
                    </div>
                `;
            });
        });
}

// Add a new task
function add_task() {
    let taskInput = document.getElementById("taskInput").value;
    fetch(apiUrl + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: taskInput, completed: false })  // Ensure `completed` field is added
    }).then(() => {
        fetchTasks();
        document.getElementById("taskInput").value = "";  // Clear input
    });
}

// Update task status
function updateTask(task) {
    fetch(`${apiUrl}/update/${task}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true })  // Mark task as completed
    }).then(() => fetchTasks());
}

// Delete a task
function deleteTask(task) {
    fetch(`${apiUrl}/delete/${task}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }).then(() => fetchTasks());
}

// Load tasks on page load
window.onload = fetchTasks;
