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
	const endpoint = `https://weather.cod.edu/textserv/hydro/get-ero.php?valid=${validtime}`
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getHydroTextProductById = async (productQueryString) => {
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
