import { getData } from '../../dataCall'

export const getUpperAirData = async (sector, level, product) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/upper-air/get-files.php?parms=${sector}-${level}-${product}`
	return await getData(endpoint)
}
