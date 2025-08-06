# Performance Optimization Guide

## Bundle Optimization

### Next.js Configuration

```javascript
// next.config.js
const nextConfig = {
	// Enable SWC minification for faster builds
	swcMinify: true,

	// Optimize images
	images: {
		domains: ['weather.cod.edu', 'strapi.nexlab.com'],
		formats: ['image/webp', 'image/avif'],
	},

	// Enable experimental features for performance
	experimental: {
		optimizeCss: true,
		optimizePackageImports: ['@fortawesome/react-fontawesome'],
	},

	// Webpack optimizations
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			// Split vendor chunks
			config.optimization.splitChunks.cacheGroups = {
				...config.optimization.splitChunks.cacheGroups,
				apollo: {
					name: 'apollo',
					test: /[\\/]node_modules[\\/](@apollo|graphql)[\\/]/,
					chunks: 'all',
					priority: 10,
				},
				weather: {
					name: 'weather-libs',
					test: /[\\/]node_modules[\\/](d3|turf|moment)[\\/]/,
					chunks: 'all',
					priority: 9,
				},
			}
		}

		return config
	},
}
```

### CSS Variable Optimization

```typescript
// src/scripts/build/styles/index.ts
// Post-build CSS variable optimization
import { optimizeCSSVariables } from './optimizeCSSVariables'

const optimizeStyles = async () => {
	// Remove unused CSS variables
	await optimizeCSSVariables({
		inputDir: '.next/static/css',
		outputDir: '.next/static/css',
		removeUnused: true,
		minify: true,
	})
}

// Run after build
optimizeStyles()
```

### Dynamic Imports

```typescript
// Lazy load heavy weather visualization components
const WeatherMap = dynamic(() => import('./WeatherMap'), {
  loading: () => <MapSkeleton />,
  ssr: false, // Client-side only for interactive maps
})

const D3Visualization = dynamic(() => import('./D3Visualization'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
})

// Lazy load weather data processing utilities
const processWeatherData = async (data: RawWeatherData[]) => {
  const { processNexradData } = await import('@/utils/weatherProcessing')
  return processNexradData(data)
}
```

## Weather Data Optimization

### Image Loading Strategies

```typescript
// Preload critical weather frames
const useWeatherFramePreloader = (frames: WeatherFrame[]) => {
	const [loadedFrames, setLoadedFrames] = useState<Set<string>>(new Set())

	useEffect(() => {
		// Preload first 3 frames immediately
		const criticalFrames = frames.slice(0, 3)

		criticalFrames.forEach((frame) => {
			const img = new Image()
			img.onload = () => {
				setLoadedFrames((prev) => new Set(prev).add(frame.imageUrl))
			}
			img.src = frame.imageUrl
		})

		// Preload remaining frames with delay
		const remainingFrames = frames.slice(3)
		remainingFrames.forEach((frame, index) => {
			setTimeout(() => {
				const img = new Image()
				img.onload = () => {
					setLoadedFrames((prev) => new Set(prev).add(frame.imageUrl))
				}
				img.src = frame.imageUrl
			}, index * 100) // Stagger loading
		})
	}, [frames])

	return loadedFrames
}
```

### Data Caching Strategies

```typescript
// Multi-level caching for weather data
class WeatherDataCache {
	private memoryCache = new Map<string, WeatherFrame[]>()
	private readonly maxMemoryItems = 50

	// Browser cache with service worker
	private async getCachedData(key: string): Promise<WeatherFrame[] | null> {
		try {
			const cached = await caches.open('weather-data-v1')
			const response = await cached.match(key)

			if (response) {
				const data = await response.json()
				return data.frames
			}
		} catch (error) {
			console.warn('Cache read failed:', error)
		}

		return null
	}

	private async setCachedData(key: string, frames: WeatherFrame[]): Promise<void> {
		try {
			const cached = await caches.open('weather-data-v1')
			const response = new Response(JSON.stringify({ frames, timestamp: Date.now() }))
			await cached.put(key, response)
		} catch (error) {
			console.warn('Cache write failed:', error)
		}
	}

	async get(key: string): Promise<WeatherFrame[] | null> {
		// Check memory cache first
		if (this.memoryCache.has(key)) {
			return this.memoryCache.get(key)!
		}

		// Check browser cache
		return await this.getCachedData(key)
	}

	async set(key: string, frames: WeatherFrame[]): Promise<void> {
		// Update memory cache
		if (this.memoryCache.size >= this.maxMemoryItems) {
			const firstKey = this.memoryCache.keys().next().value
			this.memoryCache.delete(firstKey)
		}
		this.memoryCache.set(key, frames)

		// Update browser cache
		await this.setCachedData(key, frames)
	}
}

const weatherCache = new WeatherDataCache()
```

