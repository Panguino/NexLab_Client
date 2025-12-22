import { getData } from '../dataCall-generic'

export const getMarineTextProducts = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/national/misc/json'
	const data = await getData(endpoint)
	return data.marine ?? null
}
