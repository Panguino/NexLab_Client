# AnimatorMapMachine - Detailed Implementation Steps

## Quick Start Checklist

### Step 1: Confirm Technology Choice
- [ ] Review MAP_TECHNOLOGY_COMPARISON.md
- [ ] Confirm Mapbox GL JS is acceptable
- [ ] Get Mapbox API key (free tier)

### Step 2: Create Base Component Structure
- [ ] Create `src/components/elements/Animator/AnimatorMapMachine/` directory
- [ ] Create `AnimatorMapMachine.tsx` (base component)
- [ ] Create `AnimatorMapMachine.module.scss` (styles)
- [ ] Create TypeScript interfaces file

### Step 3: Create Map Provider Abstraction
- [ ] Create `providers/MapProvider.ts` (interface)
- [ ] Create `providers/MapboxProvider.tsx` (implementation)
- [ ] Create `utils/projections.ts` (region definitions)
- [ ] Create `utils/mapStyles.ts` (Mapbox styles)

### Step 4: Create Static Test Data
- [ ] Create `src/data/maps/staticMapData.ts`
- [ ] Create sample GeoJSON for counties/states
- [ ] Create sample hurricane path data
- [ ] Create multiple frames for animation

### Step 5: Create Storybook Stories
- [ ] Create `AnimatorMapMachine.stories.tsx`
- [ ] Create 7+ stories demonstrating features
- [ ] Add documentation and examples

### Step 6: Integration with Animator
- [ ] Create `AnimatorMapSizer.tsx`
- [ ] Create `MapControls.tsx`
- [ ] Update `Animator.tsx` to support map mode
- [ ] Create integration stories

### Step 7: Performance Optimization
- [ ] Implement viewport culling
- [ ] Add frame caching
- [ ] Test on mobile devices
- [ ] Optimize GeoJSON loading

### Step 8: Testing & Documentation
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Performance benchmarks
- [ ] Update main Animator documentation

---

## Detailed Implementation Guide

### Phase 1: Base Component (2-3 hours)

#### 1.1 Create Directory Structure
```bash
mkdir -p src/components/elements/Animator/AnimatorMapMachine/providers
mkdir -p src/components/elements/Animator/AnimatorMapMachine/utils
mkdir -p src/data/maps
```

#### 1.2 Create AnimatorMapMachine.tsx
Key features:
- Frame management (similar to AnimatorImageMachine)
- Opacity-based transitions
- Provider abstraction
- Ref forwarding
- Loading states

```typescript
interface IAnimatorMapMachineProps {
  frames: MapFrame[]
  currentFrame: number
  mapProvider: 'mapbox' | 'canvas-d3'
  region: RegionType
  baseOpacity?: number
  zIndex?: number
  onFrameChange?: (frameIndex: number) => void
}
```

#### 1.3 Create TypeScript Interfaces
```typescript
interface MapFrame {
  id: string
  timestamp: Date
  data: GeoJSON
  overlays?: MapOverlay[]
  metadata?: Record<string, any>
}

interface MapOverlay {
  id: string
  type: 'path' | 'marker' | 'polygon' | 'heatmap'
  data: any
  style: StyleObject
  opacity?: number
}

interface RegionConfig {
  id: RegionType
  label: string
  center: [number, number]
  zoom: number
  bounds: [[number, number], [number, number]]
}
```

---

### Phase 2: Mapbox Integration (3-4 hours)

#### 2.1 Install Dependencies
```bash
npm install mapbox-gl @types/mapbox-gl turf
```

#### 2.2 Create MapboxProvider.tsx
Responsibilities:
- Initialize Mapbox map instance
- Handle region/projection setup
- Render GeoJSON layers
- Manage zoom/pan state
- Handle frame transitions
- Implement LOD system

Key methods:
```typescript
class MapboxProvider implements MapProvider {
  initialize(container: HTMLElement, config: MapConfig): void
  addLayer(layer: MapLayer): void
  removeLayer(layerId: string): void
  setOpacity(layerId: string, opacity: number): void
  updateData(data: GeoJSON): void
  setZoom(zoom: number): void
  destroy(): void
}
```

#### 2.3 Create Projection Utilities
```typescript
// src/components/elements/Animator/AnimatorMapMachine/utils/projections.ts
export const REGION_CONFIGS: Record<RegionType, RegionConfig> = {
  conus: {
    id: 'conus',
    label: 'Continental US',
    center: [-95, 37],
    zoom: 3,
    bounds: [[-125, 24], [-66, 50]]
  },
  alaska: { /* ... */ },
  hawaii: { /* ... */ },
  namer: { /* ... */ }
}
```

