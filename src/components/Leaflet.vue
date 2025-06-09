<template>
  <div>
    <div id="map" ref="mapRef"></div>

    <MapModal
      :show="showModal"
      :city-name="currentCityName"
      :content="modalContent"
      :itinerary-url="APP_CONFIG.itineraryUrl"
      @close="handleCloseModal"
      @close-outside="handleCloseModalOutside"
    />
  </div>
</template>

<script>
import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import "@/styles/variables.css";
import "@/assets/styles.css";

import MapModal from "./MapModal.vue";
import { useLeafletMap } from "@/composables/useLeafletMap";
import { useMapMarkers } from "@/composables/useMapMarkers";
import { useCountryInteractions } from "@/composables/useCountryInteractions";
import { useModal } from "@/composables/useModal";
import { useKonamiCode } from "@/composables/useKonamiCode";
import { APP_CONFIG } from "@/config";
import { getPostsData } from "@/assets/data";

export default {
  name: "LeafletMap",
  components: {
    MapModal,
  },
  setup() {
    // Initialize composables
    const {
      mapRef,
      map,
      geojsonLayer,
      loadCountriesLayer,
      flyToLocation,
      zoomOut,
    } = useLeafletMap();
    const { addMarkersToMap } = useMapMarkers();
    const { styleCountryFeature, onEachCountryFeature } =
      useCountryInteractions();
    const {
      showModal,
      modalContent,
      currentCityName,
      openModal,
      closeModal,
      closeModalOnOutsideClick,
    } = useModal();

    // Initialize Konami code easter egg
    useKonamiCode();

    // Handle marker clicks
    const handleMarkerClick = (post) => {
      openModal(post, flyToLocation);
    };

    // Handle modal close events
    const handleCloseModal = () => {
      closeModal(zoomOut);
    };

    const handleCloseModalOutside = (event) => {
      closeModalOnOutsideClick(event, zoomOut);
    };

    // Initialize the map and load data
    const initializeMapData = async () => {
      if (!map.value) return;

      try {
        // Load countries layer with styling and interactions
        await loadCountriesLayer(styleCountryFeature, (feature, layer) =>
          onEachCountryFeature(feature, layer, geojsonLayer)
        );

        // Get processed posts data
        const postsData = getPostsData();

        // Add markers for posts
        addMarkersToMap(postsData, map.value, handleMarkerClick);

        console.log(`Loaded ${postsData.length} markers successfully`);
      } catch (error) {
        console.error("Failed to initialize map data:", error);
        // Could show user-friendly error message here
      }
    };

    onMounted(() => {
      // Wait for map to be initialized then load data
      setTimeout(initializeMapData, 100);
    });

    return {
      APP_CONFIG,
      mapRef,
      showModal,
      modalContent,
      currentCityName,
      handleCloseModal,
      handleCloseModalOutside,
    };
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
}

.leaflet-interactive {
  outline: none;
}

/* Pin hover effects */
:deep(.leaflet-marker-icon.custom-pin) {
  cursor: pointer !important;
}

:deep(.leaflet-marker-icon.custom-pin:hover) {
  z-index: 1000 !important;
}

:deep(.custom-pin img) {
  transition: transform 0.2s ease-in-out !important;
  transform-origin: center center !important;
}

:deep(.custom-pin div) {
  transition: transform 0.2s ease-in-out !important;
  transform-origin: center center !important;
}

:deep(.leaflet-marker-icon.custom-pin:hover img),
:deep(.leaflet-marker-icon.custom-pin:hover div) {
  transform: scale(1.3) !important;
}

/* Tooltip styling */
:deep(.custom-tooltip) {
  background-color: #001f3f;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
  max-width: 150px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  :deep(.custom-pin) {
    width: 40px;
    height: 40px;
  }

  :deep(.custom-pin img) {
    width: 40px;
    height: 40px;
  }

  :deep(.custom-pin div) {
    font-size: 24px;
  }
}
</style>
