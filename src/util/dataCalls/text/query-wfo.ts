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

export const getWFOproductsById = async (officeId: string) => {
	const endpoint = `https://weather.cod.edu/textserv/wfo/${officeId}/json`
	const data = await getData(endpoint)

	if (!data) {
		throw new Error('No data found for the specified office ID')
	}

	// Transform product categories to add id and validtime properties
	const transformedCategories: { [category: string]: any[] } = {}

	for (const [category, products] of Object.entries(data.cats)) {
		transformedCategories[category] = (products as any[]).map((product) => {
			// Extract id and validtime from link URL
			// Example: https://weather.cod.edu/textserv/product/KLOT/CSUS43_MSMRFD/202511010815
			const urlParts = product.link.split('/')
			const validtime = urlParts[urlParts.length - 1] || ''
			const id = urlParts[urlParts.length - 2] || ''

			// Transform link: replace 'product/' with 'json/' and remove timestamp
			// From: https://weather.cod.edu/textserv/product/KLOT/CSUS43_MSMRFD/202511010815
			// To: https://weather.cod.edu/textserv/json/KLOT/CSUS43_MSMRFD -- these links return a history of the product
			// all ready for sending to a text slideout
			const transformedLink = product.link.replace('/product/', '/json/').replace(/\/\d{12}$/, '')

			return {
				...product,
				link: transformedLink,
				id,
				validtime,
			}
		})
	}

	const response = {
		productCategories: transformedCategories,
		id: data.office,
		title: data.plain_name,
	}
	return response
}
export const getWFOproductHistory = async (officeId: string, productId: string) => {
	const endpoint = `https://weather.cod.edu/textserv/json/${officeId}/${productId}`
	const data = await getData(endpoint)

	if (!data) {
		throw new Error('No data found for the specified product history')
	}
	return data
}
