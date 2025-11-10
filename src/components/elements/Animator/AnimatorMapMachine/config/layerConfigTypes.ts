/**
 * Layer Configuration Types
 * Defines the structure for configuring which layers are available and their initial states
 * per animator instance
 */

/**
 * Configuration for a single layer
 * Allows control over whether a layer is available and its initial toggle state
 */
export interface LayerConfigItem {
	/** Whether this layer should appear in the UI layer panel */
	active: boolean
	/** Initial toggle state when the animator loads */
	initialValue: boolean
}

/**
 * Complete layer configuration for an animator instance
 * Maps layer IDs to their configuration
 *
 * Example:
 * {
 *   'world-layer': { active: true, initialValue: true },
 *   'states-layer': { active: true, initialValue: true },
 *   'states-fill-layer': { active: true, initialValue: true },
 *   'coastal-alerts-active-layer': { active: false, initialValue: false },
 *   'county-data-regions-layer': { active: false, initialValue: false },
 * }
 */
export type LayerConfig = Record<string, LayerConfigItem>

/**
 * Predefined layer configurations for common use cases
 */
export const LAYER_CONFIG_PRESETS = {
	/**
	 * Tropical Hurricane Animator
	 * Shows base map layers and hurricane-specific data layers
	 * Used for specific storm detail view
	 */
	TROPICAL: {
		'world-layer': { active: true, initialValue: true },
		'states-layer': { active: true, initialValue: true },
		'states-fill-layer': { active: true, initialValue: true },
		'lakes-layer': { active: true, initialValue: true },
		'latlon-grid-layer': { active: true, initialValue: true },
		'region-alerts-layer': { active: true, initialValue: true },
		'frame-data-layer': { active: true, initialValue: true },
		'cone-layer': { active: true, initialValue: true },
		'forecast-track-layer': { active: true, initialValue: true },
		'best-track-layer': { active: true, initialValue: true },
		'forecast-points-layer': { active: true, initialValue: true },
	} as LayerConfig,

	/**
	 * Tropical Storm Picker / Overview
	 * Shows only base map layers without data layers
	 * Used for storm selection/overview view where users choose which storm to view
	 * No layers are toggleable in the UI (active: false)
	 */
	TROPICAL_STORM_PICKER: {
		'world-layer': { active: false, initialValue: true },
		'states-layer': { active: false, initialValue: true },
		'states-fill-layer': { active: false, initialValue: true },
		'lakes-layer': { active: false, initialValue: true },
		'latlon-grid-layer': { active: false, initialValue: true },
	} as LayerConfig,

	/**
	 * County Alerts Animator
	 * Shows base map layers and county alert data layers
	 */
	COUNTY_ALERTS: {
		'world-layer': { active: true, initialValue: true },
		'states-layer': { active: true, initialValue: true },
		'states-fill-layer': { active: true, initialValue: true },
		'lakes-layer': { active: true, initialValue: true },
		'latlon-grid-layer': { active: true, initialValue: true },
		'coastal-regions-inactive-layer': { active: true, initialValue: true },
		'counties-inactive-layer': { active: true, initialValue: true },
		'coastal-data-regions-layer': { active: true, initialValue: true },
		'county-data-regions-layer': { active: true, initialValue: true },
	} as LayerConfig,

	/**
	 * County Alerts - Data Toggle Only
	 * All static map layers are locked on, only data layers can be toggled
	 */
	COUNTY_ALERTS_DATA_ONLY: {
		'world-layer': { active: false, initialValue: true },
		'states-layer': { active: false, initialValue: true },
		'states-fill-layer': { active: false, initialValue: true },
		'lakes-layer': { active: false, initialValue: true },
		'latlon-grid-layer': { active: false, initialValue: true },
		'coastal-regions-inactive-layer': { active: false, initialValue: true },
		'counties-inactive-layer': { active: false, initialValue: true },
		'coastal-data-regions-layer': { active: true, initialValue: true },
		'county-data-regions-layer': { active: true, initialValue: true },
	} as LayerConfig,

	/**
	 * Coastal Alerts Animator
	 * Shows base map layers and coastal alert data layers
	 */
	COASTAL_ALERTS: {
		'world-layer': { active: true, initialValue: true },
		'states-layer': { active: true, initialValue: true },
		'states-fill-layer': { active: true, initialValue: true },
		'lakes-layer': { active: true, initialValue: true },
		'latlon-grid-layer': { active: true, initialValue: false },
		'coastal-regions-inactive-layer': { active: true, initialValue: true },
		'counties-inactive-layer': { active: false, initialValue: false },
		'coastal-data-regions-layer': { active: true, initialValue: true },
		'county-data-regions-layer': { active: false, initialValue: false },
		'counties-active-layer': { active: false, initialValue: false },
		'region-alerts-layer': { active: false, initialValue: false },
		'best-track-layer': { active: false, initialValue: false },
		'forecast-points-layer': { active: false, initialValue: false },
	} as LayerConfig,

	/**
	 * Full Animator
	 * Shows all available layers
	 */
	FULL: {
		'world-layer': { active: true, initialValue: true },
		'states-layer': { active: true, initialValue: true },
		'states-fill-layer': { active: true, initialValue: true },
		'lakes-layer': { active: true, initialValue: true },
		'latlon-grid-layer': { active: true, initialValue: false },
		'coastal-regions-inactive-layer': { active: true, initialValue: true },
		'counties-inactive-layer': { active: true, initialValue: true },
		'coastal-data-regions-layer': { active: true, initialValue: true },
		'county-data-regions-layer': { active: true, initialValue: true },
		'counties-active-layer': { active: true, initialValue: true },
		'region-alerts-layer': { active: true, initialValue: true },
		'best-track-layer': { active: true, initialValue: true },
		'forecast-points-layer': { active: true, initialValue: true },
	} as LayerConfig,
}

/**
 * Get the default layer configuration
 * Returns a configuration with all layers active and initially visible
 */
export function getDefaultLayerConfig(): LayerConfig {
	return LAYER_CONFIG_PRESETS.FULL
}

/**
 * Convert layer configuration to visibility state
 * Extracts the initialValue from each layer config item
 */
export function layerConfigToVisibility(config: LayerConfig): Record<string, boolean> {
	const visibility: Record<string, boolean> = {}
	Object.entries(config).forEach(([layerId, { initialValue }]) => {
		visibility[layerId] = initialValue
	})
	return visibility
}

/**
 * Get active layers from configuration
 * Returns only the layer IDs that are marked as active
 */
export function getActiveLayers(config: LayerConfig): string[] {
	return Object.entries(config)
		.filter(([, { active }]) => active)
		.map(([layerId]) => layerId)
}
