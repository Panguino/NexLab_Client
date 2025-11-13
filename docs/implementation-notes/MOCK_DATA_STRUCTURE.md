# Mock County Alerts Data Structure

## Complete Mock Data Example

### Frame 1: Few Alerts (2 counties with alerts)

```typescript
{
  id: 'frame-0',
  timestamp: Date('2025-10-23T14:30:00.000Z'),
  data: {
    type: 'FeatureCollection',
    features: [
      // County 01001 (Alabama) - NO ALERT
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
      // ... 3,140 more counties without alerts ...
      
      // County 48001 (Texas) - TORNADO WARNING
      {
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [...] },
        properties: {
          id: '48001',
          name: 'Anderson County',
          alertColor: [255, 0, 0, 255],  // RED - Tornado Warning
          hasAlert: true,
          alerts: [
            {
              event: 'Tornado Warning',
              headline: 'Tornado Warning for Anderson County'
            }
          ]
        }
      },
      
      // County 40001 (Oklahoma) - SEVERE WATCH
      {
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [...] },
        properties: {
          id: '40001',
          name: 'Adair County',
          alertColor: [50, 150, 255, 255],  // LIGHT BLUE - Severe Watch
          hasAlert: true,
          alerts: [
            {
              event: 'Severe Thunderstorm Watch',
              headline: 'Severe Watch for Adair County'
            }
          ]
        }
      }
    ]
  },
  metadata: {
    frameNumber: 1,
    totalFrames: 4,
    alertCount: 2
  }
}
```

### Frame 2: More Alerts (3 counties with alerts)

```typescript
{
  id: 'frame-1',
  timestamp: Date('2025-10-23T15:30:00.000Z'),
  data: {
    type: 'FeatureCollection',
    features: [
      // ... 3,140 counties without alerts ...
      
      // County 48001 (Texas) - TORNADO WARNING (still active)
      {
        properties: {
          id: '48001',
          alertColor: [255, 0, 0, 255],  // RED
          hasAlert: true,
          alerts: [{ event: 'Tornado Warning', ... }]
        }
      },
      
      // County 40001 (Oklahoma) - SEVERE WARNING (escalated from watch)
      {
        properties: {
          id: '40001',
          alertColor: [0, 100, 225, 255],  // BLUE - Severe Warning
          hasAlert: true,
          alerts: [{ event: 'Severe Thunderstorm Warning', ... }]
        }
      },
      
      // County 20001 (Kansas) - FIRE ADVISORY (new)
      {
        properties: {
          id: '20001',
          alertColor: [232, 100, 0, 255],  // DARK ORANGE - Fire Advisory
          hasAlert: true,
          alerts: [{ event: 'Fire Weather Advisory', ... }]
        }
      }
    ]
  },
  metadata: {
    frameNumber: 2,
    totalFrames: 4,
    alertCount: 3
  }
}
```

### Frame 3: Alerts Clearing (2 counties with alerts)

```typescript
{
  id: 'frame-2',
  timestamp: Date('2025-10-23T16:30:00.000Z'),
  data: {
    type: 'FeatureCollection',
    features: [
      // ... 3,141 counties without alerts ...
      
      // County 48001 (Texas) - TORNADO WATCH (downgraded from warning)
      {
        properties: {
          id: '48001',
          alertColor: [255, 100, 100, 255],  // LIGHT RED - Tornado Watch
          hasAlert: true,
          alerts: [{ event: 'Tornado Watch', ... }]
        }
      },
      
      // County 20001 (Kansas) - FIRE ADVISORY (still active)
      {
        properties: {
          id: '20001',
          alertColor: [232, 100, 0, 255],  // DARK ORANGE
          hasAlert: true,
          alerts: [{ event: 'Fire Weather Advisory', ... }]
        }
      }
    ]
  },
  metadata: {
    frameNumber: 3,
    totalFrames: 4,
    alertCount: 2
  }
}
```

### Frame 4: Most Alerts Cleared (1 county with alert)

```typescript
{
  id: 'frame-3',
  timestamp: Date('2025-10-23T17:30:00.000Z'),
  data: {
    type: 'FeatureCollection',
    features: [
      // ... 3,142 counties without alerts ...
      
      // County 20001 (Kansas) - FIRE ADVISORY (only remaining alert)
      {
        properties: {
          id: '20001',
          alertColor: [232, 100, 0, 255],  // DARK ORANGE
          hasAlert: true,
          alerts: [{ event: 'Fire Weather Advisory', ... }]
        }
      }
    ]
  },
  metadata: {
    frameNumber: 4,
    totalFrames: 4,
    alertCount: 1
  }
}
```

## Color Mapping

| Alert Type | Color | RGB |
|---|---|---|
| Tornado Warning | Red | [255, 0, 0, 255] |
| Tornado Watch | Light Red | [255, 100, 100, 255] |
| Severe Warning | Blue | [0, 100, 225, 255] |
| Severe Watch | Light Blue | [50, 150, 255, 255] |
| Fire Advisory | Dark Orange | [232, 100, 0, 255] |
| Winter Advisory | Cyan | [0, 180, 255, 255] |
| No Alert | Grey | [200, 200, 200, 100] |

## Key Points

1. **Total Features**: Each frame has 3,143 features (all US counties)
2. **Alert Counties**: Only 1-3 counties have alerts per frame
3. **Non-Alert Counties**: 3,140+ counties have grey color [200, 200, 200, 100]
4. **County IDs**: Format is FIPS code (5 digits), e.g., '48001', '40001', '20001'
5. **Timestamps**: Each frame is 1 hour apart
6. **Animation**: Shows alerts appearing, changing, and clearing over time

## What You Should See

When you load the **MockCountyAlerts** story:

1. **Map loads** with all US counties visible
2. **Counties are mostly grey** (no alerts)
3. **A few counties are colored** (with alerts):
   - Frame 1: Texas (red) and Oklahoma (light blue)
   - Frame 2: Texas (red), Oklahoma (blue), Kansas (orange)
   - Frame 3: Texas (light red), Kansas (orange)
   - Frame 4: Kansas (orange)
4. **Use scrubber** to navigate between frames
5. **Watch counties change color** as you move through frames
6. **Use play button** to auto-play through the animation

## Debugging Checklist

- [ ] Console shows "Total frames created: 4"
- [ ] Console shows "Frame features count: 3143"
- [ ] Console shows sample features with alertColor values
- [ ] Map displays all counties (mostly grey)
- [ ] Scrubber shows 4 frames
- [ ] Colored counties appear when you navigate frames
- [ ] Colors match the color mapping table above

