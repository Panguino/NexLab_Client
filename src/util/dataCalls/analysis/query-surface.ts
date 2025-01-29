import { getData } from '../dataCall'

export const getSurfaceData = async (scale, site, product, frames) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/surface/get-files.php?parms=${scale}-${site}-${product}-${frames}`
	return await getData(endpoint)
}
