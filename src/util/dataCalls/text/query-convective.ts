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
