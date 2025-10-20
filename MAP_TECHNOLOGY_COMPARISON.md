# Map Technology Comparison for AnimatorMapMachine

## Executive Summary

**Recommendation: Mapbox GL JS** for production use with Canvas-D3 as fallback for budget constraints.

---

## Detailed Comparison

### 1. Mapbox GL JS ⭐ RECOMMENDED

#### Overview

Modern WebGL-based mapping library with vector tiles, excellent performance, and built-in LOD system.

#### Pros

-   ✅ **GPU-accelerated rendering** - Smooth 60fps zoom/pan on mobile
-   ✅ **Built-in LOD system** - Vector tiles automatically simplify at different zoom levels
-   ✅ **Excellent mobile performance** - Optimized for touch interactions
-   ✅ **Easy styling** - Mapbox Style Specification (JSON-based)
-   ✅ **Rich ecosystem** - Plugins, examples, community support
-   ✅ **Custom layers** - Can add D3, Canvas, or custom rendering on top
-   ✅ **Interactive elements** - Built-in support for markers, popups, tooltips
-   ✅ **Existing codebase compatibility** - Already using D3 for projections
-   ✅ **Free tier available** - 50,000 map loads/month free

#### Cons

-   ❌ **PRICING ISSUE: Not suitable for high-volume applications**
    -   Free tier: 50,000 map loads/month
    -   $5 per 1,000 loads (50,001-200,000)
    -   $4 per 1,000 loads (200,001-1,000,000)
    -   $3 per 1,000 loads (1,000,001+)
    -   **Example: 1M loads/month = ~$3,000/month**
-   ❌ Less control over exact rendering vs pure D3
-   ❌ Learning curve for Mapbox-specific concepts
-   ❌ Vendor lock-in (though open-source alternatives exist)

#### Performance Characteristics

-   **Desktop zoom/pan**: 60fps
-   **Mobile zoom/pan**: 50-60fps
-   **County-level rendering**: Smooth at all zoom levels
-   **Memory usage**: ~50-100MB for full US map
-   **Initial load**: 1-2 seconds

#### Code Example

```typescript
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'YOUR_TOKEN'
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/dark-v11',
	center: [-95, 37],
	zoom: 3,
})

// Add GeoJSON source
map.addSource('counties', {
	type: 'geojson',
	data: countiesGeoJSON,
})

// Add layer with LOD
map.addLayer({
	id: 'counties-fill',
	type: 'fill',
	source: 'counties',
	paint: { 'fill-color': '#088', 'fill-opacity': 0.8 },
})
```

#### Best For

-   Production applications
-   Mobile-first design
-   Hurricane tracking
-   Real-time data updates
-   Complex interactive maps

---

### 2. Deck.gl

#### Overview

GPU-accelerated visualization framework built on WebGL, excellent for large datasets.

#### Pros

-   ✅ Extreme performance with large datasets
-   ✅ GPU acceleration for complex calculations
-   ✅ Great for heatmaps and aggregations
-   ✅ Custom layer support
-   ✅ Works well with D3

#### Cons

-   ❌ Steeper learning curve
-   ❌ More complex setup
-   ❌ Overkill for simple maps
-   ❌ Less intuitive styling
-   ❌ Smaller community than Mapbox

#### Performance Characteristics

-   **Desktop zoom/pan**: 60fps (even with millions of points)
-   **Mobile zoom/pan**: 30-50fps
-   **Memory usage**: Higher than Mapbox
-   **Best for**: Large datasets, heatmaps

#### Best For

-   Large-scale data visualization
-   Heatmaps and aggregations
-   Scientific visualization
-   Real-time data streams

---

### 3. Canvas-based D3 with Simplification

#### Overview

Pure D3 rendering to Canvas with manual LOD implementation using geometry simplification.

#### Pros

-   ✅ No external dependencies (D3 already in use)
-   ✅ Full control over rendering
-   ✅ Works with existing D3 code
-   ✅ No API keys required
-   ✅ Lightweight

#### Cons

-   ❌ Manual LOD implementation required
-   ❌ More complex code
-   ❌ Performance issues on mobile (30-40fps)
-   ❌ Requires careful optimization
-   ❌ Larger codebase to maintain

#### Performance Characteristics

-   **Desktop zoom/pan**: 40-50fps
-   **Mobile zoom/pan**: 20-30fps (may be laggy)
-   **Memory usage**: ~100-200MB
-   **Initial load**: 2-3 seconds

#### Code Example

