import { ref } from "vue";

export function useModal() {
  const showModal = ref(false);
  const modalContent = ref(null);
  const currentCityName = ref(null);

  const openModal = (post, flyToLocation) => {
    const { location, url } = post;

    currentCityName.value = location.name || "Unknown City";
    modalContent.value = createModalContent(url);
    showModal.value = true;

    // Zoom into the location
    if (flyToLocation) {
      flyToLocation(location.latitude, location.longitude);
    }
  };

  const closeModal = (zoomOut) => {
    showModal.value = false;
    modalContent.value = null;
    currentCityName.value = null;

    // Zoom out when closing modal
    if (zoomOut) {
      zoomOut();
    }
  };

  const closeModalOnOutsideClick = (event, zoomOut) => {
    if (event.target.classList.contains("modal")) {
      closeModal(zoomOut);
    }
  };

  const createModalContent = (url) => {
    if (!url) {
      return "<p>No additional content available for this location.</p>";
    }

    return `<iframe 
      src="${url}/embed" 
      width="300" 
      height="400" 
      style="border:none;"
    ></iframe>`;
  };

  return {
    showModal,
    modalContent,
    currentCityName,
    openModal,
    closeModal,
    closeModalOnOutsideClick,
  };
}
