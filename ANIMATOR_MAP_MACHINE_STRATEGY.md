# AnimatorMapMachine Implementation Strategy

## Overview
Create a performant, interactive map animation component similar to `AnimatorImageMachine` but for rendering D3/map-based visualizations with support for:
- Multiple frames of map data (e.g., hurricane paths over time)
- County/state/region boundaries with different detail levels
- Multiple projections (CONUS, Alaska, Hawaii, etc.)
- Smooth, performant zoom/pan
- Custom overlays and interactive elements
- Mobile-friendly performance

## Problem Statement
Current D3 implementations (HazardsMap) suffer from performance issues on mobile due to:
- Too many anchor points in complex geometries (counties, detailed borders)
- Rendering all details at all zoom levels
- Laggy zoom/pan interactions
- No level-of-detail (LOD) system

## Solution Approach: Level-of-Detail (LOD) System

### Key Insight
Render different geometry detail levels based on zoom level:
- **Zoomed Out**: Simplified geometries (state borders only)
- **Zoomed In**: Full detail (county borders, detailed paths)
- **Intermediate**: Medium detail (simplified counties)

### Technology Recommendations

#### Option 1: **Mapbox GL JS** (RECOMMENDED)
**Pros:**
- Built-in LOD system via vector tiles
- Excellent mobile performance
- Smooth zoom/pan with GPU acceleration
- Easy styling and customization
- Great for interactive elements
- Supports custom data layers

**Cons:**
- Requires API key (free tier available)
- Less control over exact rendering
- Learning curve for custom styling

**Best For:** Production use, mobile optimization, hurricane paths

#### Option 2: **Deck.gl** (Alternative)
**Pros:**
- GPU-accelerated rendering
- Excellent performance at scale
- Great for large datasets
- Custom layer support

**Cons:**
- Steeper learning curve
- More complex setup
- Overkill for simple maps

#### Option 3: **Canvas-based D3 with Simplification** (Budget Option)
**Pros:**
- No external dependencies
- Full control over rendering
- Works with existing D3 code

**Cons:**
- Manual LOD implementation required
- More complex code
- Still may have performance issues on mobile

**Recommendation:** Start with **Mapbox GL JS** for production quality, but implement Canvas-based D3 with simplification as fallback.

## Implementation Phases

### Phase 1: Base AnimatorMapMachine Component
**Goal:** Create the core component structure

**Tasks:**
1. Create `AnimatorMapMachine.tsx` component
   - Similar structure to `AnimatorImageMachine`
   - Frame management (array of map data objects)
   - Opacity-based frame transitions
   - Ref forwarding for parent control

2. Define TypeScript interfaces:
   ```typescript
   interface MapFrame {
     id: string
     timestamp: Date
     data: GeoJSON | MapboxData
     overlays?: MapOverlay[]
   }
   
   interface MapOverlay {
     id: string
     type: 'path' | 'marker' | 'polygon' | 'heatmap'
     data: any
     style: StyleObject
   }
   
   interface AnimatorMapMachineProps {
     frames: MapFrame[]
     currentFrame: number
     mapProvider: 'mapbox' | 'canvas-d3'
     region: 'conus' | 'alaska' | 'hawaii' | 'namer'
     baseOpacity?: number
     zIndex?: number
     onFrameChange?: (frameIndex: number) => void
   }
   ```

3. Create map provider abstraction layer:
   - `MapProvider` interface
   - `MapboxProvider` implementation
   - `CanvasD3Provider` implementation (future)

### Phase 2: Mapbox Integration
**Goal:** Implement Mapbox GL JS rendering

**Tasks:**
1. Install dependencies:
   ```bash
   npm install mapbox-gl @types/mapbox-gl
   ```

2. Create `MapboxProvider.tsx`:
   - Initialize Mapbox map
   - Handle projections/regions
   - Render GeoJSON layers
   - Manage zoom/pan state
   - Handle custom markers/overlays

3. Implement LOD system:
   - Define geometry simplification levels
   - Switch layers based on zoom level
   - Use Mapbox layer visibility

4. Create static test data:
   - Sample GeoJSON for counties/states
   - Sample hurricane path data
   - Multiple frames for animation

