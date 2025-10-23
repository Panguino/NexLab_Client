# API Response Dump Guide - RealDataLastHour Story

## Overview

The **RealDataLastHour** story now includes a comprehensive console dump of the entire API response. This will help you see exactly what data is coming from the API.

## How to View the Console Dump

### Step 1: Load the Story
```
Storybook → Components → Animator → County Alerts → RealDataLastHour
```

### Step 2: Open Browser Console
- Press **F12** to open DevTools
- Click on the **Console** tab

### Step 3: Look for the Dump
You should see a large section with:
```
================================================================================
=== REAL API DATA - LAST HOUR - FULL CONSOLE DUMP ===
================================================================================
```

## What You'll See in the Console

### 1. Request Information
```
Fetching from: https://api-data-nexlab-staging-1108a5c77b75.herokuapp.com/api/alerts/history/last?hours=1
Timestamp: 2025-10-23T14:30:00.000Z
```

### 2. Complete API Response (JSON)
```json
{
  "success": true,
  "data": {
    "alerts": {
      "alert-1": {
        "id": "alert-1",
        "event": "Tornado Warning",
        "headline": "Tornado Warning for Anderson County",
        "countyId": "48001",
        "status": "new",
        ...
      },
      "alert-2": { ... },
      ...
    },
    "timeline": [
      {
        "timestamp": "2025-10-23T14:00:00Z",
        "changes": { ... }
      },
      ...
    ]
  }
}
```

### 3. API Response Structure Analysis
```
Success: true
Data type: object
Data keys: ["alerts", "timeline"]
```

### 4. Alerts Object Summary
```
Total alerts: 42
Alert IDs: ["alert-1", "alert-2", "alert-3", ...]
Sample alert: { event: "Tornado Warning", headline: "...", ... }
```

### 5. Timeline Array Summary
```
Timeline entries: 5
First timeline entry: { timestamp: "2025-10-23T14:00:00Z", changes: {...} }
Last timeline entry: { timestamp: "2025-10-23T14:55:00Z", changes: {...} }
```

### 6. Detailed Alerts Breakdown
```
Alert 1 (alert-1): {
  event: "Tornado Warning",
  headline: "Tornado Warning for Anderson County",
  status: "new",
  countyId: "48001",
  areaDesc: "Anderson County, TX",
  properties: ["id", "event", "headline", ...]
}

Alert 2 (alert-2): { ... }
Alert 3 (alert-3): { ... }
Alert 4 (alert-4): { ... }
Alert 5 (alert-5): { ... }

... and 37 more alerts
```

### 7. Frame Creation Summary
```
Creating frames from API response...
Frames created: 5

Frame 0: {
  id: "frame-current",
  timestamp: 2025-10-23T14:30:00.000Z,
  features: 3143,
  metadata: { source: "current-alerts" }
}

Frame 1: {
  id: "frame-0",
  timestamp: 2025-10-23T14:00:00Z,
  features: 3143,
  metadata: { timelineIndex: 0, totalFrames: 5 }
}
...
```

## Console Output Structure

```
================================================================================
=== REAL API DATA - LAST HOUR - FULL CONSOLE DUMP ===
================================================================================
Fetching from: ...
Timestamp: ...
================================================================================

📥 COMPLETE API RESPONSE:
[Full JSON response here]

📊 API RESPONSE STRUCTURE:
Success: ...
Data type: ...
Data keys: ...

🚨 ALERTS OBJECT:
Total alerts: ...
Alert IDs: ...
Sample alert: ...

📅 TIMELINE ARRAY:
Timeline entries: ...
First timeline entry: ...
Last timeline entry: ...

🔍 DETAILED ALERTS BREAKDOWN:
Alert 1 (...): { ... }
Alert 2 (...): { ... }
...

================================================================================
Creating frames from API response...
Frames created: ...
Frame 0: { ... }
Frame 1: { ... }
...
================================================================================
```

## What to Look For

### ✅ Good Signs
- `Success: true` - API call succeeded
- `Total alerts: > 0` - There are alerts in the response
- `Timeline entries: > 0` - There are timeline points
- `Frames created: > 0` - Frames were successfully created
- `features: 3143` - All counties are included in each frame

### ⚠️ Warning Signs
- `Success: false` - API returned an error
- `Total alerts: 0` - No alerts in the response
- `Timeline entries: 0` - No timeline data
- `Frames created: 0` - No frames were created
- `features: 0` - Features are missing

### ❌ Error Signs
- Red error message in console
- Network error in DevTools Network tab
- `Error loading alerts: ...` message on screen

## Troubleshooting

### Issue: Console dump not appearing

**Solution:**
1. Make sure you're on the **RealDataLastHour** story (not MockCountyAlerts)
2. Wait for the page to load completely
3. Check if there's an error message on screen
4. Look for error in console (red text)

### Issue: API Response is empty

**Solution:**
1. Check if `success: true`
2. Check if `alerts` object has any entries
3. Check if `timeline` array has any entries
4. If empty, the API may not have data for the last hour

### Issue: County IDs don't match

**Solution:**
1. Look at the `countyId` field in the alerts
2. Compare with county IDs in the mock data (48001, 40001, 20001)
3. Check if the format matches (5-digit FIPS code)
4. If format is different, the parsing may need adjustment

## Copying the Response

### To Copy the Full Response:
1. Right-click on the JSON output in console
2. Select "Copy object"
3. Paste into a text editor or JSON viewer

### To Save to File:
1. Right-click on console
2. Select "Save as..."
3. Save the console output to a file

## API Response Format

The API returns data in this format:

```typescript
interface AlertsAPIResponse {
  success: boolean
  data: {
    alerts: Record<string, AlertData>
    timeline: Array<{
      timestamp: string
      changes: Record<string, string>
    }>
  }
}

interface AlertData {
  id: string
  event: string
  headline: string
  countyId?: string
  county_id?: string
  areaDesc?: string
  status: 'new' | 'unchanged' | 'updated' | 'expired'
  properties?: Record<string, any>
  [key: string]: any
}
```

## Next Steps

1. **Load RealDataLastHour** story
2. **Open browser console** (F12)
3. **Review the complete API response**
4. **Check for:**
   - Success status
   - Number of alerts
   - Timeline entries
   - County ID format
   - Alert event types
5. **Compare with mock data** structure
6. **Identify any issues** with data format or structure

## Files Referenced

- `src/components/elements/Animator/Animator.countyAlerts.stories.tsx` - Story with console dump
- `src/util/dataCalls/alerts/parseCountyAlerts.ts` - API parsing logic
- `src/util/dataCalls/alerts/createCountyAlertFrames.ts` - Frame creation logic

