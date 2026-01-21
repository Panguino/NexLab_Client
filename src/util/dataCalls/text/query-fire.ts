import { getData } from '../dataCall-generic'

export const getLatestFireGraphics = async () => {
	const endpoint = 'https://weather.cod.edu/datapoints/text/fire/get-latest-graphics.php'
	const data = await getData(endpoint)
	return data
}

export const getFireDroughtDiscussions = async (productId) => {
	const usdmEndpoint = 'https://weather.cod.edu/datapoints/text/fire/get-dmsum.php'
	const fwoPrefix = 'https://weather.cod.edu/textserv/json/'
	let productQueryString = ''
	switch (productId) {
		case 'fwody1':
			productQueryString = 'KWNS/FNUS21_FWDDY1'
			break
		case 'fwody2':
			productQueryString = 'KWNS/FNUS22_FWDDY2'
			break
		case 'fwdd38':
			productQueryString = 'KWNS/FNUS28_FWDD38'
			break
		case 'usdm':
			productQueryString = null
			break
		default:
			return false // Invalid productId for fire drought discussions
	}
	const endpoint = productId === 'usdm' ? usdmEndpoint : fwoPrefix + productQueryString
	const data = await getData(endpoint)
	return data
}

export const getFireAnalysisGraphics = async (productId, numFrames) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/fire/get-analysis.php?parms=${productId}-${numFrames}`
	const data = await getData(endpoint)
	return data
}

export const getFireDroughtGraphicsByValidTime = async (productId, validTime) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/fire/get-outlooks.php?parms=${productId}-${validTime}`
	const data = await getData(endpoint)
	return data
}

// Fire hazard type ID (matches hazardMapVars.ts)
const FIRE_HAZARD_TYPE = 'FIRE'

/**
 * Get count of active fire hazards (fire warning, red flag warning, fire weather watch)
 * Uses the Apollo GraphQL hazards data
 */
export const getFireHazardsCount = async (): Promise<number> => {
	// Dynamic import to avoid circular dependencies and keep this file client-compatible
	const { getHazards } = await import('@/apollo/data/getHazards')
	const { prepareAlertsFromAPI } = await import('@/util/hazardMapUtils')

	try {
		const hazardsData = await getHazards()
		const alerts = prepareAlertsFromAPI(hazardsData)

		let count = 0

		// Iterate through all regions and counties to count fire hazards
		Object.values(alerts).forEach((regionAlerts: any) => {
			Object.values(regionAlerts).forEach((countyData: any) => {
				if (countyData.alerts && Array.isArray(countyData.alerts)) {
					countyData.alerts.forEach((alert: any) => {
						const hazardType = alert.hazardInfo?.type?.type
						if (hazardType && hazardType === FIRE_HAZARD_TYPE) {
							count++
						}
					})
				}
			})
		})

		return count
	} catch (error) {
		console.error('Error fetching fire hazards count:', error)
		return 0
	}
}
