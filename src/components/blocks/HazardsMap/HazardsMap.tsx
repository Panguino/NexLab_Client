'use client'
import { geoGraticule } from 'd3-geo'
import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { multiPolygon, polygon } from '@turf/turf'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

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

gsap.registerPlugin(Draggable)

const HazardsMap = () => {
	const { setTooltipContent, setTooltipActive } = useHazardsStore((state) => state)
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

	const [draggable, setDraggable] = useState(null)
	const mapGroupRef = useRef(null)

	useEffect(() => {
		if (mapGroupRef?.current) {
			if (!draggable) {
				const newDraggable = Draggable.create(mapGroupRef.current, {
					inertia: true,
					allowContextMenu: true,
					cursor: 'auto',
					onDragStart: () => {
						setTooltipActive(false)
					}
				})
				setDraggable(newDraggable)
			}
		}
	}, [mapGroupRef, draggable, setTooltipActive])

	useEffect(() => {
		if (width && height) {
			const scale = Math.min(width * 1.2, height * 2)
			const translate = [width / 2, height / 2]
			projRef.current.scale(scale).translate(translate)
		}
	}, [width, height, projRef, svgRef, allHazardCounties])

	useEffect(() => {
		getMapData()
	}, [])

	useEffect(() => {
		if (!usMapData || !canadaMapData || !mexicoMapData || !countiesMapData || !coastalMapData || !offshoreMapData) {
			return
		}
		if (mapGroupRef.current) {
			console.log('redrawMap')
			const svg = d3.select(mapGroupRef.current)
			const geoPathGeneratorSvg = d3.geoPath().projection(projRef.current)

			svg.selectAll('path').remove()

			// canada fill
			svg.append('path')
				.datum(canadaMapData)
				.attr('class', `otherregions canada`)
				.attr('d', geoPathGeneratorSvg)
				.attr('fill', 'var(--color-grey2-grey16)')
				.attr('stroke', 'var(--color-white-grey18)')
				.attr('stroke-width', 0.3)

			// mexico fill
			svg.append('path')
				.datum(mexicoMapData)
				.attr('class', `otherregions mexico`)
				.attr('d', geoPathGeneratorSvg)
				.attr('fill', 'var(--color-grey2-grey16)')
				.attr('stroke', 'var(--color-white-grey18)')
				.attr('stroke-width', 0.3)

			// Lat and long
			const graticule = geoGraticule().step([6.5, 6.5])
			svg.append('path')
				.datum(graticule)
				.attr('class', `canada`)
				.attr('d', geoPathGeneratorSvg)
				.attr('stroke', 'var(--color-grey12-grey8)')
				.attr('fill', 'none')
				.attr('stroke-width', 0.3)
				.attr('stroke-dasharray', 5)

			// counties
			// svg.append('path')
			// 	.datum(countiesMapData)
			// 	.attr('class', `otherregions mexico`)
			// 	.attr('d', geoPathGeneratorSvg)
			// 	.attr('fill', 'var(--color-white-grey13)')
			// 	.attr('stroke', 'var(--color-grey2-grey16)')
			// 	.attr('stroke-width', 0.2)

			allHazardCounties.forEach((hazardCounty) => {
				//console.log(getAlertIdByEvent(hazardCounty.alerts[0].properties.event))
				svg.append('path')
					.datum(hazardCounty.feature)
					.attr('class', `${styles.hazardCounty} ${hazardCounty.id}`)
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
						//console.log(event, d)
						console.log('click', hazardCounty.id, event)
						/*const [[x0, y0], [x1, y1]] = geoPathGeneratorSvg.bounds(d)
							const dx = x1 - x0
							const dy = y1 - y0
							const x = (x0 + x1) / 2
							const y = (y0 + y1) / 2
							const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)))
							const translate = [width / 2 - scale * x, height / 2 - scale * y]

							// Transition to the new scale and translate
							svg.transition()
								.duration(750)
								.call(zoomRef.current.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))*/
					})
			})

			// state Borders
			svg.append('path')
				.datum(usMapData)
				.attr('class', `otherregions mexico`)
				.attr('d', geoPathGeneratorSvg)
				.attr('fill', 'none')
				.attr('stroke', 'var(--color-grey6-grey18)')
				.attr('stroke-width', 0.2)

			// coastal borders
			svg.append('path')
				.datum(coastalMapData)
				.attr('class', `otherregions mexico`)
				.attr('d', geoPathGeneratorSvg)
				.attr('fill', 'none')
				.attr('stroke', 'var(--color-white-grey7)')
				.attr('stroke-width', 0.1)

			// offshore borders
			svg.append('path')
				.datum(offshoreMapData)
				.attr('class', `otherregions mexico`)
				.attr('d', geoPathGeneratorSvg)
				.attr('fill', 'none')
				.attr('stroke', 'var(--color-white-grey7)')
				.attr('stroke-width', 0.2)
		}
	}, [
		width,
		height,
		projRef,
		mapGroupRef,
		usMapData,
		canadaMapData,
		mexicoMapData,
		countiesMapData,
		coastalMapData,
		offshoreMapData,
		allHazardCounties,
		setTooltipActive,
		setTooltipContent
	])

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
			<svg ref={svgRef} className={styles.svgMap} width={width} height={height}>
				<g ref={mapGroupRef} className={styles.mapGroup}></g>
			</svg>
			<HazardsTooltip />
		</div>
	)
}

export default HazardsMap
