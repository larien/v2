import { ref } from "vue";
import L from "leaflet";
import { COUNTRY_CONFIG } from "@/config";

export function useCountryInteractions() {
  const visitedCountriesSet = ref(new Set());

  const getRandomBlue = () => {
    const { blueTones } = COUNTRY_CONFIG;
    return blueTones[Math.floor(Math.random() * blueTones.length)];
  };

  const styleCountryFeature = (feature) => {
    const isVisited = visitedCountriesSet.value.has(feature.properties.name);
    const fillColor = getRandomBlue();
    const { defaultStyle, visitedStyle } = COUNTRY_CONFIG;

    return {
      fillColor,
      fillOpacity: defaultStyle.fillOpacity,
      color: isVisited ? visitedStyle.color : fillColor,
      weight: isVisited ? visitedStyle.weight : defaultStyle.weight,
      opacity: defaultStyle.opacity,
    };
  };

  const onEachCountryFeature = (feature, layer, geojsonLayer) => {
    const countryName = feature.properties.name || "Unknown Country";

    // Bind tooltip to the country
    layer.bindTooltip(countryName, {
      permanent: false,
      direction: "auto",
      className: "custom-tooltip",
    });

    // Add hover interactions
    layer.on({
      mouseover: (e) => highlightCountry(e),
      mouseout: (e) => resetCountryHighlight(e, geojsonLayer),
    });
  };

  const highlightCountry = (e) => {
    const layer = e.target;
    const { hoverStyle } = COUNTRY_CONFIG;

    layer.setStyle({
      weight: hoverStyle.weight,
      color: hoverStyle.color,
      fillOpacity: hoverStyle.fillOpacity,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  };

  const resetCountryHighlight = (e, geojsonLayer) => {
    if (geojsonLayer.value) {
      geojsonLayer.value.resetStyle(e.target);
    }
  };

  return {
    visitedCountriesSet,
    styleCountryFeature,
    onEachCountryFeature,
    highlightCountry,
    resetCountryHighlight,
  };
}
