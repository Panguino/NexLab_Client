import { getData } from '../dataCall-generic'

export const getSoundingData = async (model, run, sector, level, product, validtime, location, parcel, weather) => {
	// this function actually makes the request to generate a sounding
	// location will contain '-' for longitude, so delimiter is '|' : making note because this is atypical
	// "validtime" actually needs to be in HHH format before this point. It may be worth it to set this endpoint up
	// so that it can accept unix timestamps, but for now we will just use the HHH format
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
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-validtimes.php?parms=${params}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			validtimes: data.validtimes,
		}
	} else {
		return {
			validtimes: [],
			error: data.err,
		}
	}
}
