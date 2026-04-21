// js/ui.js

import { store, getFilteredTodos } from './state.js';
import { addTodo,toggleTodo, deleteTodo, clearCompleted, setFilter, getRemainingCount } from './actions.js';

// Cache DOM elements for performance
const elements = {
  form: document.getElementById("todo-form"),
  input: document.getElementById("todo-input"),
  todoList: document.getElementById("todo-list"),
  itemsLeft: document.getElementById("items-left"),
  filters: document.querySelectorAll(".filter"),
  clearCompletedBtn: document.getElementById("clear-completed")
};

/**
 * Create a list item element for a todo
 * @param {Object} todo - Todo object
 * @returns {HTMLElement} List item element
 */
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.dataset.id = todo.id;
  if (todo.completed) li.classList.add("completed");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  // Text span
  const span = document.createElement("span");
  span.textContent = todo.text;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent checkbox toggle
    deleteTodo(todo.id);
  });

  // Assemble
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

/**
 * Render the todo list based on current filter
 */
export function renderTodos() {
  const { todoList, itemsLeft } = elements;
  const filteredTodos = getFilteredTodos();

  // Clear and rebuild list
  todoList.innerHTML = "";
  filteredTodos.forEach(todo => {
    const todoEl = createTodoElement(todo);
    if (todoEl) todoList.appendChild(todoEl);
  });

  // Update stats
  itemsLeft.textContent = `${getRemainingCount()} items left`;
}

/**
 * Update filter button active states
 */
function updateFilterUI() {
  const { filter } = store.getState();
  elements.filters.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
}

/**
 * Set up all event listeners
 */
export function setupEventListeners() {
  const { form, input, filters, clearCompletedBtn } = elements;

  // Add todo on form submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTodo = addTodo(input.value);
    if (newTodo) {
      input.value = ""; // Clear input only on success
      input.focus();
    }
  });

  // Filter buttons
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      setFilter(btn.dataset.filter);
      updateFilterUI();
      renderTodos();
    });
  });

  // Clear completed button
  clearCompletedBtn.addEventListener("click", () => {
    clearCompleted();
  });

  // Delegate click events on todo list (efficient!)
  elements.todoList.addEventListener("click", (event) => {
    const li = event.target.closest("li[data-id]");
    if (!li) return;

    // Handle checkbox clicks via event delegation
    if (event.target.type === "checkbox") {
      toggleTodo(li.dataset.id);
    }
  });
}

/**
 * Subscribe UI to state changes for auto-updates
 */
export function subscribeToState() {
  store.subscribe(() => {
    renderTodos();
    updateFilterUI();
  });
}