import { feature } from 'topojson-client'
import { multiPolygon, polygon, simplify, kinks } from '@turf/turf'

export const getAlertsJson = async () => {
	const alertsDataResponse = await fetch('https://climate.cod.edu/data/text/alerts.json')
	const alertsData = await alertsDataResponse.json()
	return alertsData
}

export const getUSStatesGeoJson = async () => {
	const usDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/us-states-nws.json')
	const usData = await usDataResponse.json()
	const usGeoJson = feature(usData, usData.objects.states)
	return simplifyGeoJson(usGeoJson)
}

export const getUSCountiesGeoJson = async () => {
	const countiesDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/us-counties-nws.json')
	const countiesData = await countiesDataResponse.json()
	const countiesGeoJson = feature(countiesData, countiesData.objects.counties)
	return simplifyGeoJson(countiesGeoJson)
}

export const getCanadaGeoJson = async () => {
	const canadaDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/canada.json')
	const canadaData = await canadaDataResponse.json()
	const canadaGeoJson = feature(canadaData, canadaData.objects.collection)
	return simplifyGeoJson(canadaGeoJson)
}

export const getMexicoGeoJson = async () => {
	const mexicoDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/mexi-cuba.json')
	const mexicoData = await mexicoDataResponse.json()
	const mexicoGeoJson = feature(mexicoData, mexicoData.objects.collection)
	return simplifyGeoJson(mexicoGeoJson)
}

export const getCoastalGeoJson = async () => {
	const coastalDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/coastal.json')
	const coastalData = await coastalDataResponse.json()
	return simplifyGeoJson(coastalData)
}

export const getOffshoreGeoJson = async () => {
	const offshoreDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/offshore.json')
	const offshoreData = await offshoreDataResponse.json()
	return simplifyGeoJson(offshoreData)
}

const simplifyGeoJson = (geoJson, tolerance = 0.001, debug = false) => {
	const simplifiedGeoJson = geoJson.features.map((feature) => {
		if (debug) {
			console.log('feature', feature)
		}
		if (feature.geometry?.type === 'Polygon') {
			if (feature.geometry.coordinates[0].length <= 4) {
				return feature
			}
			const simplifiedPolygon = simplify(polygon(feature.geometry.coordinates), { tolerance, highQuality: true })
			return { ...simplifiedPolygon, properties: feature.properties }
		} else if (feature.geometry?.type === 'MultiPolygon') {
			const multiPolygonShape = multiPolygon(feature.geometry.coordinates)
			if (kinks(multiPolygonShape).features.length > 0) {
				if (debug) {
					console.warn('Invalid multipolygon detected, skipping simplification')
				}
				return feature
			}
			const simplifiedMultiPolygon = simplify(multiPolygonShape, {
				tolerance,
				highQuality: true
			})
			return { ...simplifiedMultiPolygon, properties: feature.properties }
		}
	})

	return { type: 'FeatureCollection', features: simplifiedGeoJson.filter((feature) => feature !== undefined) }
}
