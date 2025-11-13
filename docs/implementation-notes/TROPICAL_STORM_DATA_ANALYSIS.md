# Tropical Storm Data Analysis & Visualization Plan

## Data Source
**URL:** https://climate.cod.edu/data/tropical/gis/SampleStorms.json

## Data Structure Analysis

### Sample Storm Object
```json
{
  "id": "al112017",
  "name": "Irma",
  "classification": "HU",           // HU=Hurricane, PTC=Post-Tropical Cyclone, TS=Tropical Storm
  "intensity": 125,                 // Wind speed in knots
  "pressure": 941,                  // Pressure in mb
  "latitude": "22.9N",              // String format
  "longitude": "79.9W",             // String format
  "latitudeNumeric": 22.9,          // Numeric format (positive = North)
  "longitudeNumeric": -79.9,        // Numeric format (negative = West)
  "movementDir": 280,               // Direction in degrees (0-360)
  "movementSpeed": 9,               // Speed in knots
  "lastUpdate": "2017-09-09T16:00:00.000Z"
}
```

### Key Fields for Visualization
| Field | Type | Purpose | Range |
|-------|------|---------|-------|
| `latitudeNumeric` | number | Y-coordinate on map | -90 to 90 |
| `longitudeNumeric` | number | X-coordinate on map | -180 to 180 |
| `name` | string | Storm name for tooltip | - |
| `intensity` | number | Wind speed (knots) | 0-185+ |
| `pressure` | number | Pressure (mb) | 880-1013 |
| `classification` | string | Storm type | HU, TS, PTC |
| `movementDir` | number | Direction (degrees) | 0-360 |
| `movementSpeed` | number | Speed (knots) | 0-30+ |
| `lastUpdate` | ISO string | Timestamp | - |

## Classification System
- **HU** = Hurricane (intensity >= 74 knots)
- **TS** = Tropical Storm (intensity 39-73 knots)
- **PTC** = Post-Tropical Cyclone (intensity < 39 knots)

## Intensity Scale (Saffir-Simpson)
| Category | Wind Speed (knots) | Color |
|----------|-------------------|-------|
| Cat 5 | 157+ | Dark Red |
| Cat 4 | 130-156 | Red |
| Cat 3 | 111-129 | Orange |
| Cat 2 | 96-110 | Yellow |
| Cat 1 | 74-95 | Light Orange |
| TS | 39-73 | Blue |
| PTC | <39 | Gray |

## Implementation Plan

### Phase 1: Data Layer (DeckGL)
1. Create `HurricaneLayer` component using DeckGL IconLayer
2. Parse tropical storm data into GeoJSON format
3. Implement icon rendering with intensity-based colors
4. Add hover tooltip with storm information

### Phase 2: Tooltip/Hover Information
Display on hover:
- Storm name
- Classification (HU/TS/PTC)
- Current intensity (knots)
- Pressure (mb)
- Movement direction & speed
- Last update time

### Phase 3: Interactive Features
- Click to center map on storm
- Highlight selected storm
- Show movement vector/arrow
- Optional: Show forecast track

### Phase 4: Performance Optimization
- Use DeckGL's built-in clustering for multiple storms
- Implement level-of-detail rendering
- Cache processed data

## Sample Data Statistics
- **Total Storms:** 3 (Irma, Jose, Katia)
- **Hurricanes:** 2 (Irma, Jose)
- **Post-Tropical:** 1 (Katia)
- **Intensity Range:** 35-145 knots
- **Pressure Range:** 941-1004 mb
- **Geographic Spread:** Atlantic basin

## Next Steps
1. Create types for tropical storm data
2. Implement HurricaneLayer component
3. Integrate with AnimatorMapMachine
4. Add hover/tooltip functionality
5. Test with sample data in Storybook

