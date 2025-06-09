/**
 * Hooks (Composables) index
 * Alternative naming for composables, commonly used in React/Vue communities
 *
 * This file re-exports all composables for convenience
 * You can import from either '@/composables' or '@/hooks'
 */

// Re-export all composables
export { useLeafletMap } from "@/composables/useLeafletMap";
export { useMapMarkers } from "@/composables/useMapMarkers";
export { useCountryInteractions } from "@/composables/useCountryInteractions";
export { useModal } from "@/composables/useModal";
export { useKonamiCode } from "@/composables/useKonamiCode";

// Named exports object for convenience
export const hooks = {
  useLeafletMap: () =>
    import("@/composables/useLeafletMap").then((m) => m.useLeafletMap),
  useMapMarkers: () =>
    import("@/composables/useMapMarkers").then((m) => m.useMapMarkers),
  useCountryInteractions: () =>
    import("@/composables/useCountryInteractions").then(
      (m) => m.useCountryInteractions
    ),
  useModal: () => import("@/composables/useModal").then((m) => m.useModal),
  useKonamiCode: () =>
    import("@/composables/useKonamiCode").then((m) => m.useKonamiCode),
};

// Default export for convenience
export default hooks;
