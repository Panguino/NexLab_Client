import { getData } from '../dataCall'

export const getSatradData = async (scale, sector, product, frames, interval) => {
	const endpoint = `https://weather.cod.edu/datapoints/satrad/get-files.php?parms=${scale}-${sector}-${product}-${frames}-${interval}`
	return await getData(endpoint)
}
