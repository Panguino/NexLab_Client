export const fetchStationCoordinates = async (stationId: string): Promise<string> => {
	try {
		const response = await fetch(`https://api.weather.gov/stations/${stationId}`)

		if (!response.ok) {
			throw new Error(`Station API error: ${response.status}`)
		}

		const data = await response.json()

		if (data.geometry && Array.isArray(data.geometry.coordinates) && data.geometry.coordinates.length === 2) {
			const [longitude, latitude] = data.geometry.coordinates
			return `${latitude},${longitude}`
		} else {
			throw new Error('Station coordinates not found')
		}
	} catch (err) {
		console.error('Error fetching station data:', err)
		throw err // Rethrow to let the calling code handle it
	}
}

import { FORECAST_LEVEL_ORDER } from '@/data/forecast/levels'
import { FORECAST_MODELS } from '@/data/forecast/models'

/**
 * Builds a list of products organized by level for a given model and sector
 *
 * @param modelId - The forecast model identifier
 * @param sectorId - The sector identifier
 * @returns Array of objects containing level and products information
 */
export const buildProductsByLevel = (modelId: string, sectorId: string) => {
	// Return empty array if model doesn't exist
	if (!FORECAST_MODELS[modelId]) return []

	// Get products for the sector, falling back to 'general' if needed
	const productArray = FORECAST_MODELS[modelId].products?.[sectorId] ?? FORECAST_MODELS[modelId].products['general']

	// Build products by level using the defined level order
	const productsByLevel = FORECAST_LEVEL_ORDER.filter((level) => productArray[level]).map((level) => ({
		level,
		products: productArray[level] as string[],
	}))

	return productsByLevel
}
