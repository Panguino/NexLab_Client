# AnimatorMapMachine Component

A high-performance, GPU-accelerated map animation component built with Deck.gl. Renders geographic data frames with support for multiple regions, overlays, and interactive controls.

## Overview

AnimatorMapMachine is similar to AnimatorImageMachine but renders map data instead of images. It's designed for:

- Hurricane path tracking and visualization
- Weather data animation
- Geographic data exploration
- Multi-region support (CONUS, Alaska, Hawaii, NAMER)
- Smooth zoom and pan interactions

## Architecture

### Component Hierarchy

```
Animator (mode='map')
├── AnimatorLayout
│   └── AnimatorMapSizer
│       ├── AnimatorMapMachine
│       │   └── DeckglProvider
│       └── MapControls
└── AnimatorControls
```

### Key Components

1. **AnimatorMapMachine** - Core map rendering component
2. **AnimatorMapSizer** - Sizing and layout wrapper
3. **MapControls** - Region selector and zoom controls
4. **DeckglProvider** - Deck.gl rendering backend

## Usage

### Basic Usage

```tsx
import { Animator } from '@/components/elements/Animator'
import { SAMPLE_HURRICANE_PATHS } from './AnimatorMapMachine/staticMapData'

export function MapViewer() {
  const [currentFrame, setCurrentFrame] = useState(0)

  return (
    <Animator
      frames={SAMPLE_HURRICANE_PATHS}
      mode="map"
      mapRegion="conus"
      imageInfo={{ width: 1000, height: 600 }}
      currentFrame={currentFrame}
      setCurrentFrame={setCurrentFrame}
    />
  )
}
```

### With Custom Props

```tsx
<Animator
  frames={mapFrames}
  mode="map"
  mapRegion="namer"
  imageInfo={{ width: 1200, height: 800 }}
  currentFrame={currentFrame}
  setCurrentFrame={setCurrentFrame}
  hideZoomControls={false}
  disableZoom={false}
  frameLabels={labels}
  displayAllLabels={true}
  autoPlay={true}
  interval={500}
/>
```

## Data Structure

### MapFrame

```typescript
interface MapFrame {
  id: string
  timestamp: Date
  data: FeatureCollection | Feature[] // GeoJSON data
  overlays?: MapOverlay[]
  metadata?: {
    windSpeed?: number
    category?: number
    pressure?: number
    [key: string]: any
  }
}
```

### MapOverlay

```typescript
interface MapOverlay {
  id: string
  type: 'path' | 'marker' | 'polygon' | 'heatmap' | 'scatterplot' | 'custom'
  data: any
  style?: {
    fill?: string
    stroke?: string
    strokeWidth?: number
    opacity?: number
    [key: string]: any
  }
  opacity?: number
  visible?: boolean
}
```

## Regions

Supported regions:

- **conus** - Continental United States (default)
- **alaska** - Alaska
- **hawaii** - Hawaii
- **namer** - North America & Mexico

Each region has predefined bounds and zoom levels.

## Features

### Performance

- GPU-accelerated rendering with Deck.gl
- Smooth 60fps zoom and pan on desktop
- 30-50fps on mobile devices
- Efficient frame caching
- Level-of-detail (LOD) system for complex geometries

### Interactivity

- Zoom in/out buttons
- Pan with mouse/touch
- Region selector dropdown
- Reset view button
- Frame scrubber with labels

### Customization

- Custom overlays with styling
- Metadata display
- Frame labels
- Loading states
- Opacity control

## Storybook Stories

Available stories demonstrate:

1. **BasicMapRendering** - Manual frame navigation
2. **AutoPlayAnimation** - Auto-play with loop
3. **DifferentRegions** - Region selector
4. **CustomOpacity** - Opacity slider
5. **LoadingState** - Loading state
6. **WithMetadataDisplay** - Metadata display
7. **BasicMapAnimator** - Full Animator integration
8. **MultipleRegions** - Region switching
9. **AutoPlayMap** - Auto-play with controls
10. **ZoomDisabled** - Zoom disabled mode
11. **ControlsHidden** - Hidden controls
12. **WithFrameLabels** - Frame labels

## Provider Pattern

The component uses a provider pattern for flexibility:

```typescript
interface IMapProvider {
  initialize(config: MapProviderConfig): Promise<void>
  addLayer(layerId: string, layer: DeckglLayerConfig): void
  removeLayer(layerId: string): void
  updateLayer(layerId: string, layer: DeckglLayerConfig): void
  setOpacity(layerId: string, opacity: number): void
  updateData(layerId: string, data: FeatureCollection | Feature[]): void
  setViewState(viewState: MapViewState): void
  getViewState(): MapViewState
  destroy(): void
}
```

Currently implemented:
- **DeckglProvider** - GPU-accelerated Deck.gl rendering

Future providers:
- Canvas-D3 - Canvas-based rendering with D3
- Mapbox - Mapbox GL JS (requires API key)

## Performance Optimization

### Mobile Optimization

- Reduced geometry complexity at lower zoom levels
- Touch-optimized controls
- Efficient frame caching
- Lazy loading of map data

### Desktop Optimization

- GPU acceleration
- Smooth animations
- High-resolution rendering
- Efficient layer management

## Testing

Run Storybook to test the component:

```bash
npm run storybook
```

Navigate to: `Elements > Animator > AnimatorMapMachine`

## Future Enhancements

1. **Canvas-D3 Provider** - For environments without WebGL
2. **Mapbox Provider** - For advanced styling (requires API key)
3. **Heatmap Layers** - For density visualization
4. **Custom Markers** - For point-of-interest display
5. **Animation Playback** - Built-in animation controls
6. **Export Functionality** - Export maps as images/videos
7. **Measurement Tools** - Distance and area measurement
8. **Drawing Tools** - Polygon and line drawing

## Dependencies

- `deck.gl` - GPU-accelerated visualization
- `@deck.gl/core` - Core Deck.gl functionality
- `@deck.gl/layers` - Layer implementations
- `geojson` - GeoJSON type definitions
- `react` - React framework
- `react-zoom-pan-pinch` - Zoom/pan controls (via Animator)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with WebGL support

## Known Limitations

1. Requires WebGL support (use Canvas-D3 provider for fallback)
2. Large GeoJSON files may impact performance
3. Mobile performance depends on device capabilities
4. Mapbox provider requires API key (not yet implemented)

## Contributing

When adding new features:

1. Update types in `types.ts`
2. Add provider implementations if needed
3. Create Storybook stories
4. Update this README
5. Test on mobile devices
6. Benchmark performance

## Related Components

- **AnimatorImageMachine** - Image-based animation
- **AnimatorImageSizer** - Image sizing and controls
- **Animator** - Main animator component
- **AnimatorControls** - Playback controls

