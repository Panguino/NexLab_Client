# Hurricane Visualization Enhancement Strategy

## Current Data Available (Tropical Products JSON)

### 1. **Cone of Uncertainty** (`cone`)
- Array of [lon, lat] coordinate pairs forming a polygon
- Represents forecast uncertainty boundary
- **Current Use**: Could be rendered as a semi-transparent polygon overlay
- **Enhancement**: Add gradient fill (darker at center, lighter at edges) to show confidence levels

### 2. **Forecast Track** (`pts`)
- **stormname**: "Hurricane Melissa"
- **advisnum**: Advisory number (25A)
- **init_mslp**: Initial pressure (906 mb - very intense)
- **init_speed**: Forward speed (3 knots - slow moving)
- **init_dir**: Direction (270° - westward)
- **datetime_str**: Forecast times (9 points, 12-24 hr intervals)
- **stormtype**: Array of classifications (MH=Major Hurricane, HU=Hurricane, STS=Subtropical)
- **ss**: Saffir-Simpson categories [5,5,5,3,2,2,2,1,0]
- **position**: 9 forecast points
- **maxwind**: Wind speeds (150 knots peak)
- **gust**: Gust speeds (175 knots peak)

### 3. **Watches & Warnings** (`ww`)
- **HWA**: Hurricane Warning Areas (active threat zones)
- **TWA**: Tropical Storm Warning Areas
- **TWR**: Tropical Storm Watch
- **HWR**: Hurricane Watch
- Each has polygon coordinates defining affected areas

### 4. **Arrival Time Estimates** (`atea` & `atml`)
- **lines**: Time-labeled contours showing when tropical-storm-force winds arrive
  - Keys: "Tue 8 pm", "Wed 2 am", "Wed 8 am", "Wed 8 pm", "Thu 8 am", "Thu 8 pm", "Fri 8 am", "Fri 8 pm"
  - "Wind Speed Probability 5% contour" - outer boundary
- **markers**: Label positions with rotation angles
- **timezone**: EDT

### 5. **Best Track** (`bestTrack`)
- Complete historical record from genesis to current time
- Keyed by datetime (YYYYMMDDHHMM format)
- Shows evolution: Genesis035 → Invest → Melissa (named)
- Includes: stormname, stormtype, ss, position, intensity, mslp

---

## Proposed Enhancements

### **Phase 1: Core Visualization Improvements**

#### 1.1 **Enhanced Forecast Track Display**
- **Current**: Simple line connecting forecast points
- **Proposed**:
  - Color-code by Saffir-Simpson category:
    - Red: Category 5 (150+ knots)
    - Orange: Category 4 (130-149 knots)
    - Yellow: Category 3 (111-129 knots)
    - Light Blue: Category 2 (96-110 knots)
    - Cyan: Category 1 (83-95 knots)
    - Gray: Tropical Storm (39-73 knots)
  - Animated dots at each forecast point showing:
    - Wind speed (size of dot)
    - Pressure (tooltip on hover)
    - Time label
  - Thicker line for higher intensity

#### 1.2 **Cone of Uncertainty Enhancement**
- **Current**: Static polygon
- **Proposed**:
  - Gradient fill: darker center → lighter edges
  - Semi-transparent (40-60% opacity)
  - Animated pulse effect to draw attention
  - Hover tooltip showing "Forecast Uncertainty Zone"

#### 1.3 **Watch/Warning Polygons**
- **Current**: Not visualized
- **Proposed**:
  - HWA (Hurricane Warning): Red fill, 30% opacity
  - TWA (Tropical Storm Warning): Orange fill, 25% opacity
  - HWR (Hurricane Watch): Red outline, dashed, no fill
  - TWR (Tropical Storm Watch): Orange outline, dashed, no fill
  - Hover shows affected areas and warning type

#### 1.4 **Arrival Time Contours**
- **Current**: Not visualized
- **Proposed**:
  - Render `atea` lines with time labels
  - Color gradient: earliest (red) → latest (blue)
  - Animated sweep effect showing progression
  - Markers with rotated time labels
  - "Wind Speed Probability 5% contour" as outer boundary (dashed line)

#### 1.5 **Best Track (Historical Path)**
- **Current**: Not visualized
- **Proposed**:
  - Thin gray line showing past positions
  - Dots at 6-hour intervals
  - Color transition: Genesis → Invest → Named → Current
  - Opacity increases toward current position
  - Shows storm evolution clearly

---

### **Phase 2: Interactive Features**

#### 2.1 **Timeline Scrubber**
- Scrub through forecast points
- Show cone, warnings, and arrival times for selected time
- Display forecast details (wind, pressure, location)

#### 2.2 **Forecast Point Details**
- Click forecast point to show:
  - Time
  - Position (lat/lon)
  - Wind speed (sustained + gust)
  - Pressure
  - Saffir-Simpson category
  - Storm type

#### 2.3 **Legend & Controls**
- Toggle layers:
  - ☑ Forecast Track
  - ☑ Cone of Uncertainty
  - ☑ Watches & Warnings
  - ☑ Arrival Times
  - ☑ Best Track
- Color legend for categories

---

### **Phase 3: Animation & Performance**

#### 3.1 **Animated Forecast Progression**
- Play button to animate forecast points moving along track
- Shows cone expanding as uncertainty grows
- Warnings/watches appear as storm approaches

#### 3.2 **Performance Optimization**
- Use DeckGL layers for efficient rendering
- Simplify polygon geometries for large datasets
- Lazy-load arrival time contours (many coordinate pairs)

---

## Implementation Priority

1. **High Priority** (Core visualization):
   - Forecast track with color-coding by intensity
   - Cone of uncertainty with gradient
   - Watch/warning polygons
   - Best track historical path

2. **Medium Priority** (Enhanced interactivity):
   - Arrival time contours
   - Forecast point details on hover/click
   - Layer toggle controls

3. **Low Priority** (Polish):
   - Animated progression
   - Advanced styling effects
   - Performance micro-optimizations

---

## Data Structure for Implementation

```typescript
interface HurricaneData {
  cone: [number, number][]
  pts: {
    stormname: string
    advisnum: string
    init_mslp: number
    init_speed: number
    init_dir: number
    datetime_str: string[]
    stormtype: string[]
    ss: number[]
    position: [number, number][]
    maxwind: number[]
    gust: number[]
  }
  ww: Array<{
    type: 'HWA' | 'TWA' | 'HWR' | 'TWR'
    xy: [number, number][]
  }>
  atea: {
    lines: Record<string, [number, number][]>
    markers: Array<{
      lbl: string
      xy: [number, number]
      rotate: number
    }>
    timezone: string
  }
  atml: { /* same as atea */ }
  bestTrack: Record<string, {
    stormname: string
    stormtype: string
    ss: number
    position: [number, number]
    intensity: number
    mslp: number
  }>
}
```

---

## Next Steps

1. Create data fetching utility for tropical products JSON
2. Implement forecast track layer with intensity-based coloring
3. Add cone of uncertainty visualization
4. Implement watch/warning polygon rendering
5. Add interactive tooltips and details panel
6. Integrate with existing AnimatorMapMachine component
7. Create Storybook story for hurricane visualization

