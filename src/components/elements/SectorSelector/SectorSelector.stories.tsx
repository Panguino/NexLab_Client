import { ALL_CROSS_SECTORS } from '@/data/analysis/cross-sectional-analysis/sectors'
import { LARGE_SURFACE_SECTORS, STATE_SURFACE_SECTORS } from '@/data/analysis/surface/sectors'
import { DotColor, DotShape } from '@/data/d3Map/dotStyles'
import { StoryFn } from '@storybook/react'
import { useState } from 'react'
import Select from '../Select/Select'
import SectorSelector from './SectorSelector'
import { regions } from './regions'

const pointSectors = Object.entries(STATE_SURFACE_SECTORS).map(([sector, sectorObj]) => ({
	id: sector,
	...sectorObj,
}))

const geoboxSectors = Object.entries(LARGE_SURFACE_SECTORS).map(([sector, sectorObj]) => ({
	id: sector,
	...sectorObj,
}))

const crossSectors = Object.entries(ALL_CROSS_SECTORS).map(([sector, sectorObj]) => ({
	id: sector,
	...sectorObj,
}))

const regionOptions = Object.keys(regions).map((region) => {
	return { value: regions[region].id, label: regions[region].label }
})
console.log(regionOptions)

const dotColorOptions = Object.keys(DotColor).map((color) => ({
	value: DotColor[color as keyof typeof DotColor],
	label: color,
}))

const dotShapeOptions = Object.keys(DotShape).map((shape) => ({
	value: DotShape[shape as keyof typeof DotShape],
	label: shape,
}))

console.log(dotColorOptions.find((color) => color.value === DotColor.White))
console.log(dotShapeOptions)

export default {
	title: 'Components/SectorSelector',
	component: SectorSelector,
	argTypes: {
		sectors: { control: { disable: true } },
		d3config: { control: { disable: true } },
	},
}

const TemplateSelect: StoryFn<typeof SectorSelector> = (args) => {
	const [selectedSector, setSelectedSector] = useState(args.sector)
	const [selectedRegion, setSelectedRegion] = useState('CONUS')
	const [d3config, setD3config] = useState(args.d3config)

	const handleRegionChange = (regionId) => {
		setSelectedRegion(regionId)
		setSelectedSector('')
		const newD3config = {
			...d3config,
			rotate: regions[regionId].rotate,
			scale: regions[regionId].scale,
		}
		setD3config(newD3config)
	}

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
				<div style={{ paddingBottom: 10, display: 'table', width: 400 }}>
					<Select value={selectedRegion} options={regionOptions} onChange={handleRegionChange} />
				</div>
				<p>Selected Sector: {selectedSector}</p>
			</div>
			<SectorSelector sectors={args.sectors} d3config={d3config} sector={selectedSector} onChange={setSelectedSector} />
		</div>
	)
}

const TemplatePlain: StoryFn<typeof SectorSelector> = (args) => {
	const [selectedSector, setSelectedSector] = useState(args.sector)

	return <SectorSelector {...args} sector={selectedSector} onChange={setSelectedSector} />
}

const TemplateDotStyles: StoryFn<typeof SectorSelector> = (args) => {
	const [selectedSector, setSelectedSector] = useState(args.sector)
	const [mapSectors, setMapSectors] = useState(args.sectors)
	const [selectedColor, setSelectedColor] = useState('White')
	const [selectedShape, setSelectedShape] = useState('Circle')

	const handleColorChange = (color) => {
		const updatedSectors = args.sectors.map((sector) => ({
			...sector,
			dotColor: DotColor[color as keyof typeof DotColor],
		}))
		setMapSectors(updatedSectors)
		setSelectedColor(color)
	}
	const handleShapeChange = (shape) => {
		const updatedSectors = args.sectors.map((sector) => ({
			...sector,
			dotShape: DotShape[shape as keyof typeof DotShape],
		}))
		setMapSectors(updatedSectors)
		setSelectedShape(shape)
	}

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
				<div style={{ paddingBottom: 10, display: 'table', width: 400 }}>
					<Select value={DotColor[selectedColor as keyof typeof DotColor]} options={dotColorOptions} onChange={handleColorChange} />
				</div>
				<p>Selected Color: {selectedColor}</p>
				<div style={{ paddingBottom: 10, display: 'table', width: 400 }}>
					<Select value={DotShape[selectedShape as keyof typeof DotShape]} options={dotShapeOptions} onChange={handleShapeChange} />
				</div>
				<p>Selected Shape: {selectedShape}</p>
			</div>
			<SectorSelector sectors={mapSectors} d3config={args.d3config} sector={selectedSector} onChange={setSelectedSector} />
		</div>
	)
}

export const Default = TemplatePlain.bind({})
Default.args = {
	sectors: pointSectors,
	sector: '',
	d3config: {
		width: 1000,
		height: 600,
		rotate: regions.CONUS.rotate,
		scale: regions.CONUS.scale,
	},
}

export const GeoboxSectors = TemplateSelect.bind({})
GeoboxSectors.args = {
	sectors: geoboxSectors,
	sector: '',
	d3config: {
		width: 1000,
		height: 600,
		rotate: regions.CONUS.rotate,
		scale: regions.CONUS.scale,
	},
}

export const CrossSectors = TemplateSelect.bind({})
CrossSectors.args = {
	sectors: crossSectors,
	sector: '',
	d3config: {
		width: 1000,
		height: 600,
		rotate: regions.CONUS.rotate,
		scale: regions.CONUS.scale,
	},
}

export const RegionSelection = TemplateSelect.bind({})
RegionSelection.args = {
	sectors: pointSectors,
	sector: '',
	d3config: {
		width: 1000,
		height: 600,
		rotate: regions.CONUS.rotate,
		scale: regions.CONUS.scale,
	},
}

export const DotStyles = TemplateDotStyles.bind({})

DotStyles.args = {
	sectors: pointSectors,
	sector: '',
	d3config: {
		width: 1000,
		height: 600,
		rotate: regions.CONUS.rotate,
		scale: regions.CONUS.scale,
	},
}
