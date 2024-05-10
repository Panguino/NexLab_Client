'use client'
import { geoGraticule } from 'd3-geo'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { booleanPointInPolygon, multiPolygon, polygon } from '@turf/turf'

import styles from './HazardsMap.module.scss'
import useDimensions from '@/hooks/useDimensions'
import useMouseD3 from '@/hooks/useMouseD3'
import {
	getAlertsJson,
	getCanadaGeoJson,
	getCoastalGeoJson,
	getMexicoGeoJson,
	getOffshoreGeoJson,
	getUSCountiesGeoJson,
	getUSStatesGeoJson
} from './HazardsMapData'

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
				// .filter((event) => {
				// 	// Ignore click events that don't involve the mouse wheel or a drag operation
				// 	//console.log(event.type)
				// 	return true
				// 	//return d3.event.type === 'click' ? false : true
				// })
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
			context.beginPath()
			geoPathGenerator(canadaMapData)
			context.fillStyle = 'rgba(255,255,255,0.5)'
			context.fill()
			context.strokeStyle = 'white'
			context.lineWidth = 0.3
			context.stroke()

			// mexico fill
			context.beginPath()
			geoPathGenerator(mexicoMapData)
			context.fillStyle = 'rgba(255,255,255,0.5)'
			context.fill()
			context.strokeStyle = 'white'
			context.lineWidth = 0.3
			context.stroke()

			// Lat and long
			const graticule = geoGraticule().step([6.5, 6.5])
			context.beginPath()
			geoPathGenerator(graticule())
			context.strokeStyle = 'rgba(0,0,0,0.4)'
			context.lineWidth = 0.3
			context.setLineDash([5]) // Set the line dash pattern
			context.stroke()

			// usa fill
			context.beginPath()
			geoPathGenerator(usMapData)
			context.fillStyle = 'white'
			context.fill()

			// counties shapes
			shapesRef.current.forEach(({ feature, id, alerts }) => {
				if (!feature) {
					return
				}
				context.beginPath()
				geoPathGenerator(feature)
				context.fillStyle = alerts.length === 0 ? 'rgba(0,0,0,0)' : 'red'
				context.fill()
				context.strokeStyle = 'rgba(0,0,0,0.4)'
				context.setLineDash([])
				context.lineWidth = 0.1
				context.stroke()
			})

			// usa fill
			context.beginPath()
			geoPathGenerator(usMapData)
			context.fillStyle = 'transparent'
			context.fill()
			context.strokeStyle = 'rgba(0,0,0,0.8)'
			context.setLineDash([])
			context.lineWidth = 0.1
			context.stroke()

			// coastal fill
			context.beginPath()
			context.fillStyle = 'transparent'
			context.fill()
			geoPathGenerator(coastalMapData)
			context.strokeStyle = 'rgba(255,255,255,.8)'
			context.setLineDash([])
			context.lineWidth = 0.3
			context.stroke()

			// offshore fill
			context.beginPath()
			context.fillStyle = 'transparent'
			context.fill()
			geoPathGenerator(offshoreMapData)
			context.strokeStyle = 'rgba(255,255,255,.6)'
			context.setLineDash([])
			context.lineWidth = 0.3
			context.stroke()
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
					console.log('Clicked:', shape)
					newRegionColors[shape.feature.properties.FIPS] = 'rgb(255,0,0)'
				} else if (shape.multiPolygon && booleanPointInPolygon([lon, lat], shape.multiPolygon)) {
					console.log('Clicked:', shape)
					newRegionColors[shape.feature.properties.FIPS] = 'rgb(255,0,0)'
				}
			})
			setRegionColors(newRegionColors)
		}

		canvas.addEventListener('click', handleClick)

		return () => {
			canvas.removeEventListener('click', handleClick)
		}
	}, [canvasRef, shapesRef, projRef, regionColors])

	const getMapData = async () => {
		const usGeoJson = await getUSStatesGeoJson()
		setUsMapData(usGeoJson)

		const usCountiesGeoJson = await getUSCountiesGeoJson()
		setCountiesMapData(usCountiesGeoJson)

		const canadaGeoJson = await getCanadaGeoJson()
		setCanadaMapData(canadaGeoJson)

		const mexicoGeoJson = await getMexicoGeoJson()
		setMexicoMapData(mexicoGeoJson)

		const coastalGeoJson = await getCoastalGeoJson()
		setCoastalMapData(coastalGeoJson)

		const offshoreGeoJson = await getOffshoreGeoJson()
		setOffshoreMapData(offshoreGeoJson)

		const alertsJson = await getAlertsJson()
		//console.log('alertsJson', alertsJson)
		offshoreGeoJson.features.forEach((feature) => {
			const id = feature.properties.ID
			if (feature.geometry?.type === 'Polygon') {
				shapesRef.current.push({
					id,
					feature,
					polygon: polygon(feature.geometry.coordinates),
					alerts: alertsJson.features.filter((alert) => {
						return alert.properties.geocode.UGC.includes(id)
					})
				})
			} else if (feature.geometry?.type === 'MultiPolygon') {
				shapesRef.current.push({
					id,
					feature,
					multiPolygon: multiPolygon(feature.geometry.coordinates),
					alerts: alertsJson.features.filter((alert) => {
						return alert.properties.geocode.UGC.includes(id)
					})
				})
			}
		})

		coastalGeoJson.features.forEach((feature) => {
			const id = feature.properties.ID
			if (feature.geometry?.type === 'Polygon') {
				shapesRef.current.push({
					id,
					feature,
					polygon: polygon(feature.geometry.coordinates),
					alerts: alertsJson.features.filter((alert) => {
						return alert.properties.geocode.UGC.includes(id)
					})
				})
			} else if (feature.geometry?.type === 'MultiPolygon') {
				shapesRef.current.push({
					id,
					feature,
					multiPolygon: multiPolygon(feature.geometry.coordinates),
					alerts: alertsJson.features.filter((alert) => {
						return alert.properties.geocode.UGC.includes(id)
					})
				})
			}
		})

		usCountiesGeoJson.features.forEach((feature) => {
			const id = feature.properties.FIPS.padStart(6, '0')
			if (feature.geometry?.type === 'Polygon') {
				shapesRef.current.push({
					id,
					feature,
					polygon: polygon(feature.geometry.coordinates),
					alerts: alertsJson.features.filter((alert) => {
						return alert.properties.geocode.SAME.includes(id)
					})
				})
			} else if (feature.geometry?.type === 'MultiPolygon') {
				shapesRef.current.push({
					id,
					feature,
					multiPolygon: multiPolygon(feature.geometry.coordinates),
					alerts: alertsJson.features.filter((alert) => {
						return alert.properties.geocode.SAME.includes(id)
					})
				})
			}
		})
	}

	return (
		<div ref={mapRef} className={styles.HazardsMap}>
			<canvas ref={canvasRef} width={width} height={height} className={styles.map} />
		</div>
	)
}

export default HazardsMap
