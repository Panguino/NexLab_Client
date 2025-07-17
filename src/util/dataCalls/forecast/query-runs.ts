import { getData } from '../dataCall'

export const getModelRuns = async (model) => {
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-runs.php?model=${model}`
	return await getData(endpoint)
}
