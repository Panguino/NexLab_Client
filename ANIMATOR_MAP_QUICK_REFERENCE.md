# AnimatorMapMachine - Quick Reference Guide

## 📋 One-Page Summary

### What is AnimatorMapMachine?
A performant, interactive map animation component for displaying geographic data (hurricane paths, weather data) across multiple frames with smooth zoom/pan and automatic level-of-detail rendering.

### Why Build It?
- Current D3 maps are laggy on mobile
- Need smooth zoom/pan for hurricane tracking
- Mapbox GL JS provides built-in LOD system
- Can reuse existing Animator infrastructure

### Technology: Mapbox GL JS
- ✅ 60fps desktop, 50-60fps mobile
- ✅ Built-in LOD system
- ✅ GPU-accelerated
- ✅ Free tier available
- ✅ Production-ready

---

## 🎯 Key Concepts

### Level-of-Detail (LOD)
Automatically render different geometry detail based on zoom level:
- **Zoomed out**: State borders only
- **Zoomed in**: County borders + details
- **Mapbox handles this automatically** with vector tiles

### Frame-based Animation
Like AnimatorImageMachine but for maps:
- Array of MapFrame objects
- Each frame has GeoJSON data + overlays
- Opacity transitions between frames
- Reuses Animator context

### Provider Pattern
Abstract interface for map implementations:
- MapProvider (interface)
- MapboxProvider (recommended)
- CanvasD3Provider (fallback)
- Deck.glProvider (future)

---

## 📁 File Structure

```
AnimatorMapMachine/
├── AnimatorMapMachine.tsx          # Main component
├── AnimatorMapMachine.module.scss   # Styles
├── AnimatorMapMachine.stories.tsx   # Storybook stories
├── providers/
│   ├── MapProvider.ts              # Interface
│   ├── MapboxProvider.tsx           # Implementation
│   └── CanvasD3Provider.tsx         # Future
└── utils/
    ├── projections.ts              # Region configs
    ├── mapStyles.ts                # Mapbox styles
    └── simplifyGeometry.ts         # Geometry utils

AnimatorMapSizer/
├── AnimatorMapSizer.tsx            # Sizing + zoom/pan
├── AnimatorMapSizer.module.scss
└── AnimatorMapSizer.stories.tsx

MapControls/
├── MapControls.tsx                 # Region, zoom buttons
├── MapControls.module.scss
└── MapControls.stories.tsx

data/maps/
├── staticMapData.ts                # Test data
├── hurricanePaths.ts               # Sample paths
├── usCounties.geojson              # County data
└── usStates.geojson                # State data
```

---

## 🔧 Core Interfaces

### MapFrame
```typescript
interface MapFrame {
  id: string
  timestamp: Date
  data: GeoJSON
  overlays?: MapOverlay[]
  metadata?: Record<string, any>
}
```

### MapOverlay
```typescript
interface MapOverlay {
  id: string
  type: 'path' | 'marker' | 'polygon' | 'heatmap'
  data: any
  style: StyleObject
  opacity?: number
}
```

### AnimatorMapMachineProps
```typescript
interface IAnimatorMapMachineProps {
  frames: MapFrame[]
  currentFrame: number
  mapProvider: 'mapbox' | 'canvas-d3'
  region: 'conus' | 'alaska' | 'hawaii' | 'namer'
  baseOpacity?: number
  zIndex?: number
  onFrameChange?: (frameIndex: number) => void
}
```

---

## 📊 Implementation Timeline

| Phase | Task | Hours | Status |
|-------|------|-------|--------|
| 1 | Base Component | 2-3 | ⏳ |
| 2 | Mapbox Integration | 3-4 | ⏳ |
| 3 | Test Data | 1-2 | ⏳ |
| 4 | Storybook Stories | 2-3 | ⏳ |
| 5 | Integration | 2-3 | ⏳ |
| 6 | Performance | 2-3 | ⏳ |
| 7 | Testing & Docs | 2-3 | ⏳ |
| **Total** | | **15-21** | |

---

## 🚀 Getting Started

### Step 1: Confirm Technology
- Review MAP_TECHNOLOGY_COMPARISON.md
- Confirm Mapbox GL JS is acceptable

### Step 2: Get Mapbox API Key
- Go to mapbox.com
- Sign up (free tier)
- Create access token
- Add to environment variables

### Step 3: Install Dependencies
```bash
npm install mapbox-gl @types/mapbox-gl turf
```

