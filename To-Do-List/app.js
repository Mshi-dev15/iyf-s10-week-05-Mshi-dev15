// DOM
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

const STORAGE_KEY = "my_todos";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = getFromStorage(STORAGE_KEY, []);
let currentFilter = getFromStorage("my_filter", "all");

// Create element
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    // Add a checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", function(e) {
    e.stopPropagation();
    toggleTodo(todo.id);
});

    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
        li.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(checkbox); // ← checkbox first
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
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
    saveToStorage(STORAGE_KEY, todos);
    renderTodos();
}

// Toggle
function toggleTodo(id) {
    const todo = todos.find(t => t.id == id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToStorage(STORAGE_KEY, todos);
        
        // Instead of full re-render, just update the li directly
        const li = todoList.querySelector(`li[data-id="${id}"]`);
        if (li) {
            if (todo.completed) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }
        }
        
        updateStats();
    }
}

// Delete
function deleteTodo(id) {
    todos = todos.filter(t => t.id != id);
    saveToStorage(STORAGE_KEY, todos);
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
        // Clicked the ✖ button → delete
        deleteTodo(id);
    } 
});

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
            saveToStorage("my_filter", currentFilter);
        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveToStorage(STORAGE_KEY, todos);
    renderTodos();
});

// Init
renderTodos();