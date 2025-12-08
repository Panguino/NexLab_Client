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

export const getWinterData = async (productId: string) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/winter/get-files.php?product=${productId}`
	return getData(endpoint)
}

export const getHeavySnowIceDiscussion = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/json/KWBC/FOUS11_QPFHSD'
	return getData(endpoint)
}
