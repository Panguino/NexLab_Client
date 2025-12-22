import { getData } from '../dataCall-generic'

export const getMarineTextProducts = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/national/misc/json'
	const data = await getData(endpoint)
	return data.marine ?? null
}

export const getTextProductHistory = async (officeId: string, productId: string) => {
	const endpoint = `https://weather.cod.edu/textserv/json/${officeId}/${productId}`
	const data = await getData(endpoint)
	return data
}
