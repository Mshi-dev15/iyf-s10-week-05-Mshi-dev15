// DOM
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";

// Create element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
        li.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li; // 🔴 THIS MUST EXIST
}

// Render
function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const el = createTodoElement(todo);

        // 🔴 Safety check (important for debugging)
        if (!el) {
            console.error("createTodoElement returned nothing");
            return;
        }

        todoList.appendChild(el);
    });

    updateStats();
}

// Add
function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const todo = {
        id: Date.now(),
        text: trimmed,
        completed: false
    };

    todos.push(todo);
    renderTodos();
}

// Toggle
function toggleTodo(id) {
    const todo = todos.find(t => t.id == id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

// Delete
function deleteTodo(id) {
    todos = todos.filter(t => t.id != id);
    renderTodos();
}

// Stats
function updateStats() {
    const remaining = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${remaining} items left`;
}

// Events
form.addEventListener("submit", function(event) {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
});

todoList.addEventListener("click", function(event) {
    const li = event.target.closest("li");
    if (!li) return;

    const id = li.dataset.id;

    if (event.target.classList.contains("delete-btn")) {
        deleteTodo(id);
    } else {
        toggleTodo(id);
    }
});

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    renderTodos();
});

// Init
renderTodos();