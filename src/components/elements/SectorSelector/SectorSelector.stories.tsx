import { StoryFn } from '@storybook/react'
import { useState } from 'react'
import Select from '../Select/Select'
import SectorSelector from './SectorSelector'
import { nexradSites } from './nexradSites'
import { regions } from './regions'

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

	const regionOptions = Object.keys(regions).map((region) => {
		return { value: regions[region].id, label: regions[region].label }
	})

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

export const Default = TemplatePlain.bind({})
Default.args = {
	sectors: nexradSites,
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
	sectors: nexradSites,
	sector: '',
	d3config: {
		width: 1000,
		height: 600,
		rotate: regions.CONUS.rotate,
		scale: regions.CONUS.scale,
	},
}