### Phase 3: Storybook Stories
**Goal:** Document and demonstrate functionality

**Stories:**
1. `basicMapRendering` - Simple state/county borders
2. `withHurricanePath` - Animated hurricane track
3. `multipleFrames` - Time-series map data
4. `withCustomMarkers` - Interactive markers
5. `zoomLOD` - Demonstrate LOD system
6. `differentRegions` - CONUS, Alaska, Hawaii
7. `mobilePerformance` - Mobile-optimized view

### Phase 4: Integration with Animator
**Goal:** Make it work with existing Animator component

**Tasks:**
1. Create `AnimatorMapSizer` (similar to `AnimatorImageSizer`)
   - Handles responsive sizing
   - Zoom/pan controls
   - Integrates with Animator context

2. Update `Animator` component:
   - Add `mapMode` prop
   - Support both image and map rendering
   - Conditional rendering logic

3. Create `MapControls` component:
   - Region selector
   - LOD toggle (if applicable)
   - Custom map controls

### Phase 5: Performance Optimization
**Goal:** Ensure mobile performance

**Tasks:**
1. Implement viewport culling
2. Add frame caching strategy
3. Optimize GeoJSON simplification
4. Add performance monitoring
5. Test on actual mobile devices

## Data Structure Examples

### Hurricane Path Frame
```typescript
{
  id: 'frame-001',
  timestamp: new Date('2024-09-01T00:00:00Z'),
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[-80, 25], [-79, 26], [-78, 27]]
        },
        properties: { windSpeed: 120, category: 4 }
      }
    ]
  },
  overlays: [
    {
      id: 'counties',
      type: 'polygon',
      data: countiesGeoJSON,
      style: { fill: '#ccc', stroke: '#333' }
    }
  ]
}
```

## File Structure
```
src/components/elements/Animator/
├── AnimatorMapMachine/
│   ├── AnimatorMapMachine.tsx
│   ├── AnimatorMapMachine.module.scss
│   ├── AnimatorMapMachine.stories.tsx
│   ├── providers/
│   │   ├── MapProvider.ts (interface)
│   │   ├── MapboxProvider.tsx
│   │   └── CanvasD3Provider.tsx (future)
│   └── utils/
│       ├── simplifyGeometry.ts
│       ├── projections.ts
│       └── mapStyles.ts
├── AnimatorMapSizer/
│   ├── AnimatorMapSizer.tsx
│   ├── AnimatorMapSizer.module.scss
│   └── AnimatorMapSizer.stories.tsx
└── MapControls/
    ├── MapControls.tsx
    ├── MapControls.module.scss
    └── MapControls.stories.tsx

src/data/maps/
├── staticMapData.ts (test data)
├── hurricanePaths.ts
├── usCounties.geojson
├── usStates.geojson
└── projections.ts
```

## Testing Strategy

### Unit Tests
- Frame loading and caching
- Opacity calculations
- Provider initialization

### Integration Tests
- Animator context integration
- Frame transitions
- Control interactions

### Performance Tests
- Frame render time
- Memory usage
- Mobile device testing

### Visual Tests
- Storybook stories
- Different regions
- Different zoom levels

## Dependencies to Add
```json
{
  "mapbox-gl": "^3.x",
  "@types/mapbox-gl": "^3.x",
  "turf": "^6.x",
  "simplify-js": "^1.x"
}
```

## Success Criteria
1. ✅ Component renders map frames with opacity transitions
2. ✅ Smooth zoom/pan on desktop and mobile
3. ✅ LOD system reduces complexity at different zoom levels
4. ✅ Supports multiple regions (CONUS, Alaska, Hawaii)
5. ✅ Can display hurricane paths and custom overlays
6. ✅ Comprehensive Storybook documentation
7. ✅ Mobile performance acceptable (60fps zoom/pan)
8. ✅ Integrates seamlessly with existing Animator

## Next Steps
1. Confirm technology choice (Mapbox GL JS recommended)
2. Create base AnimatorMapMachine component
3. Implement Mapbox provider
4. Create static test data
5. Build Storybook stories
6. Performance testing and optimization

