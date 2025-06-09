import { ref } from "vue";
import L from "leaflet";
import { pinIcon } from "@/assets";
import { PIN_CONFIG } from "@/config";
import { createStyledPin, createStyledImage } from "@/utils/domHelpers";

export function useMapMarkers() {
  const markers = ref([]);

  const createCustomIcon = (post) => {
    const { emoji } = post;

    if (emoji) {
      return L.divIcon({
        className: "custom-pin",
        html: createEmojiPinHTML(emoji),
        iconSize: PIN_CONFIG.iconSize,
        iconAnchor: PIN_CONFIG.iconAnchor,
        popupAnchor: PIN_CONFIG.popupAnchor,
      });
    }

    return L.divIcon({
      className: "custom-pin",
      html: createSVGPinHTML(),
      iconSize: PIN_CONFIG.iconSize,
      iconAnchor: PIN_CONFIG.iconAnchor,
      popupAnchor: PIN_CONFIG.popupAnchor,
    });
  };

  const createEmojiPinHTML = (emoji) => {
    const { width, height } = PIN_CONFIG.emojiSize;
    return createStyledPin(emoji, {
      width: `${width}px`,
      height: `${height}px`,
      fontSize: "20px",
    });
  };

  const createSVGPinHTML = () => {
    const { width, height } = PIN_CONFIG.defaultSize;
    return createStyledImage(pinIcon, {
      width: `${width}px`,
      height: `${height}px`,
    });
  };

  const createMarker = (post, map, onMarkerClick) => {
    const { location } = post;
    const customIcon = createCustomIcon(post);

    const marker = L.marker([location.latitude, location.longitude], {
      icon: customIcon,
    })
      .bindTooltip(location.name, {
        permanent: false,
        offset: PIN_CONFIG.tooltipOffset,
        direction: "top",
        className: "custom-tooltip",
      })
      .on("click", () => onMarkerClick(post))
      .addTo(map);

    return marker;
  };

  const addMarkersToMap = (posts, map, onMarkerClick) => {
    posts.forEach((post) => {
      const marker = createMarker(post, map, onMarkerClick);
      markers.value.push(marker);
    });
  };

  const clearMarkers = () => {
    markers.value.forEach((marker) => {
      marker.remove();
    });
    markers.value = [];
  };

  return {
    markers,
    addMarkersToMap,
    clearMarkers,
    createMarker,
  };
}
