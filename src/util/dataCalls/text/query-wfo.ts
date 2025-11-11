import { getData } from '../dataCall-generic'

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

			return {
				...product,
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
