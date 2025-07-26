import { getData } from '../dataCall-generic'

export const getSoundingData = async (model, run, sector, level, product, validtime, location, parcel, weather) => {
	// this function actually makes the request to generate a sounding
	// location will contain '-' for longitude, so delimiter is '|' : making note because this is atypical
	const params = [run, model, sector, level, product, validtime, location, parcel, weather].join('|')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-sounding.php?parms=${params}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			frames: data.frames,
			validtimes: data.validtimes,
			imageInfo: data.img,
		}
	} else {
		return {
			frames: [],
			validtimes: [],
			imageInfo: { width: 1180, height: 783 },
			error: data.error,
		}
	}
}

export const getSoundingRuns = async (model) => {
	// this function is meant to populate values for the menu
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-runs.php?model=${model}`
	const data = await getData(endpoint)
	if (!data.err) {
		return { runs: data.runs }
	} else {
		return {
			runs: {},
			error: data.err,
		}
	}
}

export const getValidtimes = async (model, run, sector, level, product) => {
	// this function is meant to populate values for the menu
	// location will contain '-' for longitude, so delimiter is '|' : making note because this is atypical
	const params = [model, run, sector, level, product].join('-')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-files.php?parms=${params}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			validtimes: data.validtimes,
			imageInfo: data.img,
		}
	} else {
		return {
			validtimes: [],
			error: data.err,
		}
	}
}
