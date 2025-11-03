# Hurricane Visualization Implementation

## Overview

Phase 1 of the hurricane visualization enhancement has been successfully implemented. This provides a comprehensive, real-time visualization of tropical storm and hurricane data using NHC (National Hurricane Center) tropical products data.

## Features Implemented

### 🌀 Visualization Layers

1. **Best Track (Historical Path)**
   - Gray dashed line showing the storm's actual path from genesis to current position
   - Gray dots at 6-hour intervals showing historical positions
   - Helps users understand the storm's evolution

2. **Forecast Track**
   - Gray line connecting 9 forecast points (typically 12-24 hour intervals)
   - Shows the predicted path of the storm

3. **Forecast Points**
   - Color-coded by Saffir-Simpson category
   - Size scaled by wind speed (larger = stronger)
   - Provides detailed intensity information at each forecast time

4. **Cone of Uncertainty**
   - Light blue semi-transparent polygon
   - Shows the area where the storm could potentially track
   - Represents forecast uncertainty

5. **Watch/Warning Areas**
   - **Hurricane Warnings (HWA)**: Red filled polygons (30% opacity)
   - **Tropical Storm Warnings (TWA)**: Orange filled polygons (25% opacity)
   - **Hurricane Watches (HWR)**: Red dashed outlines
   - **Tropical Storm Watches (TWR)**: Orange dashed outlines
   - Indicates areas under active threat

### 🎨 Color Scheme

| Category | Color | RGB | Wind Speed |
|----------|-------|-----|-----------|
| 5 | Dark Red | (139, 0, 0) | 157+ knots |
| 4 | Red-Orange | (255, 50, 0) | 130-156 knots |
| 3 | Dark Orange | (255, 100, 0) | 111-129 knots |
| 2 | Orange | (255, 165, 0) | 96-110 knots |
| 1 | Gold | (255, 200, 0) | 74-95 knots |
| TS | Light Blue | (100, 150, 255) | 39-73 knots |

## Data Source

- **API**: NHC Tropical Products JSON
- **URL**: `https://climate.cod.edu/data/tropical/web/{stormId}/products.json`
- **Format**: JSON with multiple advisory timestamps
- **Update Frequency**: Every 3-6 hours during active season

### Data Structure

```json
{
  "YYYYMMDDHHMM": {
    "cone": [[lon, lat], ...],
    "pts": {
      "stormname": "Hurricane Melissa",
      "advisnum": "25A",
      "position": [[lon, lat], ...],
      "maxwind": [150, 145, ...],
      "ss": [5, 5, 5, ...]
    },
    "ww": [
      {"type": "HWA", "xy": [[lon, lat], ...]},
      ...
    ],
    "bestTrack": {
      "YYYYMMDDHHMM": {
        "position": [lon, lat],
        "intensity": 140,
        "mslp": 912
      }
    }
  }
}
```

## Usage

### In Storybook

```bash
npm run storybook
# Navigate to: Components → Animator → Hurricane Visualization
```

### Real-Time Data

```typescript
import { fetchTropicalProducts, getLatestAdvisory } from './utils/tropicalProductsParser'

const products = await fetchTropicalProducts('al132025')
const latest = getLatestAdvisory(products)
```

### Creating Visualization Layers

```typescript
import {
  createForecastTrackLayer,
  createForecastPointsLayer,
  createConeLayer,
  createWatchWarningLayer,
  createBestTrackLayer,
  createBestTrackPointsLayer,
} from './layers/HurricaneLayer'

const layers = [
  createBestTrackLayer(bestTrack),
  createBestTrackPointsLayer(bestTrack),
  createConeLayer(cone),
  createForecastTrackLayer(track),
  createForecastPointsLayer(track),
  createWatchWarningLayer(warnings),
]
```

## File Structure

```
src/components/elements/Animator/AnimatorMapMachine/
├── types/
│   └── tropicalProductsTypes.ts      # Type definitions
├── utils/
│   └── tropicalProductsParser.ts     # Data parsing utilities
├── layers/
│   └── HurricaneLayer.tsx            # Enhanced with new layer functions
└── Animator.hurricaneVisualization.stories.tsx  # Storybook stories
```

## Key Functions

### Data Fetching
- `fetchTropicalProducts(stormId)` - Fetch from NHC API
- `getLatestAdvisory(products)` - Get most recent advisory

### Data Conversion
- `forecastTrackToGeoJSON(track)` - Convert to line
- `forecastPointsToGeoJSON(track)` - Convert to points
- `coneToGeoJSON(cone)` - Convert to polygon
- `watchWarningsToGeoJSON(warnings)` - Convert to polygons
- `bestTrackToGeoJSON(bestTrack)` - Convert to line
- `bestTrackPointsToGeoJSON(bestTrack)` - Convert to points

### Layer Creation
- `createForecastTrackLayer(track)` - LineLayer
- `createForecastPointsLayer(track)` - GeoJsonLayer
- `createConeLayer(cone)` - PolygonLayer
- `createWatchWarningLayer(warnings)` - PolygonLayer
- `createBestTrackLayer(bestTrack)` - LineLayer
- `createBestTrackPointsLayer(bestTrack)` - GeoJsonLayer

## Performance Considerations

- All layers use DeckGL for efficient rendering
- GeoJSON features are converted once and cached
- Layer updates are triggered only when data changes
- Polygon simplification can be added for large datasets

## Future Enhancements (Phase 2 & 3)

### Phase 2: Interactive Features
- [ ] Timeline scrubber for forecast points
- [ ] Forecast point details on hover/click
- [ ] Layer toggle controls
- [ ] Arrival time contour visualization

### Phase 3: Animation & Polish
- [ ] Animated forecast progression
- [ ] Animated cone expansion
- [ ] Advanced styling effects
- [ ] Performance optimizations

## Testing

### Unit Tests
- Data parsing functions
- GeoJSON conversion
- Color mapping

### Integration Tests
- API data fetching
- Layer rendering
- Hover interactions

### Manual Testing
- Storybook stories
- Real-time data updates
- Different storm intensities

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Full support (responsive)

## Dependencies

- `@deck.gl/layers` - DeckGL layer components
- `@turf/turf` - Geospatial analysis (optional, for point-in-polygon)
- React 18+
- TypeScript 4.5+

## References

- [NHC Tropical Products](https://www.nhc.noaa.gov/)
- [DeckGL Documentation](https://deck.gl/)
- [GeoJSON Specification](https://geojson.org/)
- [Saffir-Simpson Scale](https://www.nhc.noaa.gov/aboutsshws.php)

