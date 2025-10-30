import { getData } from '../../dataCall-generic'

export const getTropicalGeneralData = async (productId) => {
	// eventually we will have to receive valid time, but for now just get the most recent
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

	// get the most recent entry from this object
	// keys are timestamps in YYYYMMDDHHmm format
	const timestamps = Object.keys(data)
	const latestTimestamp = timestamps.sort().reverse()[0]
	const productLink = `https://weather.cod.edu/textserv/raw/${productQueryString}/${latestTimestamp}`

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

	return {
		timestamp: latestTimestamp,
		link: productLink,
		content: productData,
	}
}
