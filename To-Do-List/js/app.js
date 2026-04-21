// js/app.js

import { renderTodos, setupEventListeners, subscribeToState } from './ui.js';

/**
 * Initialize the application
 */
function init() {
  console.log("📝 To-Do App Initializing...");

  // Initial render
  renderTodos();

  // Wire up interactivity
  setupEventListeners();

  // Auto-update UI when state changes
  subscribeToState();

  console.log("✅ App ready!");
}

// Start app when DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);