import { getData } from '../dataCall-generic'

export const getAdminTextProducts = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/national/misc/json'
	const data = await getData(endpoint)
	return data.misc ?? null
}

export const getAdminTextProductHistory = async (officeId: string, productId: string) => {
	const endpoint = `https://weather.cod.edu/textserv/json/${officeId}/${productId}`
	const data = await getData(endpoint)
	return data
}
