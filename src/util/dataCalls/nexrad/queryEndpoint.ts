import { getData } from '../dataCall'

export const getNexradData = async (site, product, frames) => {
	const endpoint = `https://weather.cod.edu/satrad/nexrad/assets/php/get-files.php?parms=${site}-${product}-0-${frames}-100`
	return await getData(endpoint)
}
