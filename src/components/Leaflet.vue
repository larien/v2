<template>
  <div>
    <div id="map" ref="map"></div>

    <div v-if="showModal" class="modal" @click="closeModalOnOutsideClick">
      <div class="modal-content" @click.stop>
        <h2 class="modal-title">
          <a
            v-if="currentCityName === 'Florianópolis'"
            :href="itinerary"
            target="_blank"
            title="Where is Lauren?"
            >✈️</a
          >
          {{ currentCityName }}
        </h2>
        <button class="close-button" @click="closeModal">X</button>
        <div v-html="modalContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/assets/styles.css";
import instagramPosts from "@/assets/posts.json"; // Import the Instagram posts mock data
import pinIcon from "@/assets/icons/pin.svg"; // Import the SVG file

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
      geojsonLayer: null,
      markers: [],
      visitedCountriesSet: new Set(),
      showModal: false,
      modalContent: null,
      currentCityName: null,
      konamiCode: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], // Key codes for ↑↑↓↓←→←→BA
      konamiIndex: 0, // Track the user's progress in the code
      itinerary: "https://trips.larien.dev",
    };
  },
  mounted() {
    this.initMap();
    window.addEventListener("keydown", this.handleKonamiCode);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKonamiCode);
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.map, {
        minZoom: 2, // Prevent zooming out too much
      }).setView([-14.235, -51.9253], 3); // Coordinates for Brazil and zoom level 3

      L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.{ext}",
        {
          attribution: "",
          subdomains: "abcd",
          minZoom: 0,
          maxZoom: 20,
          ext: "png",
        }
      ).addTo(this.map);

      fetch(
        "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
      )
        .then((response) => response.json())
        .then((data) => {
          this.geojsonLayer = L.geoJson(data, {
            style: this.styleFeature,
            onEachFeature: this.onEachFeature,
          }).addTo(this.map);
        });

      this.processPosts();
    },
    handleKonamiCode(event) {
      if (event.keyCode === this.konamiCode[this.konamiIndex]) {
        // Correct key in sequence
        this.konamiIndex++;
        if (this.konamiIndex === this.konamiCode.length) {
          // Full sequence matched
          this.triggerKonamiAction();
          this.konamiIndex = 0; // Reset for future attempts
        }
      } else {
        // Wrong key, reset the sequence
        this.konamiIndex = 0;
      }
    },
    triggerKonamiAction() {
      alert("You unlocked the secret itinerary! Nice job!");
      window.open(this.itinerary, "_blank");
    },
    getRandomBlue() {
      const blueTones = ["#014ba0", "#0a5cb8", "#1466c3", "#2174d4", "#3b8eed"];
      return blueTones[Math.floor(Math.random() * blueTones.length)];
    },
    styleFeature(feature) {
      const isVisited = this.visitedCountriesSet.has(feature.properties.name);
      const fillColor = this.getRandomBlue();

      return {
        fillColor: fillColor,
        fillOpacity: 0.7,
        color: isVisited ? "#ffffff" : fillColor,
        weight: isVisited ? 2 : 0,
        opacity: 1,
      };
    },
    onEachFeature(feature, layer) {
      const countryName = feature.properties.name || "Unknown Country";

      // Bind a tooltip to the country
      layer.bindTooltip(countryName, {
        permanent: false, // Tooltip only visible on hover
        direction: "auto",
        className: "custom-tooltip",
      });

      // Highlight on hover
      layer.on({
        mouseover: (e) => {
          this.highlightFeature(e);
        },
        mouseout: (e) => {
          this.resetHighlight(e);
        },
      });
    },
    highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({
        weight: 3,
        color: "#ffffff",
        fillOpacity: 0.9,
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    resetHighlight(e) {
      this.geojsonLayer.resetStyle(e.target);
    },
    processPosts() {
      instagramPosts.forEach((post) => {
        const location = post.location;
        const emoji = post.emoji || null; // Use the emoji if provided, otherwise default to null

        const customIcon = L.divIcon({
          className: "custom-pin",
          html: emoji
            ? `<div style="display: flex; justify-content: center; align-items: center; width: 35px; height: 35px; background-color: white; border-radius: 50%; box-shadow: 3px 5px 4px rgba(0,0,0,0.2); border: 1px solid black; font-size: 20px;">${emoji}</div>`
            : `<img src="${pinIcon}" style="width:50px;height:50px; background-color:white; border-radius:50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" />`,
          iconSize: [30, 30], // Adjust icon size as needed
          iconAnchor: [20, 20], // Adjust anchor point
          popupAnchor: [0, 0], // Adjust popup position
        });

        // eslint-disable-next-line
        const marker = L.marker([location.latitude, location.longitude], {
          icon: customIcon,
        })
          .bindTooltip(location.name, {
            permanent: false, // Tooltip only appears on hover
            offset: [-5, -20],
            direction: "top",
            className: "custom-tooltip",
          })
          .on("click", () => {
            // Set the modal content and open it
            this.currentCityName = location.name || "Unknown City";
            this.modalContent = post.url
              ? `<iframe src="${post.url}/embed" width="300" height="400" style="border:none;"></iframe>`
              : `<p>No additional content available for this location.</p>`;
            this.showModal = true;

            // Zoom into the location
            this.map.flyTo([location.latitude, location.longitude], 8, {
              animate: true,
              duration: 1.5,
            });
          })
          .addTo(this.map);
      });

      console.log("Markers added:", this.markers);
    },
    createTooltipContent(name, url) {
      const content = document.createElement("div");
      if (url) {
        content.innerHTML = `
        <div class="tooltip-content">
          <div class="city-name">${name}</div>
          <iframe class="tooltip-iframe" src="${
            url + "/embed"
          }" width="300" height="400" style="border:none; display: none;"></iframe>
        </div>
      `;
      } else {
        content.innerHTML = `
        <div class="tooltip-content">
          <div class="city-name">${name}</div>
        </div>
      `;
      }
      return content;
    },
    showTooltip(e) {
      const layer = e.target;
      const tooltip = layer.getTooltip();
      if (tooltip) {
        tooltip.getElement().onmouseover = () => {
          layer.openTooltip();
        };
        tooltip.getElement().onmouseout = () => {
          layer.closeTooltip();
        };
      }
    },
    hideTooltip(e) {
      const layer = e.target;
      const tooltip = layer.getTooltip();
      if (tooltip) {
        tooltip.getElement().onmouseover = null;
        tooltip.getElement().onmouseout = null;
      }
    },
    closeModalOnOutsideClick(event) {
      if (event.target.classList.contains("modal")) {
        this.closeModal();
      }
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = null;

      // Zoom out slightly more than the last zoom level
      const currentZoom = this.map.getZoom(); // Get the current zoom level
      const targetZoom = Math.max(currentZoom - 3, 3);
      this.map.flyTo(this.map.getCenter(), targetZoom, {
        animate: true,
        duration: 0.7,
      });
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
}

.tooltip-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tooltip-iframe {
  display: none;
}

.city-name {
  font-size: 16px;
  color: #ffffff;
}

.leaflet-interactive {
  outline: none;
}

/* Target the Leaflet marker container for cursor and z-index only */
:deep(.leaflet-marker-icon.custom-pin) {
  cursor: pointer !important;
}

:deep(.leaflet-marker-icon.custom-pin:hover) {
  z-index: 1000 !important;
}

/* Target the inner content of pins for scaling */
:deep(.custom-pin img) {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out !important;
  transform-origin: center center !important;
}

:deep(.custom-pin div) {
  transition: transform 0.2s ease-in-out !important;
  transform-origin: center center !important;
}

/* Scale the inner content on hover */
:deep(.leaflet-marker-icon.custom-pin:hover img) {
  transform: scale(1.3) !important;
}

:deep(.leaflet-marker-icon.custom-pin:hover div) {
  transform: scale(1.3) !important;
}

.custom-tooltip {
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

.city-name {
  font-size: 16px;
  color: #ffffff;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
}

@media (max-width: 768px) {
  :deep(.custom-pin) {
    width: 40px; /* Larger size for mobile */
    height: 40px;
  }

  :deep(.custom-pin img) {
    width: 40px;
    height: 40px;
  }

  :deep(.custom-pin div) {
    font-size: 24px; /* Increase emoji size on mobile */
  }
}
</style>
