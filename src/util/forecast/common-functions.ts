export const fetchStationCoordinates = async (stationId: string): Promise<string> => {
	try {
		const response = await fetch(`https://api.weather.gov/stations/${stationId}`)

		if (!response.ok) {
			throw new Error(`Station API error: ${response.status}`)
		}

		const data = await response.json()

		if (data.geometry && Array.isArray(data.geometry.coordinates) && data.geometry.coordinates.length === 2) {
			const [longitude, latitude] = data.geometry.coordinates
			return `${latitude.toFixed(1)},${longitude.toFixed(1)}`
		} else {
			throw new Error('Station coordinates not found')
		}
	} catch (err) {
		console.error('Error fetching station data:', err)
		throw err // Rethrow to let the calling code handle it
	}
}

export const fetchFloaterSectorData = async () => {
	try {
		const response = await fetch('https://weather.cod.edu/datapoints/forecast/get-floaters.php')
		if (!response.ok) {
			throw new Error(`Failed to fetch sector data: ${response.status} ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching sector data:', error)
		return null
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

/**
 * Calculates the forecast hour difference between two Unix timestamps
 * and formats it as a 3-digit padded string
 *
 * @param runId - Unix timestamp for the model run time
 * @param validtimeId - Unix timestamp for the valid time
 * @returns 3-digit zero-padded hour difference string
 */
export const forecastHourFromUnixValidtime = (runId: number, validtimeId: number): string => {
	// Calculate difference in seconds
	const diffSeconds = validtimeId - runId

	// Convert to hours and round down to integer
	const diffHours = Math.floor(diffSeconds / 3600)

	// Pad with leading zeros to ensure 3 digits
	return diffHours.toString().padStart(3, '0')
}
/**
 * Retrieves the infoId string by traversing through nested product objects
 *
 * @param obj - The product object to search within
 * @param level - The level identifier to match
 * @param model - The model identifier to match (only checked within a valid level)
 * @returns The found infoId string or false if not found
 */
export const getModelProductInfoId = (obj: any, level: string, model: string): string | false => {
	console.log('product object being evaluated', obj)
	// Base case: if infoId doesn't exist, return false immediately
	if (!obj.infoId) {
		return false
	}

	// Case 1: infoId is a simple string
	if (typeof obj.infoId === 'string') {
		return obj.infoId
	}

	// Case 2: infoId is an object with levels
	const levelValue = obj.infoId[level] || obj.infoId.general

	// If no matching level or general fallback found, return false
	if (!levelValue) {
		return false
	}

	// Case 2a: level value is a string - we're done
	if (typeof levelValue === 'string') {
		return levelValue
	}

	// Case 2b: level value is an object - check for model
	// Model is only checked within a valid level object
	console.log('model in levelValue', levelValue[model], 'levelValue:', levelValue)
	const modelValue = levelValue[model] || levelValue.general

	// Return model value if it's a string, otherwise false
	return typeof modelValue === 'string' ? modelValue : false
}
