import type { Meta, StoryFn } from '@storybook/react'
import { StormChasingSchedule } from './StormChasingSchedule'

export default {
	title: 'Page Blocks/StormChasingSchedule',
	component: StormChasingSchedule,
} as Meta<typeof StormChasingSchedule>

const Template: StoryFn<typeof StormChasingSchedule> = (args) => <StormChasingSchedule {...args} />

export const Basic = Template.bind({})
Basic.args = {
	heading: 'Upcoming Storm Chasing',
	body: 'Our next trips are listed below.',
	button: { label: 'Register', link: '/' },
	trips: [
		{ startDate: '2025-05-01', endDate: '2025-05-05', status: 'Open', instructor: 'Smith', assistant: 'Lee' },
		{ startDate: '2025-05-15', endDate: '2025-05-19', status: 'Filling', instructor: 'Jones', assistant: 'Patel' },
	],
}
