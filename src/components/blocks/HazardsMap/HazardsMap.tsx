'use client'
import { geoGraticule } from 'd3-geo'
import * as d3 from 'd3'
import { useCallback, useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

import styles from './HazardsMap.module.scss'
import useDimensions from '@/hooks/useDimensions'
import HazardsTooltip from './HazardsTooltip/HazardsTooltip'
import { useRootStore } from '@/store/useRootStore'
import { DATA_TEXT_HAZARDS_MAP_DETAILS } from '@/config/vars'
import { useInterval } from '@/hooks/useInterval'
import { flattenAlerts } from '@/util/hazardMapUtils'

gsap.registerPlugin(Draggable)

const HazardsMap = ({ displayRegions, displayStates, displayOffshores, alerts }) => {
	const regionHazards = useRootStore.use.regionHazards()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const setTooltipActive = useRootStore.use.setTooltipActive()
	const setTooltipContent = useRootStore.use.setTooltipContent()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()
	const selectedCounty = useRootStore.use.selectedCounty()
	const selectedRegion = useRootStore.use.selectedRegion()

	const activeHazards = useRootStore.use.activeHazards()
	const activeHazardLevels = useRootStore.use.activeHazardLevels()
	const activeHazardTypes = useRootStore.use.activeHazardTypes()
	const isHazardActive = useRootStore.use.isHazardActive()

	const [mapRef, { width, height }] = useDimensions()
	const svgRef = useRef(null)
	const projRef = useRef(d3.geoAlbers().precision(0))

	const [draggable, setDraggable] = useState(null)
	const mapGroupRef = useRef(null)
	const minZoom = 1
	const maxZoom = 30
	const scaleFactor = 1.6

	const slideoutPanelIsOpen = useRootStore.use.slideoutPanelIsOpen()
	const [isAnimating, setIsAnimating] = useState(true)

	useEffect(() => {
		if (document) {
			const hazardCounties = document.querySelectorAll(`.${styles.hazardCounty}`)
			hazardCounties.forEach((hazardCounty) => {
				hazardCounty.classList.remove(styles.activeCounty)
				if (hazardCounty.getAttribute('shapeId') === selectedCounty) {
					hazardCounty.classList.add(styles.activeCounty)
				}
			})
		}
	}, [selectedCounty])

	useEffect(() => {
		console.log(regionHazards)
	}, [regionHazards])

	useEffect(() => {
		setIsAnimating(!slideoutPanelIsOpen)
	}, [slideoutPanelIsOpen])

	const animateMultiHazardCounties = () => {
		if (isAnimating) {
			for (const id in regionHazards) {
				const alerts = regionHazards[id].alerts
				if (alerts.length > 1) {
					const countyshape = document.querySelector(`path[shapeId="${id}"]`)
					const currentIndex = parseInt(countyshape.getAttribute('hazardIndex'))
					const nextIndex = currentIndex + 1 < alerts.length ? currentIndex + 1 : 0
					const color = alerts[nextIndex].hazardInfo.color.HEX
					gsap.to(`path[shapeId="${id}"]`, { fill: color, duration: 0.5, ease: 'linear.easeNone' })
					countyshape.setAttribute('hazardIndex', String(nextIndex))
				}
			}
		}
	}
	useInterval(animateMultiHazardCounties, 2000)

	useEffect(() => {
		if (document) {
			const hazardCounties = document.querySelectorAll(`.${styles.hazardCounty}`)
			hazardCounties.forEach((hazardCounty) => {
				//console.log(hazardCounty.getAttribute('hazards'), activeHazard)
				const countyId = hazardCounty.getAttribute('shapeId')
				if (!regionHazards[countyId]) return
				const alerts = regionHazards[countyId].alerts
				const flattenedAlerts = flattenAlerts(alerts)
				let active = false
				flattenedAlerts.forEach(({ type, level }) => {
					if (isHazardActive(type, level)) {
						active = true
					}
				})
				gsap.to(hazardCounty, {
					opacity: active ? 1 : 0.2,
					duration: 0.15,
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
	}, [activeHazardTypes, activeHazardLevels, activeHazards, isHazardActive, regionHazards])

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
		if (selectedRegion) {
			const ids = {
				conus: 'Continental United States',
				ak: 'Alaska',
				hi: 'Hawaii',
				pr: 'Puerto Rico',
				sam: 'American Samoa',
				gum: 'Guam'
			}
			setRegionHazards(alerts[ids[selectedRegion]])
		}
	}, [setRegionHazards, selectedRegion, alerts])

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
		if (!displayRegions || !displayStates || !regionHazards) {
			return
		}
		if (mapGroupRef.current) {
			const svg = d3.select(mapGroupRef.current)
			const geoPathGeneratorSvg = d3.geoPath().projection(projRef.current)

			svg.selectAll('path').remove()

			// other regions
			svg.append('path').datum(displayRegions).attr('class', `${styles.otherregions}`).attr('d', geoPathGeneratorSvg)

			// Lat and long
			const graticule = geoGraticule().step([6.5, 6.5])
			svg.append('path').datum(graticule).attr('class', `${styles.latlong} latlong`).attr('d', geoPathGeneratorSvg)

			// state regions
			svg.append('path').datum(displayStates).attr('class', `${styles.usabg} usastates`).attr('d', geoPathGeneratorSvg)

			Object.keys(regionHazards).forEach((key) => {
				const { shape, alerts, properties } = regionHazards[key]
				const { hazardInfo } = alerts[0]
				svg.append('path')
					.datum(shape)
					.attr('class', `${styles.hazardCounty} ${hazardInfo.type.type} ${hazardInfo.level.level}`)
					.attr('d', geoPathGeneratorSvg)
					.attr('shapeId', key)
					.attr('hazardIndex', 0)
					.attr('fill', `${hazardInfo.color.HEX}`)
					.on('mouseover', (event) => {
						setTooltipContent({ alerts, properties })
						setTooltipActive(true)
						d3.select(event.target).raise()
					})
					.on('mouseout', () => {
						setTooltipActive(false)
					})
					.on('click', (event) => {
						openSlideoutPanel(DATA_TEXT_HAZARDS_MAP_DETAILS)
						setSelectedCounty(key)
						updatePosition(event.target)
					})
			})

			// state Borders
			svg.append('path').datum(displayStates).attr('class', `${styles.usafg} conus`).attr('d', geoPathGeneratorSvg)

			// // coastal/offshore borders
			svg.append('path').datum(displayOffshores).attr('class', `${styles.oceanregions} coastal offshore`).attr('d', geoPathGeneratorSvg)
		}
	}, [
		width,
		height,
		projRef,
		mapGroupRef,
		setTooltipActive,
		setTooltipContent,
		openSlideoutPanel,
		setSelectedCounty,
		mapRef,
		updatePosition,
		selectedRegion,
		displayRegions,
		displayStates,
		displayOffshores,
		regionHazards
	])

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
