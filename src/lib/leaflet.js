/**
 * Leaflet library configuration and setup
 * Centralized configuration for Leaflet map library
 */

import L from "leaflet";
import "leaflet/dist/leaflet.css";

/**
 * Fix Leaflet's default icon issue with webpack
 * This resolves the missing marker icon problem
 */
export function setupLeafletIcons() {
  // Fix default markers
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
}

/**
 * Create custom Leaflet control for map attribution
 * @returns {L.Control} Attribution control
 */
export function createCustomAttribution() {
  return L.control.attribution({
    position: "bottomright",
    prefix: false,
  });
}

/**
 * Create a custom Leaflet control for zoom
 * @param {Object} options - Zoom control options
 * @returns {L.Control.Zoom} Zoom control
 */
export function createCustomZoomControl(options = {}) {
  const defaultOptions = {
    position: "topright",
    zoomInText: "+",
    zoomOutText: "-",
    zoomInTitle: "Zoom in",
    zoomOutTitle: "Zoom out",
  };

  return L.control.zoom({ ...defaultOptions, ...options });
}

/**
 * Create a custom marker cluster group for better performance
 * Requires leaflet.markercluster plugin if you want to use it
 * @param {Object} options - Cluster options
 * @returns {L.MarkerClusterGroup|null} Cluster group or null if plugin not available
 */
export function createMarkerClusterGroup(options = {}) {
  if (L.MarkerClusterGroup) {
    const defaultOptions = {
      maxClusterRadius: 80,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    };

    return L.markerClusterGroup({ ...defaultOptions, ...options });
  }

  console.warn(
    "MarkerClusterGroup not available. Install leaflet.markercluster plugin."
  );
  return null;
}

/**
 * Utility function to check if coordinates are valid
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {boolean} Whether coordinates are valid
 */
export function isValidCoordinate(lat, lng) {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    !isNaN(lat) &&
    !isNaN(lng)
  );
}

/**
 * Create a bounding box for a set of coordinates
 * @param {Array<Array<number>>} coordinates - Array of [lat, lng] pairs
 * @returns {L.LatLngBounds|null} Bounding box or null if no valid coordinates
 */
export function createBounds(coordinates) {
  const validCoords = coordinates.filter(([lat, lng]) =>
    isValidCoordinate(lat, lng)
  );

  if (validCoords.length === 0) {
    return null;
  }

  return L.latLngBounds(validCoords);
}

/**
 * Enhanced error handling for map operations
 * @param {Function} operation - Map operation to execute
 * @param {string} operationName - Name of the operation for error logging
 * @returns {*} Result of operation or null if error
 */
export async function safeMapOperation(
  operation,
  operationName = "Map operation"
) {
  try {
    return await operation();
  } catch (error) {
    console.error(`${operationName} failed:`, error);
    return null;
  }
}

// Initialize Leaflet icons on import
setupLeafletIcons();

// Export Leaflet for convenience
export { L as Leaflet };
export default L;
