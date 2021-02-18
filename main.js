// Selectors
// selector for the value inputed into input bar
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

var start= document.getElementById("start");
var reset= document.getElementById("reset");
var stop= document.getElementById("stop");

var workmins = document.getElementById("work-mins");
var worksecs = document.getElementById("work-secs");

var breakmins = document.getElementById("break-mins");
var breaksecs = document.getElementById("break-secs");

// store a reference to a timer variable
var startTimer;

start.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
    }
    else {
        alert("Timer is already running");
    }
})

reset.addEventListener('click', function(){
    workmins.innerText = 25;
    worksecs.innerText = "00";

    breakmins.innerText = 5;
    breaksecs.innerText = "00";

    document.getElementById('counter').innerText = 0;
    stopInterval()
    startTimer = undefined;
})

stop.addEventListener('click', function() {
    stopInterval()
    startTimer = undefined;
})


// Functions

function addTodo(event){
    event.preventDefault()    // prevents browser from refreshing

    // Create DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;           // todo value
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append To To Do List
    todoList.appendChild(todoDiv);

    // Clear Todo Input Value
    todoInput.value = "";
}

function deleteCheck(event) {
     const item = event.target;

     // Delete To Do
     if (item.classList[0] === "trash-btn") {
         const todo = item.parentElement;   // removing the parent element, which is a single todo
         // Animation
         todo.classList.add("fall");    // adding fall animation
         removeLocalTodos(todo);
         todo.addEventListener('transitionend', function(){
            todo.remove()
         });
     }

     if (item.classList[0] === "complete-btn") {
         const todo = item.parentElement;
         todo.classList.toggle('completed');
     }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        if (todo.nodeType == Node.ELEMENT_NODE) {
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                // check which todos have class 'completed'
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
            if (todo.classList.contains("completed")) {
                todo.style.display = 'none';
            } else {
                todo.style.display = 'flex';
            }
            break;
                    
                }
        }
    }
    )};


function saveLocalTodos(todo) {
        // Check - are there already todos added?
        let todos;
        if(localStorage.getItem('todos') == null) {
            todos = [];
        } else {
            // we do have a todo, get array from local storage
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));  
    }

function getTodos() {
        let todos;
        // Check if todos are saved
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        todos.forEach(function(todo) {
            // Create DIV
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            // Create LI
            const newTodo = document.createElement("li");
            newTodo.innerText = todo;           // todo value
            newTodo.classList.add("todo-item");

            todoDiv.appendChild(newTodo);

            // Check Mark Button
            const completedButton = document.createElement("button");
            completedButton.innerHTML = '<i class = "fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            // Trash Button
            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            // Append To To Do List
            todoList.appendChild(todoDiv);

        })
    }

    
    function removeLocalTodos(todo) {
        // Check - Is there already a todo?
        let todos;
        if (localStorage.getItem("todos") == null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));

    }

    function timer(){
        // Countdown for Work Timer
        if(worksecs.innerText != 0){
            worksecs.innerText--;
        }
        else if (workmins.innerText != 0 && worksecs.innerText == 0) {
            worksecs.innerText = 59;
            workmins.innerText--;
        }
        
        // Countdown Break Timer
        if (workmins.innerText == 0 && worksecs.innerText == 0) {
            if (breaksecs.innerText != 0) {
                breaksecs.innerText--;
            }
            else if (breakmins.innerText != 0 && breaksecs.innerText == 0) {
                breaksecs.innerText = 59;
                breakmins.innerText--;
            }
        }
    
        // Increment Counter by one if one cycle is finished
        if (workmins.innerText == 0 && worksecs.innerText == 0 && breakmins.innerText == 0 && breaksecs.innerText == 0) {
            workmins.innerText = 0;
            worksecs.innerText = "05";
    
            breakmins.innerText = 0;
            breaksecs.innerText = "03";
    
            document.getElementById('counter').innerText++;
        }
    }
    
    // Stop Timer Function
    function stopInterval(){
        clearInterval(startTimer); 
    }
    