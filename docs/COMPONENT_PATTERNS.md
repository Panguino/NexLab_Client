# Component Patterns & State Management

## Component Architecture

### Directory Structure

```
src/components/
├── blocks/                    # Page-level components
│   ├── _animators/           # Weather data animation components
│   │   ├── ForecastAnimator/
│   │   ├── NexradAnimator/
│   │   ├── SatradAnimator/
│   │   ├── SoundingAnimator/
│   │   ├── UpperAirAnimator/
│   │   └── RAPMesoAnimator/
│   ├── PageBlocks/           # CMS content blocks
│   └── [FeatureBlocks]/      # Feature-specific blocks
├── elements/                 # Reusable UI components
│   ├── buttons/
│   ├── forms/
│   ├── selectors/
│   └── navigation/
├── layout/                   # Layout components
│   ├── Navigation/
│   ├── ScrollArea/
│   └── SidebarPanels/
└── providers/                # Context providers
    ├── AuthProvider/
    └── ThemeProvider/
```

### Component Hierarchy

#### Layout Components

**Purpose**: Structure and navigation for the entire application

```typescript
// Main layout pattern
const RootLayout = ({ children }) => (
  <html>
    <body>
      <AuthProvider>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </AuthProvider>
    </body>
  </html>
)
```

**Key Layout Components**:

-   **Navigation**: Main app navigation with weather data sections
-   **ScrollArea**: Custom scroll container with display table removal
-   **SidebarPanels**: Dynamic sidebar navigation for data sections

#### Block Components

**Purpose**: Page-level components that combine multiple elements

```typescript
// Weather page pattern
const WeatherPage = async ({ params }) => {
  const pageData = await getDataPageContent(pageId)

  return (
    <WeatherAnimator
      productInfo={{
        info: pageData.productInfo || pageData.SEO.metaTitle,
        image: pageData.ProductImage?.url,
        description: pageData.productDescription
      }}
    />
  )
}
```

**Common Block Patterns**:

-   **Weather Animators**: Display animated weather data
-   **Page Blocks**: CMS-driven content sections
-   **Dashboard Blocks**: User-specific content areas

#### Element Components

**Purpose**: Reusable UI primitives and weather-specific controls

```typescript
// Weather selector pattern
interface SelectorProps {
  value: string
  options: Array<{ id: string; name: string }>
  onChange: (value: string) => void
  label?: string
}

const WeatherSelector: React.FC<SelectorProps> = ({
  value,
  options,
  onChange,
  label
}) => (
  <div className={styles.selector}>
    {label && <label>{label}</label>}
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
)
```

## Weather Animator Patterns

### Base Animator Structure

```typescript
// Common pattern for all weather animators
interface WeatherAnimatorProps {
  productInfo: {
    info: string
    image?: string
    description?: string
  }
}

const WeatherAnimator: React.FC<WeatherAnimatorProps> = ({ productInfo }) => {
  const {
    selectedRegion,
    selectedProduct,
    selectedSite,
    animationSpeed,
    isPlaying,
    currentFrame
  } = useWeatherStore()

  const { data: frames, loading, error } = useWeatherData({
    region: selectedRegion,
    product: selectedProduct,
    site: selectedSite
  })

  return (
    <div className={styles.animator}>
      <WeatherControls />
      <WeatherDisplay
        frames={frames}
        currentFrame={currentFrame}
        loading={loading}
        error={error}
      />
      <WeatherInfo productInfo={productInfo} />
    </div>
  )
}
```

### NEXRAD Animator Pattern

```typescript
// src/components/blocks/_animators/NexradAnimator/NexradAnimator.tsx
const NexradAnimator: React.FC<WeatherAnimatorProps> = ({ productInfo }) => {
  const {
    selectedRegion,
    selectedProduct,
    selectedSite,
    setRegion,
    setProduct,
    setSite
  } = useRootStore()

  const { data: regions } = useQuery(GET_NEXRAD_REGIONS)
  const { data: products } = useQuery(GET_NEXRAD_PRODUCTS, {
    variables: { regionId: selectedRegion },
    skip: !selectedRegion
  })
  const { data: sites } = useQuery(GET_NEXRAD_SITES, {
    variables: { regionId: selectedRegion },
    skip: !selectedRegion
  })

  return (
    <div className={styles.nexradAnimator}>
      <div className={styles.selectors}>
        <RegionSelector
          value={selectedRegion}
          options={regions?.nexradRegions || []}
          onChange={setRegion}
        />
        <ProductSelector
          value={selectedProduct}
          options={products?.nexradProducts || []}
          onChange={setProduct}
        />
        <SiteSelector
          value={selectedSite}
          options={sites?.nexradSites || []}
          onChange={setSite}
        />
      </div>

      <WeatherAnimation
        type="nexrad"
        params={{ selectedRegion, selectedProduct, selectedSite }}
      />

      <ProductInfo info={productInfo} />
    </div>
  )
}
```