### Efficient Data Processing

```typescript
// Use Web Workers for heavy weather data processing
const useWeatherDataProcessor = () => {
	const workerRef = useRef<Worker>()

	useEffect(() => {
		workerRef.current = new Worker('/workers/weatherProcessor.js')

		return () => {
			workerRef.current?.terminate()
		}
	}, [])

	const processData = useCallback(async (rawData: RawWeatherData[]) => {
		return new Promise<ProcessedWeatherData[]>((resolve, reject) => {
			if (!workerRef.current) {
				reject(new Error('Worker not available'))
				return
			}

			workerRef.current.onmessage = (e) => {
				resolve(e.data.processedData)
			}

			workerRef.current.onerror = (error) => {
				reject(error)
			}

			workerRef.current.postMessage({ rawData })
		})
	}, [])

	return { processData }
}

// public/workers/weatherProcessor.js
self.onmessage = function (e) {
	const { rawData } = e.data

	// Heavy processing in worker thread
	const processedData = rawData.map((frame) => ({
		...frame,
		processed: true,
		calculations: performHeavyCalculations(frame),
	}))

	self.postMessage({ processedData })
}
```

## Component Optimization

### React Performance Patterns

```typescript
// Memoize expensive weather calculations
const WeatherDisplay = memo(({ frames, selectedFrame }: WeatherDisplayProps) => {
  const processedFrame = useMemo(() => {
    if (!frames[selectedFrame]) return null

    return processWeatherFrame(frames[selectedFrame])
  }, [frames, selectedFrame])

  return (
    <div className={styles.weatherDisplay}>
      {processedFrame && <WeatherVisualization data={processedFrame} />}
    </div>
  )
})

// Optimize re-renders with callback memoization
const WeatherControls = ({ onFrameChange, onSpeedChange }: ControlsProps) => {
  const handleFrameChange = useCallback((frame: number) => {
    onFrameChange(frame)
  }, [onFrameChange])

  const handleSpeedChange = useCallback((speed: number) => {
    onSpeedChange(speed)
  }, [onSpeedChange])

  return (
    <div className={styles.controls}>
      <FrameSlider onChange={handleFrameChange} />
      <SpeedSelector onChange={handleSpeedChange} />
    </div>
  )
}
```

### Virtual Scrolling for Large Datasets

