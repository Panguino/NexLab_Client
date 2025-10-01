import { getData } from '../dataCall'

export const getNexradData = async (site, product, frames) => {
	const endpoint = `https://weather.cod.edu/datapoints/nexrad/get-files.php?parms=${site}-${product}-${frames}`
	return await getData(endpoint)
}
