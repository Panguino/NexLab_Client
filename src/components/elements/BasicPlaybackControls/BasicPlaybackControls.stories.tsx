import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import BasicPlaybackControls, { LoopMethod } from './BasicPlaybackControls'

export default {
	title: 'Components/BasicPlaybackControls',
	component: BasicPlaybackControls,
} as Meta

const Template: StoryFn<typeof BasicPlaybackControls> = (args) => {
	const [isPlaying, setIsPlaying] = useState(args.isPlaying)
	const [loopMethod, setLoopMethod] = useState(args.loopMethod)

	const handlePlayPauseClick = () => {
		setIsPlaying(!isPlaying)
	}

	return (
		<BasicPlaybackControls
			{...args}
			isPlaying={isPlaying}
			onPlayPauseClick={handlePlayPauseClick}
			onLoopMethodToggle={setLoopMethod}
			loopMethod={loopMethod}
		/>
	)
}

export const Default = Template.bind({})
Default.args = {
	isPlaying: false,
	onPlayPauseClick: () => {},
	onStepForwardClick: () => {},
	onStepBackwardClick: () => {},
	loopMethod: LoopMethod.LeftToRight,
	onLoopMethodToggle: (nextMethod) => {
		console.log(nextMethod)
	},
}
