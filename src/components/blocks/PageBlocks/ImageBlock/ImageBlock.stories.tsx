import type { Meta, StoryFn } from '@storybook/react'
import { ImageBlock } from './ImageBlock'

export default {
  title: 'Page Blocks/ImageBlock',
  component: ImageBlock,
} as Meta<typeof ImageBlock>

const Template: StoryFn<typeof ImageBlock> = (args) => <ImageBlock {...args} />

export const Basic = Template.bind({})
Basic.args = {
  image: { url: 'https://picsum.photos/1200/600', size: 'cover' },
}

