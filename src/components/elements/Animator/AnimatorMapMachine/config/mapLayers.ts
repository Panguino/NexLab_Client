/**
 * Map Layer Configuration
 * Defines all available layers for the map animator with their properties and visibility rules
 */

export type LayerCategory = 'general' | 'data'
export type DataType = 'alerts' | 'hurricane' | 'all'

export interface MapLayer {
	id: string
	name: string
	category: LayerCategory
	description?: string
	// Which data types should show this layer in the UI
	// 'all' = show for all data types
	// 'alerts' = only show when viewing alerts data
	// 'hurricane' = only show when viewing hurricane data
	visibleFor: DataType[]
	// Whether this layer should appear in the UI for the specified data types
	// If false, the layer won't appear in the layer panel at all
	visibleInUI: boolean
	// Default visibility state (whether the layer is toggled on/off)
	defaultVisible: boolean
	// Z-index for layer ordering
	zIndex: number
}

/**
 * General/Base Layers - Always available when appropriate data is present
 */
export const GENERAL_LAYERS: MapLayer[] = [
	{
		id: 'world-layer',
		name: 'Base World Map',
		category: 'general',
		description: 'World land shapes with borders',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 10,
	},
	{
		id: 'states-layer',
		name: 'State Borders',
		category: 'general',
		description: 'US state boundaries',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 20,
	},
	{
		id: 'states-fill-layer',
		name: 'State Fills',
		category: 'general',
		description: 'US state fill colors',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 15,
	},
	{
		id: 'lakes-layer',
		name: 'Great Lakes',
		category: 'general',
		description: 'Great Lakes water bodies',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 12,
	},
	{
		id: 'latlon-grid-layer',
		name: 'Latitude/Longitude Grid',
		category: 'general',
		description: 'Lat/long grid lines',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 5,
	},
	{
		id: 'coastal-regions-inactive-layer',
		name: 'Coastal Regions (Inactive)',
		category: 'general',
		description: 'Borders and fills for coastal regions without alerts',
		visibleFor: ['alerts'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 18,
	},
	{
		id: 'counties-inactive-layer',
		name: 'Counties (Inactive)',
		category: 'general',
		description: 'Borders and fills for counties without alerts',
		visibleFor: ['alerts'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 17,
	},
	{
		id: 'fire-zones-inactive-layer',
		name: 'Fire Zones (Inactive)',
		category: 'general',
		description: 'Borders and fills for fire weather zones',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: false,
		zIndex: 16,
	},
	{
		id: 'fire-zones-fill-layer',
		name: 'Fire Zones Fill',
		category: 'general',
		description: 'Fill colors for fire weather zones',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: false,
		zIndex: 14,
	},
	{
		id: 'forecast-zones-inactive-layer',
		name: 'Forecast Zones (Inactive)',
		category: 'general',
		description: 'Borders and fills for public forecast zones',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: false,
		zIndex: 15,
	},
	{
		id: 'forecast-zones-fill-layer',
		name: 'Forecast Zones Fill',
		category: 'general',
		description: 'Fill colors for public forecast zones',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: false,
		zIndex: 13,
	},
	{
		id: 'cwa-zones-inactive-layer',
		name: 'County Warning Areas (Inactive)',
		category: 'general',
		description: 'Borders and fills for County Warning Areas (WFO responsibility areas)',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: false,
		zIndex: 12,
	},
	{
		id: 'cwa-zones-fill-layer',
		name: 'County Warning Areas Fill',
		category: 'general',
		description: 'Fill colors for County Warning Areas',
		visibleFor: ['all'],
		visibleInUI: true,
		defaultVisible: false,
		zIndex: 11,
	},
]

/**
 * Data Layers - Only shown when specific data is present
 */
export const DATA_LAYERS: MapLayer[] = [
	{
		id: 'coastal-data-regions-layer',
		name: 'Coastal Alerts (Active)',
		category: 'data',
		description: 'Toggle to show/hide coastal region alert visualization',
		visibleFor: ['alerts'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 100,
	},
	{
		id: 'county-data-regions-layer',
		name: 'County Alerts (Active)',
		category: 'data',
		description: 'Toggle to show/hide county alert visualization',
		visibleFor: ['alerts'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 99,
	},
	{
		id: 'region-alerts-layer',
		name: 'Affected Countries',
		category: 'data',
		description: 'Countries affected by hurricane warnings/watches',
		visibleFor: ['hurricane'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 95,
	},
	{
		id: 'frame-data-layer',
		name: 'Hurricane Warnings/Watches',
		category: 'data',
		description: 'Hurricane warning and watch polygons',
		visibleFor: ['hurricane'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 90,
	},
	{
		id: 'cone-layer',
		name: 'Cone of Uncertainty',
		category: 'data',
		description: 'Hurricane forecast uncertainty cone',
		visibleFor: ['hurricane'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 85,
	},
	{
		id: 'forecast-track-layer',
		name: 'Forecast Track',
		category: 'data',
		description: 'Predicted hurricane path',
		visibleFor: ['hurricane'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 88,
	},
	{
		id: 'best-track-layer',
		name: 'Historical Path',
		category: 'data',
		description: 'Historical hurricane track',
		visibleFor: ['hurricane'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 87,
	},
	{
		id: 'forecast-points-layer',
		name: 'Forecast Points',
		category: 'data',
		description: 'Hurricane forecast position points',
		visibleFor: ['hurricane'],
		visibleInUI: true,
		defaultVisible: true,
		zIndex: 89,
	},
]

/**
 * Get all layers for a specific data type that should appear in the UI
 */
export function getLayersForDataType(dataType: DataType): MapLayer[] {
	const allLayers = [...GENERAL_LAYERS, ...DATA_LAYERS]
	return allLayers.filter((layer) => layer.visibleInUI && (layer.visibleFor.includes(dataType) || layer.visibleFor.includes('all')))
}

/**
 * Get all layer IDs
 */
export function getAllLayerIds(): string[] {
	const allLayers = [...GENERAL_LAYERS, ...DATA_LAYERS]
	return allLayers.map((layer) => layer.id)
}

/**
 * Get default visibility state for all layers
 */
export function getDefaultLayerVisibility(): Record<string, boolean> {
	const visibility: Record<string, boolean> = {}
	const allLayers = [...GENERAL_LAYERS, ...DATA_LAYERS]
	allLayers.forEach((layer) => {
		visibility[layer.id] = layer.defaultVisible
	})
	return visibility
}

/**
 * Check if a layer should be visible based on visibility state and data type
 */
export function isLayerVisible(layerId: string, layerVisibility: Record<string, boolean>, dataType: DataType = 'all'): boolean {
	// If layer visibility is explicitly set, use that
	if (layerId in layerVisibility) {
		return layerVisibility[layerId]
	}

	// Otherwise, check if layer is available for this data type
	const allLayers = [...GENERAL_LAYERS, ...DATA_LAYERS]
	const layer = allLayers.find((l) => l.id === layerId)

	if (!layer) {
		return false
	}

	// Layer is visible if it's available for this data type
	return layer.visibleFor.includes(dataType) || layer.visibleFor.includes('all')
}
