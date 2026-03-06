import { getData } from '../dataCall-generic'

export const getSpaceTextProducts = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/national/misc/json'
	const data = await getData(endpoint)
	return data.space ?? null
}

export const getSpaceTextProductHistory = async (officeId: string, productId: string) => {
	const endpoint = `https://weather.cod.edu/textserv/json/${officeId}/${productId}`
	const data = await getData(endpoint)
	return data
}
