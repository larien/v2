import { ref, onMounted, onUnmounted } from "vue";
import L from "@/lib/leaflet";
import { MAP_CONFIG } from "@/config";

export function useLeafletMap() {
  const mapRef = ref(null);
  const map = ref(null);
  const geojsonLayer = ref(null);

  const initializeMap = () => {
    if (!mapRef.value) return;

    map.value = L.map(mapRef.value, {
      minZoom: MAP_CONFIG.minZoom,
    }).setView(MAP_CONFIG.center, MAP_CONFIG.zoom);

    L.tileLayer(MAP_CONFIG.tileLayer.url, MAP_CONFIG.tileLayer.options).addTo(
      map.value
    );
  };

  const loadCountriesLayer = async (styleFunction, onEachFeatureFunction) => {
    const { MapDataService } = await import("@/services/mapDataService");

    try {
      const data = await MapDataService.fetchCountriesData();

      if (!MapDataService.validateGeoJsonData(data)) {
        throw new Error("Invalid GeoJSON data received");
      }

      geojsonLayer.value = L.geoJson(data, {
        style: styleFunction,
        onEachFeature: onEachFeatureFunction,
      }).addTo(map.value);
    } catch (error) {
      console.error("Failed to load countries data:", error);
      throw error; // Re-throw to allow handling in component
    }
  };

  const flyToLocation = (lat, lng, zoom = 8, duration = 1.5) => {
    if (!map.value) return;

    map.value.flyTo([lat, lng], zoom, {
      animate: true,
      duration,
    });
  };

  const zoomOut = (zoomReduction = 3, duration = 0.7) => {
    if (!map.value) return;

    const currentZoom = map.value.getZoom();
    const targetZoom = Math.max(currentZoom - zoomReduction, MAP_CONFIG.zoom);

    map.value.flyTo(map.value.getCenter(), targetZoom, {
      animate: true,
      duration,
    });
  };

  onMounted(() => {
    initializeMap();
  });

  onUnmounted(() => {
    if (map.value) {
      map.value.remove();
    }
  });

  return {
    mapRef,
    map,
    geojsonLayer,
    loadCountriesLayer,
    flyToLocation,
    zoomOut,
  };
}
