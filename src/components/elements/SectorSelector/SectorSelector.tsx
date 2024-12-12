import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'
import styles from './SectorSelector.module.scss'
import mapJson from './northAmerica.geo.json'

export type ISectorSelectorProps = {
	sectors: {
		id: string
		name: string
		type: string
		coordinates: [number, number]
	}[]
	sector: string
	onChange: (id: string) => void
}

const SectorSelector: React.FC<ISectorSelectorProps> = ({ sectors, sector, onChange }) => {
	const svgRef = useRef<SVGSVGElement | null>(null)

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		const width = 1000
		const height = Math.round(width * (9 / 16))
		const translate = [width / 2, height / 2]
		// eslint-disable-next-line prettier/prettier
		const projection = d3
			.geoAlbers()
			.precision(0)
			.scale(height * 2)
			.translate(translate)
		const path = d3.geoPath().projection(projection)

		svg.selectAll('*').remove()

		// Draw the map paths using GeoJSON data
		svg.append('g').selectAll('path').data(mapJson.features).enter().append('path').attr('d', path).attr('class', styles.mapPath)

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
					.attr('y', projection(d.coordinates)[1] - 7)
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
	}, [sectors, onChange, sector])

	return <svg ref={svgRef} viewBox="0 0 1000 600" width="100%" height="100%" className={styles.SectorSelector}></svg>
}

export default SectorSelector
