import { getData } from '../dataCall-generic'

export const getSoundingData = async (siteId, productId, numberOfFrames) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/soundings/get-files.php?parms=${siteId}-${productId}-${numberOfFrames}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			frames: data.files,
			textfiles: data.textfiles,
			validtimes: data.validtimes,
			imageInfo: data.img,
		}
	} else {
		return {
			frames: [],
			textfiles: [],
			validtimes: [],
			imageInfo: { width: 800, height: 600 },
			error: data.error,
		}
	}
}
