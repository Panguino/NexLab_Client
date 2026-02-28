import { getData } from '../dataCall-generic'

/**
 * Fetches a product URL and extracts plain text content from the HTML <pre> tag
 * @param productLink - The full URL to the product text content
 * @returns Extracted plain text content from the <pre> tag
 */
export const productURLtoText = async (productLink: string) => {
	// Fetch the raw HTML content (not JSON)
	const htmlResponse = await fetch(productLink)
	if (!htmlResponse.ok) {
		throw new Error(`HTTP error! status: ${htmlResponse.status}`)
	}
	const htmlText = await htmlResponse.text()

	// Use DOMParser to safely extract text from <pre> tag
	const parser = new DOMParser()
	const doc = parser.parseFromString(htmlText, 'text/html')
	const preElement = doc.querySelector('pre')
	const productData = preElement?.textContent || ''

	return productData
}

export const getTropicalGeneralData = async (productId) => {
	let productQueryString
	switch (productId) {
		// there is probably a good case to move this to the data file and have a special query string passed to this function
		case 'TWOAT':
			productQueryString = 'KNHC/ABNT20_TWOAT'
			break
		case 'TWOEP':
			productQueryString = 'KNHC/ABPZ20_TWOEP'
			break
		case 'TWOCP':
			productQueryString = 'PHFO/ACPN50_TWOCP'
			break
		case 'TWDAT':
			productQueryString = 'KNHC/AXNT20_TWDAT'
			break
		case 'TWDEP':
			productQueryString = 'KNHC/AXPZ20_TWDEP'
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

export const getActiveTropicalStorms = async () => {
	const endpoint = 'https://weather.cod.edu/wxdata/tropical/gis/CurrentStorms.json' // live/operational endpoint
	const data = await getData(endpoint)

	if (data && Object.keys(data).length > 0) {
		return data
	} else {
		// No active storms
		return false
	}
}

export const getTropicalStormData = async (stormId) => {
	// eventually we will have to receive valid time, but for now just get the most recent
	const endpoint = `https://weather.cod.edu/textserv/dev/tropical/json/${stormId}`
	const data = await getData(endpoint)

	// make sure this data object isn't empty
	if (data && Object.keys(data).length > 0) {
		return data
	} else {
		return false
	}
}
