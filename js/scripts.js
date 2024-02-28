// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const todos = document.querySelectorAll("#todo-list div");
const eraseBtn = document.querySelector(".erase-button");
const filter = document.querySelector("#filter-select");

// Inicializar variaveis globais
let oldValueInput;

// Funções

const saveTodo = text => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
}

const toggleForms = () => {
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
    editForm.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");    

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        console.log(todoTitle, text);

        if (todoTitle.innerText === oldValueInput) {
            todoTitle.innerText = text;
        }
    });
}

// Eventos

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;
    
    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText        
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("delete-todo")) {
        parentEl.remove();
    }
    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldValueInput = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", e => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

searchInput.addEventListener("input", (e) => { 
    let valueInput = e.value;
    if (valueInput != '') {
        const todos = document.querySelectorAll("#todo-list div");
        for (let todo of todos) {
            let todoTitle = todo.querySelector("h3");

            todoTitle = todoTitle.textContent.toLowerCase();

            let filterText = searchInput.value.toLowerCase();

            if (!todoTitle.includes(filterText)) {
                todo.style.display = 'none';
            } else {
                todo.style.display = 'flex';
            }
        }
    } else {
        for (let todo of todos) {
            todo.style.display = 'flex';
        }
    }
})

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const todos = document.querySelectorAll("#todo-list div");

    searchInput.value = '';

    for (let todo of todos) {
        todo.style.display = 'flex';
    }
});

filter.addEventListener("change", () => {
    let valueOpt = filter.value;

    const todos = document.querySelectorAll("#todo-list div");
    for (let todo of todos) {
        if (valueOpt == 'all') {
            todo.style.display = 'flex';
            
        } else if (valueOpt == 'done') {
            if (todo.classList.contains('done')) {
                todo.style.display = 'flex'
            } else {
                todo.style.display = 'none'
            }
        } else {
            if (!todo.classList.contains('done')) {
                todo.style.display = 'flex'
            } else {
                todo.style.display = 'none'
            }
        }
    }
})