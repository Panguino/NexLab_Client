import { getData } from '../dataCall-generic'

export const getAnalysisTextProduct = async (productId) => {
	let productQueryString
	switch (productId) {
		// selected city summaries
		case 'SCS1':
			productQueryString = 'KWBN/FPUS20_SCS01'
			break
		case 'SCS2':
			productQueryString = 'KWBN/FPUS20_SCS02'
			break
		case 'SCS3':
			productQueryString = 'KWBN/FPUS20_SCS03'
			break
		case 'SCS4':
			productQueryString = 'KWBN/FPUS20_SCS04'
			break
		// temp and weather tables
		case 'TPTNAM':
			productQueryString = 'KWBC/ABNA26_TPTNAM'
			break
		case 'TPTERN':
			productQueryString = 'KWBC/ABUS24_TPTERN'
			break
		case 'TPTCRN':
			productQueryString = 'KWBC/ABUS25_TPTCRN'
			break
		case 'TPTWRN':
			productQueryString = 'KWBC/ABUS23_TPTWRN'
			break
		case 'TPTPAN':
			productQueryString = 'KNHC/SXCA01_TPTPAN'
			break
		case 'TPTCAN':
			productQueryString = 'KWBC/ABCN01_TPTCAN'
			break
		case 'TPTLAT':
			productQueryString = 'KWBC/ABXX07_TPTLAT'
			break
		case 'TPTINT':
			productQueryString = 'KWBC/ABXX06_TPTINT'
			break
		// specific regional weather roundups
		case 'RWRMEX':
			productQueryString = 'KSGX/ASMX46_RWRMX'
			break
		case 'RWRLAC':
			productQueryString = 'KEWX/ASCA44_RWRMX'
			break
		default:
			return false // Invalid productId for general data
	}

	const endpoint = `https://weather.cod.edu/textserv/json/${productQueryString}`
	const data = await getData(endpoint)

	// make sure this data object isn't empty
	if (!data || Object.keys(data).length === 0) {
		return false
	}

	// Return the data object directly - keys are timestamps (YYYYMMDDHHmm), values are URLs
	return data
}

export const getAdditionalRWRProducts = async () => {
	// for collecting additional RWR products not in the general list
	const endpoint = 'https://weather.cod.edu/textserv/national/analysis/json'
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getSpecialAnalysisTextProduct = async (endpoint) => {
	// for collecting additional RWR products not in the general list
	const data = await getData(endpoint)
	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}

export const getAnalysisMRMRData = async (productId, frames) => {
	// example productId: 1HR, 3HR, 6HR, 12HR, 24HR, 48HR, 72HR
	// frames is number of frames to retrieve 1-200 allowed
	const endpoint = `https://weather.cod.edu/datapoints/text/analysis/get-mrms.php?parms=${productId}-${frames}`
	const data = await getData(endpoint)

	if (!data || Object.keys(data).length === 0) {
		return false
	}
	return data
}
