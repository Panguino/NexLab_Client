# Weather Data Architecture

## Data Structure Overview

### Hierarchical Organization

Weather data in NexLab follows a consistent hierarchical structure:

```
Data Type (NEXRAD, Satellite, Upper Air, Surface)
├── Regions (Geographic areas: CONUS, Alaska, etc.)
├── Sectors (Specific boundaries within regions)
├── Products (Data types: reflectivity, velocity, etc.)
└── Sites/Levels (Observation points or atmospheric levels)
```

### File Organization

```
src/data/
├── nexrad/           # Radar data structures
│   ├── regions.ts    # Geographic regions for radar
│   ├── sectors.ts    # Radar coverage sectors
│   ├── products.ts   # Radar products (N0B, N0V, etc.)
│   └── sites.ts      # Radar site locations
├── satrad/           # Satellite data structures
│   ├── regions.ts    # Satellite coverage regions
│   ├── sectors.ts    # Geographic sectors
│   └── products.ts   # Satellite products (visible, IR, etc.)
├── upperair/         # Upper atmosphere analysis
│   ├── regions.ts    # Analysis regions
│   ├── sectors.ts    # Geographic boundaries
│   ├── products.ts   # Analysis products
│   └── levels.ts     # Atmospheric pressure levels
└── surface/          # Surface weather analysis
    ├── regions.ts    # Surface analysis regions
    ├── sectors.ts    # Geographic sectors
    └── products.ts   # Surface products
```

## Data Type Specifications

### NEXRAD (Radar Data)

**Purpose**: Real-time precipitation and storm analysis

**Structure**:

```typescript
interface NexradRegion {
	label: string // Display name (e.g., "CONUS")
	rotate: [number, number] // Map projection [longitude, latitude]
	scale: number // Default zoom level
	sites: string[] // Available radar sites
}

interface NexradProduct {
	id: string // Product ID (e.g., "N0B")
	name: string // Display name
	description: string // Product description
	unit?: string // Data units
}
```

**Common Products**:

-   **N0B**: Base Reflectivity (precipitation intensity)
-   **N0V**: Base Velocity (wind patterns)
-   **N0S**: Storm Relative Motion
-   **N0X**: Differential Reflectivity

**URL Pattern**: `/weather-data/nexrad-dual-pol-radar/{productId}/{regionId}/{siteId}`

### Satellite (SATRAD)

**Purpose**: Atmospheric imagery and derived products

**Scale Hierarchy**:

1. **Global** - Full Earth view
2. **Continental** - North America
3. **Regional** - Multi-state areas
4. **Subregional** - State-level
5. **Local** - City/county level

**Structure**:

```typescript
interface SatelliteRegion {
	label: string
	satellite: 'GOES-East' | 'GOES-West'
	coverage: 'full-disk' | 'conus' | 'mesoscale'
	sectors: string[]
}

interface SatelliteProduct {
	id: string
	name: string
	wavelength?: string // For spectral products
	derivedFrom?: string[] // For composite products
}
```

**Common Products**:

-   **Visible**: Daytime cloud/surface imagery
-   **Infrared**: Temperature-based imagery
-   **Water Vapor**: Atmospheric moisture
-   **Derived**: Fire detection, fog, etc.

### Upper Air Analysis

**Purpose**: Atmospheric conditions at various altitudes

**Pressure Levels**: 1000mb, 925mb, 850mb, 700mb, 500mb, 300mb, 250mb, 200mb

**Structure**:

```typescript
interface UpperAirLevel {
	pressure: number // Pressure level in mb
	altitude: number // Approximate altitude in feet
	description: string // Level description
}

interface UpperAirProduct {
	id: string
	name: string
	levels: number[] // Available pressure levels
	unit: string
}
```

**Common Products**:

-   **Heights**: Geopotential heights
-   **Temperature**: Air temperature
-   **Winds**: Wind speed and direction
-   **Vorticity**: Atmospheric rotation

### Surface Analysis

**Purpose**: Ground-level weather conditions

**Structure**:

```typescript
interface SurfaceRegion {
	label: string
	type: 'national' | 'regional' | 'state'
	updateFrequency: string // How often data updates
}

interface SurfaceProduct {
	id: string
	name: string
	unit: string
	range: [number, number] // Data value range
}
```

**Common Products**:

-   **Pressure**: Sea level pressure
-   **Temperature**: Surface temperature
-   **Precipitation**: Rainfall amounts
-   **Winds**: Surface wind patterns

## Geographic Definitions

### Regions

Large geographic areas that define the scope of data coverage:

```typescript
// Example region definition
const CONUS: WeatherRegion = {
	label: 'Continental United States',
	rotate: [-95, 0], // Center on central US
	scale: 1000, // Default zoom level
	sites: ['LOT', 'DVN', 'ILX'], // Available data sites
}
```

### Sectors

Specific geographic boundaries within regions:

```typescript
interface WeatherSector {
	name: string
	type: 'Geobox' // Geographic boundary type
	coordinates: [
		[number, number], // Southwest corner [lon, lat]
		[number, number], // Northeast corner [lon, lat]
	]
	products: string[] // Available products for this sector
}
```

## API Integration Patterns

### Data Fetching

```typescript
// Standard pattern for weather data API calls
const getWeatherData = async (
	dataType: 'nexrad' | 'satrad' | 'upperair' | 'surface',
	region: string,
	sector: string,
	product: string,
	level?: string,
	timeframe?: string,
) => {
	const endpoint = `${DATA_API_URL}/${dataType}/${region}/${sector}/${product}`
	// Implementation details
}
```

### State Management

Weather data selections are managed in Zustand stores:

```typescript
// Each data type has its own slice
interface INexradSlice {
	selectedRegion: string
	selectedSector: string
	selectedProduct: string
	selectedSite: string
	animationSpeed: number

	setRegion: (region: string) => void
	setSector: (sector: string) => void
	setProduct: (product: string) => void
}
```

## Animation & Visualization

### Time Series Data

Weather animations display data over time:

```typescript
interface WeatherFrame {
	timestamp: string // ISO datetime
	imageUrl: string // Frame image URL
	metadata: {
		validTime: string
		forecastHour?: number
		level?: string
	}
}
```

### Map Projections

Different data types use specific map projections:

-   **NEXRAD**: Azimuthal equidistant (radar-centered)
-   **Satellite**: Geostationary (satellite perspective)
-   **Analysis**: Lambert conformal conic (regional analysis)

## Related Documentation

-   **[Component Patterns](./COMPONENT_PATTERNS.md)** - How weather data integrates with React components
-   **[API Integration](./API_INTEGRATION.md)** - GraphQL queries for weather data
-   **[Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)** - Optimizing large weather datasets
-   **[Coding Standards](./CODING_STANDARDS.md)** - File naming and organization patterns

## AI Assistant Context

When working with weather data in this codebase:

1. **Data hierarchy** is consistent across all weather types
2. **File naming** follows `{dataType}/{regions|sectors|products|levels}.ts` pattern
3. **URL routing** reflects the data hierarchy structure
4. **State management** uses separate slices for each data type
5. **Geographic data** uses standard meteorological coordinate systems
6. **Time handling** follows ISO standards with UTC timestamps

This architecture enables scalable addition of new weather data types while maintaining consistent patterns for AI tools to understand and work with.
