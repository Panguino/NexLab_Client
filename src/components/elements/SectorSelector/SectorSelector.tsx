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
		const projection = d3.geoConicConformal().scale(1000).translate([-700, -300]).rotate([100, 0]).center([-100, 40])
		const path = d3.geoPath().projection(projection)

		svg.selectAll('*').remove()

		// Draw the map paths using GeoJSON data
		svg.append('g').selectAll('path').data(mapJson.features).enter().append('path').attr('d', path).attr('class', styles.mapPath)

		// Draw the circles
		svg.append('g')
			.selectAll('circle')
			.data(sectors)
			.enter()
			.append('circle')
			.attr('cx', (d) => projection(d.coordinates)[0])
			.attr('cy', (d) => projection(d.coordinates)[1])
			.attr('r', 5)
			.attr('class', styles.point)
			.on('mouseover', function (d) {
				d3.select(this).attr('r', 10)
				svg.append('text')
					.attr('x', projection(d.coordinates)[0])
					.attr('y', projection(d.coordinates)[1] - 10)
					.attr('class', styles.tooltip)
					.text(d.name)
			})
			.on('mouseout', function () {
				d3.select(this).attr('r', 5)
				svg.selectAll(`.${styles.tooltip}`).remove()
			})
			.on('click', (d) => {
				onChange(d.id)
			})
	}, [sectors, onChange, sector])

	return <svg ref={svgRef} className={styles.SectorSelector}></svg>
}

export default SectorSelector
