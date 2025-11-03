# Animator Component Documentation

## Overview

The **Animator** component is a comprehensive, feature-rich animation player for displaying sequences of images (frames) with advanced controls, overlays, zoom capabilities, and interactive features. It's designed to handle weather data visualization, satellite imagery, radar data, and other time-series image sequences.

## Architecture

### Component Hierarchy

```
Animator (Context Provider)
├── AnimatorLayout
│   ├── AnimatorImageSizer
│   │   ├── TransformWrapper (react-zoom-pan-pinch)
│   │   │   ├── AnimatorImageMachine (main frames)
│   │   │   ├── AnimatorImageMachine (overlay layers)
│   │   │   ├── Overlay Markers
│   │   │   └── ImageControls
│   │   └── DataTooltip
│   └── AnimatorControls
│       ├── RunSelector
│       ├── Scrubber
│       └── BasicPlaybackControls
```

### Core Components

#### **Animator** (Main Component)
- **File**: `Animator.tsx`
- **Purpose**: Root component that provides context to all child components
- **Key Features**:
  - Creates AnimatorContext for state management
  - Manages playback state (isPlaying, currentFrame)
  - Manages loaded frames cache
  - Provides all props to child components via context

#### **AnimatorLayout**
- **File**: `AnimatorLayout/AnimatorLayout.tsx`
- **Purpose**: Main layout wrapper
- **Responsibilities**: Arranges image display and controls

#### **AnimatorImageSizer**
- **File**: `AnimatorImageSizer/AnimatorImageSizer.tsx`
- **Purpose**: Handles image sizing, zoom, pan, and click-through interactions
- **Key Features**:
  - Responsive sizing based on aspect ratio
  - Zoom and pan using react-zoom-pan-pinch
  - Soundings picker mode for interactive selection
  - Overlay rendering
  - Data tooltip positioning

#### **AnimatorImageMachine**
- **File**: `AnimatorImageMachine/AnimatorImageMachine.tsx`
- **Purpose**: Renders image frames with opacity-based transitions
- **Key Features**:
  - Lazy loads frames
  - Caches frames in localStorage
  - Manages frame loading states
  - Handles opacity calculations for smooth transitions

#### **AnimatorControls**
- **File**: `AnimatorControls/AnimatorControls.tsx`
- **Purpose**: Playback and navigation controls
- **Sub-components**:
  - **RunSelector**: Dropdown for selecting different model runs
  - **Scrubber**: Timeline scrubber with frame labels
  - **BasicPlaybackControls**: Play/pause, step, loop controls

#### **ImageControls**
- **File**: `ImageControls/ImageControls.tsx`
- **Purpose**: Image manipulation controls
- **Features**:
  - Zoom in/out buttons
  - Reset zoom
  - Expand/compress toggle
  - Fullscreen toggle
  - Overlay panel toggle
  - Soundings picker toggle
  - PDF button

#### **DataTooltip**
- **File**: `DataTooltip/DataTooltip.tsx`
- **Purpose**: Displays data values on hover
- **Features**:
  - Shows pixel coordinates
  - Displays lat/lon (if sectorId provided)
  - Shows forecast readout data
  - Smart positioning to avoid edges

#### **OverlayPanel**
- **File**: `OverlayPanel/OverylayPanel.tsx`
- **Purpose**: Modal for selecting active overlays
- **Features**: Toggle visibility of overlay layers

#### **RunSelector**
- **File**: `RunSelector/RunSelector.tsx`
- **Purpose**: Dropdown selector for model runs
- **Features**: Groups runs by date, customizable grid layout

## Props Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frames` | `string[]` | **Required** | Array of image URLs to animate |
| `imageInfo` | `{ width: number; height: number }` | **Required** | Dimensions of the images |
| `interval` | `number` | `200` | Milliseconds between frames during playback |
| `autoPlay` | `boolean` | `false` | Start animation automatically |
| `startFrame` | `number` | `frames.length - 1` | Initial frame index |

