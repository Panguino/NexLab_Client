import { getData } from '../dataCall'

export const getCrossSectionData = async (site) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/cross-section/get-files.php?parms=${site}`
	return await getData(endpoint)
}
