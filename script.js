document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        completed: false
    };

    appendTaskToList(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
}

function appendTaskToList(task) {
    const li = document.createElement('li');
    li.innerText = task.text;
    li.className = task.completed ? 'completed' : '';

    const completeButton = document.createElement('button');
    completeButton.innerText = 'Concluir';
    completeButton.addEventListener('click', () => {
        task.completed = !task.completed;
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Excluir';
    removeButton.className = 'remove';
    removeButton.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(task);
    });

    li.appendChild(completeButton);
    li.appendChild(removeButton);
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => appendTaskToList(task));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function removeTaskFromLocalStorage(task) {
    const tasks = getTasksFromLocalStorage().filter(t => t.text !== task.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.innerText.replace('ConcluirExcluir', ''),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
