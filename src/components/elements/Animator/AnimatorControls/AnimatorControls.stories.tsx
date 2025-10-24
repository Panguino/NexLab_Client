import Providers from '@/components/providers/Providers/Providers'
import { formatRunToZDate } from '@/util/dateFormat'
import { Meta, StoryFn } from '@storybook/react'
import { Animator } from '../Animator'
import { testDataFrameLabels2, testFrames8x6 } from '../AnimatorTestData'

/**
 * # AnimatorControls Component
 *
 * Provides playback and navigation controls:
 * - Play/pause button
 * - Step forward/backward
 * - Loop toggle
 * - Scrubber timeline
 * - Frame labels
 * - Run selector dropdown
 */
const meta: Meta<typeof Animator> = {
	title: 'Components/Animator/AnimatorControls',
	component: Animator,
	decorators: [
		(Story) => (
			<Providers>
				<div style={{ height: '100vh' }}>{Story()}</div>
			</Providers>
		),
	],
	parameters: {
		docs: {
			description: {
				component: 'Playback and navigation controls for the animator including play/pause, scrubber, and frame labels.',
			},
		},
	},
}

export default meta

export const basicPlaybackControls: StoryFn<typeof Animator> = (args) => {
	return <Animator {...args} />
}
basicPlaybackControls.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	interval: 250,
	autoPlay: false,
}
basicPlaybackControls.parameters = {
	docs: {
		description: {
			story: 'Basic playback controls with play/pause, step forward/backward, and loop toggle.',
		},
	},
}

export const withFrameLabels: StoryFn<typeof Animator> = (args) => {
	return <Animator {...args} />
}
withFrameLabels.args = {
	frames: testDataFrameLabels2.frames,
	imageInfo: { width: testDataFrameLabels2.img.width, height: testDataFrameLabels2.img.height },
	frameLabels: testDataFrameLabels2.runs.map(formatRunToZDate),
	displayAllLabels: true,
	scrubberFrameLoadStates: new Array(testDataFrameLabels2.frames.length).fill(true),
	interval: 250,
	autoPlay: false,
}
withFrameLabels.parameters = {
	docs: {
		description: {
			story: 'Shows all frame labels in the scrubber. Each frame has a label displayed below the timeline.',
		},
	},
}

export const withActiveFrameLabelOnly: StoryFn<typeof Animator> = (args) => {
	return <Animator {...args} />
}
withActiveFrameLabelOnly.args = {
	frames: testDataFrameLabels2.frames,
	imageInfo: { width: testDataFrameLabels2.img.width, height: testDataFrameLabels2.img.height },
	frameLabels: testDataFrameLabels2.runs.map(formatRunToZDate),
	displayAllLabels: false,
	scrubberFrameLoadStates: new Array(testDataFrameLabels2.frames.length).fill(true),
	interval: 250,
	autoPlay: false,
}
withActiveFrameLabelOnly.parameters = {
	docs: {
		description: {
			story: 'Only the active frame label is displayed above the scrubber handle. Cleaner UI for many frames.',
		},
	},
}

export const withFrameLoadStates: StoryFn<typeof Animator> = (args) => {
	return <Animator {...args} />
}
withFrameLoadStates.args = {
	frames: testFrames8x6.concat(testFrames8x6),
	imageInfo: { width: 800, height: 600 },
	scrubberFrameLoadStates: [true, false, true, true, false, true, true, true, false, true, false, true],
	interval: 250,
	autoPlay: false,
}
withFrameLoadStates.parameters = {
	docs: {
		description: {
			story: 'Scrubber with frame load states. Loaded frames show as filled, unloaded as empty.',
		},
	},
}

export const autoPlayWithControls: StoryFn<typeof Animator> = (args) => {
	return <Animator {...args} />
}
autoPlayWithControls.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	interval: 200,
	autoPlay: true,
}
autoPlayWithControls.parameters = {
	docs: {
		description: {
			story: 'Auto-playing animation with full controls visible. Users can pause, step, and scrub through frames.',
		},
	},
}

export const withRunSelector: StoryFn<typeof Animator> = (args) => {
	return <Animator {...args} />
}
withRunSelector.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	runs: [
		{ value: 'rap', label: 'RAP' },
		{ value: 'nam', label: 'NAM' },
		{ value: 'gfs', label: 'GFS' },
		{ value: 'hrrr', label: 'HRRR' },
	],
	activeRun: 'rap',
	setActiveRun: (run: string) => console.log('Selected run:', run),
	interval: 250,
	autoPlay: false,
}
withRunSelector.parameters = {
	docs: {
		description: {
			story: 'Shows run selector dropdown. Users can select different model runs or data sources.',
		},
	},
}

export const manualScrubbing: StoryFn<typeof Animator> = (args) => {
	return <Animator {...args} />
}
manualScrubbing.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	interval: 250,
	autoPlay: false,
}
manualScrubbing.parameters = {
	docs: {
		description: {
			story: 'Manual frame navigation using the scrubber. Drag the handle to jump to any frame.',
		},
	},
}
