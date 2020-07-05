// Define UI Veriables

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners:
loadEventListeners();

// Load all even listeners:
function loadEventListeners() {

    // DOM load event:
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add single task event listener:
    form.addEventListener('submit', addTask);
    // Remove single task event listener:
    tasklist.addEventListener('click', removeTask);
    // Clear all tasks event listener:
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event listner:
    filter.addEventListener('keyup', filterTasks);


}


// Add task:
function addTask(e) {

    // Invalidates empty entries:
    if (taskInput.value === '') {
        alert('Please Add a Task first!');

    } else {

        // Create list {'li')} item element: 
        const li = document.createElement('li');
        // Add a class ('collection-item') to the item created:
        li.className = 'collection-item';
        // Create text node and append to the ('li'):
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link ('a') element for item:
        const link = document.createElement('a');
        // Add class to the link:
        link.className = 'delete-item secondary-content';
        // Add Icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to the 'li':
        li.appendChild(link);
        // Append the 'li' to the 'ul':
        tasklist.appendChild(li);
        // Add to local storage:
        storeTaskinLocalStorage(taskInput.value);
        // clear the input afterwards:
        taskInput.value = '';
        // Prevent Default behavior:
        e.preventDefault();
    }

};

// Add to local store:
function storeTaskinLocalStorage(task) {

    // Initialize variable:
    let tasks;

    // Checks local storage for any existing data; adds if none:
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // If local storage does have something, print out via JSON:
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// Remove task:
function removeTask(e) {

    // Checks to make sure only 'delete-item' class objects are removed:
    if (e.target.parentElement.classList.contains('delete-item')) {

        // Confirm before deleting:
        if (confirm('Are you sure?')) {

            // Remove from DOM:
            e.target.parentElement.parentElement.remove();

            // Remove task from local storage:
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

    }
};

// Clear all tasks:
function clearTasks() {

    // Loops through all children of 'taskList' array
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }

    // Another way that works, but slower:
    // taskList.innerHTML = '';
    // More info: https://jsperf.com/innerhtml-vs-removechild

    clearTasksFromLocalStorage();

};

// Flter tasks:
function filterTasks(e) {

    // Get value of input text to lower case:
    const text = e.target.value.toLowerCase();

    // Loop through all '.collection-item' class items:
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        };
    });

}

// Load saved tasks:
function getTasks() {

    // Initialize variable:
    let tasks;

    // Checks local storage for any existing data; adds if none:
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // If local storage does have something, print out via JSON:
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {

        // Create list {'li')} item element: 
        const li = document.createElement('li');
        // Add a class ('collection-item') to the item created:
        li.className = 'collection-item';
        // Create text node and append to the ('li'):
        li.appendChild(document.createTextNode(task));
        // Create new link ('a') element for item:
        const link = document.createElement('a');
        // Add class to the link:
        link.className = 'delete-item secondary-content';
        // Add Icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to the 'li':
        li.appendChild(link);
        // Append the 'li' to the 'ul':
        tasklist.appendChild(li);

    })
}


// Remove task from local storage:
function removeTaskFromLocalStorage(taskItem) {

    // Initialize variable:
    let tasks;

    // Checks local storage for any existing data; adds if none:
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        // If local storage does have something, print out via JSON:
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // Loop through each item:
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    // Set local stroage:
    localStorage.setItem('tasks', JSON.stringify(tasks));

};


// Clears all local storage:
function clearTasksFromLocalStorage() {

    localStorage.clear();

}