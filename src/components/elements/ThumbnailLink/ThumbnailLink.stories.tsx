import { Meta, StoryFn } from '@storybook/react'
import { ThumbnailLink } from './ThumbnailLink'

export default {
	title: 'Components/Elements/ThumbnailLink',
	component: ThumbnailLink,
	argTypes: {
		onClick: { control: { disable: true } },
	},
} as Meta<typeof ThumbnailLink>

const Template: StoryFn<typeof ThumbnailLink> = (args) => <ThumbnailLink {...args} />

export const Default = Template.bind({})
Default.args = {
	name: 'A link to Google',
	linkUrl: 'https://www.google.com',
	target: '_blank',
}
