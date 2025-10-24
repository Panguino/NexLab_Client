import type { Meta, StoryFn } from '@storybook/react'
import { Testimonials } from './Testimonials'

export default {
	title: 'Page Blocks/Testimonials',
	component: Testimonials,
} as Meta<typeof Testimonials>

const Template: StoryFn<typeof Testimonials> = (args) => <Testimonials {...args} />

export const Basic = Template.bind({})
Basic.args = {
	testimonials: [
		{ avatar: 'https://i.pravatar.cc/100?img=1', author: 'Alex', authorTitle: 'Alumni', quote: 'Fantastic program with hands-on experience.' },
		{
			avatar: 'https://i.pravatar.cc/100?img=2',
			author: 'Jordan',
			authorTitle: 'Student',
			quote: 'The tools helped me understand severe weather.',
		},
	],
}
