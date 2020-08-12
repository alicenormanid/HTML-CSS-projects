//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); //check if content on webpage has loaded, if yes then load list from local storage
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  event.preventDefault(); //prevents page from refreshing after hitting submit button

  if (todoInput.value.trim() === "") {
    alert("You cannot add a blank item to your to-do list!");
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li"); //create new li element
    newTodo.innerText = todoInput.value; //what the new to-do actually says
    newTodo.classList.add("todo-item"); //create class name for new todos so can style with CSS
    todoDiv.appendChild(newTodo);

    //Add todo item to Local Storage
    saveLocalTodos(todoInput.value);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'; //icon
    completedButton.classList.add("complete-btn"); //creates class name for checkmark to style
    todoDiv.appendChild(completedButton);

    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'; //icon
    trashButton.classList.add("trash-btn"); //creates class name for checkmark to style
    todoDiv.appendChild(trashButton);
    // append new Div created to the List
    todoList.appendChild(todoDiv);
  }
  todoInput.value = ""; //Clear input field after todo has been added
}

function deleteCheck(event) {
  const item = event.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Checks if there are already any todos. If not, creates empty array. If there are, then creates array out of existing items. Then, pushes new todo items to whichever array was created.
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo); //push new item into local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  console.log("hello");
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li"); //create new li element
    newTodo.innerText = todo; //gets todo items from local storage
    newTodo.classList.add("todo-item"); //create class name for new todos so can style with CSS
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'; //icon
    completedButton.classList.add("complete-btn"); //creates class name for checkmark to style
    todoDiv.appendChild(completedButton);

    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'; //icon
    trashButton.classList.add("trash-btn"); //creates class name for checkmark to style
    todoDiv.appendChild(trashButton);
    // append new Div created to the List
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //get index of todo to remove
  const todoIndex = todo.children[0].innerText; //grabs text of todo item
  todos.splice(todos.indexOf(todoIndex), 1); //removes 1 item (2nd arg) from array (at index of 1st arg)
  localStorage.setItem("todos", JSON.stringify(todos));
}
