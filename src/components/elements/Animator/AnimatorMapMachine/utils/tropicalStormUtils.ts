/**
 * Utility functions for tropical storm data
 * Handles fetching, parsing, and processing NHC tropical storm data
 */

import { ProcessedStormData, TropicalStormData, processStormDataArray } from '../types/tropicalStormTypes'

/**
 * Fetch tropical storm data from NHC API
 * @param url - API endpoint URL
 * @returns Array of processed storm data
 */
export async function fetchTropicalStormData(url: string): Promise<ProcessedStormData[]> {
	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Failed to fetch tropical storm data: ${response.statusText}`)
		}

		const data = await response.json()

		// Convert object of storms to array
		const stormsArray: TropicalStormData[] = Object.values(data).filter((storm: any) => {
			// Validate required fields
			return (
				storm &&
				storm.id &&
				storm.name &&
				storm.latitudeNumeric !== undefined &&
				storm.longitudeNumeric !== undefined &&
				storm.intensity !== undefined &&
				storm.pressure !== undefined
			)
		})

		// Process and return
		return processStormDataArray(stormsArray)
	} catch (error) {
		console.error('Error fetching tropical storm data:', error)
		throw error
	}
}

/**
 * Sample tropical storm data for Storybook/testing
 * Based on actual 2017 hurricane season data
 */
export const SAMPLE_TROPICAL_STORMS: TropicalStormData[] = [
	{
		id: 'al112017',
		name: 'Irma',
		classification: 'HU',
		intensity: 125,
		pressure: 941,
		latitude: '22.9N',
		longitude: '79.9W',
		latitudeNumeric: 22.9,
		longitudeNumeric: -79.9,
		movementDir: 280,
		movementSpeed: 9,
		lastUpdate: '2017-09-09T16:00:00.000Z',
		binNumber: 'AT1',
	},
	{
		id: 'al122017',
		name: 'Jose',
		classification: 'HU',
		intensity: 145,
		pressure: 945,
		latitude: '18.3N',
		longitude: '61.3W',
		latitudeNumeric: 18.3,
		longitudeNumeric: -61.3,
		movementDir: 305,
		movementSpeed: 13,
		lastUpdate: '2017-09-09T15:00:00.000Z',
		binNumber: 'AT2',
	},
	{
		id: 'al132017',
		name: 'Katia',
		classification: 'PTC',
		intensity: 35,
		pressure: 1004,
		latitude: '20.0N',
		longitude: '97.9W',
		latitudeNumeric: 20.0,
		longitudeNumeric: -97.9,
		movementDir: 240,
		movementSpeed: 5,
		lastUpdate: '2017-09-09T15:00:00.000Z',
		binNumber: 'AT3',
	},
]

/**
 * Get processed sample tropical storm data
 */
export function getSampleTropicalStorms(): ProcessedStormData[] {
	return processStormDataArray(SAMPLE_TROPICAL_STORMS)
}

/**
 * Filter storms by classification
 */
export function filterStormsByClassification(
	storms: ProcessedStormData[],
	classification: string,
): ProcessedStormData[] {
	return storms.filter((storm) => storm.classification === classification)
}

/**
 * Filter storms by intensity range
 */
export function filterStormsByIntensity(
	storms: ProcessedStormData[],
	minIntensity: number,
	maxIntensity: number,
): ProcessedStormData[] {
	return storms.filter((storm) => storm.intensity >= minIntensity && storm.intensity <= maxIntensity)
}

/**
 * Sort storms by intensity (descending)
 */
export function sortStormsByIntensity(storms: ProcessedStormData[]): ProcessedStormData[] {
	return [...storms].sort((a, b) => b.intensity - a.intensity)
}

/**
 * Sort storms by pressure (ascending - lower pressure = stronger)
 */
export function sortStormsByPressure(storms: ProcessedStormData[]): ProcessedStormData[] {
	return [...storms].sort((a, b) => a.pressure - b.pressure)
}

/**
 * Get strongest storm
 */
export function getStrongestStorm(storms: ProcessedStormData[]): ProcessedStormData | null {
	if (storms.length === 0) return null
	return storms.reduce((strongest, current) => (current.intensity > strongest.intensity ? current : strongest))
}

/**
 * Calculate distance between two points (lat/lon) in kilometers
 * Uses Haversine formula
 */
export function calculateDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
): number {
	const R = 6371 // Earth's radius in km
	const dLat = ((lat2 - lat1) * Math.PI) / 180
	const dLon = ((lon2 - lon1) * Math.PI) / 180
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return R * c
}

/**
 * Find storms near a location
 */
export function findStormsNearLocation(
	storms: ProcessedStormData[],
	latitude: number,
	longitude: number,
	radiusKm: number,
): ProcessedStormData[] {
	return storms.filter((storm) => {
		const distance = calculateDistance(latitude, longitude, storm.latitude, storm.longitude)
		return distance <= radiusKm
	})
}

/**
 * Format storm information for display
 */
export function formatStormInfo(storm: ProcessedStormData): string {
	return `${storm.name} (${storm.classification}) - ${storm.intensity} kt, ${storm.pressure} mb`
}

