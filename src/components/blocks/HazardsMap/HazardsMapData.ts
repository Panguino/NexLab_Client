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
	//console.log('canada')
	return simplifyGeoJson(canadaGeoJson)
}

export const getMexicoGeoJson = async () => {
	const mexicoDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/mexi-cuba.json')
	const mexicoData = await mexicoDataResponse.json()
	const mexicoGeoJson = feature(mexicoData, mexicoData.objects.collection)
	//console.log('mexico')
	return simplifyGeoJson(mexicoGeoJson)
}

export const getCoastalGeoJson = async () => {
	const coastalDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/coastal.json')
	const coastalData = await coastalDataResponse.json()
	//console.log('coastal')
	return simplifyGeoJson(coastalData)
}

export const getOffshoreGeoJson = async () => {
	const offshoreDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/offshore.json')
	const offshoreData = await offshoreDataResponse.json()
	//console.log('offshore')
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
	//console.log('simplifiedGeoJson', simplifiedGeoJson)

	return { type: 'FeatureCollection', features: simplifiedGeoJson.filter((feature) => feature !== undefined) }
}

/*

// Calculate the simplification threshold
		const simplifiedCountiesGeoJson = countiesGeoJson.features.map((feature) => {
			//console.log('feature before', feature)
			if (feature.geometry?.type === 'Polygon') {
				if (feature.geometry.coordinates[0].length <= 4) {
					return feature
				}
				const simplifiedPolygon = simplify(polygon(feature.geometry.coordinates), { tolerance: 0.001, highQuality: true })
				shapesRef.current.push({
					feature,
					polygon: simplifiedPolygon
				})
				//console.log('simplifiedPolygon', simplifiedPolygon)
				return { ...simplifiedPolygon, properties: feature.properties }
			} else if (feature.geometry?.type === 'MultiPolygon') {
				const simplifiedMultiPolygon = simplify(multiPolygon(feature.geometry.coordinates), {
					tolerance: 0.001,
					highQuality: true
				})
				//console.log('simplifiedMultiPolygon', simplifiedMultiPolygon)
				shapesRef.current.push({
					feature,
					multiPolygon: simplifiedMultiPolygon
				})
				return { ...simplifiedMultiPolygon, properties: feature.properties }
			}
		})

		// Simplify the TopoJSON data
		//const simplifiedCountiesGeoJson = simplify(countiesGeoJson, threshold)

		// Convert the simplified TopoJSON data to GeoJSON
		console.log('countiesGeoJson', countiesGeoJson)
		console.log('simplifiedCountiesGeoJson', { type: 'FeatureCollection', features: simplifiedCountiesGeoJson })
		setCountiesMapData({ type: 'FeatureCollection', features: simplifiedCountiesGeoJson })

        const initialRegionColors = {}
		countiesGeoJson.features.forEach((feature) => {
			initialRegionColors[feature.properties.FIPS] = 'rgb(230, 230, 230)'
		})
		setRegionColors(initialRegionColors)

        */
