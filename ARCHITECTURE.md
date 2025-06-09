# 🏗️ Project Architecture - Advanced Vue.js Structure

This document outlines the comprehensive, production-ready folder structure and architecture patterns implemented in this Vue.js Leaflet mapping application.

## 📁 Complete Folder Structure

```
src/
├── 📁 assets/                    # Static assets and resources
│   ├── 📁 data/                  # JSON data files
│   │   ├── posts.json           # Instagram posts data
│   │   ├── next.json            # Next.js data
│   │   └── index.js             # Data management and processing
│   ├── 📁 icons/                # SVG and icon files
│   │   └── pin.svg
│   ├── styles.css               # Legacy styles
│   ├── logo.svg                 # App logo
│   └── index.js                 # Centralized asset exports
│
├── 📁 components/               # Vue components
│   ├── Leaflet.vue            # Main map orchestration component
│   └── MapModal.vue           # Reusable modal component
│
├── 📁 composables/             # Vue Composition API logic
│   ├── useLeafletMap.js       # Core map functionality
│   ├── useMapMarkers.js       # Pin/marker management
│   ├── useCountryInteractions.js # Country styling & interactions
│   ├── useModal.js            # Modal state management
│   └── useKonamiCode.js       # Easter egg functionality
│
├── 📁 hooks/                   # Alternative name for composables
│   └── index.js               # Re-exports composables for convenience
│
├── 📁 config/                  # Configuration and constants
│   └── index.js               # Centralized app configuration
│
├── 📁 services/               # API and external service layers
│   └── mapDataService.js      # Map data fetching and validation
│
├── 📁 utils/                  # Utility functions and helpers
│   └── domHelpers.js          # DOM manipulation utilities
│
├── 📁 lib/                    # External library configurations
│   └── leaflet.js             # Leaflet setup and extensions
│
├── 📁 styles/                 # Centralized styling
│   └── variables.css          # CSS custom properties/variables
│
├── 📁 types/                  # Type definitions (JSDoc/TypeScript ready)
│   └── index.js               # Type definitions and interfaces
│
├── main.js                    # Application entry point
└── App.vue                    # Root component
```

## 🎯 Architecture Principles

### 1. **Separation of Concerns**
Each folder has a single, clear responsibility:
- **Components**: UI rendering and user interactions
- **Composables**: Reactive business logic
- **Services**: External API communication
- **Utils**: Pure utility functions
- **Config**: Application configuration
- **Lib**: Third-party library setup

### 2. **Modularity**
- Loosely coupled modules
- Each module can be tested independently
- Easy to replace or extend individual parts

### 3. **Scalability**
- Clear conventions for adding new features
- Folder structure scales with team size
- Easy to navigate for new developers

### 4. **Maintainability**
- Centralized configuration
- Consistent naming conventions
- Clear import/export patterns

## 🔧 Key Features by Folder

### 📁 `config/`
**Purpose**: Centralized configuration management

```javascript
// Example usage
import { MAP_CONFIG, PIN_CONFIG, APP_CONFIG } from '@/config'

// All app settings in one place
const mapCenter = MAP_CONFIG.center
const pinSize = PIN_CONFIG.defaultSize
const appUrl = APP_CONFIG.itineraryUrl
```

**Benefits**:
- Single source of truth for settings
- Easy environment-specific configurations
- Type-safe configuration objects

### 📁 `services/`
**Purpose**: External API and data management

```javascript
// Example usage
import { MapDataService } from '@/services/mapDataService'

// Robust data fetching with validation
const data = await MapDataService.fetchCountriesData()
const isValid = MapDataService.validateGeoJsonData(data)
```

**Benefits**:
- Centralized API logic
- Error handling and validation
- Easy to mock for testing

### 📁 `utils/`
**Purpose**: Reusable utility functions

```javascript
// Example usage
import { createStyledPin, debounce, safeGet } from '@/utils/domHelpers'

// Clean utility functions
const pinHTML = createStyledPin('📍', { fontSize: '20px' })
const debouncedFn = debounce(myFunction, 300)
const userEmail = safeGet(user, 'profile.email', 'N/A')
```

**Benefits**:
- Reusable across components
- Pure functions (easy to test)
- Consistent DOM manipulation

### 📁 `lib/`
**Purpose**: Third-party library configuration

```javascript
// Example usage
import L, { isValidCoordinate, createBounds } from '@/lib/leaflet'

// Pre-configured Leaflet with utilities
const isValid = isValidCoordinate(lat, lng)
const bounds = createBounds(coordinates)
```

**Benefits**:
- Centralized library setup
- Custom extensions and utilities
- Consistent configuration across app

