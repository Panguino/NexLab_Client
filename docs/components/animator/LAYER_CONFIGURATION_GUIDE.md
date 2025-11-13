# Layer Configuration Guide

## Overview

The map animator now supports flexible, per-instance layer configuration. This allows you to control:
- Which layers are available in the layer panel for each animator instance
- The initial visibility state of each layer
- Different configurations for different use cases (tropical, alerts, coastal, etc.)

## Quick Start

### Using Preset Configurations

The system includes four preset configurations:

```typescript
import { LAYER_CONFIG_PRESETS, layerConfigToVisibility } from './config/layerConfigTypes'

// Tropical Hurricane Animator
const tropicalConfig = LAYER_CONFIG_PRESETS.TROPICAL

// County Alerts Animator
const countyConfig = LAYER_CONFIG_PRESETS.COUNTY_ALERTS

// Coastal Alerts Animator
const coastalConfig = LAYER_CONFIG_PRESETS.COASTAL_ALERTS

// Full Animator (all layers)
const fullConfig = LAYER_CONFIG_PRESETS.FULL
```

### Creating Custom Configurations

```typescript
import type { LayerConfig } from './config/layerConfigTypes'

const customConfig: LayerConfig = {
  'world-layer': { active: true, initialValue: true },
  'states-layer': { active: true, initialValue: true },
  'states-fill-layer': { active: true, initialValue: true },
  'lakes-layer': { active: true, initialValue: false },
  'latlon-grid-layer': { active: false, initialValue: false },
  'coastal-regions-inactive-layer': { active: false, initialValue: false },
  'counties-inactive-layer': { active: false, initialValue: false },
  'coastal-alerts-active-layer': { active: false, initialValue: false },
  'coastal-data-regions-layer': { active: false, initialValue: false },
  'county-data-regions-layer': { active: false, initialValue: false },
  'counties-active-layer': { active: false, initialValue: false },
  'best-track-layer': { active: true, initialValue: true },
  'forecast-points-layer': { active: true, initialValue: true },
}
```

## Configuration Properties

### `active: boolean`
- **Purpose**: Controls whether the layer appears in the layer panel UI
- **true**: Layer is shown in the layer panel and can be toggled
- **false**: Layer is hidden from the layer panel (but can still be controlled programmatically)

### `initialValue: boolean`
- **Purpose**: Sets the initial visibility state when the animator loads
- **true**: Layer is visible by default
- **false**: Layer is hidden by default (but can be toggled on by the user)

## Using Configurations in Components

### In Animator Component

```typescript
import { Animator } from '@/components/elements/Animator'
import { LAYER_CONFIG_PRESETS, layerConfigToVisibility } from './AnimatorMapMachine/config/layerConfigTypes'

export function TropicalAnimator() {
  const config = LAYER_CONFIG_PRESETS.TROPICAL
  const initialVisibility = layerConfigToVisibility(config)

  return (
    <Animator
      frames={frames}
      mode="map"
      mapRegion="conus"
      imageInfo={{ width: 1000, height: 600 }}
      mapLayerVisibility={initialVisibility}
      // ... other props
    />
  )
}
```

### In MapLayerPanel

The MapLayerPanel automatically filters layers based on the configuration:

```typescript
<MapLayerPanel
  open={layerPanelOpen}
  onClose={() => setLayerPanelOpen(false)}
  layerVisibility={layerVisibility}
  setLayerVisibility={setLayerVisibility}
  dataType="all"
  layerConfig={config}  // Pass the configuration
/>
```

## Available Layers

### Static Map Layers (General)
- `world-layer`: Base world map with country borders
- `states-layer`: US state boundaries
- `states-fill-layer`: US state fill colors
- `lakes-layer`: Great Lakes water bodies
- `latlon-grid-layer`: Latitude/longitude grid lines
- `coastal-regions-inactive-layer`: Coastal regions without alerts
- `counties-inactive-layer`: Counties without alerts

### Data Layers
- `coastal-alerts-active-layer`: Coastal regions with active alerts
- `coastal-data-regions-layer`: Coastal region data visualization
- `county-data-regions-layer`: County data visualization
- `counties-active-layer`: Counties with active alerts
- `best-track-layer`: Historical hurricane track
- `forecast-points-layer`: Hurricane forecast position points

## Preset Configurations Explained

### TROPICAL
- **Use Case**: Hurricane path visualization
- **Visible Layers**: Base map + hurricane data layers
- **Hidden Layers**: County and coastal alert layers

### COUNTY_ALERTS
- **Use Case**: County-level alert visualization
- **Visible Layers**: Base map + county alert layers
- **Hidden Layers**: Coastal alert and hurricane layers

### COASTAL_ALERTS
- **Use Case**: Coastal region alert visualization
- **Visible Layers**: Base map + coastal alert layers
- **Hidden Layers**: County alert and hurricane layers

### FULL
- **Use Case**: Development and testing
- **Visible Layers**: All available layers

## Helper Functions

### `layerConfigToVisibility(config: LayerConfig): Record<string, boolean>`
Converts a layer configuration to a visibility state object.

```typescript
const config = LAYER_CONFIG_PRESETS.TROPICAL
const visibility = layerConfigToVisibility(config)
// Returns: { 'world-layer': true, 'states-layer': true, ... }
```

### `getActiveLayers(config: LayerConfig): string[]`
Returns only the layer IDs marked as active in the configuration.

```typescript
const config = LAYER_CONFIG_PRESETS.TROPICAL
const activeLayers = getActiveLayers(config)
// Returns: ['world-layer', 'states-layer', 'states-fill-layer', ...]
```

## Testing in Storybook

Four new stories demonstrate the layer configuration system:

1. **TropicalConfiguration**: Tropical hurricane animator
2. **CountyAlertsConfiguration**: County alerts animator
3. **CoastalAlertsConfiguration**: Coastal alerts animator
4. **FullConfiguration**: Full animator with all layers

Each story includes:
- Layer panel toggle button
- Frame navigation controls
- Live layer visibility toggling

Run storybook to test:
```bash
npm run storybook
```

Navigate to: `Components > Animator > AnimatorMapMachine > [Configuration Name]`

## Best Practices

1. **Use Presets When Possible**: The preset configurations cover most use cases
2. **Be Explicit**: Always specify all layers in custom configurations
3. **Test in Storybook**: Use the storybook stories to verify your configuration
4. **Document Custom Configs**: If creating custom configurations, document the use case
5. **Keep Defaults Sensible**: Set `initialValue` to what users will most commonly want to see

## Future Enhancements

- Persist layer visibility to localStorage
- Allow users to save custom layer configurations
- Add layer grouping/categorization UI
- Support for layer dependencies (e.g., show layer B only if layer A is visible)

