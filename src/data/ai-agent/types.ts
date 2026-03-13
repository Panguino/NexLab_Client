// AI Agent Product Catalog Types

export type ProductCategory = 
	| 'radar'
	| 'satellite'
	| 'surface'
	| 'upperair'
	| 'tropical'
	| 'alerts'
	| 'forecast'
	| 'soundings'

export type AnimatorMode = 'image' | 'map'

export interface ProductCatalogEntry {
	id: string
	name: string
	category: ProductCategory
	description: string
	keywords: string[]
	
	// Geographic scope
	availableRegions?: string[]
	availableSectors?: string[]
	availableSites?: string[]
	
	// Animator configuration
	animatorType: AnimatorMode
	
	// Data source configuration
	dataSource: {
		type: 'api' | 'static' | 'realtime'
		baseUrl?: string
		fetchFunction?: string
	}
	
	// AI context
	useCases: string[]
	exampleQueries: string[]
}

export interface RegionEntry {
	id: string
	name: string
	description: string
	keywords: string[]
	coordinates?: {
		center: [number, number]
		zoom?: number
	}
}

export interface SectorEntry {
	id: string
	name: string
	region: string
	keywords: string[]
}

export interface SiteEntry {
	id: string
	name: string
	state?: string
	coordinates: [number, number]
	keywords: string[]
}

export interface ProductCatalog {
	products: ProductCatalogEntry[]
	regions: RegionEntry[]
	sectors: SectorEntry[]
	sites: SiteEntry[]
	
	// Metadata for AI context
	lastUpdated: string
	version: string
}

// Chat message types for the AI Agent
export interface ChatMessage {
	id: string
	role: 'user' | 'assistant' | 'system'
	content: string
	timestamp: Date
	functionCall?: {
		name: string
		arguments: Record<string, unknown>
	}
	animatorConfig?: AnimatorConfig
}

export interface AnimatorConfig {
	mode: AnimatorMode
	frames: string[] | MapFrame[]
	imageInfo?: {
		width: number
		height: number
	}
	mapRegion?: string
	layerConfig?: Record<string, { active: boolean; initialValue: boolean }>
	autoPlay?: boolean
	interval?: number
}

export interface MapFrame {
	id: string
	timestamp?: string
	data?: unknown
}

// OpenAI function call result
export interface ProductLoadResult {
	success: boolean
	animatorConfig?: AnimatorConfig
	message: string
	productName?: string
}

