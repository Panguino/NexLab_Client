import { getData } from '../../dataCall'

export const getRapMesoData = async (product) => {
	const endpoint = `https://weather.cod.edu/datapoints/analysis/rap-mesoanalysis/get-files.php?parms=${product}`
	return await getData(endpoint)
}
