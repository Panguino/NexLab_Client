import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Animator } from '../Animator'
import { testDataWithOverlays, testFrames8x6 } from '../AnimatorTestData'

/**
 * # OverlayPanel Component
 *
 * Modal panel for selecting and toggling overlay layers:
 * - Static overlays (borders, county lines, etc.)
 * - Dynamic overlays (radar, satellite, etc.)
 * - Checkbox selection
 * - Open/close modal
 */
const meta: Meta<typeof Animator> = {
	title: 'Components/Animator/OverlayPanel',
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
				component: 'Modal panel for selecting and toggling overlay layers on the animator.',
			},
		},
	},
}

export default meta

const WithStaticOverlaysComponent = (args: any) => {
	const [activeOverlays, setActiveOverlays] = useState<string[]>([])
	return <Animator {...args} activeOverlays={activeOverlays} setActiveOverlays={setActiveOverlays} />
}

export const withStaticOverlays: StoryFn<typeof Animator> = (args) => <WithStaticOverlaysComponent {...args} />
withStaticOverlays.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	overlays: {
		static: {
			borders: 'https://example.com/borders.png',
			counties: 'https://example.com/counties.png',
		},
		dynamic: {},
	},
	interval: 250,
	autoPlay: false,
}
withStaticOverlays.parameters = {
	docs: {
		description: {
			story: 'Overlay panel with static overlays (borders, counties). Click the layers icon to open the panel and toggle overlays.',
		},
	},
}

const WithDynamicOverlaysComponent = (args: any) => {
	const [activeOverlays, setActiveOverlays] = useState<string[]>([])
	return <Animator {...args} activeOverlays={activeOverlays} setActiveOverlays={setActiveOverlays} />
}

export const withDynamicOverlays: StoryFn<typeof Animator> = (args) => <WithDynamicOverlaysComponent {...args} />
withDynamicOverlays.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	overlays: {
		static: {},
		dynamic: {
			radar: ['https://example.com/radar1.png', 'https://example.com/radar2.png', 'https://example.com/radar3.png'],
			satellite: ['https://example.com/sat1.png', 'https://example.com/sat2.png', 'https://example.com/sat3.png'],
		},
	},
	interval: 250,
	autoPlay: false,
}
withDynamicOverlays.parameters = {
	docs: {
		description: {
			story: 'Overlay panel with dynamic overlays (radar, satellite). Dynamic overlays have frames that sync with the main animation.',
		},
	},
}

const WithMixedOverlaysComponent = (args: any) => {
	const [activeOverlays, setActiveOverlays] = useState<string[]>([])
	return <Animator {...args} activeOverlays={activeOverlays} setActiveOverlays={setActiveOverlays} />
}

export const withMixedOverlays: StoryFn<typeof Animator> = (args) => <WithMixedOverlaysComponent {...args} />
withMixedOverlays.args = {
	frames: testDataWithOverlays.files,
	imageInfo: { width: 1600, height: 900 },
	overlays: testDataWithOverlays.overlays,
	interval: 250,
	autoPlay: false,
}
withMixedOverlays.parameters = {
	docs: {
		description: {
			story: 'Overlay panel with both static and dynamic overlays. Mix and match different overlay types.',
		},
	},
}

const MultipleStaticOverlaysComponent = (args: any) => {
	const [activeOverlays, setActiveOverlays] = useState<string[]>([])
	return <Animator {...args} activeOverlays={activeOverlays} setActiveOverlays={setActiveOverlays} />
}

export const multipleStaticOverlays: StoryFn<typeof Animator> = (args) => <MultipleStaticOverlaysComponent {...args} />
multipleStaticOverlays.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	overlays: {
		static: {
			borders: 'https://example.com/borders.png',
			counties: 'https://example.com/counties.png',
			cities: 'https://example.com/cities.png',
			highways: 'https://example.com/highways.png',
			lakes: 'https://example.com/lakes.png',
		},
		dynamic: {},
	},
	interval: 250,
	autoPlay: false,
}
multipleStaticOverlays.parameters = {
	docs: {
		description: {
			story: 'Multiple static overlays. Users can select any combination of overlays to display.',
		},
	},
}

const PreselectedOverlaysComponent = (args: any) => {
	const [activeOverlays, setActiveOverlays] = useState<string[]>(['borders', 'radar'])
	return <Animator {...args} activeOverlays={activeOverlays} setActiveOverlays={setActiveOverlays} />
}

export const preselectedOverlays: StoryFn<typeof Animator> = (args) => <PreselectedOverlaysComponent {...args} />
preselectedOverlays.args = {
	frames: testDataWithOverlays.files,
	imageInfo: { width: 1600, height: 900 },
	overlays: testDataWithOverlays.overlays,
	interval: 250,
	autoPlay: false,
}
preselectedOverlays.parameters = {
	docs: {
		description: {
			story: 'Some overlays are pre-selected by default. Users can toggle them on/off in the overlay panel.',
		},
	},
}
