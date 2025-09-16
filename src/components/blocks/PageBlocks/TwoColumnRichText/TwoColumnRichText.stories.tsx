import type { Meta, StoryFn } from '@storybook/react'
import { TwoColumnRichText } from './TwoColumnRichText'

export default {
	title: 'Page Blocks/TwoColumnRichText',
	component: TwoColumnRichText,
} as Meta<typeof TwoColumnRichText>

const Template: StoryFn<typeof TwoColumnRichText> = (args) => <TwoColumnRichText {...args} />

export const Basic = Template.bind({})
Basic.args = {
	leftButtons: [{ label: 'Left', link: '/' }],
	leftText: [],
	rightText: [],
	rightButtons: [{ label: 'Right', link: '/' }],
}

export const RichContent = Template.bind({})
RichContent.args = {
	leftButtons: [{ label: 'Left', link: '/' }],
	leftText: [
		{ type: 'heading', level: 4, children: [{ type: 'text', text: 'Left H4' }] },
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Left paragraph with ' },
				{ type: 'text', text: 'bold', bold: true },
			],
		},
		{ type: 'list', format: 'unordered', children: [{ type: 'list-item', children: [{ type: 'text', text: 'Left bullet' }] }] },
	],
	rightText: [
		{ type: 'heading', level: 5, children: [{ type: 'text', text: 'Right H5' }] },
		{ type: 'paragraph', children: [{ type: 'text', text: 'Right paragraph.' }] },
		{
			type: 'list',
			format: 'ordered',
			children: [
				{ type: 'list-item', children: [{ type: 'text', text: 'Right first' }] },
				{ type: 'list-item', children: [{ type: 'text', text: 'Right second' }] },
			],
		},
	],
	rightButtons: [{ label: 'Right', link: '/' }],
}
