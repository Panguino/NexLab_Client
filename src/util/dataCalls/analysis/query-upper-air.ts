import { getData } from '../dataCall'

const parmsExceptionTest = (level, product) => {
	// TODO: see monday 8994171800
	if (level === '500' && product === 'vort') {
		return { level: 'contour', product: 'vort' }
	} else if (level === '500' && product === 'deltaz') {
		return { level: 'contour', product: 'deltaz' }
	} else if (level === '850' && product === 'thetae') {
		return { level: 'contour', product: 'thetae' }
	} else {
		return { level, product }
	}
}

export const getUpperAirData = async (sector, level, product) => {
	const tested = parmsExceptionTest(level, product)
	level = tested.level
	product = tested.product
	const endpoint = `https://weather.cod.edu/datapoints/analysis/upper-air/get-files.php?parms=${sector}-${level}-${product}`
	return await getData(endpoint)
}
