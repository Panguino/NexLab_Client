import { getData } from '../dataCall-generic'

export const getLatestFireGraphics = async () => {
	const endpoint = 'https://weather.cod.edu/datapoints/text/fire/get-latest-graphics.php'
	const data = await getData(endpoint)
	return data
}

export const getFireDroughtDiscussions = async (productId) => {
	const usdmEndpoint = 'https://weather.cod.edu/datapoints/text/fire/get-dmsum.php'
	const fwoPrefix = 'https://weather.cod.edu/textserv/json/'
	let productQueryString = ''
	switch (productId) {
		case 'fwody1':
			productQueryString = 'KWNS/FNUS21_FWDDY1'
			break
		case 'fwody2':
			productQueryString = 'KWNS/FNUS22_FWDDY2'
			break
		case 'fwdd38':
			productQueryString = 'KWNS/FNUS28_FWDD38'
			break
		case 'usdm':
			productQueryString = null
			break
		default:
			return false // Invalid productId for fire drought discussions
	}
	const endpoint = productId === 'usdm' ? usdmEndpoint : fwoPrefix + productQueryString
	const data = await getData(endpoint)
	return data
}
