import type { Meta, StoryFn } from '@storybook/react'
import { StaffGridView, type StaffMember } from './StaffGrid'

export default {
	title: 'Page Blocks/StaffGrid',
	component: StaffGridView,
} as Meta<typeof StaffGridView>

const Template: StoryFn<typeof StaffGridView> = (args) => <StaffGridView {...(args as any)} />

const mockStaff: StaffMember[] = [
	{ Name: 'Dr. Jane Smith', Position: 'Professor', ShortBio: 'Severe weather expert.', Photo: { url: 'https://i.pravatar.cc/150?img=3' } },
	{ Name: 'John Doe', Position: 'Research Assistant', ShortBio: 'Focus on radar meteorology.', Photo: { url: 'https://i.pravatar.cc/150?img=4' } },
]

export const Basic = Template.bind({})
Basic.args = { staff: mockStaff }
