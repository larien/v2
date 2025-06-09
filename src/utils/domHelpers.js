/**
 * DOM utility functions
 */

/**
 * Create a styled pin element for the map
 * @param {string} content - The content to display in the pin
 * @param {Object} styles - Style object with CSS properties
 * @returns {string} HTML string for the pin
 */
export function createStyledPin(content, styles = {}) {
  const defaultStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "50%",
    boxShadow: "3px 5px 4px rgba(0,0,0,0.2)",
    border: "1px solid black",
  };

  const combinedStyles = { ...defaultStyles, ...styles };
  const styleString = Object.entries(combinedStyles)
    .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
    .join("; ");

  return `<div style="${styleString}">${content}</div>`;
}

/**
 * Create an image element with specific styling
 * @param {string} src - Image source URL
 * @param {Object} styles - Style object with CSS properties
 * @returns {string} HTML string for the image
 */
export function createStyledImage(src, styles = {}) {
  const defaultStyles = {
    backgroundColor: "white",
    borderRadius: "50%",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  };

  const combinedStyles = { ...defaultStyles, ...styles };
  const styleString = Object.entries(combinedStyles)
    .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
    .join("; ");

  return `<img src="${src}" style="${styleString}" />`;
}

/**
 * Convert camelCase to kebab-case for CSS properties
 * @param {string} str - camelCase string
 * @returns {string} kebab-case string
 */
export function camelToKebab(str) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * Safely get nested object property
 * @param {Object} obj - Object to traverse
 * @param {string} path - Dot notation path (e.g., 'user.profile.name')
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} The value at the path or default value
 */
export function safeGet(obj, path, defaultValue = null) {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : defaultValue;
  }, obj);
}

/**
 * Debounce function to limit function call frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
