'use client'
import { geoGraticule } from 'd3-geo'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { multiPolygon, polygon } from '@turf/turf'

import hazardColors from '@/data/hazardColors.json'
import styles from './HazardsMap.module.scss'
import useDimensions from '@/hooks/useDimensions'
//import useMouseD3 from '@/hooks/useMouseD3'
import {
	getAlertsJson,
	getCanadaGeoJson,
	getCoastalGeoJson,
	getMexicoGeoJson,
	getOffshoreGeoJson,
	getUSCountiesGeoJson,
	getUSStatesGeoJson
} from './HazardsMapData'
import getAlertIdByEvent from '@/data/getAlertIdByEvent'
import HazardsTooltip from './HazardsTooltip/HazardsTooltip'
import useHazardsStore from '@/store/useHazardsStore'

const HazardsMap = () => {
	const { setTooltipContent, setTooltipActive } = useHazardsStore((state) => state)
	const canvasRef = useRef(null)
	const [mapRef, { width, height }] = useDimensions()
	const svgRef = useRef(null)
	const [usMapData, setUsMapData] = useState(null)
	const [canadaMapData, setCanadaMapData] = useState(null)
	const [mexicoMapData, setMexicoMapData] = useState(null)
	const [countiesMapData, setCountiesMapData] = useState(null)
	const [coastalMapData, setCoastalMapData] = useState(null)
	const [offshoreMapData, setOffshoreMapData] = useState(null)
	const [allHazardCounties, setAllHazardCounties] = useState([])
	const projRef = useRef(d3.geoAlbers().precision(0))

	useEffect(() => {
		if (width && height) {
			const scale = Math.min(width * 1.2, height * 2)
			const translate = [width / 2, height / 2]
			projRef.current
				.scale(scale)
				.translate(translate)
				.clipExtent([
					[0, 0],
					[width, height]
				])

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

			const svg = d3.select(svgRef.current)
			svg.call(zoom)
		}
	}, [width, height, projRef, usMapData, svgRef, canadaMapData, mexicoMapData, countiesMapData, coastalMapData, offshoreMapData, allHazardCounties])

	//const mouseCoords = useMouseD3(projRef.current)
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

			if (!context || !usMapData || !canadaMapData || !mexicoMapData || !countiesMapData || !coastalMapData || !offshoreMapData) {
				return
			}
			if (svgRef.current) {
				console.log('redrawMap svg', allHazardCounties)
				const svg = d3.select(svgRef.current)
				const geoPathGeneratorSvg = d3.geoPath().projection(projRef.current)

				svg.selectAll('path.hazard-county').remove()

				allHazardCounties.forEach((hazardCounty) => {
					//console.log(getAlertIdByEvent(hazardCounty.alerts[0].properties.event))
					svg.append('path')
						.datum(hazardCounty.feature)
						.attr('class', `hazard-county ${hazardCounty.id}`)
						.attr('d', geoPathGeneratorSvg)
						.attr('shapeId', hazardCounty.id)
						.attr('fill', `rgb(${hazardColors[getAlertIdByEvent(hazardCounty.alerts[0].properties.event)]})`) //hazardColors[``]
						.attr('stroke', 'rgba(0,0,0,0.1)')
						.on('mouseover', (event, d) => {
							console.log('mouseover', hazardCounty.id, event, d)
							setTooltipContent({ alerts: hazardCounty.alerts, feature: hazardCounty.feature })
							setTooltipActive(true)
						})
						.on('mouseout', (event, d) => {
							console.log('mouseout', hazardCounty.id, event, d)
							setTooltipActive(false)
						})
				})
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

			// counties shapes
			context.beginPath()
			geoPathGenerator(countiesMapData)
			context.fillStyle = 'white'
			context.fill()
			context.strokeStyle = 'rgba(0,0,0,0.2)'
			context.setLineDash([])
			context.lineWidth = 0.2
			context.stroke()

			// usa fill
			context.beginPath()
			geoPathGenerator(usMapData)
			context.fillStyle = 'transparent'
			context.fill()
			context.strokeStyle = 'rgba(0,0,0,0.9)'
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
	}, [
		width,
		height,
		projRef,
		svgRef,
		usMapData,
		canvasRef,
		canadaMapData,
		mexicoMapData,
		countiesMapData,
		coastalMapData,
		offshoreMapData,
		allHazardCounties
	])

	/*useEffect(() => {
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
			//const newRegionColors = { ...regionColors }
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
	}, [canvasRef, projRef])*/

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

		const hazardCounties = []
		offshoreGeoJson.features.forEach((feature) => {
			const id = feature.properties.ID
			if (feature.geometry?.type === 'Polygon') {
				const shape = polygon(feature.geometry.coordinates)
				const alerts = alertsJson.features.filter((alert) => {
					return alert.properties.geocode.UGC.includes(id)
				})
				if (alerts.length > 0) {
					hazardCounties.push({
						id,
						feature,
						polygon: shape,
						alerts: alerts
					})
				}
			} else if (feature.geometry?.type === 'MultiPolygon') {
				const shape = multiPolygon(feature.geometry.coordinates)
				const alerts = alertsJson.features.filter((alert) => {
					return alert.properties.geocode.UGC.includes(id)
				})
				if (alerts.length > 0) {
					hazardCounties.push({
						id,
						feature,
						polygon: shape,
						alerts: alerts
					})
				}
			}
		})

		coastalGeoJson.features.forEach((feature) => {
			const id = feature.properties.ID
			if (feature.geometry?.type === 'Polygon') {
				const shape = polygon(feature.geometry.coordinates)
				const alerts = alertsJson.features.filter((alert) => {
					return alert.properties.geocode.UGC.includes(id)
				})
				if (alerts.length > 0) {
					hazardCounties.push({
						id,
						feature,
						polygon: shape,
						alerts: alerts
					})
				}
			} else if (feature.geometry?.type === 'MultiPolygon') {
				const shape = multiPolygon(feature.geometry.coordinates)
				const alerts = alertsJson.features.filter((alert) => {
					return alert.properties.geocode.UGC.includes(id)
				})
				if (alerts.length > 0) {
					hazardCounties.push({
						id,
						feature,
						polygon: shape,
						alerts: alerts
					})
				}
			}
		})

		usCountiesGeoJson.features.forEach((feature) => {
			const id = feature.properties.FIPS.padStart(6, '0')
			if (feature.geometry?.type === 'Polygon') {
				const shape = polygon(feature.geometry.coordinates)
				const alerts = alertsJson.features.filter((alert) => {
					if (alert.properties.geocode.SAME) {
						return alert.properties.geocode?.SAME.includes(id)
					}
				})
				if (alerts.length > 0) {
					hazardCounties.push({
						id,
						feature,
						polygon: shape,
						alerts: alerts
					})
				}
			} else if (feature.geometry?.type === 'MultiPolygon') {
				const shape = multiPolygon(feature.geometry.coordinates)
				const alerts = alertsJson.features.filter((alert) => {
					if (alert.properties.geocode.SAME) {
						return alert.properties.geocode?.SAME.includes(id)
					}
				})
				if (alerts.length > 0) {
					hazardCounties.push({
						id,
						feature,
						polygon: shape,
						alerts: alerts
					})
				}
			}
		})
		setAllHazardCounties(hazardCounties)
	}

	return (
		<div ref={mapRef} className={styles.HazardsMap}>
			<canvas ref={canvasRef} width={width} height={height} className={styles.canvasMap} />
			<svg ref={svgRef} className={styles.svgMap} width={width} height={height} />
			<HazardsTooltip />
		</div>
	)
}

export default HazardsMap
