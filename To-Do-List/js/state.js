// js/state.js

import { saveToStorage, getFromStorage, STORAGE_KEYS } from './storage.js';

// Default initial state
const DEFAULT_STATE = {
  todos: [],
  filter: "all" // "all" | "active" | "completed"
};

// Create observable store (observer pattern)
const createStore = (initialState) => {
  let state = { ...initialState };
  const listeners = [];

  return {
    /** Get a copy of current state */
    getState: () => ({ ...state }),

    /** Update state, notify listeners, and persist */
    setState: (updates) => {
      state = { ...state, ...updates }; // Immutable update
      listeners.forEach(listener => listener(state));
      saveToStorage(STORAGE_KEYS.TODOS, state.todos);
      saveToStorage(STORAGE_KEYS.FILTER, state.filter);
    },

    /** Subscribe to state changes */
    subscribe: (listener) => {
      listeners.push(listener);
      // Return unsubscribe function
      return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      };
    }
  };
};

// Initialize with persisted data or defaults
const persistedTodos = getFromStorage(STORAGE_KEYS.TODOS, DEFAULT_STATE.todos);
const persistedFilter = getFromStorage(STORAGE_KEYS.FILTER, DEFAULT_STATE.filter);

export const store = createStore({
  todos: persistedTodos,
  filter: persistedFilter
});

// Helper: Get todo by ID
export function getTodoById(id) {
  return store.getState().todos.find(todo => todo.id === Number(id));
}

// Helper: Get filtered todos based on current filter
export function getFilteredTodos() {
  const { todos, filter } = store.getState();
  
  if (filter === "active") return todos.filter(todo => !todo.completed);
  if (filter === "completed") return todos.filter(todo => todo.completed);
  return todos;
}