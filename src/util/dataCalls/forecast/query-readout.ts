import { getData } from '../dataCall'

export const getFrameReadoutData = async (model, run, sector, level, product, frameIndex) => {
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-readout.php?parms=${model}-${run}-${sector}-${level}-${product}-${frameIndex}`
	return await getData(endpoint)
}
