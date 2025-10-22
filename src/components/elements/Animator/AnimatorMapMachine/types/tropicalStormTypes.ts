/**
 * Type definitions for tropical storm data visualization
 * Based on NHC tropical storm data format
 */

/**
 * Classification of tropical cyclones
 */
export type StormClassification = 'HU' | 'TS' | 'PTC' | 'TD' | 'LO' | 'WV'

/**
 * Saffir-Simpson Hurricane Category
 */
export type HurricaneCategory = 1 | 2 | 3 | 4 | 5 | 'TS' | 'PTC'

/**
 * Raw tropical storm data from NHC API
 */
export interface TropicalStormData {
	id: string
	name: string
	classification: StormClassification
	intensity: number // Wind speed in knots
	pressure: number // Pressure in mb
	latitude: string // e.g., "22.9N"
	longitude: string // e.g., "79.9W"
	latitudeNumeric: number // -90 to 90
	longitudeNumeric: number // -180 to 180
	movementDir: number // Direction in degrees (0-360)
	movementSpeed: number // Speed in knots
	lastUpdate: string // ISO timestamp
	binNumber?: string
	publicAdvisory?: {
		advNum: string
		issuance: string
		url: string
	}
	[key: string]: any
}

/**
 * Processed storm data for visualization
 */
export interface ProcessedStormData {
	id: string
	name: string
	classification: StormClassification
	category: HurricaneCategory
	intensity: number // knots
	pressure: number // mb
	latitude: number
	longitude: number
	movementDir: number
	movementSpeed: number
	lastUpdate: Date
	color: [number, number, number, number] // RGBA
	iconSize: number // pixels
}

/**
 * Hover information for tooltip
 */
export interface StormHoverInfo {
	stormId: string
	name: string
	classification: StormClassification
	category: HurricaneCategory
	intensity: number
	pressure: number
	movementDir: number
	movementSpeed: number
	lastUpdate: Date
	x: number // Screen coordinates
	y: number
}

/**
 * Color scheme for different hurricane categories
 */
export const HURRICANE_COLORS: Record<HurricaneCategory, [number, number, number, number]> = {
	5: [139, 0, 0, 255], // Dark red - Cat 5
	4: [220, 20, 60, 255], // Crimson - Cat 4
	3: [255, 140, 0, 255], // Dark orange - Cat 3
	2: [255, 165, 0, 255], // Orange - Cat 2
	1: [255, 200, 0, 255], // Gold - Cat 1
	TS: [30, 144, 255, 255], // Dodger blue - Tropical Storm
	PTC: [169, 169, 169, 255], // Dark gray - Post-Tropical Cyclone
}

/**
 * Intensity thresholds for Saffir-Simpson scale
 */
export const INTENSITY_THRESHOLDS = {
	CAT5: 157,
	CAT4: 130,
	CAT3: 111,
	CAT2: 96,
	CAT1: 74,
	TS: 39,
	PTC: 0,
}

/**
 * Get hurricane category from wind speed (knots)
 */
export function getHurricaneCategory(intensity: number, classification: StormClassification): HurricaneCategory {
	if (classification === 'PTC') return 'PTC'
	if (classification === 'TD' || classification === 'LO' || classification === 'WV') return 'PTC'

	if (intensity >= INTENSITY_THRESHOLDS.CAT5) return 5
	if (intensity >= INTENSITY_THRESHOLDS.CAT4) return 4
	if (intensity >= INTENSITY_THRESHOLDS.CAT3) return 3
	if (intensity >= INTENSITY_THRESHOLDS.CAT2) return 2
	if (intensity >= INTENSITY_THRESHOLDS.CAT1) return 1
	if (intensity >= INTENSITY_THRESHOLDS.TS) return 'TS'
	return 'PTC'
}

/**
 * Get color for hurricane category
 */
export function getCategoryColor(category: HurricaneCategory): [number, number, number, number] {
	return HURRICANE_COLORS[category]
}

/**
 * Get icon size based on intensity
 */
export function getIconSize(intensity: number): number {
	// Scale from 20px (weak) to 50px (strong)
	const minSize = 20
	const maxSize = 50
	const maxIntensity = 185 // Strongest hurricane on record
	const normalized = Math.min(intensity / maxIntensity, 1)
	return minSize + normalized * (maxSize - minSize)
}

/**
 * Parse latitude string (e.g., "22.9N") to numeric value
 */
export function parseLatitude(latStr: string): number {
	const value = parseFloat(latStr)
	return latStr.includes('S') ? -value : value
}

/**
 * Parse longitude string (e.g., "79.9W") to numeric value
 */
export function parseLongitude(lonStr: string): number {
	const value = parseFloat(lonStr)
	return lonStr.includes('W') ? -value : value
}

/**
 * Process raw tropical storm data for visualization
 */
export function processStormData(rawData: TropicalStormData): ProcessedStormData {
	const category = getHurricaneCategory(rawData.intensity, rawData.classification)
	const color = getCategoryColor(category)
	const iconSize = getIconSize(rawData.intensity)

	return {
		id: rawData.id,
		name: rawData.name,
		classification: rawData.classification,
		category,
		intensity: rawData.intensity,
		pressure: rawData.pressure,
		latitude: rawData.latitudeNumeric,
		longitude: rawData.longitudeNumeric,
		movementDir: rawData.movementDir,
		movementSpeed: rawData.movementSpeed,
		lastUpdate: new Date(rawData.lastUpdate),
		color,
		iconSize,
	}
}

/**
 * Convert array of raw storm data to processed format
 */
export function processStormDataArray(rawDataArray: TropicalStormData[]): ProcessedStormData[] {
	return rawDataArray.map(processStormData)
}

