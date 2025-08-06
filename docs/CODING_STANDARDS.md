# NexLab Client - Coding Standards

## File Structure & Naming

### Component Organization

```
src/components/
├── blocks/          # Page-level components (FAQs, DonationPage)
├── elements/        # Reusable UI elements (Button, AuthButtons)
├── layout/          # Layout components (Navigation, ScrollArea)
└── providers/       # Context providers (Apollo, Theme)
```

### File Naming Conventions

-   **Components**: PascalCase with matching folder (`Button/Button.tsx`)
-   **Styles**: Component name + `.module.scss` (`Button.module.scss`)
-   **Types**: Descriptive interfaces (`AuthButtonProps`, `UserData`)
-   **API calls**: Descriptive function names (`getFAQs.ts`, `getFAQOverview.ts`)
-   **Weather data**: Lowercase with hyphens (`nexrad-regions.ts`, `satellite-products.ts`)

### Directory Structure Rules

#### Components

```
ComponentName/
├── ComponentName.tsx           # Main component file
├── ComponentName.module.scss   # Component styles
├── ComponentName.stories.tsx   # Storybook stories
├── index.ts                    # Export barrel
└── types.ts                    # Component-specific types (if complex)
```

#### Weather Data

```
src/data/
├── nexrad/
│   ├── regions.ts             # Geographic regions
│   ├── sectors.ts             # Coverage sectors
│   ├── products.ts            # Data products
│   └── sites.ts               # Observation sites
└── [dataType]/                # Follow same pattern
```

#### API Calls

```
src/apollo/
├── data/                      # Weather data API
│   ├── getNexradData.ts
│   ├── getSatelliteData.ts
│   └── queries/               # GraphQL query definitions
└── strapi/                    # CMS API
    ├── getPageBlocks.ts
    ├── getFAQs.ts
    └── queries/
```

## TypeScript Standards

### Interface Naming

```typescript
// Props interfaces
interface ComponentNameProps {
	title: string
	isVisible?: boolean
	onClose: () => void
}

// Data interfaces
interface WeatherData {
	timestamp: string
	temperature: number
	humidity: number
}

// Store slice interfaces
interface INexradSlice {
	selectedRegion: string
	setRegion: (region: string) => void
}
```

### Type Definitions

```typescript
// Use specific types over 'any'
type WeatherDataType = 'nexrad' | 'satellite' | 'upperair' | 'surface'
type AnimationSpeed = 'slow' | 'normal' | 'fast'

// Union types for weather selections
type NexradProduct = 'N0B' | 'N0V' | 'N0S' | 'N0X'
type SatelliteProduct = 'visible' | 'infrared' | 'water-vapor'

// Generic types for reusable patterns
interface DataSelector<T> {
	value: T
	options: Array<{ id: T; name: string }>
	onChange: (value: T) => void
}
```

### Function Signatures

```typescript
// Async functions with proper typing
const fetchWeatherData = async (dataType: WeatherDataType, region: string, product: string): Promise<WeatherFrame[]> => {
	// Implementation
}

// Event handlers
const handleRegionChange = (region: string): void => {
	setSelectedRegion(region)
}

// Component props with defaults
interface ButtonProps {
	variant?: 'primary' | 'secondary'
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'medium', disabled = false, onClick }) => {
	// Component implementation
}
```

## React Component Standards

### Component Structure

```typescript
// Standard component template
import React from 'react'
import styles from './ComponentName.module.scss'

interface ComponentNameProps {
  // Props definition
}

const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructured props
}) => {
  // Hooks (useState, useEffect, custom hooks)

  // Event handlers

  // Render helpers (if needed)

  return (
    <div className={styles.componentName}>
      {/* JSX */}
    </div>
  )
}

export default ComponentName
```

### Hook Usage Patterns

```typescript
// Custom hooks for weather data
const useWeatherData = (dataType: WeatherDataType, region: string) => {
	const [data, setData] = useState<WeatherFrame[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchWeatherData(dataType, region)
			.then(setData)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false))
	}, [dataType, region])

	return { data, loading, error }
}

// Store hooks
const useNexradStore = () => {
	const { selectedRegion, selectedProduct, setRegion, setProduct } = useRootStore()

	return {
		selectedRegion,
		selectedProduct,
		setRegion,
		setProduct,
	}
}
```

### Conditional Rendering

```typescript
// Preferred patterns
const WeatherComponent = () => {
  const { data, loading, error } = useWeatherData()

  // Early returns for loading/error states
  if (loading) return <LoadingSkeleton />
  if (error) return <ErrorMessage error={error} />
  if (!data?.length) return <NoDataMessage />

  return (
    <div className={styles.weatherDisplay}>
      {data.map(frame => (
        <WeatherFrame key={frame.timestamp} frame={frame} />
      ))}
    </div>
  )
}
```

## SCSS Standards

### File Organization

