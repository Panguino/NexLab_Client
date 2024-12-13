import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'
import styles from './SectorSelector.module.scss'
import lakesJson from './lakes.json'
import statesJson from './states.json'
import mapJson from './world.json'

export type d3ConfigProps = {
	width: number
	height: number
	rotate: [number, number]
	scale: number
}

export type ISectorSelectorProps = {
	sectors: {
		id: string
		name: string
		type: string
		coordinates: [number, number]
	}[]
	sector: string
	onChange: (id: string) => void
	d3config?: d3ConfigProps
}

const SectorSelector: React.FC<ISectorSelectorProps> = ({ sectors, sector, onChange, d3config }) => {
	const svgRef = useRef<SVGSVGElement | null>(null)

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		const width = d3config?.width || 1000
		const height = d3config?.height || 600
		const translate = [width / 2, height / 2]
		// eslint-disable-next-line prettier/prettier
		const projection = d3
			.geoOrthographic() // like a 2d globe
			.precision(0)
			.scale(height * d3config.scale) // zoom
			.translate(translate)
			.rotate(d3config.rotate) // center projection by using inverse lat,lon
		const path = d3.geoPath().projection(projection)

		svg.selectAll('*').remove()
		// Draw the map paths using GeoJSON data
		svg.append('g').selectAll('path').data(mapJson.features).enter().append('path').attr('d', path).attr('class', styles.mapPath)

		const lakesGroup = svg.append('g')
		// eslint-disable-next-line prettier/prettier
		lakesGroup.selectAll('path.lakePath').data(lakesJson.features).enter().append('path').attr('d', path).attr('class', styles.lakePath)

		const statesGroup = svg.append('g')
		// eslint-disable-next-line prettier/prettier
		statesGroup.selectAll('path.statePath').data(statesJson.features).enter().append('path').attr('d', path).attr('class', styles.statePath)
		// Draw the circles
		const pointsGroup = svg.append('g')

		// Draw interactive regions
		pointsGroup
			.selectAll('circle.pointRegion')
			.data(sectors)
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
					.text(d.id)
			})
			.on('mouseout', (_event) => {
				d3.select(_event.currentTarget).attr('r', 10)
				svg.selectAll(`.${styles.tooltip}`).remove()
			})
			.on('click', (_event, d) => {
				onChange(`${d.id} - ${d.name}`)
			})

		pointsGroup
			.selectAll('circle.point')
			.data(sectors)
			.enter()
			.append('circle')
			.attr('cx', (d) => projection(d.coordinates)[0])
			.attr('cy', (d) => projection(d.coordinates)[1])
			.attr('r', 5)
			.attr('class', styles.point)
	}, [sectors, onChange, sector, d3config])

	return <svg ref={svgRef} viewBox={`0 0 ${d3config.width} ${d3config.height}`} width="100%" height="100%" className={styles.SectorSelector}></svg>
}

export default SectorSelector
