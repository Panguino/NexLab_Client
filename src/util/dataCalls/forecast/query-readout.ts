import { getData } from '../dataCall-generic'

export const getFrameReadoutData = async (model, run, sector, level, product, validTime) => {
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-readout.php?parms=${model}-${run}-${sector}-${level}-${product}-${validTime}`
	console.log('getFrameReadoutData endpoint:', endpoint)
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			dataTypes: data.dataTypes,
			readoutData: data.readoutData,
			padding: data.padding,
		}
	} else {
		return {
			dataTypes: [],
			readoutData: {},
			padding: { top: 26, left: 0, right: 0, bottom: 26 },
			error: data.error,
		}
	}
}