```typescript
// Virtual scrolling for weather data lists
const VirtualWeatherList = ({ items }: { items: WeatherDataItem[] }) => {
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(20)
  const itemHeight = 60
  const containerHeight = 400

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex)
  }, [items, startIndex, endIndex])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const newStartIndex = Math.floor(scrollTop / itemHeight)
    const visibleCount = Math.ceil(containerHeight / itemHeight)

    setStartIndex(newStartIndex)
    setEndIndex(newStartIndex + visibleCount + 5) // Buffer
  }, [])

  return (
    <div
      className={styles.virtualList}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
            }}
          >
            <WeatherDataItem data={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Animation Performance

```typescript
// Optimized weather animation with RAF
const useWeatherAnimation = (frames: string[], speed: number) => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const lastFrameTime = useRef(0)
	const animationId = useRef<number>()

	const animate = useCallback(
		(timestamp: number) => {
			if (timestamp - lastFrameTime.current >= speed) {
				setCurrentFrame((prev) => (prev + 1) % frames.length)
				lastFrameTime.current = timestamp
			}

			if (isPlaying) {
				animationId.current = requestAnimationFrame(animate)
			}
		},
		[frames.length, speed, isPlaying],
	)

	useEffect(() => {
		if (isPlaying) {
			animationId.current = requestAnimationFrame(animate)
		} else {
			if (animationId.current) {
				cancelAnimationFrame(animationId.current)
			}
		}

		return () => {
			if (animationId.current) {
				cancelAnimationFrame(animationId.current)
			}
		}
	}, [isPlaying, animate])

	return {
		currentFrame,
		isPlaying,
		play: () => setIsPlaying(true),
		pause: () => setIsPlaying(false),
	}
}
```

## State Management Optimization

### Zustand Performance

```typescript
// Optimize store subscriptions
const useNexradData = () => {
	// Subscribe only to needed slice
	return useRootStore(
		useCallback(
			(state) => ({
				selectedRegion: state.selectedRegion,
				selectedProduct: state.selectedProduct,
				setRegion: state.setRegion,
				setProduct: state.setProduct,
			}),
			[],
		),
		shallow, // Prevent unnecessary re-renders
	)
}

// Batch state updates
const useWeatherActions = () => {
	const store = useRootStore()

	const updateWeatherSelection = useCallback(
		(updates: WeatherUpdates) => {
			// Batch multiple updates
			store.setState((state) => ({
				...state,
				...updates,
			}))
		},
		[store],
	)

	return { updateWeatherSelection }
}
```

### Selective Re-rendering

```typescript
// Prevent unnecessary re-renders in weather components
const WeatherSelector = memo(({
  value,
  options,
  onChange
}: WeatherSelectorProps) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for complex objects
  return (
    prevProps.value === nextProps.value &&
    prevProps.options.length === nextProps.options.length &&
    prevProps.options.every((option, index) =>
      option.id === nextProps.options[index]?.id
    )
  )
})
```

## Network Optimization

### GraphQL Query Optimization

```typescript
// Batch multiple weather data requests
const useBatchedWeatherData = () => {
	const [requests, setRequests] = useState<WeatherRequest[]>([])

	const addRequest = useCallback((request: WeatherRequest) => {
		setRequests((prev) => [...prev, request])
	}, [])

	// Batch requests every 100ms
	useEffect(() => {
		if (requests.length === 0) return

		const timer = setTimeout(() => {
			// Execute batched query
			executeBatchedQuery(requests)
			setRequests([])
		}, 100)

		return () => clearTimeout(timer)
	}, [requests])

	return { addRequest }
}

// Optimize query with field selection
const GET_WEATHER_DATA_OPTIMIZED = gql`
  query GetWeatherData($params: WeatherParams!) {
    weatherFrames(params: $params) {
      # Only request needed fields
      timestamp
      imageUrl
      # Skip heavy metadata unless needed
      ${includeMetadata ? 'metadata { level elevation }' : ''}
    }
  }
`
```

### Connection Optimization

```typescript
// Implement connection pooling for weather APIs
class WeatherAPIClient {
	private connectionPool = new Map<string, AbortController>()

	async fetchWeatherData(url: string, options: RequestInit = {}) {
		// Cancel previous request for same endpoint
		const existingController = this.connectionPool.get(url)
		if (existingController) {
			existingController.abort()
		}

		// Create new request with abort controller
		const controller = new AbortController()
		this.connectionPool.set(url, controller)

		try {
			const response = await fetch(url, {
				...options,
				signal: controller.signal,
			})

			this.connectionPool.delete(url)
			return response
		} catch (error) {
			this.connectionPool.delete(url)
			throw error
		}
	}
}
```

## Memory Management

### Cleanup Patterns

```typescript
// Proper cleanup for weather data subscriptions
const useWeatherDataSubscription = (params: WeatherParams) => {
	const [data, setData] = useState<WeatherFrame[]>([])
	const subscriptionRef = useRef<Subscription>()

	useEffect(() => {
		// Subscribe to real-time weather updates
		subscriptionRef.current = subscribeToWeatherUpdates(params, setData)

		return () => {
			// Cleanup subscription
			subscriptionRef.current?.unsubscribe()

			// Clear data to free memory
			setData([])
		}
	}, [params])

	return data
}

