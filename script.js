const taskInput = document.getElementById("taskInput");
const subject = document.getElementById("subject");
const deadline = document.getElementById("deadline");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksContainer = document.getElementById("tasksContainer");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const clearAllBtn = document.getElementById("clearAllBtn");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function displayTasks() {

    tasksContainer.innerHTML = "";

    // Show a message when there are no tasks
    if (tasks.length === 0) {

        tasksContainer.innerHTML = `
            <div class="empty-state">
                <p>🎉 No tasks yet!</p>
                <span>Add a task to get started.</span>
            </div>
        `;

        updateStats();

        return;
    }


    tasks.forEach((task, index) => {

        const taskElement = document.createElement("div");

        taskElement.classList.add("task");

        if (task.completed) {
            taskElement.classList.add("completed");
        }


        taskElement.innerHTML = `
            <div class="task-info">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})"
                >

                <div>

                    <h3>${task.name}</h3>

                    <p>
                        ${task.subject} • Deadline: ${task.deadline || "No deadline"}
                    </p>

                </div>

            </div>

            <button class="delete-btn" onclick="deleteTask(${index})">
                Delete
            </button>
        `;


        tasksContainer.appendChild(taskElement);

    });


    updateStats();

}

function addTask() {

    const taskName = taskInput.value.trim();


    if (taskName === "") {

        alert("Please enter a task!");

        return;

    }


    const newTask = {

        name: taskName,

        subject: subject.value,

        deadline: deadline.value,

        completed: false

    };


    tasks.push(newTask);


    saveTasks();

    displayTasks();


    taskInput.value = "";

    deadline.value = "";

}


function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;


    saveTasks();

    displayTasks();

}


function deleteTask(index) {

    tasks.splice(index, 1);


    saveTasks();

    displayTasks();

}


function updateStats() {

    totalTasks.textContent = tasks.length;


    const completed = tasks.filter(task => task.completed).length;


    completedTasks.textContent = completed;


    pendingTasks.textContent = tasks.length - completed;

}
function clearAllTasks() {

    if (tasks.length === 0) {
        return;
    }

    const confirmation = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmation) {

        tasks = [];

        saveTasks();

        displayTasks();

    }

}

addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


displayTasks();