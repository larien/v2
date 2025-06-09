import { ref, onMounted, onUnmounted } from "vue";
import { EASTER_EGG_CONFIG } from "@/config";

export function useKonamiCode(itineraryUrl = EASTER_EGG_CONFIG.targetUrl) {
  const konamiIndex = ref(0);
  const { konamiCode, message } = EASTER_EGG_CONFIG;

  const handleKonamiCode = (event) => {
    if (event.keyCode === konamiCode[konamiIndex.value]) {
      konamiIndex.value++;

      if (konamiIndex.value === konamiCode.length) {
        triggerKonamiAction();
        konamiIndex.value = 0; // Reset for future attempts
      }
    } else {
      konamiIndex.value = 0; // Wrong key, reset sequence
    }
  };

  const triggerKonamiAction = () => {
    alert(message);
    window.open(itineraryUrl, "_blank");
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKonamiCode);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKonamiCode);
  });

  return {
    konamiIndex,
  };
}
