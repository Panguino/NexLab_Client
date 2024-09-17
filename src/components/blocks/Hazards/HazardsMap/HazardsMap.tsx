'use client'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT } from '@/data/vars'
import useDimensions from '@/hooks/useDimensions'
import { useInterval } from '@/hooks/useInterval'
import { useRootStore } from '@/store/useRootStore'
import { flattenAlerts } from '@/util/hazardMapUtils'
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as d3 from 'd3'
import { geoGraticule } from 'd3-geo'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import styles from './HazardsMap.module.scss'
import HazardsTooltip from './HazardsTooltip/HazardsTooltip'

const HazardsMap = ({ displayRegions, displayStates, displayOffshores }) => {
	const regionHazards = useRootStore.use.regionHazards()
	const setTooltipActive = useRootStore.use.setTooltipActive()
	const setTooltipContent = useRootStore.use.setTooltipContent()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()
	const selectedCounty = useRootStore.use.selectedCounty()
	const selectedRegion = useRootStore.use.selectedRegion()

	const activeHazards = useRootStore.use.activeHazards()
	const activeHazardLevels = useRootStore.use.activeHazardLevels()
	const activeHazardTypes = useRootStore.use.activeHazardTypes()
	const isHazardVisible = useRootStore.use.isHazardVisible()
	const anyActiveOrToggledHazards = useRootStore.use.anyActiveOrToggledHazards()
	const hazardMapFullScreen = useRootStore.use.hazardMapFullScreen()
	const setHazardMapFullScreen = useRootStore.use.setHazardMapFullScreen()

	const [mapRef, { width, height, adjustedHeight, adjustedWidth }] = useDimensions(7 / 4)
	const svgRef = useRef(null)
	const projRef = useRef(d3.geoAlbers().precision(0))

	const mapGroupRef = useRef(null)

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
					const { type, level, color } = alerts[nextIndex].hazardInfo
					if (isHazardVisible(type.type, level.level) || anyActiveOrToggledHazards()) {
						gsap.to(`path[shapeId="${id}"]`, { fill: color.HEX, duration: 0.5, ease: 'linear.easeNone' })
					}
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
				const countyId = hazardCounty.getAttribute('shapeId')
				if (!regionHazards[countyId]) return
				const alerts = regionHazards[countyId].alerts
				const flattenedAlerts = flattenAlerts(alerts)
				let active = false
				const activeHazardColors = []
				flattenedAlerts.forEach(({ type, level, color }) => {
					if (isHazardVisible(type, level)) {
						active = true
						activeHazardColors.push(color)
					}
				})
				gsap.to(hazardCounty, {
					opacity: active || anyActiveOrToggledHazards() ? 1 : 0.2,
					duration: 0.15,
					ease: 'linear.easeNone',
				})

				// fill county with active hazard color if it contains that active hazard
				if (active && !anyActiveOrToggledHazards()) {
					gsap.to(hazardCounty, {
						fill: activeHazardColors[0],
						duration: 0.25,
						ease: 'linear.easeNone',
					})
				}
			})
		}
	}, [activeHazardTypes, activeHazardLevels, activeHazards, anyActiveOrToggledHazards, regionHazards, isHazardVisible])

	useEffect(() => {
		// update region and width and height for projection when those variables change
		const translate = [adjustedWidth / 2, adjustedHeight / 2]
		const generalScale = Math.min(adjustedWidth * 1.2, adjustedHeight * 2)
		const projections = {
			conus: {
				scale: generalScale,
				projection: d3.geoAlbers().precision(0).scale(2),
			},
			ak: {
				scale: generalScale * 1.2,
				projection: d3.geoConicEqualArea().precision(0).center([0, 62]).rotate([154, 0]),
			},
			hi: {
				scale: generalScale * 2,
				projection: d3.geoMercator().precision(0).center([0, 20.5]).rotate([157, 0]),
			},
			pr: {
				scale: generalScale * 4,
				projection: d3.geoConicEqualArea().precision(0).center([0, 18.21]).rotate([66, 0]),
			},
			sam: {
				scale: generalScale * 4,
				projection: d3.geoMercator().precision(0).center([0, -13]).rotate([170, 0]),
			},
			gum: {
				scale: generalScale,
				projection: d3.geoMercator().precision(0).center([0, 13.45]).rotate([-153, 0]),
			},
		}

		if (adjustedWidth && adjustedHeight) {
			projRef.current = projections[selectedRegion].projection
				.scale(projections[selectedRegion].scale)
				.translate(translate)
				.clipExtent([
					[0, 0],
					[adjustedWidth, adjustedHeight],
				])
		}
	}, [selectedRegion, adjustedWidth, adjustedHeight, mapRef])

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
					.on('click', () => {
						openSlideoutPanel(DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT)
						setSelectedCounty(key)
					})
			})

			// state Borders
			svg.append('path').datum(displayStates).attr('class', `${styles.usafg} conus`).attr('d', geoPathGeneratorSvg)

			// // coastal/offshore borders
			svg.append('path').datum(displayOffshores).attr('class', `${styles.oceanregions} coastal offshore`).attr('d', geoPathGeneratorSvg)
		}
	}, [
		adjustedWidth,
		adjustedHeight,
		projRef,
		mapGroupRef,
		setTooltipActive,
		setTooltipContent,
		openSlideoutPanel,
		setSelectedCounty,
		mapRef,
		selectedRegion,
		displayRegions,
		displayStates,
		displayOffshores,
		regionHazards,
	])

	return (
		<div ref={mapRef} className={styles.HazardsMap}>
			<TransformWrapper initialScale={1} disablePadding centerOnInit>
				<TransformComponent
					wrapperStyle={{
						width: width,
						height: height,
					}}
					contentStyle={{ width: adjustedWidth, height: adjustedHeight }}
				>
					<svg ref={svgRef} className={styles.svgMap} width={adjustedWidth} height={adjustedHeight}>
						<g ref={mapGroupRef} className={styles.mapGroup}></g>
					</svg>
				</TransformComponent>
			</TransformWrapper>
			<HazardsTooltip />
			<div
				className={styles.fullScreenButton}
				onClick={() => {
					setHazardMapFullScreen(!hazardMapFullScreen)
				}}
			>
				<FontAwesomeIcon icon={hazardMapFullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} />
			</div>
			<MobileIconNav />
		</div>
	)
}

export default HazardsMap
