import { getData } from '../dataCall-generic'
import { getAnalysisMRMSData } from './query-analysis'

export const getHydroGeneralTextProducts = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/national/hydrological/json'
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getERODiscussions = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/json/KWBC/FOUS30_QPFERD'
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getEROGraphics = async (validtime) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/hydro/get-ero.php?valid=${validtime}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getHydroTextProductById = async (productQueryString) => {
	// swap out - for / to match endpoint format
	productQueryString = productQueryString.replace(/-/g, '/')
	const endpoint = `https://weather.cod.edu/textserv/json/${productQueryString}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}
export const getHydroMRMSData = async (productId, frames) => {
	return getAnalysisMRMSData(productId, frames) // reuse analysis MRMS function
}
export const getHydroFFGData = async (productId, images) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/hydro/get-ffg.php?parms=${productId}-${images}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getHydroQPFData = async (productId, images) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/hydro/get-wpcqpf.php?parms=${productId}-${images}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getHydroLatestGraphics = async () => {
	const endpoint = 'https://weather.cod.edu/datapoints/text/hydro/get-latest.php'
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

// Hydrological hazard type ID (matches hazardMapVars.ts)
const HYDROLOGICAL_HAZARD_TYPE = 'HYDROLOGICAL'

/**
 * Get count of active hydrological hazards (flood, flash flood, coastal flood, etc.)
 * Uses the Apollo GraphQL hazards data
 */
export const getHydrologicalHazardsCount = async (): Promise<number> => {
	// Dynamic import to avoid circular dependencies and keep this file client-compatible
	const { getHazards } = await import('@/apollo/data/getHazards')
	const { prepareAlertsFromAPI } = await import('@/util/hazardMapUtils')

	try {
		const hazardsData = await getHazards()
		const alerts = prepareAlertsFromAPI(hazardsData)

		let count = 0

		// Iterate through all regions and counties to count hydrological hazards
		Object.values(alerts).forEach((regionAlerts: any) => {
			Object.values(regionAlerts).forEach((countyData: any) => {
				if (countyData.alerts && Array.isArray(countyData.alerts)) {
					countyData.alerts.forEach((alert: any) => {
						const hazardType = alert.hazardInfo?.type?.type
						if (hazardType && hazardType === HYDROLOGICAL_HAZARD_TYPE) {
							count++
						}
					})
				}
			})
		})

		return count
	} catch (error) {
		console.error('Error fetching hydrological hazards count:', error)
		return 0
	}
}
