import { getData } from '../dataCall-generic'

export const getSatradData = async (scale, sector, product, frames, interval) => {
	const endpoint = `https://weather.cod.edu/datapoints/satrad/get-files.php?parms=${scale}-${sector}-${product}-${frames}-${interval}`
	const data = await getData(endpoint)

	if (!data.err) {
		return {
			imageInfo: data.img,
			frames: data.files,
			validtimes: data.validtimes,
			overlays: data.overlays,
		}
	} else {
		return {
			imageInfo: { width: 1600, height: 900 },
			frames: [],
			validtimes: [],
			overlays: { static: {}, dynamic: {} },
			error: data.err,
		}
	}
}
