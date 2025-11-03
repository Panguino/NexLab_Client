# Hurricane Visualization Implementation Guide

## Overview
This document outlines the implementation of tropical storm/hurricane visualization on the AnimatorMapMachine component using DeckGL IconLayer.

## Files Created

### 1. Tropical Storm Types
**File:** `src/components/elements/Animator/AnimatorMapMachine/types/tropicalStormTypes.ts`

Defines TypeScript types and utilities for tropical storm data:
- `TropicalStormData` - Raw data from NHC API
- `ProcessedStormData` - Processed data for visualization
- `StormHoverInfo` - Hover tooltip information
- `HurricaneCategory` - Saffir-Simpson categories (1-5, TS, PTC)
- Color mapping and intensity thresholds
- Utility functions for data transformation

**Key Functions:**
- `getHurricaneCategory()` - Determine category from wind speed
- `getCategoryColor()` - Get RGBA color for category
- `getIconSize()` - Scale icon size based on intensity
- `processStormData()` - Transform raw data to visualization format

### 2. Hurricane Layer Component
**File:** `src/components/elements/Animator/AnimatorMapMachine/layers/HurricaneLayer.tsx`

DeckGL IconLayer implementation for rendering hurricane icons:
- `createHurricaneLayer()` - Factory function to create IconLayer
- `generateHurricaneIconSVG()` - SVG icon definition
- `createHurricaneIconAtlas()` - Canvas-based icon atlas
- `getHurricaneIconURL()` - Data URL for icon

**Features:**
- Intensity-based icon sizing (20-50px)
- Category-based color coding
- Hover detection support
- Pickable for interactions

### 3. Tropical Storm Utilities
**File:** `src/components/elements/Animator/AnimatorMapMachine/utils/tropicalStormUtils.ts`

Utility functions for data handling:
- `fetchTropicalStormData()` - Fetch from NHC API
- `getSampleTropicalStorms()` - Sample data for testing
- `filterStormsByClassification()` - Filter by type
- `filterStormsByIntensity()` - Filter by wind speed
- `sortStormsByIntensity()` - Sort by strength
- `calculateDistance()` - Haversine distance calculation
- `findStormsNearLocation()` - Spatial queries

### 4. Storybook Story
**File:** `src/components/elements/Animator/AnimatorMapSizer/AnimatorMapSizer.stories.tsx`

Added `HurricaneVisualization` story:
- Displays sample tropical storm data
- Uses NAMER region (North America & Mexico)
- Shows 3 sample storms: Irma, Jose, Katia
- Includes instructions for hover interaction

## Color Scheme

| Category | Wind Speed | Color | RGB |
|----------|-----------|-------|-----|
| Cat 5 | 157+ kt | Dark Red | (139, 0, 0) |
| Cat 4 | 130-156 kt | Crimson | (220, 20, 60) |
| Cat 3 | 111-129 kt | Dark Orange | (255, 140, 0) |
| Cat 2 | 96-110 kt | Orange | (255, 165, 0) |
| Cat 1 | 74-95 kt | Gold | (255, 200, 0) |
| TS | 39-73 kt | Dodger Blue | (30, 144, 255) |
| PTC | <39 kt | Dark Gray | (169, 169, 169) |

## Integration Steps

### Step 1: Update AnimatorMapMachine Types
Add `tropicalStorms` prop to `IAnimatorMapMachineProps`:
```typescript
export interface IAnimatorMapMachineProps {
  // ... existing props
  tropicalStorms?: ProcessedStormData[]
  onStormHover?: (info: StormHoverInfo | null) => void
}
```

### Step 2: Add Hurricane Layer to AnimatorMapMachine
In the layers useMemo:
```typescript
// Add hurricane layer if storms provided
if (tropicalStorms && tropicalStorms.length > 0) {
  const hurricaneLayer = createHurricaneLayer(tropicalStorms, (info) => {
    if (onStormHover) {
      onStormHover({
        stormId: info.object?.id,
        name: info.object?.name,
        // ... other fields
        x: info.x,
        y: info.y,
      })
    }
  })
  baseLayers.push(hurricaneLayer)
}
```

### Step 3: Add Tooltip Component
Create a tooltip component to display hover information:
```typescript
interface TooltipProps {
  info: StormHoverInfo | null
}

export function StormTooltip({ info }: TooltipProps) {
  if (!info) return null
  
  return (
    <div style={{
      position: 'absolute',
      left: info.x + 10,
      top: info.y + 10,
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      pointerEvents: 'none',
      zIndex: 1000,
    }}>
      <div><strong>{info.name}</strong></div>
      <div>Category: {info.category}</div>
      <div>Intensity: {info.intensity} kt</div>
      <div>Pressure: {info.pressure} mb</div>
      <div>Movement: {info.movementDir}° @ {info.movementSpeed} kt</div>
    </div>
  )
}
```

### Step 4: Update AnimatorMapSizer
Pass tropical storms data through to AnimatorMapMachine:
```typescript
<AnimatorMapMachine
  // ... existing props
  tropicalStorms={tropicalStorms}
  onStormHover={setHoverInfo}
/>
```

## Usage Example

```typescript
import { getSampleTropicalStorms } from '@/components/elements/Animator/AnimatorMapMachine/utils/tropicalStormUtils'
import { Animator } from '@/components/elements/Animator/Animator'

export function MapWithHurricanes() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const storms = getSampleTropicalStorms()

  return (
    <Animator
      frames={SAMPLE_HURRICANE_PATHS}
      mode="map"
      mapRegion="namer"
      currentFrame={currentFrame}
      setCurrentFrame={setCurrentFrame}
      tropicalStorms={storms}
    />
  )
}
```

## Testing Checklist

- [ ] Hurricane icons render on map
- [ ] Icons are colored by intensity category
- [ ] Icon size scales with intensity
- [ ] Hover shows tooltip with storm info
- [ ] Tooltip displays correct information
- [ ] Multiple storms display correctly
- [ ] Icons are clickable/pickable
- [ ] Performance is acceptable with multiple storms
- [ ] Works on mobile devices
- [ ] Works in light and dark modes

## Performance Considerations

1. **Icon Atlas**: Pre-generated canvas-based icon for efficiency
2. **Data Processing**: Storms processed once on load
3. **Layer Updates**: Only update when storm data changes
4. **Hover Detection**: DeckGL's built-in picking system
5. **Clustering**: Can add clustering for many storms

## Future Enhancements

1. **Storm Tracks**: Show historical path with line layer
2. **Forecast Cone**: Display uncertainty cone
3. **Wind Radii**: Show 34/50/64 kt wind extent
4. **Animation**: Animate storm movement over time
5. **Click Interaction**: Center map on clicked storm
6. **Legend**: Display category color legend
7. **Filtering**: Filter by category or intensity
8. **Real-time Data**: Fetch live NHC data

