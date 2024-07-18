'use client'
import { geoGraticule } from 'd3-geo'
import * as d3 from 'd3'
import { useCallback, useEffect, useRef, useState } from 'react'
import { multiPolygon, polygon } from '@turf/turf'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

//import hazardColors from '@/data/hazardColors.json'
import { HAZARD_COLORS, HAZARD_LEVELS, HAZARD_TYPES } from '@/data/hazardMapVars'
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
import getAlertIdByEvent from '@/util/getAlertIdByEvent'
import HazardsTooltip from './HazardsTooltip/HazardsTooltip'
import { useRootStore } from '@/store/useRootStore'
import { DATA_TEXT_HAZARDS_MAP_DETAILS } from '@/config/vars'
import { useInterval } from '@/hooks/useInterval'
import { highlightHazard } from '@/util/hazardMapUtils'

gsap.registerPlugin(Draggable)

const HazardsMap = () => {
	const activeHazards = useRootStore.use.activeHazards()
	const toggledHazards = useRootStore.use.toggledHazards()
	const setHazardTotals = useRootStore.use.setHazardTotals()
	const setTooltipActive = useRootStore.use.setTooltipActive()
	const setTooltipContent = useRootStore.use.setTooltipContent()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()
	const selectedCounty = useRootStore.use.selectedCounty()
	const selectedRegion = useRootStore.use.selectedRegion()

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
	const minZoom = 1
	const maxZoom = 30
	const scaleFactor = 1.6

	const [multiAlertCounties, setMultiAlertCounties] = useState({})
	const slideoutPanelIsOpen = useRootStore.use.slideoutPanelIsOpen()
	const [isAnimating, setIsAnimating] = useState(true)

	useEffect(() => {
		if (document) {
			const hazardCounties = document.querySelectorAll(`.${styles.hazardCounty}`)
			//console.log('selectedCounty', selectedCounty)
			hazardCounties.forEach((hazardCounty) => {
				hazardCounty.classList.remove(styles.activeCounty)
				if (hazardCounty.getAttribute('shapeId') === selectedCounty.id) {
					hazardCounty.classList.add(styles.activeCounty)
				}
			})
		}
	}, [selectedCounty])

	useEffect(() => {
		setIsAnimating(!slideoutPanelIsOpen)
	}, [slideoutPanelIsOpen])

	const animateMultiHazardCounties = () => {
		//console.log('animating multi hazard counties', multiAlertCounties)
		if (isAnimating) {
			const newMultiAlertCounties = { ...multiAlertCounties }
			for (const id in multiAlertCounties) {
				const { index, colors } = multiAlertCounties[id]
				//console.log(id, index, colors)
				gsap.to(`path[shapeId="${id}"]`, { fill: `rgb("${colors[index]}")`, duration: 0.5, ease: 'linear.easeNone' })
				newMultiAlertCounties[id].index = index + 1 < colors.length ? index + 1 : 0
			}
			setMultiAlertCounties(newMultiAlertCounties)
		}
	}
	useInterval(animateMultiHazardCounties, 2000)

	useEffect(() => {
		if (document) {
			const hazardCounties = document.querySelectorAll(`.${styles.hazardCounty}`)
			hazardCounties.forEach((hazardCounty) => {
				//console.log(hazardCounty.getAttribute('hazards'), activeHazard)
				gsap.to(hazardCounty, {
					opacity: highlightHazard(hazardCounty.getAttribute('hazards'), activeHazards, toggledHazards) ? 1 : 0.2,
					duration: 0.25,
					ease: 'linear.easeNone'
				})
				// fill county with active hazard color if it contains that active hazard
				/*if (activeHazard in hazardColors && hazardCounty.getAttribute('hazards').includes(activeHazard)) {
					gsap.to(hazardCounty, {
						fill: `rgb(${hazardColors[activeHazard]})`,
						duration: 0.25,
						ease: 'linear.easeNone'
					})
				}*/
			})
		}
	}, [activeHazards])

	const onZoom = useCallback(
		(event) => {
			const mapGroup = mapGroupRef.current
			const wheel = event.detail || event.deltaY || 0
			const map = mapRef.current
			const props = gsap.getProperty(mapGroup)
			const currentScale = Number(props('scaleX')) // Assuming scaleX and scaleY are the same
			const currentX = Number(props('x'))
			const currentY = Number(props('y'))
			if (!mapGroup || !map) return

			let newScale = currentScale

			if (wheel > 0) {
				newScale /= scaleFactor
			} else {
				newScale *= scaleFactor
			}
			newScale = gsap.utils.clamp(minZoom, maxZoom, newScale)

			// get the target position, subtract the map container position offset, subtract the map position offset.
			let targetX = event.clientX // county position
			targetX -= mapRef.current.getBoundingClientRect().x // map containter offset from window
			targetX -= currentX
			targetX /= currentScale
			targetX *= -newScale
			targetX += event.clientX
			targetX -= mapRef.current.getBoundingClientRect().x

			let targetY = event.clientY
			targetY -= mapRef.current.getBoundingClientRect().y
			targetY -= currentY
			targetY /= currentScale
			targetY *= -newScale
			targetY += event.clientY
			targetY -= mapRef.current.getBoundingClientRect().y

			targetX = gsap.utils.clamp(-width * newScale + width, 0, targetX)
			targetY = gsap.utils.clamp(-height * newScale + height, 0, targetY)

			gsap.to(mapGroup, { duration: 0.5, scale: newScale, x: targetX, y: targetY, ease: 'power1.out' })
		},
		[mapGroupRef, mapRef, width, height]
	)

	const updatePosition = useCallback(
		(target) => {
			const mapGroup = mapGroupRef.current
			const map = mapRef.current
			if (!target || !mapGroup || !map) return

			const props = gsap.getProperty(mapGroup)
			const currentScale = Number(props('scaleX')) // Assuming scaleX and scaleY are the same
			const currentX = Number(props('x'))
			const currentY = Number(props('y'))
			let newScale = 2 + 150 / ((target.getBoundingClientRect().width + target.getBoundingClientRect().height) / currentScale)
			//console.log('newScale', newScale, target.getBoundingClientRect().width, target.getBoundingClientRect().height, currentScale)
			// get the target position, subtract the map container position offset, subtract the map position offset
			let targetX = target.getBoundingClientRect().x // county position
			targetX -= mapRef.current.getBoundingClientRect().x // map containter offset from window
			targetX += target.getBoundingClientRect().width / 2
			targetX -= currentX
			targetX /= currentScale
			targetX *= -newScale
			targetX += mapRef.current.getBoundingClientRect().width / 3

			let targetY = target.getBoundingClientRect().y
			targetY -= mapRef.current.getBoundingClientRect().y
			targetY += target.getBoundingClientRect().height / 2
			targetY -= currentY
			targetY /= currentScale
			targetY *= -newScale
			targetY += mapRef.current.getBoundingClientRect().height / 2

			newScale = gsap.utils.clamp(minZoom, maxZoom, newScale)
			targetX = gsap.utils.clamp(-width * newScale + width, 0, targetX)
			targetY = gsap.utils.clamp(-height * newScale + height, 0, targetY)
			// Use GSAP to smoothly transition to the new position
			gsap.to(mapGroup, { duration: 0.5, scale: newScale, x: targetX, y: targetY, ease: 'power1.out' })
		},
		[mapGroupRef, mapRef, width, height]
	)

	useEffect(() => {
		const translate = [width / 2, height / 2]
		const generalScale = Math.min(width * 1.2, height * 2)
		const projections = {
			conus: {
				scale: generalScale,
				projection: d3.geoAlbers().precision(0).scale(2)
			},
			ak: {
				scale: generalScale * 1.2,
				projection: d3.geoConicEqualArea().precision(0).center([0, 62]).rotate([154, 0])
			},
			hi: {
				scale: generalScale * 2,
				projection: d3.geoMercator().precision(0).center([0, 20.5]).rotate([157, 0])
			},
			pr: {
				scale: generalScale * 4,
				projection: d3.geoConicEqualArea().precision(0).center([0, 18.21]).rotate([66, 0])
			},
			sam: {
				scale: generalScale * 4,
				projection: d3.geoMercator().precision(0).center([0, -13]).rotate([170, 0])
			},
			gum: {
				scale: generalScale,
				projection: d3.geoMercator().precision(0).center([0, 13.45]).rotate([-153, 0])
			}
		}

		if (width && height) {
			projRef.current = projections[selectedRegion].projection
				.scale(projections[selectedRegion].scale)
				.translate(translate)
				.clipExtent([
					[0, 0],
					[width, height]
				])
		}
	}, [selectedRegion, width, height])

	useEffect(() => {
		if (mapGroupRef?.current && svgRef?.current && !draggable) {
			const newDraggable = Draggable.create(mapGroupRef.current, {
				inertia: true,
				bounds: svgRef.current,
				allowContextMenu: true,
				cursor: 'auto',
				onDragStart: () => {
					setTooltipActive(false)
				},
				trigger: svgRef.current
			})
			setDraggable(newDraggable)
		}
	}, [mapGroupRef, draggable, setTooltipActive, svgRef])

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
			svg.append('path').datum(canadaMapData).attr('class', `${styles.otherregions} canada`).attr('d', geoPathGeneratorSvg)

			//mexico fill
			svg.append('path').datum(mexicoMapData).attr('class', `${styles.otherregions} mexico`).attr('d', geoPathGeneratorSvg)

			// Lat and long
			const graticule = geoGraticule().step([6.5, 6.5])
			svg.append('path').datum(graticule).attr('class', `${styles.latlong} latlong`).attr('d', geoPathGeneratorSvg)

			// counties
			// svg.append('path')
			// 	.datum(countiesMapData)
			// 	.attr('class', `otherregions mexico`)
			// 	.attr('d', geoPathGeneratorSvg)
			// 	.attr('fill', 'var(--color-white-grey13)')
			// 	.attr('stroke', 'var(--color-grey2-grey16)')
			// 	.attr('stroke-width', 0.2)

			// state Borders
			svg.append('path').datum(usMapData).attr('class', `${styles.usabg} conus`).attr('d', geoPathGeneratorSvg)

			allHazardCounties.forEach((hazardCounty) => {
				//console.log(getAlertIdByEvent(hazardCounty.alerts))
				let hazards = ''
				hazardCounty.alerts.forEach((alert) => {
					hazards += getAlertIdByEvent(alert.properties.event) + '|'
				})
				const hazardInfo = getAlertIdByEvent(hazardCounty.alerts[0].properties.event)
				svg.append('path')
					.datum(hazardCounty.feature)
					.attr('class', `${styles.hazardCounty} ${hazardCounty.id}`)
					.attr('d', geoPathGeneratorSvg)
					.attr('shapeId', hazardCounty.id)
					.attr('hazards', hazards)
					.attr('fill', `rgb(${HAZARD_COLORS[hazardInfo.type][hazardInfo.level]})`)
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
						openSlideoutPanel(DATA_TEXT_HAZARDS_MAP_DETAILS)
						setSelectedCounty(hazardCounty)
						//const newScale = 4
						// TODO Fix the centering of the county
						updatePosition(event.target)
						//setChaseScale(gsap.utils.clamp(minZoom, maxZoom, newScale))
					})
			})

			// state Borders
			svg.append('path').datum(usMapData).attr('class', `${styles.usafg} conus`).attr('d', geoPathGeneratorSvg)

			// // coastal borders
			svg.append('path').datum(coastalMapData).attr('class', `${styles.oceanregions} coastal`).attr('d', geoPathGeneratorSvg)

			// offshore borders
			svg.append('path').datum(offshoreMapData).attr('class', `${styles.oceanregions} offshore`).attr('d', geoPathGeneratorSvg)
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
		setTooltipContent,
		openSlideoutPanel,
		setSelectedCounty,
		mapRef,
		updatePosition,
		selectedRegion
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

		// get totals for each hazrad type
		const hazardCounts = []
		HAZARD_TYPES.forEach((type) => {
			HAZARD_LEVELS.forEach((level) => {
				hazardCounts[`${type} ${level}`] = 0
			})
		})
		const multiAlertCountiesInfo = {}
		hazardCounties.forEach((hazardCounty) => {
			const flattenedAlerts = flattenAlerts(hazardCounty.alerts)
			const alertColors = []
			flattenedAlerts.forEach((alert) => {
				const alertInfo = getAlertIdByEvent(alert.properties.event)
				alertColors.push(HAZARD_COLORS[alertInfo.type][alertInfo.level])
				hazardCounts[`${alertInfo.type} ${alertInfo.level}`]++
			})
			if (flattenedAlerts.length > 1) {
				multiAlertCountiesInfo[hazardCounty.id] = { index: 0, colors: alertColors }
			}
		})
		setMultiAlertCounties(multiAlertCountiesInfo)
		setHazardTotals(hazardCounts)
	}

	const flattenAlerts = (alerts: any) => {
		const flatAlerts = []
		const alertTypes = []
		alerts.forEach((alert: any) => {
			const alertInfo = getAlertIdByEvent(alert.properties.event)
			if (alertTypes.includes(`${alertInfo.type} ${alertInfo.level}`)) {
				return
			} else {
				flatAlerts.push(alert)
			}
			alertTypes.push(`${alertInfo.type} ${alertInfo.level}`)
		})
		return flatAlerts
	}

	return (
		<div ref={mapRef} className={styles.HazardsMap} onWheel={onZoom}>
			<svg ref={svgRef} className={styles.svgMap} width={width} height={height}>
				<g ref={mapGroupRef} className={styles.mapGroup}></g>
			</svg>
			<HazardsTooltip />
		</div>
	)
}

export default HazardsMap
