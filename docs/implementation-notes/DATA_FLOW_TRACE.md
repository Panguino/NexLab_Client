# County Alerts Data Flow Trace

## Step-by-Step Data Transformation

### Step 1: Create Mock County Alert Map

**Function**: `createMockCountyAlertFrames()` in `createCountyAlertFrames.ts`

**Input**: None (hardcoded mock data)

**Output**: Array of `CountyAlertMap` objects

```typescript
// This is what gets created for Frame 1
const mockCountyMap = {
  '48001': {
    color: [255, 0, 0, 255],  // Red
    alerts: [{ event: 'Tornado Warning', headline: '...' }],
    headline: 'Tornado Warning for Anderson County'
  },
  '40001': {
    color: [50, 150, 255, 255],  // Light blue
    alerts: [{ event: 'Severe Thunderstorm Watch', headline: '...' }],
    headline: 'Severe Watch for Adair County'
  }
}
```

### Step 2: Convert to GeoJSON

**Function**: `createCountyAlertGeoJSON(countyAlertMap)` in `parseCountyAlerts.ts`

**Input**: `CountyAlertMap` (from Step 1)

**Process**:
1. Load all 3,143 US counties from `counties.json`
2. For each county feature:
   - Get county ID from feature properties
   - Look up in `countyAlertMap`
   - If found: use alert color
   - If not found: use default grey [200, 200, 200, 100]
3. Add `alertColor`, `hasAlert`, and `alerts` to feature properties

**Output**: `FeatureCollection` with 3,143 features

```typescript
{
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [...] },
      properties: {
        id: '01001',
        name: 'Autauga County',
        alertColor: [200, 200, 200, 100],  // Grey - no alert
        hasAlert: false,
        alerts: []
      }
    },
    // ... 3,140 more counties ...
    {
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: [...] },
      properties: {
        id: '48001',
        name: 'Anderson County',
        alertColor: [255, 0, 0, 255],  // RED - has alert
        hasAlert: true,
        alerts: [{ event: 'Tornado Warning', ... }]
      }
    }
  ]
}
```

### Step 3: Wrap in MapFrame

**Function**: `createCountyAlertFrame(countyAlertMap, timestamp, frameId)` in `createCountyAlertFrames.ts`

**Input**: 
- `CountyAlertMap` (from Step 1)
- `timestamp`: Date object
- `frameId`: string like 'frame-0'

**Process**:
1. Call `createCountyAlertGeoJSON()` to get GeoJSON
2. Wrap in MapFrame object with metadata

**Output**: `MapFrame` object

```typescript
{
  id: 'frame-0',
  timestamp: Date('2025-10-23T14:30:00.000Z'),
  data: {
    type: 'FeatureCollection',
    features: [
      // 3,143 county features with colors
    ]
  },
  metadata: {
    alertCount: 2,
    frameNumber: 1,
    totalFrames: 4
  }
}
```

### Step 4: Create Array of MapFrames

**Function**: `createMockCountyAlertFrames()` returns `MapFrame[]`

**Output**: Array of 4 MapFrame objects

```typescript
[
  MapFrame (frame-0, 2 alerts),
  MapFrame (frame-1, 3 alerts),
  MapFrame (frame-2, 2 alerts),
  MapFrame (frame-3, 1 alert)
]
```

### Step 5: Pass to Animator Component

**Component**: `Animator` in `Animator.countyAlerts.stories.tsx`

**Props**:
```typescript
<Animator
  frames={mapFrames}           // MapFrame[] from Step 4
  mode="map"                   // Enable map mode
  mapRegion="conus"            // Continental US
  imageInfo={{ width: 1200, height: 800 }}
  autoPlay={false}
  interval={500}
/>
```

### Step 6: Animator Passes to AnimatorMapMachine

**Component**: `AnimatorMapMachine` (internal to Animator)

**What happens**:
1. Animator manages frame navigation (scrubber, play/pause)
2. Passes current frame to AnimatorMapMachine
3. AnimatorMapMachine renders the frame data

### Step 7: AnimatorMapMachine Renders with DeckGL

