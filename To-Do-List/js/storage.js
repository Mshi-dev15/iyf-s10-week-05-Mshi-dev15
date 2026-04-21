// js/storage.js

/**
 * Save any data to localStorage (with JSON serialization)
 * @param {string} key - Storage key
 * @param {*} data - Data to store
 */
export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`❌ Failed to save "${key}":`, error);
  }
}

/**
 * Load data from localStorage (with JSON parsing)
 * @param {string} key - Storage key
 * @param {*} defaultValue - Value if key doesn't exist
 * @returns {*} Parsed data or default value
 */
export function getFromStorage(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`❌ Failed to load "${key}":`, error);
    return defaultValue;
  }
}

// Export constants for consistency
export const STORAGE_KEYS = {
  TODOS: "my_todos",
  FILTER: "my_filter"
};