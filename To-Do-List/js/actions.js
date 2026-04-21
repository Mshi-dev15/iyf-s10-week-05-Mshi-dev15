// js/actions.js

import { store } from './state.js';

/**
 * Add a new todo
 * @param {string} text - Todo text content
 */
export function addTodo(text) {
  const trimmedText = text.trim();
  if (!trimmedText) return null; // Ignore empty input

  const newTodo = {
    id: Date.now(), // Simple unique ID
    text: trimmedText,
    completed: false,
    createdAt: new Date().toISOString()
  };

  const { todos } = store.getState();
  store.setState({ todos: [...todos, newTodo] });
  
  return newTodo;
}

/**
 * Toggle todo completed status
 * @param {number} id - Todo ID to toggle
 */
export function toggleTodo(id) {
  const { todos } = store.getState();
  const updatedTodos = todos.map(todo =>
    todo.id === Number(id)
      ? { ...todo, completed: !todo.completed }
      : todo
  );
  store.setState({ todos: updatedTodos });
}

/**
 * Delete a todo by ID
 * @param {number} id - Todo ID to remove
 */
export function deleteTodo(id) {
  const { todos } = store.getState();
  const updatedTodos = todos.filter(todo => todo.id !== Number(id));
  store.setState({ todos: updatedTodos });
}

/**
 * Clear all completed todos
 */
export function clearCompleted() {
  const { todos } = store.getState();
  const activeTodos = todos.filter(todo => !todo.completed);
  store.setState({ todos: activeTodos });
}

/**
 * Change the active filter
 * @param {string} filter - "all" | "active" | "completed"
 */
export function setFilter(filter) {
  const validFilters = ["all", "active", "completed"];
  if (!validFilters.includes(filter)) return;
  
  store.setState({ filter });
}

/**
 * Get count of remaining (incomplete) todos
 * @returns {number} Count of active items
 */
export function getRemainingCount() {
  const { todos } = store.getState();
  return todos.filter(todo => !todo.completed).length;
}