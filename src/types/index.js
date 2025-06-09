/**
 * Type definitions and interfaces
 * JSDoc type definitions for better IDE support and documentation
 */

/**
 * @typedef {Object} Location
 * @property {number} latitude - Latitude coordinate
 * @property {number} longitude - Longitude coordinate
 * @property {string} name - Location name
 */

/**
 * @typedef {Object} Post
 * @property {Location} location - Location information
 * @property {string} [url] - Optional Instagram post URL
 * @property {string} [emoji] - Optional emoji for the pin
 * @property {string} [id] - Optional unique identifier
 */

/**
 * @typedef {Object} MapConfig
 * @property {[number, number]} center - Map center coordinates [lat, lng]
 * @property {number} zoom - Default zoom level
 * @property {number} minZoom - Minimum zoom level
 * @property {number} maxZoom - Maximum zoom level
 * @property {Object} tileLayer - Tile layer configuration
 * @property {string} geojsonUrl - URL for GeoJSON data
 */

/**
 * @typedef {Object} PinConfig
 * @property {Object} defaultSize - Default pin size {width, height}
 * @property {Object} emojiSize - Emoji pin size {width, height}
 * @property {[number, number]} iconSize - Leaflet icon size
 * @property {[number, number]} iconAnchor - Leaflet icon anchor point
 * @property {[number, number]} popupAnchor - Leaflet popup anchor point
 * @property {[number, number]} tooltipOffset - Tooltip offset
 * @property {number} hoverScale - Scale factor for hover effect
 * @property {string} animationDuration - CSS animation duration
 */

/**
 * @typedef {Object} CountryFeature
 * @property {Object} properties - GeoJSON feature properties
 * @property {string} properties.name - Country name
 * @property {Object} geometry - GeoJSON geometry
 */

/**
 * @typedef {Object} ModalState
 * @property {boolean} show - Whether modal is visible
 * @property {string|null} content - Modal content HTML
 * @property {string|null} cityName - Current city name
 */

/**
 * @typedef {Object} MarkerEvents
 * @property {Function} click - Click event handler
 * @property {Function} mouseover - Mouseover event handler
 * @property {Function} mouseout - Mouseout event handler
 */

/**
 * @typedef {Object} CountryStyle
 * @property {string} fillColor - Fill color for country
 * @property {number} fillOpacity - Fill opacity
 * @property {string} color - Border color
 * @property {number} weight - Border weight
 * @property {number} opacity - Border opacity
 */

/**
 * @typedef {Object} AnimationConfig
 * @property {number} flyDuration - Fly animation duration in seconds
 * @property {number} zoomOutDuration - Zoom out animation duration in seconds
 * @property {string} hoverTransition - CSS hover transition
 */

// Export empty object to make this a module
export {};
