import { getData } from '../dataCall-generic'

export const getLatestFireGraphics = async () => {
	const endpoint = 'https://weather.cod.edu/datapoints/text/fire/get-latest-graphics.php'
	const data = await getData(endpoint)
	return data
}