**Component**: `AnimatorMapMachine` in `AnimatorMapMachine.tsx`

**Process**:
1. Creates DeckGL instance
2. Adds base layers:
   - Ocean background (blue)
   - States layer (green)
   - County borders (light grey)
   - State borders (dark grey)
3. Adds main layer from frame data:
   - Uses `getFillColor` to get color from feature properties
   - Uses `getLineColor` for borders
4. Renders to canvas

**Key Code**:
```typescript
new GeoJsonLayer({
  id: 'main-layer',
  data: frame.data,  // FeatureCollection from Step 2
  stroked: true,
  filled: true,
  getFillColor: (d) => d.properties?.alertColor || [200, 200, 200, 100],
  getLineColor: [100, 100, 100, 255],
  opacity: 1
})
```

### Step 8: Visual Output

**Result**: Map with colored counties

- **Grey counties**: No alerts
- **Red counties**: Tornado Warning
- **Blue counties**: Severe Warning
- **Orange counties**: Fire Advisory
- **Light colors**: Watches/Advisories

## API Data Flow (for Real Data)

### Step 1: Fetch from API

**Function**: `fetchCountyAlertsLastHours(24)` in `parseCountyAlerts.ts`

**Endpoint**: `GET /api/alerts/history/last?hours=24`

**Output**: `AlertsAPIResponse`

```typescript
{
  success: true,
  data: {
    alerts: {
      'alert-1': {
        id: 'alert-1',
        event: 'Tornado Warning',
        headline: 'Tornado Warning for Anderson County',
        countyId: '48001',
        status: 'new'
      },
      'alert-2': {
        id: 'alert-2',
        event: 'Severe Thunderstorm Warning',
        headline: 'Severe Warning for Adair County',
        countyId: '40001',
        status: 'new'
      }
      // ... more alerts ...
    },
    timeline: [
      {
        timestamp: '2025-10-23T14:00:00Z',
        changes: { 'alert-1': 'new', 'alert-2': 'new' }
      },
      // ... more timeline entries ...
    ]
  }
}
```

### Step 2: Parse to County Map

**Function**: `parseAlertsToCountyMap(apiResponse)` in `parseCountyAlerts.ts`

**Process**:
1. Iterate through all alerts in `apiResponse.data.alerts`
2. For each alert:
   - Extract county ID
   - Get color based on event type
   - Add to `CountyAlertMap`

**Output**: `CountyAlertMap` (same as mock data Step 1)

### Step 3-8: Same as Mock Data

From here, the flow is identical to the mock data flow:
- Convert to GeoJSON
- Wrap in MapFrame
- Create array of frames
- Pass to Animator
- Render with DeckGL

## Logging Points

### In Story Component

```typescript
// After creating frames
console.log('Total frames created:', mockFrames.length)
mockFrames.forEach((frame, index) => {
  console.log(`Frame ${index}:`, {
    id: frame.id,
    features: frame.data?.features?.length,
    metadata: frame.metadata
  })
})
```

### In parseCountyAlerts.ts

```typescript
// In parseAlertsToCountyMap()
console.log('Parsing alerts to county map')
console.log('Total alerts:', Object.keys(apiResponse.data.alerts).length)
console.log('County map size:', Object.keys(countyMap).length)
```

### In createCountyAlertGeoJSON()

```typescript
// After mapping features
console.log('Created GeoJSON with', features.length, 'features')
console.log('Counties with alerts:', features.filter(f => f.properties.hasAlert).length)
```

## Troubleshooting Checklist

- [ ] **Step 1**: Mock data created with correct county IDs
- [ ] **Step 2**: GeoJSON has 3,143 features
- [ ] **Step 2**: Features have `alertColor` property
- [ ] **Step 3**: MapFrame has correct timestamp
- [ ] **Step 4**: Array has 4 frames
- [ ] **Step 5**: Animator receives frames array
- [ ] **Step 6**: AnimatorMapMachine receives current frame
- [ ] **Step 7**: DeckGL layer uses `getFillColor` correctly
- [ ] **Step 8**: Map displays with colors

## Expected Console Output

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
```