### Forecast Animator Pattern

```typescript
// src/components/blocks/_animators/ForecastAnimator/ForecastAnimator.tsx
const ForecastAnimator: React.FC<WeatherAnimatorProps> = ({ productInfo }) => {
  const {
    selectedModel,
    selectedLevel,
    selectedProduct,
    selectedRun,
    setModel,
    setLevel,
    setProduct,
    setRun
  } = useRootStore()

  return (
    <div className={styles.forecastAnimator}>
      <div className={styles.modelControls}>
        <ModelSelector
          value={selectedModel}
          onChange={setModel}
        />
        <RunSelector
          value={selectedRun}
          onChange={setRun}
        />
      </div>

      <div className={styles.dataControls}>
        <LevelSelector
          value={selectedLevel}
          onChange={setLevel}
        />
        <ProductSelector
          value={selectedProduct}
          onChange={setProduct}
        />
      </div>

      <ForecastAnimation
        model={selectedModel}
        run={selectedRun}
        level={selectedLevel}
        product={selectedProduct}
      />
    </div>
  )
}
```

## State Management with Zustand

### Store Architecture

```typescript
// Combined store interface
interface IGlobalStore
	extends IHazardsSlice,
		ISectorSelectorPanelSlice,
		INexradSlice,
		ISatradSlice,
		IForecastSlice,
		IAnalysisSlice,
		IUpperAirSlice,
		ISurfaceSlice {
	// Global state methods
	reset: () => void
}
```

### Slice Patterns

Each weather data type follows a consistent slice pattern:

```typescript
// Example: NEXRAD slice
interface INexradSlice {
	// Selection state
	selectedRegion: string
	selectedSector: string
	selectedProduct: string
	selectedSite: string

	// Animation state
	animationSpeed: number
	isPlaying: boolean
	currentFrame: number

	// UI state
	showControls: boolean
	opacity: number

	// Actions
	setRegion: (region: string) => void
	setSector: (sector: string) => void
	setProduct: (product: string) => void
	setSite: (site: string) => void

	// Animation actions
	play: () => void
	pause: () => void
	setSpeed: (speed: number) => void
	setFrame: (frame: number) => void

	// UI actions
	toggleControls: () => void
	setOpacity: (opacity: number) => void
}

// Slice implementation
const createNexradSlice: StateCreator<INexradSlice> = (set, get) => ({
	// Initial state
	selectedRegion: 'CONUS',
	selectedSector: '',
	selectedProduct: 'N0B',
	selectedSite: 'LOT',
	animationSpeed: 500,
	isPlaying: false,
	currentFrame: 0,
	showControls: true,
	opacity: 1,

	// Actions
	setRegion: (region) => set({ selectedRegion: region }),
	setSector: (sector) => set({ selectedSector: sector }),
	setProduct: (product) => set({ selectedProduct: product }),
	setSite: (site) => set({ selectedSite: site }),

	play: () => set({ isPlaying: true }),
	pause: () => set({ isPlaying: false }),
	setSpeed: (speed) => set({ animationSpeed: speed }),
	setFrame: (frame) => set({ currentFrame: frame }),

	toggleControls: () => set((state) => ({ showControls: !state.showControls })),
	setOpacity: (opacity) => set({ opacity }),
})
```

### Store Usage in Components

```typescript
// Hook pattern for accessing store
const WeatherComponent = () => {
  const {
    selectedRegion,
    selectedProduct,
    setRegion,
    setProduct
  } = useRootStore()

  return (
    <div>
      <RegionSelector
        value={selectedRegion}
        onChange={setRegion}
      />
      <ProductSelector
        value={selectedProduct}
        onChange={setProduct}
      />
    </div>
  )
}

// Optimized selector for performance
const useNexradSelections = () => {
  return useRootStore(
    useCallback(
      (state) => ({
        selectedRegion: state.selectedRegion,
        selectedProduct: state.selectedProduct,
        selectedSite: state.selectedSite,
      }),
      []
    ),
    shallow
  )
}
```