#### 2.4 Create Map Styles
```typescript
// src/components/elements/Animator/AnimatorMapMachine/utils/mapStyles.ts
export const MAP_STYLES = {
  dark: 'mapbox://styles/mapbox/dark-v11',
  light: 'mapbox://styles/mapbox/light-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9'
}

export const LAYER_STYLES = {
  counties: {
    type: 'fill',
    paint: { 'fill-color': '#088', 'fill-opacity': 0.3 }
  },
  states: {
    type: 'line',
    paint: { 'line-color': '#fff', 'line-width': 2 }
  },
  hurricanePath: {
    type: 'line',
    paint: { 'line-color': '#f00', 'line-width': 3 }
  }
}
```

---

### Phase 3: Static Test Data (1-2 hours)

#### 3.1 Create Test Data File
```typescript
// src/data/maps/staticMapData.ts
export const SAMPLE_COUNTIES_GEOJSON = { /* ... */ }
export const SAMPLE_STATES_GEOJSON = { /* ... */ }

export const HURRICANE_PATH_FRAMES: MapFrame[] = [
  {
    id: 'frame-001',
    timestamp: new Date('2024-09-01T00:00:00Z'),
    data: { /* GeoJSON */ },
    overlays: [
      {
        id: 'counties',
        type: 'polygon',
        data: SAMPLE_COUNTIES_GEOJSON,
        style: { fill: '#ccc', stroke: '#333' }
      }
    ]
  },
  // ... more frames
]
```

#### 3.2 Create Sample Data
- Use existing county/state data from API
- Create 5-10 frames of hurricane path data
- Include metadata (wind speed, category, etc.)

---

### Phase 4: Storybook Stories (2-3 hours)

#### 4.1 Create Stories File
```typescript
// src/components/elements/Animator/AnimatorMapMachine/AnimatorMapMachine.stories.tsx
```

#### 4.2 Create 7+ Stories
1. `basicMapRendering` - Simple state/county borders
2. `withHurricanePath` - Animated hurricane track
3. `multipleFrames` - Time-series map data
4. `withCustomMarkers` - Interactive markers
5. `zoomLOD` - Demonstrate LOD system
6. `differentRegions` - CONUS, Alaska, Hawaii
7. `mobilePerformance` - Mobile-optimized view
8. `withOverlays` - Multiple overlay layers

---

### Phase 5: Integration (2-3 hours)

#### 5.1 Create AnimatorMapSizer.tsx
Similar to `AnimatorImageSizer` but for maps:
- Responsive sizing
- Zoom/pan controls
- Click-through interactions
- Soundings picker support

#### 5.2 Create MapControls.tsx
- Region selector dropdown
- Zoom in/out buttons
- Reset view button
- LOD toggle (if applicable)

#### 5.3 Update Animator.tsx
Add props:
```typescript
mapMode?: boolean
mapProvider?: 'mapbox' | 'canvas-d3'
mapRegion?: RegionType
mapFrames?: MapFrame[]
```

---

### Phase 6: Performance Optimization (2-3 hours)

#### 6.1 Implement Viewport Culling
Only render features visible in current viewport

#### 6.2 Add Frame Caching
Cache rendered frames to avoid re-rendering

#### 6.3 Optimize GeoJSON
- Simplify geometries at different zoom levels
- Use TopoJSON for smaller file sizes
- Lazy load data as needed

#### 6.4 Mobile Testing
- Test on actual mobile devices
- Profile performance with DevTools
- Optimize for 60fps

---

## Timeline Estimate

| Phase | Tasks | Hours | Status |
|-------|-------|-------|--------|
| 1 | Base Component | 2-3 | ⏳ |
| 2 | Mapbox Integration | 3-4 | ⏳ |
| 3 | Test Data | 1-2 | ⏳ |
| 4 | Storybook Stories | 2-3 | ⏳ |
| 5 | Integration | 2-3 | ⏳ |
| 6 | Performance | 2-3 | ⏳ |
| 7 | Testing & Docs | 2-3 | ⏳ |
| **Total** | | **15-21 hours** | |

---

## Success Metrics

- [ ] Component renders map frames with opacity transitions
- [ ] Smooth zoom/pan on desktop (60fps)
- [ ] Smooth zoom/pan on mobile (50fps+)
- [ ] LOD system reduces complexity at different zoom levels
- [ ] Supports multiple regions (CONUS, Alaska, Hawaii)
- [ ] Can display hurricane paths and custom overlays
- [ ] 7+ comprehensive Storybook stories
- [ ] Mobile performance acceptable
- [ ] Integrates seamlessly with existing Animator
- [ ] Full TypeScript support with no `any` types

---

## Next Steps

1. **Confirm technology choice** - Review comparison and get approval
2. **Get Mapbox API key** - Sign up at mapbox.com (free tier)
3. **Start Phase 1** - Create base component structure
4. **Iterate through phases** - Follow the detailed steps above
5. **Test continuously** - Especially on mobile devices
6. **Document as you go** - Update Storybook and comments

---

## Resources

- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
- [Turf.js Documentation](https://turfjs.org/)
- [D3 Geo Documentation](https://github.com/d3/d3-geo)
- [GeoJSON Specification](https://geojson.org/)

