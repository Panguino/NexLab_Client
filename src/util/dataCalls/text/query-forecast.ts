import { getData } from '../dataCall-generic'

export const getForecastTextProduct = async (productId) => {
	let productQueryString
	switch (productId) {
		// selected city summaries
		case 'short-range-discussion':
			productQueryString = 'KWBC/FXUS01_PMDSPD'
			break
		case 'extended-discussion':
			productQueryString = 'KWBC/FXUS02_PMDEPD'
			break
		case '6-14-discussion':
			productQueryString = 'KWBC/FXUS06_PMDMRD'
			break
		case 'alaska-extended-discussion':
			productQueryString = 'KWNH/FXAK02' // should be FXAK02_PMDAK but the db doesnt have anything
			break
		case 'hawaii-extended-discussion':
			productQueryString = 'KWNH/FXHW01_PMDHI'
			break
		case 'south-america-discussion':
			productQueryString = 'KWBC/FXSA20_PMDSA'
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

export const getWPCFrontsData = async (productId) => {
	// example productId: 12HR, 24HR, 36HR, 48HR
	const endpoint = `https://weather.cod.edu/datapoints/text/forecast/get-wpcfronts.php?product=${productId}`
	const data = await getData(endpoint)

	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}
