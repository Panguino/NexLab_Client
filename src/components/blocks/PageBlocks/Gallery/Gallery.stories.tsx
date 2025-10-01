import type { Meta, StoryFn } from '@storybook/react'
import { Gallery } from './Gallery'

export default {
  title: 'Page Blocks/Gallery',
  component: Gallery,
} as Meta<typeof Gallery>

const Template: StoryFn<typeof Gallery> = (args) => <Gallery {...args} />

export const Basic = Template.bind({})
Basic.args = { name: 'Placeholder Gallery' }

