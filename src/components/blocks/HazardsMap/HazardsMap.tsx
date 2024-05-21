'use client'
import { geoGraticule } from 'd3-geo'
import * as d3 from 'd3'
import { useCallback, useEffect, useRef, useState } from 'react'
import { multiPolygon, polygon } from '@turf/turf'

import hazardColors from '@/data/hazardColors.json'
import styles from './HazardsMap.module.scss'
import useDimensions from '@/hooks/useDimensions'
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
import useAnimationFrame from '@/hooks/useAnimationFrame'

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
	const zoomRef = useRef<d3.ZoomBehavior<Element, unknown>>(null)

	useEffect(() => {
		console.log('changed zoom stuff')
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

			zoomRef.current = d3
				.zoom()
				.scaleExtent([1, 8])
				.translateExtent([
					[-width / 2, -height / 2],
					[width / 2, height / 2]
				])
				.on('zoom', zoomed)

			const svg = d3.select(svgRef.current)
			svg.call(zoomRef.current)
		}
	}, [width, height, projRef, svgRef, allHazardCounties])

	const zoomed = (event) => {
		console.log('zooming or panning')
		const { transform } = event
		projRef.current.scale(transform.k * Math.min(width * 1.2, height * 2)).translate([transform.x, transform.y])
		//redrawMap(0)
	}

	useEffect(() => {
		console.log('data loaded')
		getMapData()
	}, [])

	const redrawMap = useCallback(
		(deltaTime) => {
			//console.log(deltaTime)

			const canvas = canvasRef.current
			const context = canvas?.getContext('2d')

			if (!context || !usMapData || !canadaMapData || !mexicoMapData || !countiesMapData || !coastalMapData || !offshoreMapData) {
				return
			}
			if (svgRef.current) {
				//console.log('redrawMap svg', allHazardCounties)
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
						.on('mouseover', (event) => {
							//(event, d) => {
							//console.log('mouseover', hazardCounty.id, event, d)
							setTooltipContent({ alerts: hazardCounty.alerts, feature: hazardCounty.feature })
							setTooltipActive(true)
							d3.select(event.target).raise()
						})
						.on('mouseout', () => {
							//(event, d) => {
							//console.log('mouseout', hazardCounty.id, event, d)
							setTooltipActive(false)
						})
						.on('click', (event, d) => {
							console.log(event, d)
							//console.log('click', hazardCounty.id, event)
							const [[x0, y0], [x1, y1]] = geoPathGeneratorSvg.bounds(d)
							const dx = x1 - x0
							const dy = y1 - y0
							const x = (x0 + x1) / 2
							const y = (y0 + y1) / 2
							const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)))
							const translate = [width / 2 - scale * x, height / 2 - scale * y]

							// Transition to the new scale and translate
							svg.transition()
								.duration(750)
								.call(zoomRef.current.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
						})
				})
			}

			const geoPathGenerator = d3.geoPath().projection(projRef.current).context(context) // if a context is provided, geoPath() understands that we work with canvas, not SVG
			context.clearRect(0, 0, width, height)
			/*
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
			//context.fillStyle = 'rgb(250,250,250)'
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
			*/
		},
		[
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
		]
	)
	useAnimationFrame(redrawMap)

	useEffect(() => {
		console.log('redrawMap reset')
		redrawMap(0)
	}, [redrawMap])

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
		console.log('alertsJson', alertsJson)
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
