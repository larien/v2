/**
 * Data imports and exports
 * Centralized data management for the application
 */

import instagramPosts from "./posts.json";
import nextData from "./next.json";

/**
 * Process and validate Instagram posts data
 * @param {Array} posts - Raw posts data
 * @returns {Array} Processed and validated posts
 */
function processPostsData(posts) {
  return posts
    .filter((post) => {
      // Validate required fields
      const hasLocation =
        post.location &&
        typeof post.location.latitude === "number" &&
        typeof post.location.longitude === "number";

      if (!hasLocation) {
        console.warn("Post missing valid location:", post);
        return false;
      }

      return true;
    })
    .map((post) => ({
      ...post,
      // Ensure location name exists
      location: {
        ...post.location,
        name: post.location.name || "Unknown Location",
      },
      // Add unique ID if not present
      id: post.id || `${post.location.latitude}-${post.location.longitude}`,
      // Ensure emoji is a string or null
      emoji: typeof post.emoji === "string" ? post.emoji : null,
      // Ensure URL is a string or null
      url: typeof post.url === "string" ? post.url : null,
    }));
}

/**
 * Get posts data with processing
 * @returns {Array} Processed posts data
 */
export function getPostsData() {
  return processPostsData(instagramPosts);
}

/**
 * Get raw posts data without processing
 * @returns {Array} Raw posts data
 */
export function getRawPostsData() {
  return instagramPosts;
}

/**
 * Get next data
 * @returns {Object} Next data
 */
export function getNextData() {
  return nextData;
}

/**
 * Get posts by country/region (if location includes country info)
 * @param {string} country - Country name to filter by
 * @returns {Array} Posts in the specified country
 */
export function getPostsByCountry(country) {
  const posts = getPostsData();
  return posts.filter(
    (post) =>
      post.location.country &&
      post.location.country.toLowerCase().includes(country.toLowerCase())
  );
}

/**
 * Get posts with emoji pins
 * @returns {Array} Posts that have emoji pins
 */
export function getEmojiPosts() {
  const posts = getPostsData();
  return posts.filter((post) => post.emoji);
}

/**
 * Get posts with SVG pins (no emoji)
 * @returns {Array} Posts that use SVG pins
 */
export function getSvgPosts() {
  const posts = getPostsData();
  return posts.filter((post) => !post.emoji);
}

/**
 * Get statistics about the posts data
 * @returns {Object} Statistics object
 */
export function getPostsStatistics() {
  const posts = getPostsData();
  const emojiPosts = getEmojiPosts();
  const svgPosts = getSvgPosts();

  return {
    total: posts.length,
    withEmoji: emojiPosts.length,
    withSvg: svgPosts.length,
    withUrls: posts.filter((post) => post.url).length,
    uniqueLocations: new Set(posts.map((post) => post.location.name)).size,
  };
}

// Default export for backward compatibility
export default {
  posts: getPostsData(),
  rawPosts: getRawPostsData(),
  nextData: getNextData(),
  statistics: getPostsStatistics(),
};
