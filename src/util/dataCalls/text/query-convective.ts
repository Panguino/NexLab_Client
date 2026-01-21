import { getData } from '../dataCall-generic'

export const getAllConvectiveOutlookGraphics = async () => {
	const endpoint = 'https://weather.cod.edu/datapoints/text/convective/get-outlooks.php'
	const data = await getData(endpoint)
	return data
}

export const getConvectiveOutlookTextData = async (productId) => {
	let productQueryString
	switch (productId) {
		// there is probably a good case to move this to the data file and have a special query string passed to this function
		case 'DY1':
			productQueryString = 'KWNS/ACUS01_SWODY1'
			break
		case 'DY2':
			productQueryString = 'KWNS/ACUS02_SWODY2'
			break
		case 'DY3':
			productQueryString = 'KWNS/ACUS03_SWODY3'
			break
		case 'DY48':
			productQueryString = 'KWNS/ACUS48_SWOD48'
			break
		default:
			return false // Invalid productId for general data
	}

	const endpoint = `https://weather.cod.edu/textserv/json/${productQueryString}`
	const data = await getData(endpoint)

	// make sure this data object isn't empty
	if (!data || Object.keys(data).length === 0) {
		return false
	}

	// Return the data object directly - keys are timestamps (YYYYMMDDHHmm), values are URLs
	return data
}

export const getStatsAndMessages = async (productId) => {
	let productQueryString
	switch (productId) {
		case 'prelim-killer-tornado':
			productQueryString = 'KWNS/NWUS23_STATIJ'
			break
		case 'tornado-totals-and-deaths':
			productQueryString = 'KWNS/NWUS21_STAMTS'
			break
		case 'hourly-tor-and-svr-reports':
			productQueryString = 'KWNS/NWUS22_STAHRY'
			break
		case 'daily-tor-and-svr-reports':
			productQueryString = 'KWNS/NWUS20_STADTS'
			break
		case 'admin-messages':
			productQueryString = 'KWNS/NOUS74_ADMSPC'
			break
		default:
			return false // Invalid productId for stats and messages
	}

	const endpoint = `https://weather.cod.edu/textserv/json/${productQueryString}`
	const data = await getData(endpoint)
	return data
}

export const getConvectiveOutlookGraphics = async (productId, validtimeId) => {
	const queryURL = `https://weather.cod.edu/datapoints/text/convective/get-outlook.php?parms=${productId}-${validtimeId}`
	console.log('Fetching convective outlook graphics from:', queryURL)
	const data = await getData(queryURL)

	console.log('Fetched convective outlook graphics:', 'productId', productId, 'validtimeId', validtimeId, 'data', data)

	if (!data || Object.keys(data).length === 0) {
		return false
	}

	return data
}

export const getMesoscaleDiscussions = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/json/md'
	const data = await getData(endpoint)
	return data
}

export const getConvectiveWatches = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/json/watch/'
	const data = await getData(endpoint)
	return data
}

export const getWatchDetails = async (watchNumber: string) => {
	const endpoint = `https://weather.cod.edu/textserv/watch/${watchNumber}/json`
	const data = await getData(endpoint)
	return data
}

export const getMesoscaleDiscussion = async (mesoId: string) => {
	const endpoint = `https://weather.cod.edu/textserv/md/${mesoId}/json`
	const data = await getData(endpoint)
	return data
}

export const getLocalStormReports = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/json/lsr?days=3'
	const data = await getData(endpoint)
	return data
}

// Convective hazard type IDs (matches hazardMapVars.ts)
const CONVECTIVE_HAZARD_TYPES = ['TORNADO', 'SEVERE', 'HYDROLOGICAL']

/**
 * Get count of active convective hazards (tornado, severe thunderstorm, hydrological)
 * Uses the Apollo GraphQL hazards data
 */
export const getConvectiveHazardsCount = async (): Promise<number> => {
	// Dynamic import to avoid circular dependencies and keep this file client-compatible
	const { getHazards } = await import('@/apollo/data/getHazards')
	const { prepareAlertsFromAPI } = await import('@/util/hazardMapUtils')

	try {
		const hazardsData = await getHazards()
		const alerts = prepareAlertsFromAPI(hazardsData)

		let count = 0

		// Iterate through all regions and counties to count convective hazards
		Object.values(alerts).forEach((regionAlerts: any) => {
			Object.values(regionAlerts).forEach((countyData: any) => {
				if (countyData.alerts && Array.isArray(countyData.alerts)) {
					countyData.alerts.forEach((alert: any) => {
						const hazardType = alert.hazardInfo?.type?.type
						if (hazardType && CONVECTIVE_HAZARD_TYPES.includes(hazardType)) {
							count++
						}
					})
				}
			})
		})

		return count
	} catch (error) {
		console.error('Error fetching convective hazards count:', error)
		return 0
	}
}
