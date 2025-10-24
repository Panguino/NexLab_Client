import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Animator } from '../Animator'
import { testFrames8x6 } from '../AnimatorTestData'

/**
 * # RunSelector Component
 *
 * Dropdown for selecting different model runs or data sources:
 * - Display current selection
 * - Dropdown menu with options
 * - Callback on selection change
 */
const meta: Meta<typeof Animator> = {
	title: 'Components/Animator/RunSelector',
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
				component: 'Dropdown selector for choosing different model runs or data sources.',
			},
		},
	},
}

export default meta

const WeatherModelsComponent = (args: any) => {
	const [activeRun, setActiveRun] = useState('rap')
	return <Animator {...args} activeRun={activeRun} setActiveRun={setActiveRun} />
}

export const weatherModels: StoryFn<typeof Animator> = (args) => <WeatherModelsComponent {...args} />
weatherModels.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	runs: [
		{ value: 'rap', label: 'RAP' },
		{ value: 'nam', label: 'NAM' },
		{ value: 'gfs', label: 'GFS' },
		{ value: 'hrrr', label: 'HRRR' },
	],
	interval: 250,
	autoPlay: false,
}
weatherModels.parameters = {
	docs: {
		description: {
			story: 'Weather model selector with common forecast models (RAP, NAM, GFS, HRRR).',
		},
	},
}

const SatelliteProductsComponent = (args: any) => {
	const [activeRun, setActiveRun] = useState('goes16')
	return <Animator {...args} activeRun={activeRun} setActiveRun={setActiveRun} />
}

export const satelliteProducts: StoryFn<typeof Animator> = (args) => <SatelliteProductsComponent {...args} />
satelliteProducts.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	runs: [
		{ value: 'goes16', label: 'GOES-16' },
		{ value: 'goes17', label: 'GOES-17' },
		{ value: 'himawari', label: 'Himawari-8' },
	],
	interval: 250,
	autoPlay: false,
}
satelliteProducts.parameters = {
	docs: {
		description: {
			story: 'Satellite product selector with different satellite sources.',
		},
	},
}

const RadarProductsComponent = (args: any) => {
	const [activeRun, setActiveRun] = useState('reflectivity')
	return <Animator {...args} activeRun={activeRun} setActiveRun={setActiveRun} />
}

export const radarProducts: StoryFn<typeof Animator> = (args) => <RadarProductsComponent {...args} />
radarProducts.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	runs: [
		{ value: 'reflectivity', label: 'Reflectivity' },
		{ value: 'velocity', label: 'Velocity' },
		{ value: 'spectrum', label: 'Spectrum Width' },
		{ value: 'differential', label: 'Differential Reflectivity' },
	],
	interval: 250,
	autoPlay: false,
}
radarProducts.parameters = {
	docs: {
		description: {
			story: 'Radar product selector with different radar parameters.',
		},
	},
}

const ManyOptionsComponent = (args: any) => {
	const [activeRun, setActiveRun] = useState('option1')
	return <Animator {...args} activeRun={activeRun} setActiveRun={setActiveRun} />
}

export const manyOptions: StoryFn<typeof Animator> = (args) => <ManyOptionsComponent {...args} />
manyOptions.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	runs: [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
		{ value: 'option4', label: 'Option 4' },
		{ value: 'option5', label: 'Option 5' },
		{ value: 'option6', label: 'Option 6' },
		{ value: 'option7', label: 'Option 7' },
		{ value: 'option8', label: 'Option 8' },
	],
	interval: 250,
	autoPlay: false,
}
manyOptions.parameters = {
	docs: {
		description: {
			story: 'Run selector with many options. Dropdown scrolls when there are many choices.',
		},
	},
}

const WithCustomLayoutComponent = (args: any) => {
	const [activeRun, setActiveRun] = useState('rap')
	return <Animator {...args} activeRun={activeRun} setActiveRun={setActiveRun} runsPerRow={2} />
}

export const withCustomLayout: StoryFn<typeof Animator> = (args) => <WithCustomLayoutComponent {...args} />
withCustomLayout.args = {
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	runs: [
		{ value: 'rap', label: 'RAP' },
		{ value: 'nam', label: 'NAM' },
		{ value: 'gfs', label: 'GFS' },
		{ value: 'hrrr', label: 'HRRR' },
	],
	interval: 250,
	autoPlay: false,
}
withCustomLayout.parameters = {
	docs: {
		description: {
			story: 'Run selector with custom layout (2 runs per row). Useful for organizing many options.',
		},
	},
}