### State Persistence

```typescript
// Persist weather selections across sessions
const useRootStore = create<IGlobalStore>()(
	persist(
		(set, get) => ({
			...createNexradSlice(set, get),
			...createSatradSlice(set, get),
			...createForecastSlice(set, get),
			// ... other slices

			reset: () =>
				set({
					// Reset to initial state
					selectedRegion: 'CONUS',
					selectedProduct: 'N0B',
					// ... other defaults
				}),
		}),
		{
			name: 'nexlab-weather-store',
			partialize: (state) => ({
				// Only persist user selections, not UI state
				selectedRegion: state.selectedRegion,
				selectedProduct: state.selectedProduct,
				selectedSite: state.selectedSite,
				selectedModel: state.selectedModel,
				selectedLevel: state.selectedLevel,
				// ... other selections
			}),
		},
	),
)
```

## Animation Control Patterns

### Reusable Animation Hook

```typescript
// Reusable animation hook
const useWeatherAnimation = (frames: string[], speed: number) => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const intervalRef = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (!isPlaying || frames.length === 0) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
			return
		}

		intervalRef.current = setInterval(() => {
			setCurrentFrame((prev) => (prev + 1) % frames.length)
		}, speed)

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
			}
		}
	}, [isPlaying, frames.length, speed])

	return {
		currentFrame,
		isPlaying,
		play: () => setIsPlaying(true),
		pause: () => setIsPlaying(false),
		setFrame: setCurrentFrame,
		totalFrames: frames.length,
	}
}
```

### Animation Controls Component

```typescript
// Reusable animation controls
interface AnimationControlsProps {
  isPlaying: boolean
  currentFrame: number
  totalFrames: number
  speed: number
  onPlay: () => void
  onPause: () => void
  onFrameChange: (frame: number) => void
  onSpeedChange: (speed: number) => void
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  isPlaying,
  currentFrame,
  totalFrames,
  speed,
  onPlay,
  onPause,
  onFrameChange,
  onSpeedChange,
}) => (
  <div className={styles.controls}>
    <button onClick={isPlaying ? onPause : onPlay}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>

    <input
      type="range"
      min={0}
      max={totalFrames - 1}
      value={currentFrame}
      onChange={(e) => onFrameChange(parseInt(e.target.value))}
      className={styles.frameSlider}
    />

    <select
      value={speed}
      onChange={(e) => onSpeedChange(parseInt(e.target.value))}
      className={styles.speedSelector}
    >
      <option value={100}>Fast</option>
      <option value={500}>Normal</option>
      <option value={1000}>Slow</option>
    </select>

    <span className={styles.frameCounter}>
      {currentFrame + 1} / {totalFrames}
    </span>
  </div>
)
```

## Responsive Design Patterns

### Breakpoint Strategy

```scss
// Mobile-first responsive design
.component {
	// Mobile (default)
	padding: 16px;
	font-size: 14px;

	@media (min-width: 768px) {
		// Tablet
		padding: 24px;
		font-size: 16px;
	}

	@media (min-width: 1024px) {
		// Desktop
		padding: 32px;
		font-size: 18px;
	}

	@media (min-width: 1440px) {
		// Large desktop
		padding: 40px;
		font-size: 20px;
	}
}

// Weather-specific responsive patterns
.weatherAnimator {
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		flex-direction: row;

		.controls {
			width: 300px;
			flex-shrink: 0;
		}

		.display {
			flex: 1;
			min-width: 0;
		}
	}
}
```

### Responsive Weather Components

```typescript
// Responsive weather display
const ResponsiveWeatherDisplay = ({ frames, currentFrame }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={styles.weatherDisplay}>
      {isMobile ? (
        <MobileWeatherView
          frame={frames[currentFrame]}
        />
      ) : (
        <DesktopWeatherView
          frame={frames[currentFrame]}
          showDetails={true}
        />
      )}
    </div>
  )
}
```

## Styling Patterns

### SCSS Module Structure

```scss
// Component.module.scss
.component {
	// Use CSS variables for theming
	background-color: var(--color-background-primary);
	color: var(--color-text-primary);

	// BEM-style modifiers
	&.variant {
		background-color: var(--color-background-secondary);
	}

	// Nested elements
	.title {
		font-size: var(--font-size-large);
		font-weight: var(--font-weight-bold);
	}

	.content {
		margin-top: var(--spacing-medium);
	}
}

// Weather-specific styling patterns
.weatherAnimator {
	--weather-control-height: 60px;
	--weather-sidebar-width: 300px;

	.controls {
		height: var(--weather-control-height);
		background: var(--color-surface-elevated);
		border-radius: var(--border-radius-medium);
	}

	.display {
		min-height: calc(100vh - var(--weather-control-height) - var(--spacing-large));
	}
}
```

