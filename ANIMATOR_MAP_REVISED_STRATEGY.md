# AnimatorMapMachine - REVISED Strategy (High-Volume Pricing Consideration)

## Critical Update: Mapbox GL JS is NOT Viable

After pricing analysis, **Mapbox GL JS is not suitable for NexLab** due to expected high map load volumes.

### Mapbox GL JS Pricing Breakdown
- **Free tier**: 50,000 map loads/month
- **50,001-200,000 loads**: $5 per 1,000 loads
- **200,001-1,000,000 loads**: $4 per 1,000 loads
- **1,000,001+ loads**: $3 per 1,000 loads

### Cost Examples
- 100k loads/month = $250/month
- 500k loads/month = $1,800/month
- 1M loads/month = $3,000/month
- 5M loads/month = $15,000/month

**NexLab will likely exceed 50k/month, making Mapbox prohibitively expensive.**

---

## Recommended Technology: Canvas-based D3 with Simplification

### Why Canvas-D3?

**Advantages:**
- ✅ **No recurring costs** - Critical for high-volume applications
- ✅ **Full control** - Complete rendering control
- ✅ **Existing expertise** - D3 already used in codebase (HazardsMap)
- ✅ **Acceptable performance** - 40-50fps desktop, 20-30fps mobile with optimization
- ✅ **Manual LOD system** - Can implement geometry simplification
- ✅ **Offline capable** - No external dependencies
- ✅ **Customizable** - Full styling and interaction control

**Disadvantages:**
- ⚠️ More development effort than Mapbox
- ⚠️ Mobile performance not as smooth (20-30fps vs 50-60fps)
- ⚠️ Manual LOD implementation required
- ⚠️ Viewport culling must be implemented manually

### Performance Targets (Canvas-D3)
- Desktop zoom/pan: 40-50fps
- Mobile zoom/pan: 20-30fps (acceptable for maps)
- Memory: 100-200MB
- Initial load: 2-3 seconds

---

## Alternative: Deck.gl

### Why Deck.gl?

**Advantages:**
- ✅ Better performance than Canvas-D3 (50-60fps)
- ✅ GPU-accelerated rendering
- ✅ No recurring costs
- ✅ Excellent for large datasets
- ✅ Built-in LOD support

**Disadvantages:**
- ⚠️ Steeper learning curve
- ⚠️ More complex setup
- ⚠️ Less familiar to team (D3 is already known)

### When to Choose Deck.gl
- If mobile performance is critical (50-60fps required)
- If displaying millions of data points
- If team has capacity to learn new library

---

## Implementation Recommendation

### Phase 1: Canvas-D3 with Simplification (RECOMMENDED)
**Timeline**: 15-21 hours
**Cost**: Development only, no recurring fees

1. Create base AnimatorMapMachine component
2. Implement Canvas rendering with D3
3. Add geometry simplification for LOD
4. Implement viewport culling
5. Create Storybook stories
6. Performance optimization

### Phase 2: Consider Deck.gl (If Performance Issues)
**Timeline**: 10-15 hours additional
**Cost**: Development only, no recurring fees

- If Canvas-D3 doesn't meet mobile performance targets
- Swap provider implementation
- Reuse component interface

### Phase 3: Mapbox GL JS (If Budget Allows)
**Timeline**: 5-10 hours
**Cost**: $3,000-5,000/month + development

- Only if willing to pay recurring costs
- Best performance and features
- Production-ready solution

---

## Architecture (Canvas-D3 Approach)

```
AnimatorMapMachine/
├── AnimatorMapMachine.tsx
├── providers/
│   ├── MapProvider.ts (interface)
│   ├── CanvasD3Provider.tsx (RECOMMENDED)
│   ├── DeckglProvider.tsx (future)
│   └── MapboxProvider.tsx (future, if budget allows)
└── utils/
    ├── projections.ts
    ├── simplifyGeometry.ts (KEY: LOD implementation)
    ├── viewportCulling.ts (KEY: performance)
    └── canvasUtils.ts
```

---

## Key Implementation Details

### Geometry Simplification (LOD System)
```typescript
// Simplify based on zoom level
const simplifyGeometry = (geometry, zoomLevel) => {
  // Higher zoom = less simplification (more detail)
  // Lower zoom = more simplification (less detail)
  const tolerance = Math.pow(2, 20 - zoomLevel) / 100000
  return simplify(geometry, tolerance)
}
```

### Viewport Culling
```typescript
// Only render features visible in current viewport
const isFeatureVisible = (feature, bounds) => {
  return feature.bbox && 
    feature.bbox[0] < bounds.east &&
    feature.bbox[2] > bounds.west &&
    feature.bbox[1] < bounds.north &&
    feature.bbox[3] > bounds.south
}
```

### Canvas Rendering
```typescript
const renderToCanvas = (context, features, projection) => {
  const path = d3.geoPath().projection(projection).context(context)
  
  features.forEach(feature => {
    context.fillStyle = feature.style.fill
    context.beginPath()
    path(feature.geometry)
    context.fill()
  })
}
```

---

## Success Criteria

- ✅ No recurring costs
- ✅ 40-50fps desktop zoom/pan
- ✅ 20-30fps mobile zoom/pan (acceptable)
- ✅ LOD system reduces complexity at different zoom levels
- ✅ Multiple regions supported
- ✅ Hurricane paths displaying correctly
- ✅ 7+ Storybook stories
- ✅ Integrated with existing Animator
- ✅ Full TypeScript support

---

## Next Steps

1. **Confirm Canvas-D3 approach** - Agree this is the right direction
2. **Review performance targets** - 20-30fps mobile acceptable?
3. **Start Phase 1** - Create base component
4. **Implement LOD system** - Geometry simplification
5. **Test on mobile** - Verify performance
6. **Consider Deck.gl** - If performance issues arise

---

## Resources

- [D3 Geo Documentation](https://github.com/d3/d3-geo)
- [Simplify.js Library](https://github.com/mourner/simplify-js)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Deck.gl Documentation](https://deck.gl/)
- [GeoJSON Specification](https://geojson.org/)

