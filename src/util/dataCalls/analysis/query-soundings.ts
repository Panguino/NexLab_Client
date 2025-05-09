import { getData } from '../dataCall'

export const getSoundingData = async (siteId, productId, numberOfFrames) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/soundings/get-files.php?parms=${siteId}-${productId}-${numberOfFrames}`
	return await getData(endpoint)
}
