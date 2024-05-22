'use client'
import { geoGraticule } from 'd3-geo'
import * as d3 from 'd3'
import { useCallback, useEffect, useRef, useState } from 'react'
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
import { useAnimationFrame } from 'framer-motion'

gsap.registerPlugin(Draggable)

const HazardsMap = () => {
	const { setTooltipContent, setTooltipActive, fireActive } = useHazardsStore((state) => state)
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
	const mapImageRef = useRef(null)

	const [draggable, setDraggable] = useState(null)
	const mapGroupRef = useRef(null)
	const accel = 0.7
	const [chaseScale, setChaseScale] = useState(1)
	const minZoom = 0.0001
	const maxZoom = 10
	const [zoomScale, setZoomScale] = useState(1)
	const scaleFactor = 1.2
	const [pointer, setPointer] = useState({ x: 0, y: 0 })
	const [imageSize, setImageSize] = useState({ width: 9027, height: 5945 })

	useEffect(() => {
		if (mapGroupRef.current) {
			console.log(mapGroupRef.current.getBoundingClientRect())
			const { width, height } = mapGroupRef.current.getBoundingClientRect()
			setImageSize({ width, height })
		}
	}, [mapGroupRef, allHazardCounties])

	useEffect(() => {
		if (document) {
			const hazardCounties = document.querySelectorAll(`.${styles.hazardCounty}`)
			hazardCounties.forEach((hazardCounty) => {
				gsap.to(hazardCounty, {
					opacity: fireActive ? (hazardCounty.getAttribute('hazards').includes('Fire') ? 1 : 0.2) : 1,
					duration: 0.25,
					ease: 'linear.easeNone'
				})
			})
		}
	}, [fireActive])

	useAnimationFrame(() => {
		updateZoom()
	})
	const onZoom = (event) => {
		const wheel = event.detail || event.deltaY || 0
		let newScale = chaseScale
		if (wheel > 0) {
			newScale /= scaleFactor
		} else {
			newScale *= scaleFactor
		}
		setPointer({ x: event.clientX - mapRef.current.getBoundingClientRect().x, y: event.clientY - mapRef.current.getBoundingClientRect().y })
		setChaseScale(gsap.utils.clamp(minZoom, maxZoom, newScale))
	}

	const updateZoom = useCallback(() => {
		const props = gsap.getProperty(mapGroupRef.current)

		const oldZoom = zoomScale
		let newZoom = zoomScale

		newZoom += (chaseScale - zoomScale) * accel

		const zoomDelta = newZoom - oldZoom

		const scale = Number(props('scaleX'))
		let x = Number(props('x'))
		let y = Number(props('y'))

		const localX = (pointer.x - x) / scale
		const localY = (pointer.y - y) / scale

		x += -(localX * zoomDelta)
		y += -(localY * zoomDelta)

		//x = gsap.utils.clamp(-(imageWidth  * zoomScale), viewWidth, x);
		//y = gsap.utils.clamp(-(imageHeight * zoomScale), viewHeight, y);

		setZoomScale(newZoom)
		gsap.set(mapGroupRef.current, { scale: newZoom, x: x, y: y })
		//gsap.set(mapImageRef.current, { scale: newZoom, x: x, y: y })
	}, [chaseScale, zoomScale, pointer, mapGroupRef])

	useEffect(() => {
		if (mapGroupRef?.current) {
			if (!draggable) {
				const newDraggable = Draggable.create(mapGroupRef.current, {
					inertia: true,
					allowContextMenu: true,
					cursor: 'auto',
					onDragStart: () => {
						setTooltipActive(false)
					},
					onDrag: () => {
						updateZoom()
					},
					trigger: svgRef.current
				})
				setDraggable(newDraggable)
			}
		}
	}, [mapGroupRef, draggable, setTooltipActive, updateZoom, svgRef])

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
			const svg = d3.select(mapGroupRef.current)
			const geoPathGeneratorSvg = d3.geoPath().projection(projRef.current)

			svg.selectAll('path').remove()

			//canada fill
			svg.append('path')
				.datum(canadaMapData)
				.attr('class', `otherregions canada`)
				.attr('d', geoPathGeneratorSvg)
				.attr('fill', 'var(--color-grey2-grey16)')
				.attr('stroke', 'var(--color-white-grey18)')
				.attr('stroke-width', 0.3)

			//mexico fill
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

			// state Borders
			svg.append('path')
				.datum(usMapData)
				.attr('class', `otherregions mexico`)
				.attr('d', geoPathGeneratorSvg)
				.attr('fill', 'var(--color-white-grey13)')
				.attr('stroke', 'none')
				.attr('stroke-width', 0.2)

			allHazardCounties.forEach((hazardCounty) => {
				console.log(getAlertIdByEvent(hazardCounty.alerts))
				let hazards = ''
				hazardCounty.alerts.forEach((alert) => {
					hazards += alert.properties.event + '|'
				})
				svg.append('path')
					.datum(hazardCounty.feature)
					.attr('class', `${styles.hazardCounty} ${hazardCounty.id}`)
					.attr('d', geoPathGeneratorSvg)
					.attr('shapeId', hazardCounty.id)
					.attr('hazards', hazards)
					.attr('fill', `rgb(${hazardColors[getAlertIdByEvent(hazardCounty.alerts[0].properties.event)]})`) //hazardColors[``]
					.attr('stroke', 'var(--color-grey18-grey15)')
					.attr('stroke-width', 0.2)
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
					.on('click', (event) => {
						//console.log(event, d)
						console.log('click', hazardCounty.id, event)
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

			// // coastal borders
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

	const offset = { x: 3745.5, y: 3188 }

	return (
		<div ref={mapRef} className={styles.HazardsMap} onWheel={onZoom}>
			<svg ref={svgRef} className={styles.svgMap} width={width} height={height}>
				{/* <image
					ref={mapImageRef}
					x={offset.x * -1}
					y={offset.y * -1}
					style={{ transformOrigin: `${offset.x}px ${offset.y}px` }}
					width={imageSize.width}
					height={imageSize.height}
					xlinkHref="/img/data/text/hazards/map-nolines.webp"
				></image> */}
				<g ref={mapGroupRef} className={styles.mapGroup}></g>
			</svg>
			<HazardsTooltip />
		</div>
	)
}

export default HazardsMap