### 📁 `assets/data/`
**Purpose**: Data management and processing

```javascript
// Example usage
import { getPostsData, getPostsStatistics } from '@/assets/data'

// Processed and validated data
const posts = getPostsData()
const stats = getPostsStatistics()
```

**Benefits**:
- Data validation and processing
- Statistics and analytics
- Flexible data filtering

### 📁 `styles/`
**Purpose**: Design system and CSS variables

```css
/* Example usage */
:root {
  --color-primary: #014ba0;
  --spacing-md: 16px;
  --transition-normal: 0.2s ease-in-out;
}

.my-component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  transition: var(--transition-normal);
}
```

**Benefits**:
- Consistent design tokens
- Easy theming and customization
- Maintainable CSS architecture

### 📁 `types/`
**Purpose**: Type definitions and documentation

```javascript
/**
 * @typedef {Object} Post
 * @property {Location} location - Location information
 * @property {string} [url] - Optional Instagram post URL
 * @property {string} [emoji] - Optional emoji for the pin
 */
```

**Benefits**:
- Better IDE support
- Self-documenting code
- TypeScript migration ready

## 🚀 Import Patterns

### Centralized Imports
```javascript
// From config
import { MAP_CONFIG, PIN_CONFIG } from '@/config'

// From assets (includes data, icons, styles)
import { getPostsData, pinIcon } from '@/assets'

// From composables (or hooks - same thing)
import { useLeafletMap, useMapMarkers } from '@/composables'
// or
import { useLeafletMap, useMapMarkers } from '@/hooks'

// From services
import { MapDataService } from '@/services/mapDataService'

// From utils
import { createStyledPin, debounce } from '@/utils/domHelpers'

// From lib
import L from '@/lib/leaflet'
```

## 📦 Component Organization

### Smart vs Dumb Components
- **Smart Components** (Leaflet.vue): Handle data, state, business logic
- **Dumb Components** (MapModal.vue): Pure UI, props in, events out

### Composable Pattern
```javascript
// In component
export default {
  setup() {
    // Each composable handles specific concern
    const { mapRef, map, flyToLocation } = useLeafletMap()
    const { addMarkersToMap } = useMapMarkers()
    const { showModal, openModal } = useModal()
    
    // Orchestrate interactions
    const handleMarkerClick = (post) => {
      openModal(post, flyToLocation)
    }
    
    return {
      mapRef,
      showModal,
      handleMarkerClick
    }
  }
}
```

## 🛠️ Development Workflows

### Adding New Features

1. **New Component**:
   ```
   src/components/NewComponent.vue
   ```

2. **New Business Logic**:
   ```
   src/composables/useNewFeature.js
   ```

3. **New External Service**:
   ```
   src/services/newService.js
   ```

4. **New Configuration**:
   ```
   // Add to src/config/index.js
   export const NEW_CONFIG = { ... }
   ```

5. **New Utilities**:
   ```
   src/utils/newHelpers.js
   ```

### Testing Strategy
- **Composables**: Unit test logic separately
- **Components**: Test user interactions
- **Services**: Mock external dependencies
- **Utils**: Test pure functions

### Performance Considerations
- **Lazy Loading**: Dynamic imports in composables
- **Code Splitting**: Route-based splitting ready
- **Tree Shaking**: ES module exports
- **Caching**: Service layer caching

## 🔄 Migration Benefits

### Before vs After

**Before**:
- ❌ 400+ line monolithic component
- ❌ Mixed concerns
- ❌ Hard to test
- ❌ Difficult to extend

**After**:
- ✅ Modular architecture
- ✅ Single responsibility
- ✅ Easy to test
- ✅ Scalable structure
- ✅ Modern Vue.js patterns
- ✅ Production-ready organization

## 📚 Best Practices

### File Naming
- **PascalCase**: Components (MapModal.vue)
- **camelCase**: Composables (useLeafletMap.js)
- **kebab-case**: Utils, services (map-data-service.js)

### Import Organization
```javascript
// 1. Vue imports
import { ref, onMounted } from 'vue'

// 2. External libraries
import L from 'leaflet'

// 3. Internal imports (by category)
import { MAP_CONFIG } from '@/config'
import { MapDataService } from '@/services/mapDataService'
import { createStyledPin } from '@/utils/domHelpers'

// 4. Relative imports
import MapModal from './MapModal.vue'
```

### Error Handling
- Service layer handles API errors
- Composables propagate errors up
- Components show user-friendly messages

This architecture provides a solid foundation for a scalable, maintainable Vue.js application while following modern development practices and patterns. 