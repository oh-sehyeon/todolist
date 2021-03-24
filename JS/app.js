//*** Selectors ***
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//*** Event Listeners ***
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkOrDelete);
filterOption.addEventListener("change", filterTodo);

//*** Functions ***
function addTodo (event) {
    event.preventDefault();

    //Create a 'li' (Todo Item)
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    //Create Todo Item's Text
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.innerText = todoInput.value;
    todoItem.appendChild(todoText);

    //Add Todos to local Storage
    saveLocalTodos(todoInput.value);

    //Create Todo Item's Btn Container
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('todo-btn-container');
    todoItem.appendChild(btnContainer);

    //Create Checked Button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('todo-checked');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    btnContainer.appendChild(checkBtn);

    //Create Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('todo-remove');
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    btnContainer.appendChild(removeBtn);

    //Insert the create 'li' into TODO List
    document.querySelector('.todo-list').appendChild(todoItem);

    //Clear Todo Input box's value
    todoInput.value = "";

    console.log("Todo Item added");
}

function checkOrDelete (event) {
    const item = event.target;
    
    //DELETE TODO Item
    if (item.classList[0] === 'todo-remove'){
        const btnContainer = item.parentElement;
        const todo = btnContainer.parentElement;
        
        //Delete Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        console.log("Todo item Deleted");
    }

    if (item.classList[0] === 'todo-checked'){
        const btnContainer = item.parentElement;
        const todo = btnContainer.parentElement;
        todo.classList.toggle('completed');       
        todo.firstChild.classList.toggle('text-line-through');
        console.log("Todo item Checked");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
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
    })
}

function saveLocalTodos(todo) {
    let todos = checkLocalTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    //Check Local Todo List
    let todos = checkLocalTodos();

    //Create elements with local Todo list
    todos.forEach(function(todo){
        //Create a 'li' (Todo Item)
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        //Create Todo Item's Text
        const todoText = document.createElement('span');
        todoText.classList.add('todo-text');
        todoText.innerText = todo;
        todoItem.appendChild(todoText);

        //Create Todo Item's Btn Container
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('todo-btn-container');
        todoItem.appendChild(btnContainer);

        //Create Checked Button
        const checkBtn = document.createElement('button');
        checkBtn.classList.add('todo-checked');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        btnContainer.appendChild(checkBtn);

        //Create Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('todo-remove');
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        btnContainer.appendChild(removeBtn);

        //Insert the create 'li' into TODO List
        document.querySelector('.todo-list').appendChild(todoItem);
    });
}

function checkLocalTodos(){
    //Check if already has saved information on local storage
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

function removeLocalTodos(todo) {
    let todos = checkLocalTodos();

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}