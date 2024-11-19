document.addEventListener("DOMContentLoaded", ()=> {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTasksList();
        updateStats();
    }
})

let tasks = [];

// Save tasks
const saveTasks = ()=> {
    try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
} catch (error) {
    console.error("Failed to save tasks:", error);
}
}

// Load tasks from localStorage
const loadTasks = () => {
    try {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (Array.isArray(storedTasks)) {
            tasks = storedTasks;
        }
    } catch (error) {
        console.error("Failed to load tasks:", error);
        tasks = []; // Fallback to an empty array if parsing fails
    }
};

// Adding new task
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input field
        updateTasksList();
        updateStats();
        saveTasks();
    } else {
        alert("Task cannot be empty!");
    }
};

// Toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

// Statistics and Progress bar
const updateStats = ()=> {
    const completedTasks = tasks.filter(task=> task.completed).length
    const totalTasks = tasks.length
    const progress = (completedTasks / totalTasks) * 100 

const progressBar = document.getElementById('progress')

progressBar.style.width = `${progress}%`

document.getElementById(`numbers`).innerText = `${completedTasks} / ${totalTasks}`
}

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
                <img src="./images/edit.png" onClick="editTask(${index})" alt="Edit"/>
                <img src="./images/bin.png" onClick="deleteTask(${index})" alt="Delete"/>
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
    updateStats();
    saveTasks();
};

// Edit a task
const editTask = (index) => {
    const newTaskText = prompt("Edit task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText.trim() || tasks[index].text; // Keep old text if input is empty
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

// Event listener for the Add Task button
document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

// Initialize tasks on page load
window.onload = () => {
    loadTasks(); 
    updateTasksList(); 
    updateStats(); 
};
