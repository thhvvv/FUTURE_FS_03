let tasks = [];

// Add a new task
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input field
        updateTasksList();
    } else {
        alert("Task cannot be empty!");
    }
};

// Toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

// Update and render the task list
const updateTasksList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? `completed` : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} 
                    onChange="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})" alt="Edit"/>
                <img src="./img/bin.png" onClick="deleteTask(${index})" alt="Delete"/>
            </div>
        </div>
        `;
        taskList.append(listItem);
    });
};

// Delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

// Edit a task
const editTask = (index) => {
    const newTaskText = prompt("Edit task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText.trim() || tasks[index].text; // Keep old text if input is empty
        updateTasksList();
    }
};

// Event listener for the Add Task button
document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
