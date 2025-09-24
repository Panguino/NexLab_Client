import Providers from '@/components/providers/Providers/Providers'
import { formatRunToZDate } from '@/util/dateFormat'
import { Meta, StoryFn } from '@storybook/react'
import { Animator } from './Animator'
import { testDataFrameLabels, testDataFrameLabels2, testDataWithOverlays, testFrames, testFrames16x9, testFrames8x6 } from './AnimatorTestData'

const meta: Meta<typeof Animator> = {
	title: 'Components/Animator/Animator',
	component: Animator,
	argTypes: {
		frames: { control: false },
		interval: { control: { type: 'number' } },
	},
	decorators: [
		(Story) => (
			<Providers>
				<div style={{ height: '100vh' }}>{Story()}</div>
			</Providers>
		),
	],
}

export default meta

const TemplateFactory = () => {
	const Template: StoryFn<typeof Animator> = (args) => {
		return <Animator {...args} />
	}
	return Template
}

export const autoPlayNoControls: StoryFn<typeof Animator> = TemplateFactory()
autoPlayNoControls.args = {
	interval: 0.25,
	frames: testFrames,
	autoPlay: true,
	hideControls: true,
}
export const autoPlayControls: StoryFn<typeof Animator> = TemplateFactory()
autoPlayControls.args = {
	interval: 0.01,
	frames: testFrames,
	autoPlay: true,
}
export const autoPlayControlsNoZoom: StoryFn<typeof Animator> = TemplateFactory()
autoPlayControlsNoZoom.args = {
	interval: 0.25,
	frames: testFrames,
	autoPlay: true,
	hideZoomControls: true,
}
export const responsiveSize: StoryFn<typeof Animator> = TemplateFactory()
responsiveSize.args = {
	interval: 0.25,
	frames: testFrames,
}
export const specificRatio8x6: StoryFn<typeof Animator> = TemplateFactory()
specificRatio8x6.args = {
	interval: 0.25,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
}
export const specificRatio16x9: StoryFn<typeof Animator> = TemplateFactory()
specificRatio16x9.args = {
	interval: 0.25,
	frames: testFrames16x9,
	imageInfo: { width: 1600, height: 900 },
}
export const maxWidthAndHeight: StoryFn<typeof Animator> = TemplateFactory()
maxWidthAndHeight.args = {
	interval: 0.25,
	frames: testFrames,
	width: 500,
	height: 500,
}
export const overlays: StoryFn<typeof Animator> = TemplateFactory()
overlays.args = {
	interval: 0.25,
	frames: testDataWithOverlays.files,
	overlays: testDataWithOverlays.overlays,
	imageInfo: { width: 1600, height: 900 },
}

export const withScrubberFrameStates: StoryFn<typeof Animator> = TemplateFactory()
withScrubberFrameStates.args = {
	interval: 0.25,
	frames: testFrames8x6.concat(testFrames8x6), // 12 frames
	scrubberFrameLoadStates: [true, false, true, true, false, true, true, true, false, true, false, true],
}

export const withScrubberPlaceholder: StoryFn<typeof Animator> = TemplateFactory()
withScrubberPlaceholder.args = {
	interval: 0.25,
	frames: [
		// mix of real frames and placeholder entries
		...testFrames8x6,
		'/img/vertical-lines.png', // placeholder
		...testFrames8x6.slice(0, 3),
		'/img/vertical-lines.png', // placeholder
		'/img/vertical-lines.png', // placeholder
	],
	scrubberPlaceholderImageUrl: '/img/vertical-lines.png',
}
export const withFrameLabels: StoryFn<typeof Animator> = TemplateFactory()
withFrameLabels.args = {
	interval: 0.25,
	frames: testDataFrameLabels.frames,
	imageInfo: { width: testDataFrameLabels.img.width, height: testDataFrameLabels.img.height },
	frameLabels: testDataFrameLabels.levels,
	scrubberFrameLoadStates: new Array(testDataFrameLabels.frames.length).fill(true),
}
export const withActiveFrameLabel: StoryFn<typeof Animator> = TemplateFactory()
withActiveFrameLabel.args = {
	interval: 0.25,
	frames: testDataFrameLabels2.frames,
	imageInfo: { width: testDataFrameLabels2.img.width, height: testDataFrameLabels2.img.height },
	frameLabels: testDataFrameLabels2.runs.map(formatRunToZDate),
	displayAllLabels: false,
	scrubberFrameLoadStates: new Array(testDataFrameLabels2.frames.length).fill(true),
}

export const soundingPickerEnabled: StoryFn<typeof Animator> = TemplateFactory()
soundingPickerEnabled.args = {
	interval: 0.25,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	soundingsPicker: true,
	soundingsPickerMode: false,
	soundingsPickerDisabled: false,
	onSoundingsClickthrough: ({ xPercent, yPercent }) => {
		console.log('Sounding clicked at:', { xPercent, yPercent })
	},
}

export const soundingPickerDisabled: StoryFn<typeof Animator> = TemplateFactory()
soundingPickerDisabled.args = {
	interval: 0.25,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	soundingsPicker: true,
	soundingsPickerMode: false,
	soundingsPickerDisabled: true,
	onSoundingsClickthrough: ({ xPercent, yPercent }) => {
		console.log('Sounding clicked at:', { xPercent, yPercent })
	},
}

export const soundingPickerModelComparison: StoryFn<typeof Animator> = TemplateFactory()
soundingPickerModelComparison.args = {
	interval: 0.25,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	frameLabels: ['RAP', 'NAM', 'ECMWF', 'GFS', 'HRRR', 'RDPS'], // Mix of supported and unsupported models
	soundingsPicker: true,
	soundingsPickerMode: false,
	soundingsPickerDisabled: false, // This would be dynamically controlled in real implementation
	onSoundingsClickthrough: ({ xPercent, yPercent }) => {
		console.log('Sounding clicked at:', { xPercent, yPercent })
	},
	onFrameUpdate: (frameIndex) => {
		// In real implementation, this would check if the current model supports soundings
		const supportedModels = ['RAP', 'NAM', 'GFS', 'HRRR']
		const currentModel = ['RAP', 'NAM', 'ECMWF', 'GFS', 'HRRR', 'RDPS'][frameIndex]
		const isSupported = supportedModels.includes(currentModel)
		console.log(`Frame ${frameIndex}: ${currentModel} - Soundings ${isSupported ? 'supported' : 'not supported'}`)
	},
}
