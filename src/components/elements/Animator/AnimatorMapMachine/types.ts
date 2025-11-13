/**
 * Type definitions for AnimatorMapMachine component
 * Deck.gl-based map animation component for rendering geographic data
 */

import { Feature, FeatureCollection } from 'geojson'
import { ProcessedStormData, StormHoverInfo } from './types/tropicalStormTypes'

/**
 * Represents a single frame of map data
 * Similar to AnimatorImageMachine but for map data instead of images
 */
export interface MapFrame {
	id: string
	timestamp: Date
	data: FeatureCollection // GeoJSON data (always FeatureCollection for consistency)
	overlays?: MapOverlay[]
	tropicalStorms?: ProcessedStormData[] // Tropical storms for this frame
	coastalData?: FeatureCollection // Coastal/ocean region data with alert colors
	metadata?: {
		windSpeed?: number
		category?: number
		pressure?: number
		[key: string]: any
	}
}

/**
 * Represents an overlay layer on the map
 * Can be paths, markers, polygons, heatmaps, etc.
 */
export interface MapOverlay {
	id: string
	type: 'path' | 'marker' | 'polygon' | 'heatmap' | 'scatterplot' | 'custom'
	data: any
	style?: {
		fill?: string
		stroke?: string
		strokeWidth?: number
		opacity?: number
		[key: string]: any
	}
	opacity?: number
	visible?: boolean
}

/**
 * Region configuration for different map projections
 */
export type RegionType = 'conus' | 'alaska' | 'hawaii' | 'namer' | 'custom'

export interface RegionConfig {
	id: RegionType
	label: string
	center: [number, number] // [longitude, latitude]
	zoom: number
	bounds: [[number, number], [number, number]] // [[minLon, minLat], [maxLon, maxLat]]
	projection?: string // e.g., 'mercator', 'web-mercator'
}

/**
 * View state for Deck.gl map
 */
export interface MapViewState {
	longitude: number
	latitude: number
	zoom: number
	pitch?: number
	bearing?: number
}

/**
 * Props for AnimatorMapMachine component
 */
export interface IAnimatorMapMachineProps {
	// Frame data
	frames: MapFrame[]
	currentFrame: number

	// State management
	loadedFrames?: MapFrame[]
	setLoadedFrames?: (frames: MapFrame[]) => void

	// Display settings
	baseOpacity?: number
	zIndex?: number
	region?: RegionType

	// Map provider
	mapProvider?: 'deckgl' | 'canvas-d3' | 'mapbox'

	// View state (controlled component - optional)
	viewState?: MapViewState

	// Zoom controls
	zoomStepScroll?: number // Step size for mouse wheel scroll (default: 0.2)

	// Tropical storm visualization
	tropicalStorms?: ProcessedStormData[]
	onStormHover?: (info: StormHoverInfo | null) => void
	onStormClick?: (stormId: string) => void

	// Callbacks
	onFrameChange?: (frameIndex: number) => void
	onViewStateChange?: (viewState: MapViewState) => void
	_onViewStateChange?: (viewState: MapViewState) => void

	// Layer visibility controls
	layerVisibility?: Record<string, boolean> // Visibility state for map layers
	mapDataType?: 'alerts' | 'hurricane' | 'all' // Type of data being displayed

	// Optional styling
	containerStyle?: React.CSSProperties
}

/**
 * Props for MapProvider interface
 */
export interface MapProviderConfig {
	container: HTMLElement
	initialViewState: MapViewState
	region: RegionType
}

/**
 * Interface for map provider implementations
 */
export interface IMapProvider {
	initialize(config: MapProviderConfig): Promise<void>
	addLayer(layerId: string, layer: any): void
	removeLayer(layerId: string): void
	updateLayer(layerId: string, layer: any): void
	setOpacity(layerId: string, opacity: number): void
	updateData(layerId: string, data: FeatureCollection | Feature[]): void
	setViewState(viewState: MapViewState): void
	getViewState(): MapViewState
	destroy(): void
}

/**
 * Deck.gl layer configuration
 */
export interface DeckglLayerConfig {
	id: string
	type: string // e.g., 'GeoJsonLayer', 'ScatterplotLayer'
	data: any
	getLineColor?: (d: any) => number[]
	getFillColor?: (d: any) => number[]
	getRadius?: (d: any) => number
	lineWidthMinPixels?: number
	lineWidthMaxPixels?: number
	opacity?: number
	[key: string]: any
}

/**
 * Static map data for Storybook stories
 */
export interface StaticMapData {
	counties: FeatureCollection
	states: FeatureCollection
	hurricanePaths: MapFrame[]
}
