import { getMenu } from '../menuCall'

export const getForecastMenu = async (model, sector) => {
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-menu.php?parms=${model}-${sector}`
	return await getMenu(endpoint)
}
