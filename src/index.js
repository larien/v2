/**
 * Main src/index.js - Complete module exports
 * Centralized access to all application modules
 *
 * This file demonstrates the complete modular architecture
 * and provides easy access to all parts of the application
 */

// ===== COMPONENTS =====
export { default as LeafletMap } from "./components/Leaflet.vue";
export { default as MapModal } from "./components/MapModal.vue";

// ===== COMPOSABLES / HOOKS =====
export * from "./composables/useLeafletMap";
export * from "./composables/useMapMarkers";
export * from "./composables/useCountryInteractions";
export * from "./composables/useModal";
export * from "./composables/useKonamiCode";

// Alternative hooks export
export * from "./hooks";

// ===== CONFIGURATION =====
export * from "./config";

// ===== SERVICES =====
export { MapDataService } from "./services/mapDataService";

// ===== UTILITIES =====
export * from "./utils/domHelpers";

// ===== ASSETS & DATA =====
export * from "./assets";
export * from "./assets/data";

// ===== LIBRARY EXTENSIONS =====
export * from "./lib/leaflet";

// ===== TYPES =====
export * from "./types";

// ===== ORGANIZED EXPORTS =====

/**
 * Organized module collections for convenience
 */
export const modules = {
  // Components
  components: {
    LeafletMap: () => import("./components/Leaflet.vue"),
    MapModal: () => import("./components/MapModal.vue"),
  },

  // Composables
  composables: {
    useLeafletMap: () => import("./composables/useLeafletMap"),
    useMapMarkers: () => import("./composables/useMapMarkers"),
    useCountryInteractions: () =>
      import("./composables/useCountryInteractions"),
    useModal: () => import("./composables/useModal"),
    useKonamiCode: () => import("./composables/useKonamiCode"),
  },

  // Services
  services: {
    MapDataService: () => import("./services/mapDataService"),
  },

  // Utils
  utils: {
    domHelpers: () => import("./utils/domHelpers"),
  },

  // Lib extensions
  lib: {
    leaflet: () => import("./lib/leaflet"),
  },
};

/**
 * Application metadata and structure information
 */
export const appInfo = {
  name: "Leaflet Travel Map",
  version: "2.0.0",
  architecture: "Modular Vue.js with Composition API",
  folders: [
    "components",
    "composables",
    "hooks",
    "config",
    "services",
    "utils",
    "lib",
    "styles",
    "types",
    "assets",
  ],
  patterns: [
    "Composition API",
    "Single Responsibility Principle",
    "Dependency Injection",
    "Service Layer Architecture",
    "Utility-First CSS",
    "Modular Imports/Exports",
  ],
};

/**
 * Quick access to commonly used modules
 */
export const quick = {
  // Most used composables
  useMap: () =>
    import("./composables/useLeafletMap").then((m) => m.useLeafletMap),
  useMarkers: () =>
    import("./composables/useMapMarkers").then((m) => m.useMapMarkers),
  useModal: () => import("./composables/useModal").then((m) => m.useModal),

  // Most used services
  mapService: () =>
    import("./services/mapDataService").then((m) => m.MapDataService),

  // Most used utils
  domUtils: () => import("./utils/domHelpers"),

  // Configuration
  config: () => import("./config"),
};

// Default export with structure overview
export default {
  modules,
  appInfo,
  quick,
  // Direct component access
  LeafletMap: () => import("./components/Leaflet.vue"),
  MapModal: () => import("./components/MapModal.vue"),
};
