import { getData } from '../dataCall-generic'

export const getClimateTextHistory = async ($productQueryString) => {
	const endpoint = `https://weather.cod.edu/textserv/json/${$productQueryString}`
	const data = await getData(endpoint)
	return data
}

export const getClimateTextProduct = async ($productQueryString, $validTime) => {
	const endpoint = `https://weather.cod.edu/textserv/json/${$productQueryString}/${$validTime}`
	const data = await getData(endpoint)
	return data
}

export const getClimateOutlookData = async ($productId, $validTime) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/climate/get-outlooks.php?parms=${$productId}/${$validTime}`
	const data = await getData(endpoint)
	return data
}
