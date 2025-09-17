import type { Meta, StoryFn } from '@storybook/react'
import { PageHeading } from './PageHeading'

export default {
	title: 'Page Blocks/PageHeading',
	component: PageHeading,
} as Meta<typeof PageHeading>

const Template: StoryFn<typeof PageHeading> = (args) => <PageHeading {...args} />

export const Basic = Template.bind({})
Basic.args = {
	heading: 'Academics',
	body: [],
	buttons: [{ label: 'Enroll', link: '/enroll' }],
}

export const RichContent = Template.bind({})
RichContent.args = {
	heading: 'Academics',
	body: [
		{ type: 'heading', level: 1, children: [{ type: 'text', text: 'H1 Sample' }] },
		{ type: 'heading', level: 2, children: [{ type: 'text', text: 'H2 Sample' }] },
		{ type: 'heading', level: 3, children: [{ type: 'text', text: 'H3 Sample' }] },
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'This is a paragraph with ' },
				{ type: 'text', text: 'bold', bold: true },
				{ type: 'text', text: ' and normal text.' },
			],
		},
		{
			type: 'list',
			format: 'unordered',
			children: [
				{ type: 'list-item', children: [{ type: 'text', text: 'Bullet one' }] },
				{ type: 'list-item', children: [{ type: 'text', text: 'Bullet two' }] },
			],
		},
		{
			type: 'list',
			format: 'ordered',
			children: [
				{ type: 'list-item', children: [{ type: 'text', text: 'First' }] },
				{ type: 'list-item', children: [{ type: 'text', text: 'Second' }] },
			],
		},
	],
	buttons: [{ label: 'Enroll', link: '/enroll' }],
}
