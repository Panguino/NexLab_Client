# Region Detection Debugging Guide

## Quick Start

1. **Open Storybook:**
   ```bash
   npm run storybook
   ```

2. **Navigate to:**
   Components → Animator → Hurricane Visualization

3. **Open Browser Console:**
   - Chrome/Edge: F12 or Cmd+Option+I
   - Firefox: F12 or Cmd+Option+I

4. **Look for these logs:**

---

## Expected Console Output

### If Everything Works

```
[AnimatorMapMachine] Warning polygons found: 4
[AnimatorMapMachine] Warning polygon types: ['HWA', 'TWA', 'HWR', 'TWR']
[AnimatorMapMachine] First warning polygon: Polygon
[AnimatorMapMachine] Starting region detection...
[regionDetection] Checking 1425 regions for overlap with HWA
[regionDetection] Found affected region: Bahamas
[regionDetection] Found affected region: Cuba
[regionDetection] Found affected region: Jamaica
[regionDetection] Checked 1425 regions, found 3 affected, errors: 0
[AnimatorMapMachine] Affected regions detected: 3
[AnimatorMapMachine] Affected region IDs: ['Bahamas', 'Cuba', 'Jamaica']
[AnimatorMapMachine] Affected regions GeoJSON features: 3
```

---

## Troubleshooting

### Issue 1: "No warning polygons found in frame data"

**Meaning:** The frame data doesn't contain any warning polygons

**Check:**
```javascript
// In console, run:
document.querySelector('canvas')?.__deck?.layers
  ?.find(l => l.id === 'frame-data-layer')?.data?.features
  ?.filter(f => ['HWA', 'TWA', 'HWR', 'TWR'].includes(f.properties?.type))
```

**Solution:**
- Verify the story is loading real hurricane data
- Check if the data source has warning polygons

---

### Issue 2: "No affected regions found!"

**Meaning:** Warning polygons exist but overlap detection found 0 regions

**Possible Causes:**
1. **Polygon format issue** - Warning polygon might be MultiPolygon
2. **Coordinate system mismatch** - Coordinates might be in wrong format
3. **Turf.js issue** - booleanOverlap might not be working correctly

**Check:**
```javascript
// In console, run:
const layer = document.querySelector('canvas')?.__deck?.layers
  ?.find(l => l.id === 'frame-data-layer');
const warnings = layer?.data?.features
  ?.filter(f => ['HWA', 'TWA', 'HWR', 'TWR'].includes(f.properties?.type));
console.log('Warning polygons:', warnings);
console.log('First warning:', warnings?.[0]);
console.log('Geometry type:', warnings?.[0]?.geometry?.type);
console.log('Coordinates sample:', warnings?.[0]?.geometry?.coordinates?.[0]?.slice(0, 3));
```

---

### Issue 3: "Checked 1425 regions, found 0 affected"

**Meaning:** Overlap detection ran but found no overlaps

**Possible Causes:**
1. **Polygon coordinates are invalid** - Check coordinate format
2. **Turf.js booleanOverlap not working** - Might need different detection method
3. **Coordinate system mismatch** - World data might use different format

**Check:**
```javascript
// Test Turf.js directly
const turf = require('@turf/turf');
const layer = document.querySelector('canvas')?.__deck?.layers
  ?.find(l => l.id === 'frame-data-layer');
const warnings = layer?.data?.features
  ?.filter(f => f.properties?.type === 'HWA');
const worldData = /* get from window or import */;

if (warnings?.length > 0 && worldData?.features?.length > 0) {
  const warning = warnings[0];
  const region = worldData.features[0];
  console.log('Testing overlap:');
  console.log('Warning:', warning.geometry);
  console.log('Region:', region.geometry);
  try {
    const result = turf.booleanOverlap(warning, region);
    console.log('Overlap result:', result);
  } catch (e) {
    console.error('Overlap error:', e);
  }
}
```

---

## Console Log Breakdown

### AnimatorMapMachine Logs

| Log | Meaning |
|-----|---------|
| `Warning polygons found: X` | Found X warning polygons in frame data |
| `Warning polygon types: [...]` | Types of warnings found |
| `First warning polygon: Polygon` | First warning is a Polygon (good) |
| `Starting region detection...` | About to run overlap detection |
| `Affected regions detected: X` | Found X affected regions |
| `Affected region IDs: [...]` | Names of affected regions |
| `Affected regions GeoJSON features: X` | Number of features in output GeoJSON |
| `No affected regions found!` | Overlap detection found 0 regions |
| `No warning polygons found in frame data` | No warnings in frame data |

### regionDetection Logs

| Log | Meaning |
|-----|---------|
| `Checking 1425 regions for overlap with HWA` | Starting overlap detection |
| `Found affected region: X` | Region X overlaps with warning |
| `Checked 1425 regions, found X affected, errors: Y` | Summary of detection |

---

## Quick Diagnostic Commands

Run these in the browser console:

```javascript
// Check if warning polygons exist
const warnings = document.querySelector('canvas')?.__deck?.layers
  ?.find(l => l.id === 'frame-data-layer')?.data?.features
  ?.filter(f => ['HWA', 'TWA', 'HWR', 'TWR'].includes(f.properties?.type));
console.log('Warnings found:', warnings?.length);

// Check if region alert layer exists
const regionLayer = document.querySelector('canvas')?.__deck?.layers
  ?.find(l => l.id === 'region-alerts-layer');
console.log('Region alert layer:', regionLayer);
console.log('Region alert features:', regionLayer?.data?.features?.length);

// Check all layers
const allLayers = document.querySelector('canvas')?.__deck?.layers;
console.log('All layers:', allLayers?.map(l => l.id));
```

---

## Next Steps

1. **Check console logs** - Run Storybook and look for the logs above
2. **Share the output** - Tell me what logs you see
3. **Run diagnostic commands** - Use the commands above to get more info
4. **We'll debug together** - Based on the logs, we can identify the issue

---

## Common Issues & Solutions

### Turf.js Not Loaded
- Check if `@turf/turf` is installed
- Verify import in regionDetection.ts

### Coordinate Format Wrong
- World data might use [lon, lat]
- Warning polygons might use [lat, lon]
- Need to normalize coordinates

### MultiPolygon Not Supported
- Current code only checks for Polygon
- Need to add MultiPolygon support

### Overlap Detection Algorithm
- booleanOverlap might not work for all cases
- Might need to use booleanPointInPolygon instead
- Or use a different detection method

---

**Status:** Ready to debug! Check the console and share the logs.

