import { StoryFn } from '@storybook/react'
import { useState } from 'react'
import SectorSelector from './SectorSelector'

export default {
	title: 'Components/SectorSelector',
	component: SectorSelector,
}

const Template: StoryFn<typeof SectorSelector> = (args) => {
	const [selectedSector, setSelectedSector] = useState(args.sector)

	return (
		<div>
			<SectorSelector {...args} sector={selectedSector} onChange={setSelectedSector} />
			<p>Selected Sector: {selectedSector}</p>
		</div>
	)
}

export const Default = Template.bind({})
Default.args = {
	sectors: [
		{ id: '1', name: 'Sector 1', type: 'Point', coordinates: [-100, 40] },
		{ id: '2', name: 'Sector 2', type: 'Point', coordinates: [-90, 35] },
		{ id: '3', name: 'Sector 3', type: 'Point', coordinates: [-80, 30] },
	],
	sector: '',
}
