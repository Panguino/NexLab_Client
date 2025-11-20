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