### Display Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `number` | undefined | Fixed height in pixels |
| `width` | `number` | undefined | Fixed width in pixels |
| `hideControls` | `boolean` | `false` | Hide all control panels |
| `hideZoomControls` | `boolean` | `false` | Hide zoom buttons |
| `disableZoom` | `boolean` | `false` | Disable zoom functionality |

### Playback Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lastFrameDwell` | `boolean` | `true` | Pause on last frame |
| `lastFrameDwellTime` | `number` | `1000` | Milliseconds to pause on last frame |

### Zoom & Pan Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `zoomFill` | `boolean` | `true` | Fill container with image |
| `initialZoomState` | `zoomState` | `{ scale: 1, positionX: 0, positionY: 0, previousScale: 1 }` | Initial zoom/pan state |
| `fullScreen` | `boolean` | `false` | Fullscreen mode |
| `setZoomState` | `(state: zoomState) => void` | no-op | Callback for zoom state changes |
| `setZoomFill` | `(fill: boolean) => void` | no-op | Callback for zoom fill toggle |
| `setFullScreen` | `(fullScreen: boolean) => void` | no-op | Callback for fullscreen toggle |

### Overlay Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `overlays` | `{ static: object; dynamic: object }` | undefined | Overlay layer definitions |
| `activeOverlays` | `string[]` | undefined | Currently visible overlay keys |
| `setActiveOverlays` | `(overlays: string[]) => void` | no-op | Callback for overlay changes |
| `overlayMarkers` | `{ xPercent: number; yPercent: number }[]` | `[]` | Simple marker positions |

### Run Selection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `runs` | `{ value: string; label: string }[] \| null` | undefined | Available model runs |
| `activeRun` | `string` | undefined | Currently selected run |
| `setActiveRun` | `(run: string) => void` | no-op | Callback for run selection |
| `runsPerRow` | `number` | `4` | Grid columns in run selector |

### Scrubber Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrubberPlaceholderImageUrl` | `string` | undefined | URL for unloaded frame placeholder |
| `scrubberFrameLoadStates` | `boolean[]` | undefined | Load state for each frame |
| `frameLabels` | `string[]` | undefined | Labels for each frame |
| `displayAllLabels` | `boolean` | `true` | Show all labels or only active |
| `frameValidTimes` | `number[]` | undefined | Valid times for each frame |
| `setFrameValidTime` | `(time: number) => void` | no-op | Callback for valid time changes |

### Readout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableReadouts` | `boolean` | `false` | Enable data readout on hover |
| `frameReadoutData` | `any` | undefined | Current frame's readout data |
| `isLoadingReadoutData` | `boolean` | undefined | Loading state for readout |
| `requestReadoutData` | `(frameIndex: number) => void` | no-op | Request data for frame |
| `sectorId` | `string` | undefined | Sector for lat/lon conversion |

### Soundings Picker Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `soundingsPicker` | `boolean` | `false` | Show soundings picker button |
| `soundingsPickerMode` | `boolean` | `false` | Enable click-through mode |
| `soundingsPickerDisabled` | `boolean` | `false` | Disable picker functionality |
| `setSoundingsPickerMode` | `(mode: boolean) => void` | no-op | Toggle picker mode |
| `onSoundingsClickthrough` | `(event: { xPercent: number; yPercent: number }) => void` | no-op | Handle picker clicks |

### PDF Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pdfs` | `string[]` | `[]` | PDF URLs for each frame |
| `pdfButtonClick` | `(url: string) => void` | no-op | Handle PDF button click |

### Callback Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFrameUpdate` | `(frameIndex: number) => void` | no-op | Called when frame changes |
| `settingsComponent` | `React.ReactNode \| null` | `null` | Custom settings component |

## Context API

The `useAnimator()` hook provides access to all animator state and functions:

```typescript
const animator = useAnimator()
// Access: animator.currentFrame, animator.isPlaying, animator.frames, etc.
```

## Usage Examples

See `Animator.stories.tsx` for comprehensive examples including:
- Basic autoplay
- Responsive sizing
- Specific aspect ratios
- Overlays
- Scrubber with frame states
- Frame labels
- Soundings picker
- PDF functionality

