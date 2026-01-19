import { getData } from '../dataCall-generic'
import { getAnalysisMRMSData } from './query-analysis'

export const getHydroGeneralTextProducts = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/national/hydrological/json'
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getERODiscussions = async () => {
	const endpoint = 'https://weather.cod.edu/textserv/json/KWBC/FOUS30_QPFERD'
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getEROGraphics = async (validtime) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/hydro/get-ero.php?valid=${validtime}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getHydroTextProductById = async (productQueryString) => {
	// swap out - for / to match endpoint format
	productQueryString = productQueryString.replace(/-/g, '/')
	const endpoint = `https://weather.cod.edu/textserv/json/${productQueryString}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}
export const getHydroMRMSData = async (productId, frames) => {
	return getAnalysisMRMSData(productId, frames) // reuse analysis MRMS function
}
export const getHydroFFGData = async (productId, images) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/hydro/get-ffg.php?parms=${productId}-${images}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getHydroQPFData = async (productId, images) => {
	const endpoint = `https://weather.cod.edu/datapoints/text/hydro/get-wpcqpf.php?parms=${productId}-${images}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getHydroLatestGraphics = async () => {
	const endpoint = 'https://weather.cod.edu/datapoints/text/hydro/get-latest.php'
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}