### Step 4: Create Base Component
```bash
mkdir -p src/components/elements/Animator/AnimatorMapMachine/providers
mkdir -p src/components/elements/Animator/AnimatorMapMachine/utils
```

### Step 5: Follow Implementation Steps
See ANIMATOR_MAP_IMPLEMENTATION_STEPS.md for detailed guide

---

## 💡 Design Patterns

### Provider Pattern
```typescript
interface MapProvider {
  initialize(container: HTMLElement, config: MapConfig): void
  addLayer(layer: MapLayer): void
  removeLayer(layerId: string): void
  setOpacity(layerId: string, opacity: number): void
  updateData(data: GeoJSON): void
  destroy(): void
}
```

### Frame Management
```typescript
const [currentFrame, setCurrentFrame] = useState(0)
const [loadedFrames, setLoadedFrames] = useState<MapFrame[]>([])

// Similar to AnimatorImageMachine
const calculateOpacity = (index: number, currentFrame: number) => {
  return index === currentFrame ? baseOpacity : 0
}
```

### Opacity Transitions
```typescript
// Fade between frames
<div style={{ opacity: calculateOpacity(index, currentFrame) }}>
  {/* Map content */}
</div>
```

---

## 🎨 Mapbox Styling Example

```typescript
const mapStyle = {
  version: 8,
  sources: {
    counties: {
      type: 'geojson',
      data: countiesGeoJSON
    }
  },
  layers: [
    {
      id: 'counties-fill',
      type: 'fill',
      source: 'counties',
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.3
      }
    },
    {
      id: 'counties-line',
      type: 'line',
      source: 'counties',
      paint: {
        'line-color': '#fff',
        'line-width': 1
      }
    }
  ]
}
```

---

## 📱 Mobile Optimization

### Performance Targets
- Desktop zoom/pan: 60fps
- Mobile zoom/pan: 50-60fps
- Initial load: 1-2 seconds
- Memory: 50-100MB

### Optimization Techniques
1. **Viewport culling** - Only render visible features
2. **Frame caching** - Cache rendered frames
3. **Geometry simplification** - Reduce detail at zoom out
4. **Lazy loading** - Load data on demand
5. **GPU acceleration** - Use Mapbox GL JS

---

## 🧪 Testing Checklist

- [ ] Component renders without errors
- [ ] Frames transition smoothly
- [ ] Zoom/pan works on desktop
- [ ] Zoom/pan works on mobile
- [ ] LOD system reduces complexity
- [ ] Multiple regions work
- [ ] Custom overlays render
- [ ] Storybook stories display correctly
- [ ] Performance acceptable on mobile
- [ ] No memory leaks
- [ ] TypeScript types correct
- [ ] Accessibility considerations

---

## 📚 Documentation Files

1. **ANIMATOR_MAP_MACHINE_STRATEGY.md** - Detailed strategy
2. **MAP_TECHNOLOGY_COMPARISON.md** - Technology comparison
3. **ANIMATOR_MAP_IMPLEMENTATION_STEPS.md** - Step-by-step guide
4. **ANIMATOR_MAP_MACHINE_SUMMARY.md** - Overview
5. **ANIMATOR_MAP_QUICK_REFERENCE.md** - This file

---

## 🔗 Useful Resources

- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [Mapbox Style Spec](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
- [Turf.js Docs](https://turfjs.org/)
- [GeoJSON Spec](https://geojson.org/)
- [D3 Geo](https://github.com/d3/d3-geo)

---

## ❓ FAQ

**Q: Do I need a Mapbox API key?**
A: Yes, but free tier is sufficient (50k map loads/month)

**Q: Can I use D3 instead?**
A: Yes, but performance will be worse on mobile (20-30fps vs 50-60fps)

**Q: How do I add custom overlays?**
A: Use the MapOverlay interface in each MapFrame

**Q: Can I use this with existing Animator?**
A: Yes, it's designed to integrate seamlessly

**Q: What about offline maps?**
A: Use Canvas-D3 provider as fallback (future implementation)

**Q: How do I handle real-time data?**
A: Update frames via setCurrentFrame and provider.updateData()

---

## 🎯 Success Criteria

✅ Smooth 50-60fps zoom/pan on mobile
✅ Automatic LOD system working
✅ Multiple regions supported
✅ Hurricane paths displaying correctly
✅ Custom overlays rendering
✅ Comprehensive Storybook documentation
✅ Integrated with existing Animator
✅ Full TypeScript support
✅ Mobile-friendly performance
✅ Production-ready code

---

## 📞 Questions?

Refer to the detailed documentation files or the implementation steps guide.

