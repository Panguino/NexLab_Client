import type { Meta, StoryFn } from '@storybook/react'
import { VideoBlock } from './VideoBlock'

export default {
	title: 'Page Blocks/VideoBlock',
	component: VideoBlock,
} as Meta<typeof VideoBlock>

const Template: StoryFn<typeof VideoBlock> = (args) => <VideoBlock {...args} />

export const Basic = Template.bind({})
Basic.args = { name: 'Placeholder Video' }
