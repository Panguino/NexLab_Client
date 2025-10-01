import type { Meta, StoryFn } from '@storybook/react'
import { RichTextPageBlock } from './RichTextPageBlock'

export default {
	title: 'Page Blocks/RichTextPageBlock',
	component: RichTextPageBlock,
} as Meta<typeof RichTextPageBlock>

const Template: StoryFn<typeof RichTextPageBlock> = (args) => <RichTextPageBlock {...args} />

export const Basic = Template.bind({})
Basic.args = {
	body: [],
}

export const RichContent = Template.bind({})
RichContent.args = {
	body: [
		{ type: 'heading', level: 1, children: [{ type: 'text', text: 'H1 Title' }] },
		{ type: 'heading', level: 2, children: [{ type: 'text', text: 'H2 Subtitle' }] },
		{ type: 'heading', level: 3, children: [{ type: 'text', text: 'H3 Section' }] },
		{
			type: 'paragraph',
			children: [
				{ type: 'text', text: 'Paragraph text with ' },
				{ type: 'text', text: 'bold', bold: true },
				{ type: 'text', text: ' parts.' },
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
}
