# Region Coloring Test Guide

## Quick Start

1. **Start Storybook:**
   ```bash
   npm run storybook
   ```

2. **Navigate to:**
   Components → Animator → Hurricane Visualization

3. **Open Browser Console:**
   - Chrome/Edge: F12
   - Firefox: F12

---

## What to Look For

### ✅ Console Logs (Should See)

```
[AnimatorMapMachine] Warning polygons found: 16
[AnimatorMapMachine] Warning polygon types: ['HWA', 'HWA', 'HWA', 'HWA', 'HWA', 'HWA', 'HWA', 'HWA', 'HWA', 'HWA', 'TWR', 'TWR', 'TWR', 'HWR', 'HWR', 'HWR']
[AnimatorMapMachine] First warning polygon: Polygon
[AnimatorMapMachine] Starting region detection...
[regionDetection] Checking 195 regions for overlap with HWA
[regionDetection] Found affected region: Bahamas
[regionDetection] Found affected region: Cuba
[regionDetection] Found affected region: Jamaica
[regionDetection] Checked 195 regions, found 3 affected, errors: 0
[AnimatorMapMachine] Affected regions detected: 3
[AnimatorMapMachine] Affected region IDs: ['Bahamas', 'Cuba', 'Jamaica']
[AnimatorMapMachine] Affected regions GeoJSON features: 3
```

### ✅ Visual Changes (Should See)

1. **Forecast Points** (small circles along track)
   - Size: 6.4-16px (20% smaller than before)
   - Outline: 1.5px white (50% smaller than before)
   - Colors: Yellow → Orange → Red (by wind speed)

2. **Colored Regions** (countries affected by warnings)
   - **Red regions** = Hurricane Warning (HWA)
   - **Orange regions** = Tropical Storm Warning (TWA)
   - **Red outlines** = Hurricane Watch (HWR)
   - **Orange outlines** = Tropical Storm Watch (TWR)

3. **Map Background**
   - Green shades for US land
   - Blue for ocean
   - Faded colors for other countries

---

## Troubleshooting

### Issue: No regions colored

**Check:**
1. Are warning polygons being found? (Look for "Warning polygons found: X")
2. Are regions being detected? (Look for "Affected regions detected: X")
3. Is the region alert layer being added? (Look for "Affected regions GeoJSON features: X")

**If warning polygons = 0:**
- The frame data doesn't have warning polygons
- Check if the story is loading real hurricane data

**If affected regions = 0:**
- The overlap detection isn't finding overlaps
- This could mean the warning polygons don't overlap with any countries
- Or there's an issue with the Turf.js overlap detection

**If regions GeoJSON features = 0:**
- The affected regions aren't being converted to GeoJSON
- Check the createAffectedRegionsGeoJSON function

### Issue: Regions have wrong colors

**Check:**
1. Are the warning types correct? (HWA, TWA, HWR, TWR)
2. Are the colors defined correctly in getWarningColor()?
3. Is the GeoJsonLayer using the correct color function?

---

## Console Commands

Run these in the browser console to debug:

```javascript
// Check if countries data loaded
const layer = document.querySelector('canvas')?.__deck?.layers
  ?.find(l => l.id === 'world-layer');
console.log('World layer data:', layer?.data?.features?.length);

// Check if region alert layer exists
const regionLayer = document.querySelector('canvas')?.__deck?.layers
  ?.find(l => l.id === 'region-alerts-layer');
console.log('Region alert layer:', regionLayer);
console.log('Region features:', regionLayer?.data?.features?.length);

// Check all layers
const allLayers = document.querySelector('canvas')?.__deck?.layers;
console.log('All layers:', allLayers?.map(l => l.id));

// Check warning polygons
const warnings = document.querySelector('canvas')?.__deck?.layers
  ?.find(l => l.id === 'frame-data-layer')?.data?.features
  ?.filter(f => ['HWA', 'TWA', 'HWR', 'TWR'].includes(f.properties?.type));
console.log('Warnings found:', warnings?.length);
```

---

## Expected Performance

- **Countries checked:** 195
- **Affected regions:** 1-10 (typically)
- **Detection time:** < 100ms
- **Rendering time:** < 50ms

---

## Success Criteria

✅ Console shows proper logs with country names
✅ Regions are colored on the map
✅ Colors match warning types
✅ Forecast points are visible
✅ No errors in console

---

**Ready to test!** 🚀

