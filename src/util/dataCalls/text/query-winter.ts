import { getData } from '../dataCall-generic'

export const getWinterData = async (productId: string) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/winter/get-files.php?product=${productId}`
	return getData(endpoint)
}
