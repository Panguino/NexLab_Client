# Hurricane Visualization - Debugging Guide

## Console Commands to Check

When viewing the Storybook story, open the browser's Developer Console (F12 or Cmd+Option+I) and look for these logs:

### 1. **Frame Loading**
```
[AnimatorMapMachine] Loading frames...
[AnimatorMapMachine] Frame loaded: { id, hasData, dataType, featureCount }
[AnimatorMapMachine] Loaded X map frames
```

**What to check:**
- Are frames being loaded? (Should see "Loaded 1 map frames")
- Does the frame have data? (hasData should be true)
- How many features? (featureCount should be > 0)

### 2. **Layer Creation**
```
[AnimatorMapMachine] Adding frame data layer: { frameId, dataType, featureCount }
[AnimatorMapMachine] Layers created: { totalLayers, layerIds }
```

**What to check:**
- Is the frame data layer being added?
- How many total layers? (Should be 10+)
- Layer IDs should include: 'frame-data-layer', 'counties-layer', 'states-borders-layer', etc.

### 3. **Expected Layer IDs**
```
[
  'world-layer',
  'states-layer',
  'counties-layer',
  'states-borders-layer',
  'coastal-layer' (if coastal data exists),
  'gridlines-layer',
  'frame-data-layer',
  'hovered-region-layer' (if hovering),
  'storm-track-layer' (if tropical storms),
  'hurricane-layer' (if tropical storms)
]
```

## Common Issues & Solutions

### Issue: Map shows but no hurricane data visible

**Check:**
1. Open browser console (F12)
2. Look for `[AnimatorMapMachine] Adding frame data layer` log
3. Check if `featureCount` is > 0

**If featureCount is 0:**
- The frame.data.features array is empty
- Check the story's data creation logic
- Verify features are being added to the array

**If log doesn't appear:**
- frame.data might be undefined
- Check if frame is being loaded (look for "Loaded X map frames")

### Issue: Map doesn't render at all (height = 0)

**Check:**
1. Open browser DevTools (F12)
2. Inspect the map container element
3. Check computed height in the Styles panel

**Solutions:**
- The container wrapper should have `height: 100vh`
- The Animator component should have `height: 100%`
- The AnimatorMapSizer should have `height: 100%`
- The AnimatorMapMachine should have `height: 100%`

**To verify:**
```javascript
// In browser console:
document.querySelector('[class*="animatorMapMachine"]')?.offsetHeight
// Should return a number > 0, not 0
```

### Issue: Features render but with wrong colors

**Check:**
1. Inspect a feature in the console
2. Look at its `properties.type` value
3. Verify it matches one of: 'HWA', 'TWA', 'HWR', 'TWR', 'Cone of Uncertainty'

**If type is missing or wrong:**
- The story's feature creation needs to set the `type` property
- Check `Animator.hurricaneVisualization.stories.tsx` line 55-111

### Issue: No features visible but layers exist

**Check:**
1. Verify layer has features: `[AnimatorMapMachine] Adding frame data layer` should show featureCount > 0
2. Check if features are outside the map bounds
3. Verify feature coordinates are [longitude, latitude] format

**To debug coordinates:**
```javascript
// In browser console, after loading:
// Get the frame data from the page
// Check if coordinates are in valid range:
// Longitude: -180 to 180
// Latitude: -90 to 90
```

## Performance Monitoring

### Check Layer Performance
```javascript
// In browser console:
// Get DeckGL instance
const deckgl = document.querySelector('canvas')?.__deck
console.log('DeckGL layers:', deckgl?.layers?.length)
console.log('FPS:', deckgl?.metrics?.fps)
```

### Monitor Memory Usage
- Open DevTools → Performance tab
- Record for 5 seconds while interacting with map
- Look for memory spikes or garbage collection issues

## Network Debugging

### Check API Calls
1. Open DevTools → Network tab
2. Look for requests to `climate.cod.edu`
3. Check response status (should be 200)
4. Verify response contains expected data structure

**Expected response structure:**
```json
{
  "YYYYMMDDHHMM": {
    "cone": [[lon, lat], ...],
    "pts": { ... },
    "ww": [ ... ],
    "bestTrack": { ... }
  }
}
```

## Step-by-Step Debugging Process

1. **Open Storybook**
   ```bash
   npm run storybook
   ```

2. **Navigate to story**
   - Components → Animator → Hurricane Visualization

3. **Open browser console** (F12)

4. **Check logs in order:**
   - Look for "Loading frames..." log
   - Look for "Frame loaded:" log with feature count
   - Look for "Adding frame data layer:" log
   - Look for "Layers created:" log with layer count

5. **If map is blank:**
   - Check container height: `document.querySelector('[class*="animatorMapSizer"]')?.offsetHeight`
   - Should be > 0

6. **If features don't show:**
   - Check feature count in logs
   - Inspect element to verify layer exists
   - Check if coordinates are in valid range

7. **If colors are wrong:**
   - Check feature properties in console
   - Verify `type` property is set correctly

## Useful Console Commands

```javascript
// Get map container height
document.querySelector('[class*="animatorMapMachine"]')?.offsetHeight

// Get all layers
document.querySelector('canvas')?.__deck?.layers?.map(l => l.id)

// Get frame data (if accessible)
// This depends on React internals, may not always work

// Check if DeckGL is initialized
!!document.querySelector('canvas')?.__deck

// Get viewport info
document.querySelector('canvas')?.__deck?.viewState
```

## Still Having Issues?

1. **Check the browser console** - Look for any red error messages
2. **Check the Network tab** - Verify API calls are succeeding
3. **Check the Elements tab** - Verify DOM structure and heights
4. **Check the Performance tab** - Look for rendering bottlenecks
5. **Check the Application tab** - Look for any storage/cache issues

## Reporting Issues

When reporting issues, include:
1. Browser console logs (copy the [AnimatorMapMachine] logs)
2. Screenshot of the issue
3. Steps to reproduce
4. Expected vs actual behavior
5. Browser and OS information

