# County Alerts Debug Guide

## Overview

This guide explains the data flow and how to debug the county alerts animator story.

## Mock Data Structure

### What the Mock Data Looks Like

The mock data is created by `createMockCountyAlertFrames()` and consists of 4 frames:

```typescript
// Frame 1: Few alerts (2 counties)
{
  '48001': { // Texas County
    color: [255, 0, 0, 255], // Red - Tornado Warning
    alerts: [{ event: 'Tornado Warning', headline: '...' }],
    headline: 'Tornado Warning for Anderson County'
  },
  '40001': { // Oklahoma County
    color: [50, 150, 255, 255], // Light blue - Severe Watch
    alerts: [{ event: 'Severe Thunderstorm Watch', headline: '...' }],
    headline: 'Severe Watch for Adair County'
  }
}

// Frame 2: More alerts (3 counties)
// Frame 3: Alerts clearing (2 counties)
// Frame 4: Most alerts cleared (1 county)
```

### Data Transformation Pipeline

```
CountyAlertMap (raw county data)
    ↓
createCountyAlertGeoJSON() - Converts to GeoJSON
    ↓
GeoJSON FeatureCollection (3,000+ county features)
    ↓
createCountyAlertFrame() - Wraps in MapFrame
    ↓
MapFrame[] (array of frames for animation)
    ↓
Animator component
    ↓
AnimatorMapMachine (DeckGL rendering)
    ↓
Colored counties on map
```

## How to Debug

### 1. Check Mock Data in Browser Console

When you load the **MockCountyAlerts** story:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for logs starting with `=== MOCK COUNTY ALERTS DEBUG ===`
4. You should see:
   - Total frames created: 4
   - For each frame:
     - Frame ID
     - Timestamp
     - Frame data type: "FeatureCollection"
     - Frame features count: 3,000+ (all US counties)
     - Sample features with alertColor and hasAlert properties

### 2. Check API Data in Browser Console

When you load the **RealDataLast24Hours** story:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for logs starting with `=== FETCHING REAL API DATA (24 hours) ===`
4. You should see:
   - API Response received: { success: true, data: {...} }
   - API Response success: true
   - Alert count: number of alerts from API
   - Timeline entries: number of timeline points
   - Frames created: number of frames generated
   - For each frame: ID, features count, metadata

### 3. Expected Console Output for Mock Data

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
  Feature 2: { id: '01005', alertColor: [200, 200, 200, 100], hasAlert: false, alerts: 0 }

--- Frame 1 ---
Frame ID: frame-1
Timestamp: 2025-10-23T15:30:00.000Z
Frame data type: FeatureCollection
Frame features count: 3143
Frame metadata: { frameNumber: 2, totalFrames: 4 }
Sample features:
  Feature 0: { id: '01001', alertColor: [200, 200, 200, 100], hasAlert: false, alerts: 0 }
  Feature 1: { id: '01003', alertColor: [200, 200, 200, 100], hasAlert: false, alerts: 0 }
  Feature 2: { id: '01005', alertColor: [200, 200, 200, 100], hasAlert: false, alerts: 0 }
```

### 4. Expected Console Output for Real API Data

```
=== FETCHING REAL API DATA (24 hours) ===
API Response received: { success: true, data: { alerts: {...}, timeline: [...] } }
API Response success: true
API Response data: { alerts: { 'alert-1': {...}, 'alert-2': {...} }, timeline: [...] }
Alert count: 42
Timeline entries: 5

Frames created: 5

--- Frame 0 ---
Frame ID: frame-current
Features count: 3143
Metadata: { source: 'current-alerts' }

--- Frame 1 ---
Frame ID: frame-0
Features count: 3143
Metadata: { timelineIndex: 0, totalFrames: 5 }
```

## Troubleshooting

### Issue: No data displayed on map

**Check:**
1. Open browser console
2. Look for the debug logs
3. Verify:
   - Frames are being created (should see "Total frames created: 4" or similar)
   - Features count is > 0 (should be 3,000+)
   - alertColor values are present in features

### Issue: API returns error

**Check:**
1. API endpoint is accessible: `https://api-data-nexlab-staging-1108a5c77b75.herokuapp.com`
2. Network tab shows request and response
3. Response has `success: true`
4. Response has `data.alerts` object with alert data

### Issue: Frames created but no counties colored

**Possible causes:**
1. County IDs in alert data don't match counties.json IDs
2. Color values are not being applied to features
3. AnimatorMapMachine is not rendering the frame data

**Debug steps:**
1. Check if `alertColor` property is set on features
2. Check if `hasAlert` property is true for counties with alerts
3. Verify county IDs match between API data and counties.json

## Data Flow Diagram

```
API Response
├── success: boolean
└── data
    ├── alerts: Record<string, AlertData>
    │   ├── alert-1: { event, headline, countyId, ... }
    │   ├── alert-2: { event, headline, countyId, ... }
    │   └── ...
    └── timeline: Array<{ timestamp, changes }>

↓ parseAlertsToCountyMap()

CountyAlertMap
├── '48001': { color: [255, 0, 0, 255], alerts: [...], headline: '...' }
├── '40001': { color: [50, 150, 255, 255], alerts: [...], headline: '...' }
└── ...

↓ createCountyAlertGeoJSON()

GeoJSON FeatureCollection
├── features[0]: { properties: { id: '01001', alertColor: [200, 200, 200, 100], hasAlert: false } }
├── features[1]: { properties: { id: '01003', alertColor: [200, 200, 200, 100], hasAlert: false } }
├── features[2]: { properties: { id: '48001', alertColor: [255, 0, 0, 255], hasAlert: true } }
└── ... (3,000+ features)

↓ createCountyAlertFrame()

MapFrame
├── id: 'frame-0'
├── timestamp: Date
├── data: FeatureCollection (from above)
└── metadata: { frameNumber: 1, totalFrames: 4 }

↓ Animator component

MapFrame[] passed to Animator
├── frames[0]: MapFrame
├── frames[1]: MapFrame
├── frames[2]: MapFrame
└── frames[3]: MapFrame

↓ AnimatorMapMachine

DeckGL Rendering
├── Base layers (ocean, states, counties)
└── Main layer (frame data with colors)

↓ Visual Output

Map with colored counties
```

## Key Files

- `src/util/dataCalls/alerts/parseCountyAlerts.ts` - API parsing and color mapping
- `src/util/dataCalls/alerts/createCountyAlertFrames.ts` - Frame creation
- `src/components/elements/Animator/Animator.countyAlerts.stories.tsx` - Story with logging
- `src/data/d3Map/counties.json` - County GeoJSON data (3,000+ features)

## Next Steps

1. **Load MockCountyAlerts story** and check console logs
2. **Verify mock data structure** matches expected format
3. **Check if counties are rendering** on the map (even without colors)
4. **Load RealDataLast24Hours story** and check API response
5. **Compare API data structure** with mock data structure
6. **Identify any mismatches** in county ID format or data structure

