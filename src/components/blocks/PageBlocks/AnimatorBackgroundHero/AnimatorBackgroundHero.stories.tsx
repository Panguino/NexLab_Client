import type { Meta, StoryFn } from '@storybook/react'
import { AnimatorBackgroundHero } from './AnimatorBackgroundHero'

export default {
	title: 'Page Blocks/AnimatorBackgroundHero',
	component: AnimatorBackgroundHero,
} as Meta<typeof AnimatorBackgroundHero>

const Template: StoryFn<typeof AnimatorBackgroundHero> = (args) => <AnimatorBackgroundHero {...args} />

export const Basic = Template.bind({})
Basic.args = {
	text: 'Animated Background Hero',
	buttons: [{ label: 'Action', link: '/' }],
}
