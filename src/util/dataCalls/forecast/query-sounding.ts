import { getData } from '../dataCall-generic'

export const getForecastData = async (model, run, sector, level, product, validtime, location, parcel, weather) => {
	// location will contain '-' for longitude, so delimiter is '|' : making note because this is atypical
	const params = [run, model, sector, level, product, validtime, location, parcel, weather].join('|')
	const endpoint = `https://weather.cod.edu/datapoints/forecast/get-sounding.php?parms=${params}`
	const data = await getData(endpoint)
	if (!data.error) {
		return {
			frames: Object.values(data.image) || [],
			validtimes: data.validtimes || [],
		}
	}
	return
}
