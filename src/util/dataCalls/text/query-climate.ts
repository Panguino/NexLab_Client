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
	const endpoint = `https://weather.cod.edu/datapoints/text/climate/get-outlooks.php?parms=${$productId}-${$validTime}`
	const data = await getData(endpoint)
	return data
}

export const getSeasonalOutlookData = async ($productId, $validTime) => {
	let $prodParam = ''
	switch ($productId) {
		case 'seasonal_temp_outlook':
			$prodParam = 'temp'
			break
		case 'seasonal_precip_outlook':
			$prodParam = 'prcp'
			break
		default:
			$prodParam = 'temp'
			break
	}
	const endpoint = `https://weather.cod.edu/datapoints/text/climate/get-seasonal.php?parms=${$prodParam}-${$validTime}`
	const data = await getData(endpoint)
	return data
}

export const getClimateSSTOLRData = async ($productId, $sectorId, $images) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/climate/get-sstolr.php?parms=${$productId}-${$sectorId}-${$images}`
	const data = await getData(endpoint)
	return data
}

export const getClimateLatestGraphics = async () => {
	const endpoint = 'https://weather.cod.edu/datapoints/text/climate/get-latest.php'
	const data = await getData(endpoint)
	return data
}
