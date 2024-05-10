'use client'
import { geoGraticule } from 'd3-geo'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { feature } from 'topojson-client'
import { booleanPointInPolygon, multiPolygon, polygon, simplify } from '@turf/turf'

import styles from './HazardsMap.module.scss'
import useDimensions from '@/hooks/useDimensions'
import useMouseD3 from '@/hooks/useMouseD3'
import { getUSStatesGeoJson } from './HazardsMapData'

const HazardsMap = () => {
	const canvasRef = useRef(null)
	const [mapRef, { width, height }] = useDimensions()
	const [usMapData, setUsMapData] = useState(null)
	const [canadaMapData, setCanadaMapData] = useState(null)
	const [mexicoMapData, setMexicoMapData] = useState(null)
	const [countiesMapData, setCountiesMapData] = useState(null)
	const [coastalMapData, setCoastalMapData] = useState(null)
	const [offshoreMapData, setOffshoreMapData] = useState(null)
	const [regionColors, setRegionColors] = useState({})
	const projRef = useRef(d3.geoAlbers().precision(0))
	const shapesRef = useRef([])

	useEffect(() => {
		if (width && height) {
			const scale = Math.min(width * 1.2, height * 2)
			const translate = [width / 2, height / 2]
			projRef.current.scale(scale).translate(translate)

			const zoom = d3
				.zoom()
				.scaleExtent([1, 8])
				.translateExtent([
					[-width / 2, -height / 2],
					[width / 2, height / 2]
				])
				.filter((event) => {
					// Ignore click events that don't involve the mouse wheel or a drag operation
					console.log(event.type)
					return true
					//return d3.event.type === 'click' ? false : true
				})
				.on('zoom', zoomed)

			const canvas = d3.select(canvasRef.current)
			canvas.call(zoom)
		}
	}, [width, height, projRef, usMapData, canvasRef, canadaMapData, mexicoMapData, countiesMapData, regionColors, coastalMapData, offshoreMapData])

	const mouseCoords = useMouseD3(projRef.current)
	//console.log(mouseCoords)

	useEffect(() => {
		getMapData()
	}, [])

	const zoomed = (event) => {
		const { transform } = event
		//console.log('zoomed', transform.k, transform.x, transform.y)
		projRef.current.scale(transform.k * Math.min(width * 1.2, height * 2)).translate([transform.x, transform.y])
		redrawMap()
	}
	let animationFrameId = null
	const redrawMap = () => {
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId)
		}

		animationFrameId = requestAnimationFrame(() => {
			const canvas = canvasRef.current
			const context = canvas?.getContext('2d')

			if (
				!context ||
				!usMapData ||
				!canadaMapData ||
				!mexicoMapData ||
				!countiesMapData ||
				!regionColors ||
				!coastalMapData ||
				!offshoreMapData
			) {
				return
			}

			const geoPathGenerator = d3.geoPath().projection(projRef.current).context(context) // if a context is provided, geoPath() understands that we work with canvas, not SVG
			context.clearRect(0, 0, width, height)

			// canada fill
			/*context.beginPath()
			geoPathGenerator(canadaMapData)
			context.fillStyle = 'rgba(255,255,255,0.5)'
			context.fill()

			// mexico fill
			context.beginPath()
			geoPathGenerator(mexicoMapData)
			context.fillStyle = 'rgba(255,255,255,0.5)'
			context.fill()*/

			// Lat and long
			const graticule = geoGraticule().step([6.5, 6.5])
			context.beginPath()
			geoPathGenerator(graticule())
			context.strokeStyle = 'white'
			context.lineWidth = 0.3
			context.setLineDash([5]) // Set the line dash pattern
			context.stroke()

			// counties shapes
			countiesMapData.features.forEach((feature) => {
				if (!feature) {
					return
				}
				context.beginPath()
				geoPathGenerator(feature)
				context.fillStyle = regionColors[feature.properties.FIPS]
				context.fill()
				context.strokeStyle = 'rgba(0,0,0,0.4)'
				context.setLineDash([])
				context.lineWidth = 0.1
				context.stroke()
			})

			// usa fill
			context.beginPath()
			context.fillStyle = 'transparent'
			context.fill()
			geoPathGenerator(usMapData)
			context.strokeStyle = 'rgba(0,0,0,0.8)'
			context.setLineDash([])
			context.lineWidth = 0.1
			context.stroke()

			// coastal fill
			/*context.beginPath()
			context.fillStyle = 'transparent'
			context.fill()
			geoPathGenerator(coastalMapData)
			context.strokeStyle = 'rgba(0,0,0,.8)'
			context.setLineDash([])
			context.lineWidth = 0.1
			context.stroke()

			// offshore fill
			context.beginPath()
			context.fillStyle = 'transparent'
			context.fill()
			geoPathGenerator(offshoreMapData)
			context.strokeStyle = 'rgba(0,0,0,.6)'
			context.setLineDash([])
			context.lineWidth = 0.1
			context.stroke()*/
		})
	}

	useEffect(() => {
		redrawMap()
	}, [width, height, projRef, usMapData, canvasRef, canadaMapData, mexicoMapData, countiesMapData, regionColors, coastalMapData, offshoreMapData])

	useEffect(() => {
		const canvas = canvasRef.current

		if (!canvas) {
			return
		}

		const handleClick = (event) => {
			const rect = canvas.getBoundingClientRect()
			const x = event.clientX - rect.left
			const y = event.clientY - rect.top
			const [lon, lat] = projRef.current.invert([x, y])
			console.log('Clicked:', x, y, lon, lat)
			// Check if the click is within any of the shapes
			const newRegionColors = { ...regionColors }
			shapesRef.current.forEach((shape) => {
				newRegionColors[shape.feature.properties.FIPS] = 'rgb(230, 230, 230)'
				if (shape.polygon && booleanPointInPolygon([lon, lat], shape.polygon)) {
					console.log('Clicked:', shape.feature)
					newRegionColors[shape.feature.properties.FIPS] = 'rgb(255,0,0)'
				} else if (shape.multiPolygon && booleanPointInPolygon([lon, lat], shape.multiPolygon)) {
					console.log('Clicked:', shape.feature)
					newRegionColors[shape.feature.properties.FIPS] = 'rgb(255,0,0)'
				}
			})
			//setRegionColors(newRegionColors)
		}

		canvas.addEventListener('click', handleClick)

		return () => {
			canvas.removeEventListener('click', handleClick)
		}
	}, [canvasRef, shapesRef, projRef, regionColors])

	const getMapData = async () => {
		// states outline data
		const usGeoJson = await getUSStatesGeoJson()
		setUsMapData(usGeoJson)

		const canadaDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/canada.json')
		const canadaData = await canadaDataResponse.json()
		//console.log('canadaData', canadaData)
		const canadaGeoJson = feature(canadaData, canadaData.objects.collection)
		setCanadaMapData(canadaGeoJson)

		const mexicoDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/mexi-cuba.json')
		const mexicoData = await mexicoDataResponse.json()
		//console.log('mexicoData', mexicoData)
		const mexicoGeoJson = feature(mexicoData, mexicoData.objects.collection)
		setMexicoMapData(mexicoGeoJson)

		const countiesDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/us-counties-nws.json')
		const countiesData = await countiesDataResponse.json()
		const countiesGeoJson = feature(countiesData, countiesData.objects.counties)

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

		const coastalDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/coastal.json')
		const coastalData = await coastalDataResponse.json()
		//console.log('coastalData', coastalData)
		//const coastalGeoJson = topojson.feature(coastalData, coastalData.features)
		setCoastalMapData(coastalData)

		const offshoreDataResponse = await fetch('https://weather.cod.edu/text/exper/assets/json/old/offshore.json')
		const offshoreData = await offshoreDataResponse.json()
		//console.log('offshoreData', offshoreData)
		//const offshoreGeoJson = topojson.feature(offshoreData, offshoreData.features)
		setOffshoreMapData(offshoreData)

		const initialRegionColors = {}
		countiesGeoJson.features.forEach((feature) => {
			initialRegionColors[feature.properties.FIPS] = 'rgb(230, 230, 230)'
		})
		setRegionColors(initialRegionColors)
	}

	return (
		<div ref={mapRef} className={styles.HazardsMap}>
			<canvas ref={canvasRef} width={width} height={height} className={styles.map} />
		</div>
	)
}

export default HazardsMap
