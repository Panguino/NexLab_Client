import type { Meta, StoryFn } from '@storybook/react'
import { InfoWithCloud } from './InfoWithCloud'

export default {
	title: 'Page Blocks/InfoWithCloud',
	component: InfoWithCloud,
} as Meta<typeof InfoWithCloud>

const Template: StoryFn<typeof InfoWithCloud> = (args) => <InfoWithCloud {...args} />

export const Basic = Template.bind({})
Basic.args = {
	smallHeading: 'Intro',
	heading: 'Info with Cloud',
	body: [],
	buttons: [{ label: 'Action', link: '/' }],
	image: 'https://picsum.photos/1200/800',
}

export const RichContent = Template.bind({})
RichContent.args = {
	smallHeading: 'Intro',
	heading: 'Info with Cloud',
	body: [
		{ type: 'heading', level: 2, children: [{ type: 'text', text: 'H2 Example' }] },
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Paragraph with ' },
				{ type: 'text', text: 'bold', bold: true },
				{ type: 'text', text: ' text.' },
			],
		},
		{
			type: 'list',
			format: 'unordered',
			children: [
				{ type: 'list-item', children: [{ type: 'text', text: 'Point one' }] },
				{ type: 'list-item', children: [{ type: 'text', text: 'Point two' }] },
			],
		},
	],
	buttons: [{ label: 'Action', link: '/' }],
	image: 'https://picsum.photos/1200/801',
}
