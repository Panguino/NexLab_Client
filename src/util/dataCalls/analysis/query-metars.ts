import { getData } from '../dataCall-generic'

export const getMetarData = async (state, product) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/surface/get-state-metar.php?parms=${state}-${product}`
	const data = await getData(endpoint)
	if (!data.error) {
		return {
			content: data.content,
		}
	} else {
		return {
			error: data.error,
			content: null,
		}
	}
}
