import type { Meta, StoryFn } from '@storybook/react'
import { Degrees } from './Degrees'

export default {
	title: 'Page Blocks/Degrees',
	component: Degrees,
} as Meta<typeof Degrees>

const Template: StoryFn<typeof Degrees> = (args) => <Degrees {...args} />

export const Basic = Template.bind({})
Basic.args = {
	degrees: [
		{
			title: 'Meteorology AS',
			body: [],
			buttons: [{ label: 'Apply', link: '/' }],
			schools: [
				{ schoolList: 'Illinois', schoolLinks: [{ school: 'UIUC', link: '/' }] },
				{ schoolList: 'Wisconsin', schoolLinks: [{ school: 'UW-Madison', link: '/' }] },
			],
		},
	],
}
