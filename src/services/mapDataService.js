/**
 * Service for handling map-related data fetching
 */

import { MAP_CONFIG } from "@/config";

export class MapDataService {
  /**
   * Fetch countries GeoJSON data
   * @returns {Promise<Object>} GeoJSON data
   */
  static async fetchCountriesData() {
    try {
      const response = await fetch(MAP_CONFIG.geojsonUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch countries data:", error);
      throw new Error("Unable to load map data. Please try again later.");
    }
  }

  /**
   * Validate GeoJSON data structure
   * @param {Object} data - GeoJSON data to validate
   * @returns {boolean} Whether data is valid
   */
  static validateGeoJsonData(data) {
    return (
      data &&
      data.type === "FeatureCollection" &&
      Array.isArray(data.features) &&
      data.features.length > 0
    );
  }

  /**
   * Process and sanitize location data
   * @param {Array} posts - Array of post objects with location data
   * @returns {Array} Processed location data
   */
  static processLocationData(posts) {
    return posts
      .filter(
        (post) =>
          post.location && post.location.latitude && post.location.longitude
      )
      .map((post) => ({
        ...post,
        location: {
          ...post.location,
          latitude: parseFloat(post.location.latitude),
          longitude: parseFloat(post.location.longitude),
          name: post.location.name || "Unknown Location",
        },
      }));
  }
}
