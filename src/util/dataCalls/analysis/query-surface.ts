import { getData } from '../dataCall-generic'

export const getSurfaceData = async (scale, site, product, frames) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/surface/get-files.php?parms=${scale}-${site}-${product}-${frames}`
	const data = await getData(endpoint)
	if (!data.err) {
		return {
			frames: data.files,
			validtimes: data.validtimes,
			imageInfo: data.img,
			pdfs: data.pdfs,
		}
	} else {
		return {
			frames: [],
			validtimes: [],
			imageInfo: { width: 800, height: 600 },
			pdfs: [],
			error: data.err,
		}
	}
}
