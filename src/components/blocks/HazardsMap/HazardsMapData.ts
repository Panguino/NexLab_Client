import { feature } from 'topojson-client'
import { multiPolygon, polygon, simplify } from '@turf/turf'

export const getUSStatesGeoJson = async () => {
	const usDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/us-states-nws.json')
	const usData = await usDataResponse.json()
	//console.log('usData', usData)
	const usGeoJson = feature(usData, usData.objects.states)
	return usGeoJson
}

export const getUSCountiesGeoJson = async () => {
	const countiesDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/us-counties-nws.json')
	const countiesData = await countiesDataResponse.json()
	const countiesGeoJson = feature(countiesData, countiesData.objects.counties)

	const simplifiedCountiesGeoJson = countiesGeoJson.features.map((feature) => {
		if (feature.geometry?.type === 'Polygon') {
			if (feature.geometry.coordinates[0].length <= 4) {
				return feature
			}
			const simplifiedPolygon = simplify(polygon(feature.geometry.coordinates), { tolerance: 0.001, highQuality: true })
			return { ...simplifiedPolygon, properties: feature.properties }
		} else if (feature.geometry?.type === 'MultiPolygon') {
			const simplifiedMultiPolygon = simplify(multiPolygon(feature.geometry.coordinates), {
				tolerance: 0.001,
				highQuality: true
			})
			return { ...simplifiedMultiPolygon, properties: feature.properties }
		}
	})
	return { type: 'FeatureCollection', features: simplifiedCountiesGeoJson }
}
