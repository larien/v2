/**
 * Main configuration file
 * Centralized configuration for the entire application
 */

// App-wide constants
export const APP_CONFIG = {
  name: "Leaflet Travel Map",
  version: "2.0.0",
  author: "Lauren",
  itineraryUrl: "https://trips.larien.dev",
};

// Map configuration
export const MAP_CONFIG = {
  center: [-14.235, -51.9253], // Brazil coordinates
  zoom: 3,
  minZoom: 2,
  maxZoom: 18,
  tileLayer: {
    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}",
    options: {
      attribution: "",
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 20,
      ext: "png",
    },
  },
  geojsonUrl:
    "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json",
};

// Pin/Marker configuration
export const PIN_CONFIG = {
  defaultSize: {
    width: 50,
    height: 50,
  },
  emojiSize: {
    width: 35,
    height: 35,
  },
  iconSize: [30, 30],
  iconAnchor: [20, 20],
  popupAnchor: [0, 0],
  tooltipOffset: [-5, -20],
  hoverScale: 1.3,
  animationDuration: "0.2s",
};

// UI Configuration
export const UI_CONFIG = {
  modal: {
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    overlay: "rgba(0, 0, 0, 0.8)",
  },
  tooltip: {
    backgroundColor: "#001f3f",
    color: "#ffffff",
    fontSize: "14px",
    borderRadius: "5px",
    padding: "5px 10px",
    maxWidth: "150px",
  },
  animations: {
    flyDuration: 1.5,
    zoomOutDuration: 0.7,
    hoverTransition: "0.2s ease-in-out",
  },
};

// Country styling configuration
export const COUNTRY_CONFIG = {
  blueTones: ["#014ba0", "#0a5cb8", "#1466c3", "#2174d4", "#3b8eed"],
  defaultStyle: {
    fillOpacity: 0.7,
    weight: 0,
    opacity: 1,
  },
  visitedStyle: {
    weight: 2,
    color: "#ffffff",
  },
  hoverStyle: {
    weight: 3,
    color: "#ffffff",
    fillOpacity: 0.9,
  },
};

// Easter egg configuration
export const EASTER_EGG_CONFIG = {
  konamiCode: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], // ↑↑↓↓←→←→BA
  message: "You unlocked the secret itinerary! Nice job!",
  targetUrl: APP_CONFIG.itineraryUrl,
};

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1200px",
};

// Legacy exports for backward compatibility
export const ITINERARY_URL = APP_CONFIG.itineraryUrl;
export const BLUE_TONES = COUNTRY_CONFIG.blueTones;
export const KONAMI_CODE = EASTER_EGG_CONFIG.konamiCode;
