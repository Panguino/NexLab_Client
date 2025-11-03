# Console Dump Quick Reference

## TL;DR - How to View the API Response

### 1. Load Story
```
Storybook → Components → Animator → County Alerts → RealDataLastHour
```

### 2. Open Console
Press **F12** → Click **Console** tab

### 3. Look for This
```
================================================================================
=== REAL API DATA - LAST HOUR - FULL CONSOLE DUMP ===
================================================================================
```

### 4. Scroll Down to See
- ✅ Complete API response (JSON)
- ✅ Response structure analysis
- ✅ Alerts object summary
- ✅ Timeline array summary
- ✅ Detailed breakdown of first 5 alerts
- ✅ Frame creation summary

---

## Console Output Sections

### Section 1: Request Info
```
Fetching from: https://api-data-nexlab-staging-1108a5c77b75.herokuapp.com/api/alerts/history/last?hours=1
Timestamp: 2025-10-23T14:30:00.000Z
```

### Section 2: Complete API Response
```json
{
  "success": true,
  "data": {
    "alerts": {
      "alert-1": { ... },
      "alert-2": { ... },
      ...
    },
    "timeline": [
      { "timestamp": "...", "changes": {...} },
      ...
    ]
  }
}
```

### Section 3: Response Structure
```
Success: true
Data type: object
Data keys: ["alerts", "timeline"]
```

### Section 4: Alerts Summary
```
Total alerts: 42
Alert IDs: ["alert-1", "alert-2", "alert-3", ...]
Sample alert: { event: "Tornado Warning", headline: "...", ... }
```

### Section 5: Timeline Summary
```
Timeline entries: 5
First timeline entry: { timestamp: "2025-10-23T14:00:00Z", changes: {...} }
Last timeline entry: { timestamp: "2025-10-23T14:55:00Z", changes: {...} }
```

### Section 6: Detailed Alerts (First 5)
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

### Section 7: Frames Created
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

---

## What to Check

### ✅ Success Indicators
- [ ] `Success: true` - API call succeeded
- [ ] `Total alerts: > 0` - There are alerts
- [ ] `Timeline entries: > 0` - There is timeline data
- [ ] `Frames created: > 0` - Frames were created
- [ ] `features: 3143` - All counties included

### ⚠️ Warning Signs
- [ ] `Success: false` - API error
- [ ] `Total alerts: 0` - No alerts in response
- [ ] `Timeline entries: 0` - No timeline data
- [ ] `Frames created: 0` - No frames created
- [ ] `features: 0` - Missing features

### ❌ Error Signs
- [ ] Red error in console
- [ ] Network error in DevTools
- [ ] Error message on screen

---

## Key Data Points to Note

### Alert Structure
```typescript
{
  id: string                    // Unique alert ID
  event: string                 // "Tornado Warning", "Severe Warning", etc.
  headline: string              // Human-readable headline
  countyId: string              // FIPS code (5 digits)
  status: string                // "new", "unchanged", "updated", "expired"
  areaDesc: string              // "County, State"
  properties: object            // Additional properties
}
```

### County ID Format
- Should be 5-digit FIPS code
- Examples: "48001", "40001", "20001"
- Used to match with counties.json

### Timeline Entry Format
```typescript
{
  timestamp: string             // ISO 8601 timestamp
  changes: Record<string, string> // Alert ID → status changes
}
```

---

## Troubleshooting

### No console output appearing?
1. Make sure you're on **RealDataLastHour** story
2. Wait for page to fully load
3. Check if there's an error message
4. Refresh the page

### API response is empty?
1. Check `success: true`
2. Check `alerts` object has entries
3. Check `timeline` array has entries
4. API may not have data for last hour

### County IDs don't match?
1. Look at `countyId` field in alerts
2. Compare with mock data (48001, 40001, 20001)
3. Check if format is 5-digit FIPS code
4. May need to adjust parsing logic

### Network error?
1. Check API endpoint is accessible
2. Check DevTools Network tab
3. Look for CORS errors
4. Check API server status

---

## Copying the Response

### Copy Full JSON
1. Right-click on JSON in console
2. Select "Copy object"
3. Paste into text editor

### Save Console Output
1. Right-click in console
2. Select "Save as..."
3. Save to file

### Export as JSON
```javascript
// In console, run:
copy(JSON.stringify(apiResponse, null, 2))
// Then paste into file
```

---

## Next Steps

1. **Load RealDataLastHour** story
2. **Open browser console** (F12)
3. **Review complete API response**
4. **Check for:**
   - Success status
   - Number of alerts
   - Timeline entries
   - County ID format
   - Alert event types
5. **Compare with mock data** structure
6. **Identify any issues** with data format

---

## Related Documentation

- `API_RESPONSE_DUMP_GUIDE.md` - Detailed guide
- `MOCK_DATA_STRUCTURE.md` - Mock data examples
- `DATA_FLOW_TRACE.md` - Data transformation steps
- `DEBUGGING_QUICK_START.md` - General debugging

