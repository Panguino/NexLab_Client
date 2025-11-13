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
		const center: [number, number] = [-rotate[0], -rotate[1]]
		const translate: [number, number] = [width / 2, height / 2]
		const projection = d3
			.geoOrthographic()
			.rotate(rotate)
			.precision(0.1)
			.scale(height * scale)
			.translate(translate)
		const path = d3.geoPath().projection(projection)

		svg.selectAll('*').remove()
		// Draw the visible circle of the globe
		const circle = d3.geoCircle().center(center).radius(90)
		svg.append('path')
			.datum(circle())
			.attr('d', (d: any) => path(d) || '')
			.attr('class', styles.globe)

		// Draw the map paths using GeoJSON data
		svg.append('g')
			.selectAll('path')
			.data((mapJson as any).features)
			.enter()
			.append('path')
			.attr('d', (d: any) => path(d) || '')
			.attr('class', styles.mapPath)

		const lakesGroup = svg.append('g')
		lakesGroup
			.selectAll('path.lakePath')
			.data((lakesJson as any).features)
			.enter()
			.append('path')
			.attr('d', (d: any) => path(d) || '')
			.attr('class', styles.lakePath)

		const statesGroup = svg.append('g')
		statesGroup
			.selectAll('path.statePath')
			.data((statesJson as any).features)
			.enter()
			.append('path')
			.attr('d', (d: any) => path(d) || '')
			.attr('class', styles.statePath)

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
			isVisible = d.type === 'Point' ? d3.geoDistance(center, d.coordinates as [number, number]) < Math.PI / 2 : false
			return d.type === 'Point' && isVisible
		})
		const geoboxSectors = sectors.filter((d) => {
			let isVisible = false
			if (d.type === 'Geobox') {
				const geobox = d3
					.geoGraticule()
					.extentMajor(d.coordinates as [[number, number], [number, number]])
					.outline()
				isVisible = d3.geoDistance(center, d3.geoCentroid(geobox) as [number, number]) < Math.PI / 2
			}
			return d.type === 'Geobox' && isVisible
		})

		const lineSectors = sectors.filter((d) => {
			let isVisible = false
			if (d.type === 'Line') {
				const coords = d.coordinates as [[number, number], [number, number]]
				const midpoint = d3.interpolate(coords[0], coords[1])(0.5) as [number, number]
				isVisible = d3.geoDistance(center, midpoint) < Math.PI / 2
			}
			return d.type === 'Line' && isVisible
		})

		// Necessary data transformation to generate Line feature from endpoints
		const arcFromCoordinates = (pointA: [number, number], pointB: [number, number]): any => {
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
				.attr('cx', (d) => {
					const coords = projection(d.coordinates as [number, number])
					return coords ? coords[0] : 0
				})
				.attr('cy', (d) => {
					const coords = projection(d.coordinates as [number, number])
					return coords ? coords[1] : 0
				})
				.attr('r', 10)
				.attr('class', styles.pointRegion)
				.on('mouseover', (_event, d) => {
					d3.select(_event.currentTarget).attr('r', 25)
					const coords = projection(d.coordinates as [number, number])
					svg.append('text')
						.attr('x', coords ? coords[0] : 0)
						.attr('y', coords ? coords[1] - 10 : 0)
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
					const symbolType = d.dotShape ? (d3 as any)[d.dotShape] : d3.symbolCircle
					return symbolGenerator.type(symbolType)()
				})
				.attr('transform', (d) => {
					const coords = projection(d.coordinates as [number, number])
					return coords ? `translate(${coords})` : ''
				})
				.attr('fill', (d) => d.dotColor || '#000')
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
					const geobox = d3
						.geoGraticule()
						.extentMajor(d.coordinates as [[number, number], [number, number]])
						.outline()
					return path(geobox) || ''
				})
				.attr('class', (d) => `${styles.geobox} ${d.id}`)

			// Draw the invisible geobox mouse trigger
			geoboxGroup
				.selectAll('path.geoboxTrigger')
				.data(geoboxSectors)
				.enter()
				.append('circle')
				.attr('cx', (d) => {
					const geobox = d3
						.geoGraticule()
						.extentMajor(d.coordinates as [[number, number], [number, number]])
						.outline()
					const coords = projection(d3.geoCentroid(geobox))
					return coords ? coords[0] : 0
				})
				.attr('cy', (d) => {
					const geobox = d3
						.geoGraticule()
						.extentMajor(d.coordinates as [[number, number], [number, number]])
						.outline()
					const coords = projection(d3.geoCentroid(geobox))
					return coords ? coords[1] : 0
				})
				.attr('r', 25)
				.attr('class', styles.geoboxTrigger)
				.attr('id', (d) => d.id)
				.on('mouseover', (_event, d) => {
					const geoboxOutline = d3
						.geoGraticule()
						.extentMajor(d.coordinates as [[number, number], [number, number]])
						.outline()
					// draw the visible geobox
					d3.select(`.${styles.geobox}.${d.id}`).attr('style', 'opacity: 0.5')
					// draw the tooltip
					const centroidCoords = projection(d3.geoCentroid(geoboxOutline))
					svg.append('text')
						.attr('x', () => {
							return centroidCoords ? centroidCoords[0] : 0
						})
						.attr('y', () => {
							return centroidCoords ? centroidCoords[1] - 10 : 0
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
					const symbolType = d.dotShape ? (d3 as any)[d.dotShape] : d3.symbolCircle
					return symbolGenerator.type(symbolType)()
				})
				.attr('transform', (d) => {
					const geobox = d3
						.geoGraticule()
						.extentMajor(d.coordinates as [[number, number], [number, number]])
						.outline()
					const coords = projection(d3.geoCentroid(geobox))
					return coords ? `translate(${coords})` : ''
				})
				.attr('fill', (d) => d.dotColor || '#000')
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
				.attr('d', (d) => {
					const coords = d.coordinates as [[number, number], [number, number]]
					return path(arcFromCoordinates(coords[0], coords[1])) || ''
				})

			// Draw the invisible line triggers
			lineGroup
				.selectAll('path.lineTrigger')
				.data(lineSectors)
				.enter()
				.append('path')
				.attr('class', styles.lineTrigger)
				.attr('d', (d) => {
					const coords = d.coordinates as [[number, number], [number, number]]
					return path(arcFromCoordinates(coords[0], coords[1])) || ''
				})
				.on('mouseover', (_event, d) => {
					// name tooltip
					const lineName = d3.select('body').append('div').attr('class', styles.lineName).text(d.name)
					svg.on('mousemove', (event) => {
						lineName.style('left', `${event.clientX + 15}px`).style('top', `${event.clientY - 15}px`)
					})

					// endpoint tooltips
					const coords = d.coordinates as [[number, number], [number, number]]
					const coord0 = projection(coords[0])
					const coord1 = projection(coords[1])
					if (coord0) {
						svg.append('text')
							.attr('x', coord0[0])
							.attr('y', coord0[1] - 10)
							.attr('class', styles.tooltip)
							.text('Start')
					}
					if (coord1) {
						svg.append('text')
							.attr('x', coord1[0])
							.attr('y', coord1[1] - 10)
							.attr('class', styles.tooltip)
							.text('End')
					}

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
				.attr('d', (d) => {
					const symbolType = d.dotShape ? (d3 as any)[d.dotShape] : d3.symbolCircle
					return symbolGenerator.type(symbolType)()
				})
				.attr('transform', (d) => {
					const coords = d.coordinates as [[number, number], [number, number]]
					const projCoords = projection(coords[0])
					return projCoords ? `translate(${projCoords})` : ''
				})
				.attr('fill', (d) => d.dotColor || '#000')
				.attr('class', styles.point)
			lineGroup
				.selectAll('.point')
				.data(lineSectors)
				.enter()
				.append('path')
				.attr('d', (d) => {
					const symbolType = d.dotShape ? (d3 as any)[d.dotShape] : d3.symbolCircle
					return symbolGenerator.type(symbolType)()
				})
				.attr('transform', (d) => {
					const coords = d.coordinates as [[number, number], [number, number]]
					const projCoords = projection(coords[1])
					return projCoords ? `translate(${projCoords})` : ''
				})
				.attr('fill', (d) => d.dotColor || '#000')
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