// Memory-efficient image handling
const useWeatherImages = (imageUrls: string[]) => {
	const imageCache = useRef(new Map<string, HTMLImageElement>())
	const maxCacheSize = 20

	useEffect(() => {
		// Preload images
		imageUrls.forEach((url) => {
			if (!imageCache.current.has(url)) {
				const img = new Image()
				img.src = url

				// Manage cache size
				if (imageCache.current.size >= maxCacheSize) {
					const firstKey = imageCache.current.keys().next().value
					imageCache.current.delete(firstKey)
				}

				imageCache.current.set(url, img)
			}
		})

		return () => {
			// Cleanup on unmount
			imageCache.current.clear()
		}
	}, [imageUrls])

	return imageCache.current
}
```

## Monitoring & Metrics

### Performance Monitoring

```typescript
// Track weather data loading performance
const usePerformanceMonitoring = () => {
	const trackWeatherDataLoad = useCallback((dataType: string, loadTime: number, dataSize: number) => {
		// Send metrics to analytics
		if (typeof window !== 'undefined' && window.gtag) {
			window.gtag('event', 'weather_data_load', {
				data_type: dataType,
				load_time: loadTime,
				data_size: dataSize,
			})
		}

		// Log performance warnings
		if (loadTime > 3000) {
			console.warn(`Slow weather data load: ${dataType} took ${loadTime}ms`)
		}
	}, [])

	return { trackWeatherDataLoad }
}

// Core Web Vitals monitoring
const useWebVitals = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
				getCLS(console.log)
				getFID(console.log)
				getFCP(console.log)
				getLCP(console.log)
				getTTFB(console.log)
			})
		}
	}, [])
}
```

## Build Optimization

### Webpack Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check for duplicate dependencies
npx webpack-bundle-analyzer .next/static/chunks/*.js
```

### Lighthouse Optimization Checklist

-   [ ] **First Contentful Paint** < 1.8s
-   [ ] **Largest Contentful Paint** < 2.5s
-   [ ] **Cumulative Layout Shift** < 0.1
-   [ ] **First Input Delay** < 100ms
-   [ ] **Time to Interactive** < 3.8s

### Production Optimizations

```typescript
// Service worker for weather data caching
// public/sw.js
const CACHE_NAME = 'nexlab-weather-v1'
const WEATHER_API_CACHE = 'weather-api-v1'

self.addEventListener('fetch', (event) => {
	const { request } = event

	// Cache weather images aggressively
	if (request.url.includes('weather.cod.edu')) {
		event.respondWith(
			caches.open(WEATHER_API_CACHE).then((cache) => {
				return cache.match(request).then((response) => {
					if (response) {
						return response
					}

					return fetch(request).then((fetchResponse) => {
						cache.put(request, fetchResponse.clone())
						return fetchResponse
					})
				})
			}),
		)
	}
})
```

## Related Documentation

-   **[API Integration](./API_INTEGRATION.md)** - Optimizing GraphQL queries and caching
-   **[Component Patterns](./COMPONENT_PATTERNS.md)** - Component optimization strategies
-   **[Weather Data Architecture](./WEATHER_DATA_ARCHITECTURE.md)** - Data structure optimizations
-   **[Coding Standards](./CODING_STANDARDS.md)** - Performance-focused coding patterns

## AI Assistant Context

When optimizing performance in this codebase:

1. **Weather data** requires special handling due to large image datasets
2. **Animation performance** uses RAF and Web Workers for smooth playback
3. **Caching strategies** include memory, browser, and service worker caches
4. **Bundle optimization** focuses on code splitting for weather libraries
5. **Memory management** is critical for long-running weather animations
6. **Network optimization** batches requests and implements connection pooling
7. **Monitoring** tracks weather-specific performance metrics

These optimizations ensure smooth weather data visualization while maintaining excellent Core Web Vitals scores.
