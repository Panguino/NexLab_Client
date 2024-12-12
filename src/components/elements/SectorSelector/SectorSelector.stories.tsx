import { StoryFn } from '@storybook/react'
import { useState } from 'react'
import SectorSelector from './SectorSelector'
import { nexradSites } from './nexradSites'

export default {
	title: 'Components/SectorSelector',
	component: SectorSelector,
	argTypes: {
		sectors: { control: { disable: true } },
	},
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
	sectors: nexradSites,
	sector: '',
}
