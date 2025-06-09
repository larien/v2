/**
 * Assets index - Centralized asset management
 * Import and export all assets from a single location
 */

// Icons
import pinIcon from "./icons/pin.svg";
import logoIcon from "./logo.svg";

// Data
export * from "./data";
export { default as dataExports } from "./data";

// Styles
import "./styles.css";

// Icon exports
export const icons = {
  pin: pinIcon,
  logo: logoIcon,
};

// Individual icon exports for convenience
export { pinIcon, logoIcon };

// Asset collections
export const assets = {
  icons,
  // Can add more asset types here (images, fonts, etc.)
};

// Default export
export default assets;