### Theme Integration

```typescript
// Theme-aware components
const ThemedWeatherComponent = () => {
  const { theme } = useTheme()

  return (
    <div
      className={`${styles.component} ${styles[theme]}`}
      data-theme={theme}
    >
      <WeatherContent />
    </div>
  )
}
```

## Error Handling Patterns

### Weather Data Error Boundaries

```typescript
class WeatherErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Weather component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorState}>
          <h3>Weather data temporarily unavailable</h3>
          <p>Please try refreshing or selecting a different region.</p>
          <button onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Usage in weather animators
const WeatherAnimator = ({ children }) => (
  <WeatherErrorBoundary>
    {children}
  </WeatherErrorBoundary>
)
```

### Loading States

```typescript
// Consistent loading patterns
const WeatherLoadingStates = {
  Skeleton: () => (
    <div className={styles.skeleton}>
      <div className={styles.skeletonControls} />
      <div className={styles.skeletonDisplay} />
    </div>
  ),

  Spinner: ({ message = 'Loading weather data...' }) => (
    <div className={styles.spinner}>
      <div className={styles.spinnerIcon} />
      <p>{message}</p>
    </div>
  ),

  Progress: ({ progress, total }) => (
    <div className={styles.progress}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${(progress / total) * 100}%` }}
        />
      </div>
      <p>Loading frame {progress} of {total}</p>
    </div>
  ),
}
```

## Testing Patterns

### Component Testing

```typescript
// Test weather components
import { render, screen, fireEvent } from '@testing-library/react'
import { WeatherSelector } from './WeatherSelector'

describe('WeatherSelector', () => {
  const mockOptions = [
    { id: 'option1', name: 'Option 1' },
    { id: 'option2', name: 'Option 2' },
  ]

  it('renders options correctly', () => {
    render(
      <WeatherSelector
        value="option1"
        options={mockOptions}
        onChange={jest.fn()}
      />
    )

    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument()
  })

  it('calls onChange when selection changes', () => {
    const mockOnChange = jest.fn()

    render(
      <WeatherSelector
        value="option1"
        options={mockOptions}
        onChange={mockOnChange}
      />
    )

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'option2' }
    })

    expect(mockOnChange).toHaveBeenCalledWith('option2')
  })
})
```

### Store Testing

```typescript
// Test Zustand stores
import { renderHook, act } from '@testing-library/react'
import { useRootStore } from './store'

describe('Weather Store', () => {
	beforeEach(() => {
		useRootStore.getState().reset()
	})

	it('updates region selection', () => {
		const { result } = renderHook(() => useRootStore())

		act(() => {
			result.current.setRegion('WEST')
		})

		expect(result.current.selectedRegion).toBe('WEST')
	})

	it('persists selections', () => {
		const { result } = renderHook(() => useRootStore())

		act(() => {
			result.current.setRegion('EAST')
			result.current.setProduct('N0Q')
		})

		// Simulate page reload
		const newStore = renderHook(() => useRootStore())

		expect(newStore.result.current.selectedRegion).toBe('EAST')
		expect(newStore.result.current.selectedProduct).toBe('N0Q')
	})
})
```

## Related Documentation

-   **[Weather Data Architecture](./WEATHER_DATA_ARCHITECTURE.md)** - Data structures used in components
-   **[Coding Standards](./CODING_STANDARDS.md)** - File naming and organization
-   **[Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)** - Component optimization strategies
-   **[API Integration](./API_INTEGRATION.md)** - Data fetching patterns

## AI Assistant Context

When working with components in this codebase:

1. **Weather animators** follow consistent props and state patterns
2. **State management** uses Zustand with weather-specific slices
3. **Responsive design** is mobile-first with specific breakpoints
4. **Error handling** includes weather-specific error boundaries
5. **Styling** uses SCSS modules with CSS variables for theming
6. **File organization** separates blocks, elements, and layout components
7. **Animation patterns** use consistent hooks and controls
8. **Testing** includes both component and store testing patterns

This component architecture enables scalable weather data visualization while maintaining consistent patterns for development and AI assistance.
