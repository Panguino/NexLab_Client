import { getData } from '../dataCall'

export const getForecastData = async (model, run, sector, level, product) => {
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-files.php?parms=${model}-${run}-${sector}-${level}-${product}`
	return await getData(endpoint)
}
