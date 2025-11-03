# County Alerts Debugging - Quick Start

## TL;DR - What to Check

### 1. Load MockCountyAlerts Story
```
Storybook → Components → Animator → County Alerts → MockCountyAlerts
```

### 2. Open Browser Console (F12)
Look for logs starting with `=== MOCK COUNTY ALERTS DEBUG ===`

### 3. Check These Values

```
✓ Total frames created: 4
✓ Frame features count: 3143
✓ Frame data type: FeatureCollection
✓ Sample features have alertColor property
✓ Some features have hasAlert: true
```

### 4. Check the Map

You should see:
- **Map loads** with all US counties visible
- **Most counties are grey** (no alerts)
- **A few counties are colored**:
  - Frame 1: Texas (red), Oklahoma (light blue)
  - Frame 2: Texas (red), Oklahoma (blue), Kansas (orange)
  - Frame 3: Texas (light red), Kansas (orange)
  - Frame 4: Kansas (orange)

### 5. Use Scrubber to Navigate

- **Drag scrubber** left/right to move between frames
- **Click play button** to auto-play animation
- **Watch counties change color** as you move through frames

---

## What the Mock Data Looks Like

### Frame 1 (2 alerts)
```
County 48001 (Texas):     RED [255, 0, 0, 255]           - Tornado Warning
County 40001 (Oklahoma):  LIGHT BLUE [50, 150, 255, 255] - Severe Watch
All other counties:       GREY [200, 200, 200, 100]      - No alert
```

### Frame 2 (3 alerts)
```
County 48001 (Texas):     RED [255, 0, 0, 255]           - Tornado Warning
County 40001 (Oklahoma):  BLUE [0, 100, 225, 255]        - Severe Warning
County 20001 (Kansas):    ORANGE [232, 100, 0, 255]      - Fire Advisory
All other counties:       GREY [200, 200, 200, 100]      - No alert
```

### Frame 3 (2 alerts)
```
County 48001 (Texas):     LIGHT RED [255, 100, 100, 255] - Tornado Watch
County 20001 (Kansas):    ORANGE [232, 100, 0, 255]      - Fire Advisory
All other counties:       GREY [200, 200, 200, 100]      - No alert
```

### Frame 4 (1 alert)
```
County 20001 (Kansas):    ORANGE [232, 100, 0, 255]      - Fire Advisory
All other counties:       GREY [200, 200, 200, 100]      - No alert
```

---

## Data Flow Summary

```
Mock County Map (2-3 counties with alerts)
    ↓
createCountyAlertGeoJSON()
    ↓
GeoJSON FeatureCollection (3,143 counties total)
    ↓
createCountyAlertFrame()
    ↓
MapFrame { id, timestamp, data, metadata }
    ↓
MapFrame[] (4 frames)
    ↓
Animator Component
    ↓
AnimatorMapMachine (DeckGL)
    ↓
Colored Map
```

---

## Console Logs to Expect

### MockCountyAlerts Story

```
=== MOCK COUNTY ALERTS DEBUG ===
Total frames created: 4

--- Frame 0 ---
Frame ID: frame-0
Timestamp: 2025-10-23T14:30:00.000Z
Frame data type: FeatureCollection
Frame features count: 3143
Frame metadata: { frameNumber: 1, totalFrames: 4 }
Sample features:
  Feature 0: { id: '01001', alertColor: [200, 200, 200, 100], hasAlert: false, alerts: 0 }
  Feature 1: { id: '01003', alertColor: [200, 200, 200, 100], hasAlert: false, alerts: 0 }
  Feature 2: { id: '48001', alertColor: [255, 0, 0, 255], hasAlert: true, alerts: 1 }

--- Frame 1 ---
Frame ID: frame-1
Timestamp: 2025-10-23T15:30:00.000Z
Frame data type: FeatureCollection
Frame features count: 3143
Frame metadata: { frameNumber: 2, totalFrames: 4 }
...
```

### RealDataLast24Hours Story

```
=== FETCHING REAL API DATA (24 hours) ===
API Response received: { success: true, data: {...} }
API Response success: true
API Response data: { alerts: {...}, timeline: [...] }
Alert count: 42
Timeline entries: 5

Frames created: 5

--- Frame 0 ---
Frame ID: frame-current
Features count: 3143
Metadata: { source: 'current-alerts' }
...
```

---

## Troubleshooting

### Problem: No data displayed on map

**Solution:**
1. Open browser console (F12)
2. Look for debug logs
3. Check if frames are being created
4. Check if features have alertColor values
5. See `COUNTY_ALERTS_DEBUG_GUIDE.md` for detailed troubleshooting

### Problem: API returns error

**Solution:**
1. Check API endpoint is accessible
2. Check network tab in DevTools
3. Verify response has `success: true`
4. See `COUNTY_ALERTS_DEBUG_GUIDE.md` for API troubleshooting

### Problem: Frames created but no counties colored

**Solution:**
1. Check if `alertColor` property is set on features
2. Check if `hasAlert` property is true
3. Verify county IDs match between API and counties.json
4. See `DATA_FLOW_TRACE.md` for detailed data flow

---

## Files to Review

| File | Purpose |
|------|---------|
| `src/components/elements/Animator/Animator.countyAlerts.stories.tsx` | Story with logging |
| `src/util/dataCalls/alerts/createCountyAlertFrames.ts` | Creates MapFrame objects |
| `src/util/dataCalls/alerts/parseCountyAlerts.ts` | Parses API data and creates GeoJSON |
| `src/data/d3Map/counties.json` | County GeoJSON data (3,143 features) |
| `MOCK_DATA_STRUCTURE.md` | Detailed mock data structure |
| `DATA_FLOW_TRACE.md` | Step-by-step data transformation |
| `COUNTY_ALERTS_DEBUG_GUIDE.md` | Comprehensive debugging guide |

---

## Next Steps

1. **Load MockCountyAlerts** and verify console logs
2. **Check if map displays** with colored counties
3. **Use scrubber** to navigate between frames
4. **Load RealDataLast24Hours** and check API response
5. **Compare API data** with mock data structure
6. **Identify any issues** and refer to debug guides

---

## Key Concepts

- **MapFrame**: Object containing GeoJSON data for a single frame
- **GeoJSON**: Geographic data format with 3,143 US county features
- **alertColor**: RGBA color array [R, G, B, A] for each county
- **hasAlert**: Boolean indicating if county has an active alert
- **DeckGL**: GPU-accelerated rendering library for the map
- **Animator**: Component that manages frame navigation and playback
- **AnimatorMapMachine**: Component that renders map frames with DeckGL

