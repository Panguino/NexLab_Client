import { DotColor, DotShape } from '@/data/d3Map/dotStyles'
import lakesJson from '@/data/d3Map/lakes.json'
import statesJson from '@/data/d3Map/states.json'
import mapJson from '@/data/d3Map/world.json'
import { ISector } from '@/store/sectorSelectorPanelSlice'
import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'
import styles from './SectorSelector.module.scss'

export type d3ConfigProps = {
	width: number
	height: number
	rotate: [number, number]
	scale: number
}

export type ISectorSelectorProps = {
	sectors: ISector[]
	d3config?: d3ConfigProps
	onChange?: (sectorId: string) => void
}

const SectorSelector: React.FC<ISectorSelectorProps> = ({ sectors, d3config, onChange }) => {
	const svgRef = useRef<SVGSVGElement | null>(null)

	useEffect(() => {
		if (!d3config) return
		const { width, height, scale, rotate } = d3config
		const svg = d3.select(svgRef.current)
		const center = [-rotate[0], -rotate[1]]
		const translate = [width / 2, height / 2]
		const projection = d3
			.geoOrthographic()
			.rotate(rotate) // center projection by using inverse lat,lon
			.precision(0)
			.scale(height * scale) // zoom
			.translate(translate)
		const path = d3.geoPath().projection(projection)

		svg.selectAll('*').remove()
		// Draw the visible circle of the globe
		const circle = d3.geoCircle().center(center).radius(90)
		svg.append('path').datum(circle()).attr('d', path).attr('class', styles.globe)

		// Draw the map paths using GeoJSON data
		svg.append('g').selectAll('path').data(mapJson.features).enter().append('path').attr('d', path).attr('class', styles.mapPath)

		const lakesGroup = svg.append('g')
		lakesGroup.selectAll('path.lakePath').data(lakesJson.features).enter().append('path').attr('d', path).attr('class', styles.lakePath)

		const statesGroup = svg.append('g')
		statesGroup.selectAll('path.statePath').data(statesJson.features).enter().append('path').attr('d', path).attr('class', styles.statePath)

		// Draw graticule (latitude/longitude lines)
		const graticule = d3
			.geoGraticule()
			.step([10, 10]) // Wider steps to reduce visual clutter
			.precision(0.1) // Lower precision for straighter lines

		// Add graticule lines
		svg.append('path').datum(graticule()).attr('d', path).attr('class', styles.graticule)

		// Optional: Add graticule outline (border)
		svg.append('path').datum(graticule.outline()).attr('d', path).attr('class', styles.graticuleOutline)

		// store symbol generator for later use
		const symbolGenerator = d3.symbol().size(100)
		// Set default values for dotShape and dotColor within sectors
		sectors.forEach((sector) => {
			sector.dotShape = sector.dotShape || DotShape.Circle
			sector.dotColor = sector.dotColor || DotColor.White
		})

		// Split the sectors by type
		const pointSectors = sectors.filter((d) => {
			let isVisible = false
			isVisible = d.type === 'Point' ? d3.geoDistance(center, d.coordinates) < Math.PI / 2 : false
			return d.type === 'Point' && isVisible
		})
		const geoboxSectors = sectors.filter((d) => {
			let isVisible = false
			if (d.type === 'Geobox') {
				const geobox = d3.geoGraticule().extentMajor(d.coordinates).outline()
				isVisible = d3.geoDistance(center, d3.geoCentroid(geobox)) < Math.PI / 2
			}
			return d.type === 'Geobox' && isVisible
		})

		const lineSectors = sectors.filter((d) => {
			let isVisible = false
			if (d.type === 'Line') {
				const midpoint = d3.interpolate(d.coordinates[0], d.coordinates[1])(0.5)
				isVisible = d3.geoDistance(center, midpoint) < Math.PI / 2
			}
			return d.type === 'Line' && isVisible
		})

		// Necessary data transformation to generate Line feature from endpoints
		const arcFromCoordinates = (pointA, pointB) => {
			const interpolation = d3.geoInterpolate(pointA, pointB)
			const numPoints = 100
			const arc = d3.range(numPoints).map((d) => interpolation(d / (numPoints - 1)))
			const arcFeature = {
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: arc,
				},
			}
			return arcFeature
		}

		// Draw Point sectors and their mouse triggers
		if (pointSectors.length > 0) {
			const pointsGroup = svg.append('g')
			pointsGroup
				.selectAll('circle.pointRegion')
				.data(pointSectors)
				.enter()
				.append('circle')
				.attr('cx', (d) => projection(d.coordinates)[0])
				.attr('cy', (d) => projection(d.coordinates)[1])
				.attr('r', 10)
				.attr('class', styles.pointRegion)
				.on('mouseover', (_event, d) => {
					d3.select(_event.currentTarget).attr('r', 25)
					svg.append('text')
						.attr('x', projection(d.coordinates)[0])
						.attr('y', projection(d.coordinates)[1] - 10)
						.attr('class', styles.tooltip)
						.text(d.name)
				})
				.on('mouseout', (_event) => {
					d3.select(_event.currentTarget).attr('r', 10)
					svg.selectAll(`.${styles.tooltip}`).remove()
				})
				.on('click', (_event, d) => {
					onChange(d.id)
				})

			pointsGroup
				.selectAll('circle.point')
				.data(pointSectors)
				.enter()
				.append('path')
				.attr('d', (d) => {
					return symbolGenerator.type(d3[d.dotShape])()
				})
				.attr('transform', (d) => `translate(${projection(d.coordinates)})`)
				.attr('fill', (d) => d.dotColor)
				.attr('class', styles.point)
		}

		// Draw Geobox sectors and their mouse triggers
		if (geoboxSectors.length > 0) {
			const geoboxGroup = svg.append('g')

			// Draw the visible geobox outlines
			geoboxGroup
				.selectAll('path.geobox')
				.data(geoboxSectors)
				.enter()
				.append('path')
				.attr('d', (d) => {
					const geobox = d3.geoGraticule().extentMajor(d.coordinates).outline()
					return path(geobox)
				})
				.attr('class', (d) => `${styles.geobox} ${d.id}`)

			// Draw the invisible geobox mouse trigger
			geoboxGroup
				.selectAll('path.geoboxTrigger')
				.data(geoboxSectors)
				.enter()
				.append('circle')
				.attr('cx', (d) => {
					const geobox = d3.geoGraticule().extentMajor(d.coordinates).outline()
					return projection(d3.geoCentroid(geobox))[0]
				})
				.attr('cy', (d) => {
					const geobox = d3.geoGraticule().extentMajor(d.coordinates).outline()
					return projection(d3.geoCentroid(geobox))[1]
				})
				.attr('r', 25)
				.attr('class', styles.geoboxTrigger)
				.attr('id', (d) => d.id)
				.on('mouseover', (_event, d) => {
					const geoboxOutline = d3.geoGraticule().extentMajor(d.coordinates).outline()
					// draw the visible geobox
					d3.select(`.${styles.geobox}.${d.id}`).attr('style', 'opacity: 0.5')
					// draw the tooltip
					svg.append('text')
						.attr('x', () => {
							return projection(d3.geoCentroid(geoboxOutline))[0]
						})
						.attr('y', () => {
							return projection(d3.geoCentroid(geoboxOutline))[1] - 10
						})
						.attr('class', styles.tooltip)
						.text(d.name)
				})
				.on('mouseout', (d) => {
					d3.select(`.${styles.geobox}.${d.target.id}`).attr('style', 'opacity: 0')
					svg.selectAll(`.${styles.tooltip}`).remove()
				})
				.on('click', (_event, d) => {
					onChange(d.id)
				})

			// Draw the geobox center point
			// projection(d3.geoCentroid(geobox))
			geoboxGroup
				.selectAll('circle.point')
				.data(geoboxSectors)
				.enter()
				.append('path')
				.attr('d', (d) => {
					return symbolGenerator.type(d3[d.dotShape])()
				})
				.attr('transform', (d) => {
					const geobox = d3.geoGraticule().extentMajor(d.coordinates).outline()
					return `translate(${projection(d3.geoCentroid(geobox))})`
				})
				.attr('fill', (d) => d.dotColor)
				.attr('class', styles.point)
		}

		// Draw Line sectors and their mouse triggers
		if (lineSectors.length > 0) {
			const lineGroup = svg.append('g')

			// Draw the visible line paths
			lineGroup
				.selectAll('path.line')
				.data(lineSectors)
				.enter()
				.append('path')
				.attr('class', (d) => `${styles.line} ${d.id}`)
				.attr('d', (d) => path(arcFromCoordinates(d.coordinates[0], d.coordinates[1])))

			// Draw the invisible line triggers
			lineGroup
				.selectAll('path.lineTrigger')
				.data(lineSectors)
				.enter()
				.append('path')
				.attr('class', styles.lineTrigger)
				.attr('d', (d) => path(arcFromCoordinates(d.coordinates[0], d.coordinates[1])))
				.on('mouseover', (_event, d) => {
					// name tooltip
					const lineName = d3.select('body').append('div').attr('class', styles.lineName).text(d.name)
					svg.on('mousemove', (event) => {
						lineName.style('left', `${event.clientX + 15}px`).style('top', `${event.clientY - 15}px`)
					})

					// endpoint tooltips
					svg.append('text')
						.attr('x', projection(d.coordinates[0])[0])
						.attr('y', projection(d.coordinates[0])[1] - 10)
						.attr('class', styles.tooltip)
						.text(d.label[0])
					svg.append('text')
						.attr('x', projection(d.coordinates[1])[0])
						.attr('y', projection(d.coordinates[1])[1] - 10)
						.attr('class', styles.tooltip)
						.text(d.label[1])

					// highlight the line
					svg.select(`path.${d.id}`).attr('class', `${styles.lineHover} ${d.id}`)
				})
				.on('mouseout', (_event, d) => {
					svg.selectAll(`path.${d.id}`).attr('class', `${styles.line} ${d.id}`)
					svg.selectAll(`.${styles.tooltip}`).remove()
					d3.selectAll(`.${styles.lineName}`).remove()
					svg.on('mousemove', null)
				})
				.on('click', (_event, d) => {
					onChange(d.id)
				})

			// Draw the line start and end points
			lineGroup
				.selectAll('.point')
				.data(lineSectors)
				.enter()
				.append('path')
				.attr('d', (d) => symbolGenerator.type(d.dotShape)())
				.attr('transform', (d) => `translate(${projection(d.coordinates[0])})`)
				.attr('fill', (d) => d.dotColor)
				.attr('class', styles.point)
			lineGroup
				.selectAll('.point')
				.data(lineSectors)
				.enter()
				.append('path')
				.attr('d', (d) => symbolGenerator.type(d.dotShape)())
				.attr('transform', (d) => `translate(${projection(d.coordinates[1])})`)
				.attr('fill', (d) => d.dotColor)
				.attr('class', styles.point)
		}
	}, [sectors, d3config, onChange])

	if (!d3config) return <></>
	const { width, height } = d3config

	return (
		<div className={styles.SectorSelector}>
			<svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} width="100%" height="100%"></svg>
		</div>
	)
}

export default SectorSelector
