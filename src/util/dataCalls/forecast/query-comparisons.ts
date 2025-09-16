import { getData } from '../dataCall-generic'

export const getCompareHeightData = async (model, run, sector, product, validtime) => {
	const params = [model, run, sector, product, validtime].join('-')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-compare-height.php?parms=${params}`
	console.log('getCompareHeightData endpoint:', endpoint)
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			frames: data.frames,
			levels: data.levels,
			validtimes: data.validtimes,
			imageInfo: data.img,
		}
	} else {
		return {
			frames: [],
			levels: [],
			validtimes: [],
			imageInfo: { width: 800, height: 600 },
			error: data.error,
		}
	}
}

export const getCompareRunsData = async (model, sector, level, product, validtime) => {
	const params = [model, sector, level, product, validtime].join('-')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-compare-runs.php?parms=${params}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			frames: data.frames,
			runs: data.runs,
			validtimes: data.validtimes,
			imageInfo: data.img,
		}
	} else {
		return {
			frames: [],
			runs: [],
			validtimes: data.validtimes,
			imageInfo: { width: 800, height: 600 },
			error: data.error,
		}
	}
}

export const getCompareModelsData = async (run, sector, level, product, validtime, runFlag) => {
	const params = [run, sector, level, product, validtime, runFlag].join('-')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-compare-models.php?parms=${params}`
	const data = await getData(endpoint)
	// capture data.warn for more information if needed for debugging
	if (!data.err) {
		return {
			frames: data.frames,
			models: data.models,
			validtimes: data.validtimes,
			imageInfo: data.img,
		}
	} else {
		return {
			frames: [],
			models: [],
			validtimes: [],
			imageInfo: { width: 800, height: 600 },
			error: data.error,
		}
	}
}
