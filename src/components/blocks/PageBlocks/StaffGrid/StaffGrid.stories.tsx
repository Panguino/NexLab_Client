import type { Meta, StoryFn } from '@storybook/react'
import { StaffGrid } from './StaffGrid'

export default {
  title: 'Page Blocks/StaffGrid',
  component: StaffGrid,
} as Meta<typeof StaffGrid>

const Template: StoryFn<typeof StaffGrid> = (args) => <StaffGrid {...args as any} />

export const Basic = Template.bind({})
Basic.args = {}

