# Tropical Animator Integration Guide

## Overview

The TropicalAnimator component provides a two-view system for visualizing tropical storms:

1. **Overview View** - Displays all active tropical storms on a map
2. **Detail View** - Shows a selected storm's hurricane path, forecast track, cone of uncertainty, and warnings

## Architecture

### Component Structure

```
TropicalAnimator (Main Component)
├── Overview View
│   ├── Animator (map mode)
│   └── Active storms display
└── Detail View
    ├── Storm Info Panel
    │   ├── Storm name
    │   ├── Classification
    │   ├── Category
    │   ├── Intensity
    │   ├── Pressure
    │   ├── Position
    │   └── Movement
    └── Animator (map mode with hurricane data)
```

### Data Flow

```
TropicalPanel (Sidebar)
    ↓
handleStormChange()
    ↓
router.push() → Storm Detail Page
    ↓
TropicalAnimator (Detail View)
    ↓
fetchTropicalProducts()
    ↓
Animator (Map Visualization)
```

## File Structure

```
src/
├── components/
│   ├── elements/
│   │   ├── TropicalAnimator/
│   │   │   ├── TropicalAnimator.tsx (Main component)
│   │   │   └── TropicalAnimator.module.scss (Styling)
│   │   └── Animator/
│   │       └── AnimatorMapMachine/
│   │           ├── utils/
│   │           │   ├── tropicalStormUtils.ts (Fetch active storms)
│   │           │   └── tropicalProductsParser.ts (Parse hurricane data)
│   │           └── types/
│   │               ├── tropicalStormTypes.ts (Storm data types)
│   │               └── tropicalProductsTypes.ts (Products data types)
│   └── layout/
│       └── SidebarPanels/
│           └── TropicalPanel/
│               └── TropicalPanel.tsx (Storm selection)
└── app/
    └── weather-data/
        └── text-hazards-outlooks/
            └── nhc-tropical-hurricane-weather/
                ├── page.tsx (Overview page)
                └── [tropicalProductId]/[tropicalValidtimeId]/
                    └── storm/[tropicalStormId]/
                        └── page.tsx (Detail page)
```

## Component Props

### TropicalAnimator

```typescript
interface TropicalAnimatorProps {
  selectedStormId?: string | null      // Storm ID for detail view
  onStormSelect?: (stormId: string) => void  // Callback when storm selected
  view?: 'overview' | 'detail'         // Which view to display
}
```

## Data Sources

### Active Storms
- **Endpoint**: `https://climate.cod.edu/data/tropical/gis/CurrentStorms.json`
- **Type**: `ProcessedStormData[]`
- **Fields**: id, name, classification, category, intensity, pressure, latitude, longitude, movementDir, movementSpeed, lastUpdate, color, iconSize

### Tropical Products (Hurricane Data)
- **Endpoint**: `https://climate.cod.edu/data/tropical/web/{stormId}/products.json`
- **Type**: `TropicalProducts`
- **Contains**: Forecast track, cone of uncertainty, watch/warnings, best track (historical path)

## Integration Points

### 1. Sidebar Storm Selection
**File**: `src/components/layout/SidebarPanels/TropicalPanel/TropicalPanel.tsx`

When user selects a storm from the dropdown:
1. `handleStormChange()` is called
2. Storm data is fetched via `getTropicalStormData()`
3. Router navigates to: `/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather/overview/latest/storm/{stormId}`
4. TropicalAnimator detail view loads with the selected storm

### 2. Overview Page
**File**: `src/app/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather/page.tsx`

```typescript
<TropicalAnimator view="overview" />
```

Displays all active storms on a map. Users can click storms to select them.

### 3. Detail Page
**File**: `src/app/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather/[tropicalProductId]/[tropicalValidtimeId]/storm/[tropicalStormId]/page.tsx`

```typescript
<TropicalAnimator selectedStormId={tropicalStormId} view="detail" />
```

Displays selected storm's detailed hurricane path and forecast data.

## Layer Visibility

The TropicalAnimator uses the hurricane-specific layers:
- Hurricane Warnings/Watches
- Cone of Uncertainty
- Forecast Track
- Historical Path (Best Track)
- Forecast Points

These layers are automatically filtered by `mapDataType="hurricane"` in the Animator component.

## Key Features

### Overview View
- ✅ Loads all active tropical storms
- ✅ Displays storms on a map
- ✅ Shows storm icons with category-based colors
- ✅ Clickable storms for selection

### Detail View
- ✅ Displays selected storm information panel
- ✅ Shows hurricane path visualization
- ✅ Displays forecast track with color-coded intensity
- ✅ Shows cone of uncertainty
- ✅ Displays watch/warning areas
- ✅ Shows historical best track
- ✅ Layer visibility controls for hurricane data

## Error Handling

The component handles:
- Missing tropical products data
- Failed API requests
- Invalid storm IDs
- Network errors

Errors are displayed to the user with appropriate messages.

## Performance Considerations

1. **Data Fetching**: Tropical products are fetched on-demand when a storm is selected
2. **Layer Rendering**: Only visible layers are rendered via deck.gl
3. **Map Region**: Uses 'namer' (North America/Mexico/Caribbean) region for optimal view
4. **Caching**: Consider implementing caching for frequently accessed storms

## Testing

### Manual Testing Checklist
- [ ] Overview page loads and displays active storms
- [ ] Clicking a storm navigates to detail view
- [ ] Sidebar storm selection updates the animator
- [ ] Detail view displays storm information correctly
- [ ] Hurricane data layers render properly
- [ ] Layer visibility toggles work
- [ ] Error states display appropriately
- [ ] Mobile responsiveness works

### Test URLs
- Overview: `/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather`
- Detail: `/weather-data/text-hazards-outlooks/nhc-tropical-hurricane-weather/overview/latest/storm/{stormId}`

## Future Enhancements

1. **Historical Storm Data**: Add ability to view past storms
2. **Multi-Storm Comparison**: Display multiple storms simultaneously
3. **Animation Timeline**: Animate forecast track over time
4. **Wind Speed Probabilities**: Add wind speed probability visualization
5. **Pressure Forecast**: Add minimum pressure forecast visualization
6. **Real-time Updates**: Auto-refresh storm data at intervals
7. **Export Functionality**: Export storm data and visualizations

