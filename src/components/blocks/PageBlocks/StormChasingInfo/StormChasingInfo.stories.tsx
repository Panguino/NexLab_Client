import type { Meta, StoryFn } from '@storybook/react'
import { StormChasingInfo } from './StormChasingInfo'

export default {
	title: 'Page Blocks/StormChasingInfo',
	component: StormChasingInfo,
} as Meta<typeof StormChasingInfo>

const Template: StoryFn<any> = (args) => <StormChasingInfo {...(args as any)} />

export const Basic = Template.bind({})
Basic.args = {
	name: 'Storm Chasing 101',
}
