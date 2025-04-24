import { getData } from '../dataCall'

export const getIsentropicData = async (product) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/isentropic/get-files.php?parms=${product}`
	return await getData(endpoint)
}
