import { getData } from '../../dataCall'

export const getSoundingData = async (region, site, product) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/soundings/get-files.php?parms=${region}-${site}-${product}`
	return await getData(endpoint)
}
