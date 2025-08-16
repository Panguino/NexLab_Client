import { getData } from '../dataCall-generic'

export const getCompareHeightData = async (model, run, sector, product, validtime) => {
	// this function actually makes the request to generate a sounding
	// location will contain '-' for longitude, so delimiter is '|' : making note because this is atypical
	// "validtime" actually needs to be in HHH format before this point. It may be worth it to set this endpoint up
	// so that it can accept unix timestamps, but for now we will just use the HHH format
	const params = [model, run, sector, product, validtime].join('-')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-compare-height.php?parms=${params}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			frames: data.frames,
			levels: data.levels,
			imageInfo: data.img,
		}
	} else {
		return {
			frames: [],
			levels: [],
			imageInfo: { width: 800, height: 600 },
			error: data.error,
		}
	}
}

export const getCompareRunsData = async (model, sector, level, product, validtime) => {
	// this function actually makes the request to generate a sounding
	// location will contain '-' for longitude, so delimiter is '|' : making note because this is atypical
	// "validtime" actually needs to be in HHH format before this point. It may be worth it to set this endpoint up
	// so that it can accept unix timestamps, but for now we will just use the HHH format
	const params = [model, sector, level, product, validtime].join('-')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-compare-runs.php?parms=${params}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			frames: data.frames,
			runs: data.runs,
			imageInfo: data.img,
		}
	} else {
		return {
			frames: [],
			runs: [],
			imageInfo: { width: 800, height: 600 },
			error: data.error,
		}
	}
}

export const getCompareModelsData = async (run, sector, level, product, validtime) => {
	// this function actually makes the request to generate a sounding
	// location will contain '-' for longitude, so delimiter is '|' : making note because this is atypical
	// "validtime" actually needs to be in HHH format before this point. It may be worth it to set this endpoint up
	// so that it can accept unix timestamps, but for now we will just use the HHH format
	const params = [run, sector, level, product, validtime].join('-')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-compare-models.php?parms=${params}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			frames: data.frames,
			models: data.models,
			imageInfo: data.img,
		}
	} else {
		return {
			frames: [],
			models: [],
			imageInfo: { width: 800, height: 600 },
			error: data.error,
		}
	}
}