```typescript
import * as d3 from 'd3'
import simplify from 'simplify-js'

// Simplify geometry based on zoom level
const simplifyGeometry = (geometry, zoomLevel) => {
	const tolerance = Math.pow(2, 20 - zoomLevel) / 100000
	return simplify(geometry, tolerance)
}

// Render to canvas
const canvas = d3.select('canvas')
const context = canvas.node().getContext('2d')
const path = d3.geoPath().projection(projection).context(context)

context.fillStyle = '#088'
context.beginPath()
path(simplifiedGeometry)
context.fill()
```

#### Best For

-   Budget-constrained projects
-   Simple maps
-   Existing D3 codebases
-   Offline-first applications

---

### 4. Leaflet + Mapbox GL

#### Overview

Lightweight mapping library with Mapbox GL plugin for vector tiles.

#### Pros

-   ✅ Lightweight and simple
-   ✅ Good mobile support
-   ✅ Large plugin ecosystem
-   ✅ Easy to learn

#### Cons

-   ❌ Less performant than pure Mapbox GL
-   ❌ More boilerplate code
-   ❌ Smaller community for advanced features

#### Best For

-   Simple maps
-   Quick prototypes
-   Existing Leaflet codebases

---

## Performance Comparison Table

| Metric          | Mapbox GL    | Deck.gl    | Canvas-D3  | Leaflet  |
| --------------- | ------------ | ---------- | ---------- | -------- |
| Desktop FPS     | 60           | 60         | 40-50      | 50       |
| Mobile FPS      | 50-60        | 30-50      | 20-30      | 40       |
| Memory (US Map) | 50-100MB     | 100-200MB  | 100-200MB  | 80-150MB |
| Initial Load    | 1-2s         | 2-3s       | 2-3s       | 1-2s     |
| Learning Curve  | Medium       | High       | High       | Low      |
| Mobile Friendly | ⭐⭐⭐⭐⭐   | ⭐⭐⭐     | ⭐⭐       | ⭐⭐⭐   |
| Customization   | ⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐   |
| Cost            | **$3-5k/mo** | Free       | Free       | Free     |

---

## Recommendation Matrix

### Choose Mapbox GL if:

-   ✅ Mobile performance is critical
-   ✅ Need smooth zoom/pan on phones
-   ✅ Want built-in LOD system
-   ✅ Need production-ready solution
-   ⚠️ **Budget allows for $3,000-5,000/month for map loads**
-   ⚠️ **NOT suitable for high-volume public applications**

### Choose Deck.gl if:

-   ✅ Displaying millions of data points
-   ✅ Need heatmaps or aggregations
-   ✅ Performance is paramount
-   ✅ Complex visualizations needed

### Choose Canvas-D3 if:

-   ✅ Budget is extremely limited
-   ✅ Simple maps only
-   ✅ Offline-first requirement
-   ✅ Existing D3 expertise

---

## Implementation Recommendation

### ⚠️ CRITICAL: Mapbox GL JS is NOT Recommended for NexLab

**Reason**: Expected map loads will exceed 50k/month, resulting in **$3,000-5,000+ monthly costs**

### Recommended: Canvas-based D3 with Simplification

-   ✅ No recurring costs
-   ✅ Full control over rendering
-   ✅ Works with existing D3 code
-   ✅ Acceptable performance with optimization (40-50fps desktop, 20-30fps mobile)
-   ✅ Can implement LOD system manually
-   ⚠️ Requires more development effort

### Alternative: Deck.gl

-   ✅ Better performance than Canvas-D3
-   ✅ GPU-accelerated
-   ✅ No recurring costs
-   ⚠️ Steeper learning curve
-   ⚠️ More complex setup

### Future: Mapbox GL JS (If Budget Allows)

-   Only if willing to pay $3,000-5,000/month
-   Best performance and features
-   Production-ready solution

---

## Integration with Existing Codebase

### Leverage Existing Code

-   **Projections**: Use existing projection definitions from `HazardsMap`
-   **GeoJSON data**: Reuse county/state data from API
-   **Styling**: Adapt SCSS from `HazardsMap.module.scss`
-   **Regions**: Use existing region definitions

### New Dependencies

```json
{
	"mapbox-gl": "^3.0.0",
	"@types/mapbox-gl": "^3.0.0",
	"turf": "^6.0.0"
}
```

---

## Final Decision

**Use Mapbox GL JS** for AnimatorMapMachine because:

1. Best mobile performance (critical for hurricane tracking)
2. Built-in LOD system (solves the complexity problem)
3. Easy integration with existing D3 code
4. Production-ready and battle-tested
5. Free tier covers development needs
6. Excellent documentation and community support
