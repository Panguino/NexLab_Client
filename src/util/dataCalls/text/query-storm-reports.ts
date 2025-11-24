import { getData } from '../dataCall-generic'

export const getLocalStormReports = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/json/lsr?days=3'
	const data = await getData(endpoint)
	return data
}