```scss
// ComponentName.module.scss

// 1. CSS Variables (if component-specific)
:root {
	--component-primary-color: #007bff;
	--component-border-radius: 8px;
}

// 2. Main component styles
.componentName {
	// Layout properties first
	display: flex;
	flex-direction: column;

	// Spacing
	padding: var(--spacing-medium);
	margin: var(--spacing-small);

	// Visual properties
	background-color: var(--color-background-primary);
	border-radius: var(--component-border-radius);

	// Typography
	font-size: var(--font-size-medium);
	color: var(--color-text-primary);
}

// 3. Element styles (nested)
.componentName {
	.title {
		font-size: var(--font-size-large);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--spacing-small);
	}

	.content {
		flex: 1;
		overflow-y: auto;
	}
}

// 4. Modifier classes
.componentName {
	&.variant {
		background-color: var(--color-background-secondary);
	}

	&.disabled {
		opacity: 0.6;
		pointer-events: none;
	}
}

// 5. Responsive styles
@media (max-width: 768px) {
	.componentName {
		padding: var(--spacing-small);

		.title {
			font-size: var(--font-size-medium);
		}
	}
}
```

### CSS Variable Usage

```scss
// Use existing variables from global styles
.weatherSelector {
	background-color: var(--color-background-primary);
	border: 1px solid var(--color-border-primary);
	color: var(--color-text-primary);

	// Spacing
	padding: var(--spacing-small) var(--spacing-medium);
	margin: var(--spacing-small);

	// Typography
	font-size: var(--font-size-medium);
	font-family: var(--font-family-primary);
}
```

### BEM-Style Naming

```scss
// Block
.weatherAnimator {
	// Block styles
}

// Elements
.weatherAnimator {
	.controls {
		// Element styles
	}

	.playButton {
		// Element styles
	}

	.timeline {
		// Element styles
	}
}

// Modifiers
.weatherAnimator {
	&.fullscreen {
		// Modifier styles
	}

	&.loading {
		// Modifier styles
	}
}
```

## API & Data Standards

### GraphQL Query Organization

```typescript
// queries/nexradQueries.ts
import { gql } from '@apollo/client'

export const GET_NEXRAD_REGIONS = gql`
	query GetNexradRegions {
		nexradRegions {
			id
			name
			sites {
				id
				name
				coordinates
			}
		}
	}
`

export const GET_NEXRAD_PRODUCTS = gql`
	query GetNexradProducts($regionId: String!) {
		nexradProducts(regionId: $regionId) {
			id
			name
			description
			unit
		}
	}
`
```

### API Call Patterns

```typescript
// Consistent error handling
const fetchWeatherData = async (params: WeatherParams) => {
	try {
		const response = await fetch(buildWeatherURL(params))

		if (!response.ok) {
			throw new Error(`Weather API error: ${response.status}`)
		}

		const data = await response.json()
		return data
	} catch (error) {
		console.error('Failed to fetch weather data:', error)
		throw error
	}
}

// Type-safe parameter building
const buildWeatherURL = (params: WeatherParams): string => {
	const { dataType, region, product, timestamp } = params
	return `${API_BASE_URL}/${dataType}/${region}/${product}?time=${timestamp}`
}
```

### Data Transformation

```typescript
// Consistent data transformation patterns
interface RawWeatherData {
	time: string
	temp: number
	humid: number
}

interface WeatherData {
	timestamp: Date
	temperature: number
	humidity: number
}

const transformWeatherData = (raw: RawWeatherData): WeatherData => ({
	timestamp: new Date(raw.time),
	temperature: raw.temp,
	humidity: raw.humid,
})
```

## Testing Standards

### Storybook Stories

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import ComponentName from './ComponentName'

const meta: Meta<typeof ComponentName> = {
	title: 'Components/Elements/ComponentName',
	component: ComponentName,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		title: 'Default Component',
		isVisible: true,
	},
}

export const Loading: Story = {
	args: {
		title: 'Loading State',
		isLoading: true,
	},
}
```

## Git & Development Standards

### Branch Naming

```bash
# Feature branches
feature/NXL-123-weather-data-selector
feature/NXL-456-nexrad-animation-controls

# Issue/bug fixes
issue/NXL-789-mobile-navigation-fix
issue/NXL-101-performance-optimization

# Hotfixes
hotfix/NXL-999-critical-api-fix
```

### Commit Messages

```bash
# Format: type(scope): description
feat(nexrad): add region selector component
fix(animation): resolve frame timing issues
docs(readme): update installation instructions
style(components): apply consistent SCSS formatting
refactor(stores): simplify weather data state management
```

### Code Review Checklist

-   [ ] **TypeScript**: No `any` types, proper interfaces
-   [ ] **Components**: Follow naming conventions
-   [ ] **Styles**: Use CSS variables, responsive design
-   [ ] **Performance**: Lazy loading, memoization where needed
-   [ ] **Accessibility**: ARIA labels, keyboard navigation
-   [ ] **Testing**: Storybook stories for new components
-   [ ] **Documentation**: Update relevant docs

## Related Documentation

-   **[Component Patterns](./COMPONENT_PATTERNS.md)** - React architecture patterns
-   **[Weather Data Architecture](./WEATHER_DATA_ARCHITECTURE.md)** - Data structure conventions
-   **[Performance Optimization](./PERFORMANCE_OPTIMIZATION.md)** - Code optimization guidelines
-   **[API Integration](./API_INTEGRATION.md)** - GraphQL and API patterns

## AI Assistant Context

When writing code for this project:

1. **File naming** follows strict PascalCase for components, camelCase for utilities
2. **TypeScript** is required with proper typing (no `any`)
3. **SCSS modules** with CSS variables for theming
4. **Weather data** follows hierarchical naming patterns
5. **Components** use consistent props and state patterns
6. **Error handling** includes weather-specific error boundaries
7. **Performance** considerations for large weather datasets

These standards ensure consistent, maintainable code that AI tools can easily understand and work with.
