import { StoryFn } from '@storybook/react'
import { useState } from 'react'
import SectorSelector from './SectorSelector'
import { nexradSites } from './nexradSites'
import { regions } from './regions'

export default {
	title: 'Components/SectorSelector',
	component: SectorSelector,
	argTypes: {
		sectors: { control: { disable: true } },
	},
}

const Template: StoryFn<typeof SectorSelector> = (args) => {
	const [selectedSector, setSelectedSector] = useState(args.sector)
	const [selectedRegion, setSelectedRegion] = useState('CONUS')
	const [d3config, setD3config] = useState(args.d3config)

	const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const region = event.target.value
		setSelectedRegion(region)
		const newD3config = {
			...d3config,
			rotate: regions[region].rotate,
			scale: regions[region].scale,
		}
		setD3config(newD3config)
	}

	return (
		<div>
			<select value={selectedRegion} onChange={handleRegionChange}>
				{Object.keys(regions).map((region) => (
					<option key={region} value={region}>
						{region}
					</option>
				))}
			</select>
			<SectorSelector {...args} sector={selectedSector} onChange={setSelectedSector} d3config={d3config} />
			<p>Selected Sector: {selectedSector}</p>
		</div>
	)
}

export const Default = Template.bind({})
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
