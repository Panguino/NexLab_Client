# Easing Animation Refactor - requestAnimationFrame with Delta-Based Timing

## Overview
Refactored the zoom button easing animation in `AnimatorMapSizer` to use `requestAnimationFrame` with delta-based timing instead of fixed 60FPS `setInterval`. This improves performance on low-end devices by adapting to the system's actual rendering capabilities.

## Changes Made

### File Modified
- **src/components/elements/Animator/AnimatorMapSizer/AnimatorMapSizer.tsx**

### Key Changes

#### 1. Configuration Constants (Lines 27-29)
**Before:**
```typescript
const EASING_FACTOR = 0.2 // How much of the distance to cover per frame
const ANIMATION_THRESHOLD = 0.005
const ANIMATION_FRAME_RATE = 16 // ms between animation updates (~60fps)
```

**After:**
```typescript
const EASING_DURATION = 500 // Duration of easing animation in milliseconds
const ANIMATION_THRESHOLD = 0.005
```

#### 2. Animation State Refs (Lines 56-61)
**Added:**
- `animationStartTimeRef`: Tracks when animation started (for delta calculation)
- `animationStartStateRef`: Stores initial view state for interpolation

#### 3. Animation Loop Implementation (Lines 94-172)
**Before:** Used `setInterval` with fixed 16ms timing
**After:** Uses `requestAnimationFrame` with:
- Delta-based timing: `elapsed = currentTime - startTime`
- Progress calculation: `progress = Math.min(elapsed / EASING_DURATION, 1)`
- Easing function: Ease-out cubic for smooth deceleration
- Performance-independent animation that adapts to device capabilities

### Technical Details

#### Delta-Based Timing
```typescript
const elapsed = currentTime - startTime
const progress = Math.min(elapsed / EASING_DURATION, 1)
const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease-out cubic
```

#### Benefits
1. **Performance Adaptive**: Automatically adjusts to device's refresh rate
2. **Mobile Friendly**: Won't stall or tank performance on low-end devices
3. **Smooth Animation**: Uses ease-out cubic easing for natural deceleration
4. **Predictable Duration**: Animation always takes 500ms regardless of frame rate
5. **No Frame Rate Dependency**: Works at 30fps, 60fps, 120fps, etc.

### Unaffected Functionality
✅ Mouse wheel zoom - Direct updates (no easing)
✅ Click and pan interactions - Direct updates (no easing)
✅ Zoom in/out button easing - **REFACTORED** (now delta-based)
✅ Reset view button easing - **REFACTORED** (now delta-based)

## Testing Instructions

### Manual Testing in Storybook

1. **Start Storybook:**
   ```bash
   npm run storybook
   ```

2. **Navigate to:** `Elements/Animator/AnimatorMapSizer`

3. **Test Stories:**
   - **BasicMapAnimator**: Click zoom in/out buttons, verify smooth easing
   - **MultipleRegions**: Test easing with different regions
   - **AutoPlayMap**: Verify easing doesn't interfere with frame playback
   - **ZoomDisabled**: Verify zoom controls are hidden
   - **ControlsHidden**: Verify all controls are hidden
   - **WithFrameLabels**: Verify easing works with frame labels

4. **Test Cases:**
   - ✅ Click zoom in button - should smoothly zoom in over ~500ms
   - ✅ Click zoom out button - should smoothly zoom out over ~500ms
   - ✅ Click reset view button - should smoothly return to default view
   - ✅ Rapid button clicks - should queue animations smoothly
   - ✅ Mouse wheel scroll - should zoom immediately (no easing)
   - ✅ Click and drag - should pan immediately (no easing)
   - ✅ Mobile device testing - should not stall or tank performance

### Performance Testing

1. **Desktop (Chrome DevTools):**
   - Open DevTools → Performance tab
   - Record while clicking zoom buttons
   - Verify consistent frame rate (no drops)

2. **Mobile Device:**
   - Test on low-end Android device
   - Verify smooth animation without stuttering
   - Check that other interactions remain responsive

3. **Browser Compatibility:**
   - Chrome/Edge 90+
   - Firefox 88+
   - Safari 14+
   - Mobile browsers with requestAnimationFrame support

## Code Quality

### Linting Status
✅ **PASSED** - All ESLint rules compliant
- No TypeScript errors
- No unused variables
- Proper type annotations

### Type Safety
- `animationFrameRef`: `useRef<number | null>` (requestAnimationFrame ID)
- `animationStartTimeRef`: `useRef<number | null>` (DOMHighResTimeStamp)
- `animationStartStateRef`: `useRef<MapViewState | null>` (initial state)

## Configuration

### Adjustable Parameters
```typescript
const EASING_DURATION = 500 // Adjust animation speed (ms)
const ANIMATION_THRESHOLD = 0.005 // Adjust snap-to-target sensitivity
```

To make animations faster: Decrease `EASING_DURATION` (e.g., 300ms)
To make animations slower: Increase `EASING_DURATION` (e.g., 800ms)

## Deployment Notes

⚠️ **NOT YET COMMITTED** - Awaiting review and testing

### Next Steps
1. ✅ Code refactoring complete
2. ✅ Linting tests passed
3. ⏳ Manual testing in Storybook (in progress)
4. ⏳ Code review
5. ⏳ Merge to development branch

### Rollback Plan
If issues arise, revert to commit before this change using:
```bash
git revert <commit-hash>
```

## Related Files
- `src/components/elements/Animator/AnimatorMapSizer/AnimatorMapSizer.stories.tsx` - Storybook stories
- `src/components/elements/Animator/AnimatorMapMachine/AnimatorMapMachine.tsx` - Map rendering component
- `src/components/elements/Animator/ViewControls/ViewControls.tsx` - Control buttons

