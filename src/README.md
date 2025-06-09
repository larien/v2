# Leaflet Map Component - Refactored Architecture

This project has been refactored to follow Vue.js best practices with a clean, modular architecture using the Composition API.

## 🏗️ Architecture Overview

The codebase is now organized into focused, reusable modules:

### 📁 Structure

```
src/
├── components/
│   ├── Leaflet.vue          # Main map component (orchestration)
│   └── MapModal.vue         # Modal component (UI)
├── composables/
│   ├── useLeafletMap.js     # Core map functionality
│   ├── useMapMarkers.js     # Pin/marker management
│   ├── useCountryInteractions.js # Country styling & interactions
│   ├── useModal.js          # Modal state management
│   └── useKonamiCode.js     # Easter egg functionality
├── constants/
│   └── index.js             # Centralized configuration
└── assets/
    ├── posts.json           # Data
    └── icons/               # SVG assets
```

## 🧩 Composables

### `useLeafletMap()`
- **Purpose**: Core map initialization and navigation
- **Returns**: `mapRef`, `map`, `geojsonLayer`, `flyToLocation`, `zoomOut`
- **Features**: Map setup, tile layers, country data loading

### `useMapMarkers()`
- **Purpose**: Pin creation and management
- **Returns**: `addMarkersToMap`, `clearMarkers`, `createMarker`
- **Features**: Emoji pins, SVG pins, tooltips, hover effects

### `useCountryInteractions()`
- **Purpose**: Country styling and hover effects
- **Returns**: `styleCountryFeature`, `onEachCountryFeature`
- **Features**: Random blue tones, hover highlighting, tooltips

### `useModal()`
- **Purpose**: Modal state and content management
- **Returns**: `showModal`, `openModal`, `closeModal`
- **Features**: Instagram embed, city information

### `useKonamiCode()`
- **Purpose**: Easter egg functionality
- **Returns**: `konamiIndex`
- **Features**: Key sequence detection, secret itinerary

## 🎨 Components

### `Leaflet.vue`
- **Role**: Orchestration component
- **Responsibilities**: Composable coordination, event handling
- **Benefits**: Clean, focused, easy to test

### `MapModal.vue`
- **Role**: Reusable modal component
- **Props**: `show`, `cityName`, `content`, `itineraryUrl`
- **Events**: `close`, `close-outside`
- **Benefits**: Single responsibility, reusable

## ⚙️ Constants

Centralized configuration in `constants/index.js`:
- `MAP_CONFIG`: Map settings and tile layer configuration
- `PIN_CONFIG`: Pin sizes, anchors, and offsets
- `BLUE_TONES`: Country color palette
- `KONAMI_CODE`: Easter egg key sequence
- `ITINERARY_URL`: External link

## ✨ Key Benefits

### 🔧 **Maintainability**
- Single responsibility principle
- Focused, testable modules
- Clear separation of concerns

### 🚀 **Reusability**
- Composables can be used across components
- Centralized configuration
- Modular pin system

### 📱 **Modern Vue.js**
- Composition API
- Reactive patterns
- Proper lifecycle management

### 🎯 **Developer Experience**
- Clear file organization
- Predictable imports
- Easy to extend

## 🔄 Migration Benefits

**Before**: 400+ line monolithic component
**After**: Focused modules with clear responsibilities

### Code Quality Improvements:
- ✅ Composition API (Vue 3 ready)
- ✅ Proper separation of concerns
- ✅ Centralized configuration
- ✅ Reusable components
- ✅ Better error handling
- ✅ Consistent naming conventions
- ✅ Modular architecture

## 🚀 Usage Example

```vue
<template>
  <LeafletMap />
</template>

<script>
import LeafletMap from '@/components/Leaflet.vue'

export default {
  components: {
    LeafletMap
  }
}
</script>
```

## 🛠️ Extending the System

### Adding New Pin Types
1. Update `PIN_CONFIG` in constants
2. Extend `createCustomIcon()` in `useMapMarkers`
3. Add new styling in component CSS

### Adding Map Features
1. Create new composable in `composables/`
2. Import and use in `Leaflet.vue`
3. Add configuration to constants if needed

### Customizing Appearance
1. Update constants for global changes
2. Modify component CSS for styling
3. Extend composables for new interactions 