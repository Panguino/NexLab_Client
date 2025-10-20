import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { useRef, useState } from 'react'
import { Animator } from '../Animator'
import DataTooltip from './DataTooltip'
import { testFrames8x6 } from '../AnimatorTestData'

/**
 * # DataTooltip Component
 *
 * Displays hover information including:
 * - Debug info (frame number, pixel position, percentage position)
 * - Lat/Lon coordinates (when sectorId is provided)
 * - Weather data readouts (temperature, pressure, etc.)
 * - Loading states
 *
 * The tooltip automatically positions itself to avoid edges of the container.
 */
const meta: Meta<typeof DataTooltip> = {
	title: 'Components/Animator/DataTooltip',
	component: DataTooltip,
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
				component: 'A tooltip component that displays hover information over animator images, including debug data and weather readouts.',
			},
		},
	},
}

export default meta

/**
 * Wrapper component to demonstrate DataTooltip with Animator context
 */
const DataTooltipDemo: StoryFn = (args) => {
	const hoverRef = useRef<HTMLDivElement>(null)
	const frameRef = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState({ xPercent: 0, yPercent: 0 })

	return (
		<Animator
			frames={testFrames8x6}
			imageInfo={{ width: 800, height: 600 }}
			interval={250}
			autoPlay={false}
			enableReadouts={args.enableReadouts}
			frameReadoutData={args.frameReadoutData}
			isLoadingReadoutData={args.isLoadingReadoutData}
			requestReadoutData={args.requestReadoutData}
		>
			<div
				ref={frameRef}
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
				}}
			>
				<div
					ref={hoverRef}
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: '#f0f0f0',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '14px',
						color: '#666',
					}}
				>
					Hover over the animator image to see the tooltip
				</div>
				<DataTooltip
					hoverRef={hoverRef}
					frameRef={frameRef}
					onUpdatePosition={setPosition}
					debug={args.debug}
					sectorId={args.sectorId}
				/>
			</div>
		</Animator>
	)
}

export const debugInfoOnly: StoryFn = (args) => <DataTooltipDemo {...args} />
debugInfoOnly.args = {
	debug: true,
	enableReadouts: false,
	frameReadoutData: null,
	isLoadingReadoutData: false,
	requestReadoutData: undefined,
	sectorId: undefined,
}
debugInfoOnly.parameters = {
	docs: {
		description: {
			story: 'Shows debug information including frame number, pixel position, and percentage position. Hover over the image to see the tooltip update.',
		},
	},
}

export const withWeatherData: StoryFn = (args) => <DataTooltipDemo {...args} />
withWeatherData.args = {
	debug: false,
	enableReadouts: true,
	frameReadoutData: {
		dataTypes: ['temperature', 'dewpoint', 'windSpeed'],
		readoutData: {
			temperature: [
				[65, 66, 67, 68],
				[64, 65, 66, 67],
				[63, 64, 65, 66],
			],
			dewpoint: [
				[45, 46, 47, 48],
				[44, 45, 46, 47],
				[43, 44, 45, 46],
			],
			windSpeed: [
				[5, 6, 7, 8],
				[4, 5, 6, 7],
				[3, 4, 5, 6],
			],
		},
	},
	isLoadingReadoutData: false,
	requestReadoutData: (frameIndex: number) => {
		console.log('Requesting readout data for frame:', frameIndex)
	},
	sectorId: undefined,
}
withWeatherData.parameters = {
	docs: {
		description: {
			story: 'Shows weather data readouts (temperature, dewpoint, wind speed) when hovering over the image. Data is displayed with formatted labels and units.',
		},
	},
}

export const withLoadingState: StoryFn = (args) => <DataTooltipDemo {...args} />
withLoadingState.args = {
	debug: false,
	enableReadouts: true,
	frameReadoutData: {
		dataTypes: ['temperature', 'dewpoint'],
		readoutData: {
			temperature: [
				[65, 66, 67],
				[64, 65, 66],
			],
			dewpoint: [
				[45, 46, 47],
				[44, 45, 46],
			],
		},
	},
	isLoadingReadoutData: true,
	requestReadoutData: (frameIndex: number) => {
		console.log('Requesting readout data for frame:', frameIndex)
	},
	sectorId: undefined,
}
withLoadingState.parameters = {
	docs: {
		description: {
			story: 'Shows loading indicator while data is being fetched. Useful for demonstrating async data loading states.',
		},
	},
}

export const debugWithLatLon: StoryFn = (args) => <DataTooltipDemo {...args} />
debugWithLatLon.args = {
	debug: true,
	enableReadouts: false,
	frameReadoutData: null,
	isLoadingReadoutData: false,
	requestReadoutData: undefined,
	sectorId: 'conus',
}
debugWithLatLon.parameters = {
	docs: {
		description: {
			story: 'Shows debug information including latitude/longitude coordinates. The sectorId determines the geographic projection used for coordinate conversion.',
		},
	},
}

export const debugWithWeatherData: StoryFn = (args) => <DataTooltipDemo {...args} />
debugWithWeatherData.args = {
	debug: true,
	enableReadouts: true,
	frameReadoutData: {
		dataTypes: ['temperature', 'dewpoint', 'windSpeed', 'windDirection'],
		readoutData: {
			temperature: [
				[65, 66, 67, 68],
				[64, 65, 66, 67],
				[63, 64, 65, 66],
			],
			dewpoint: [
				[45, 46, 47, 48],
				[44, 45, 46, 47],
				[43, 44, 45, 46],
			],
			windSpeed: [
				[5, 6, 7, 8],
				[4, 5, 6, 7],
				[3, 4, 5, 6],
			],
			windDirection: [
				[180, 185, 190, 195],
				[175, 180, 185, 190],
				[170, 175, 180, 185],
			],
		},
	},
	isLoadingReadoutData: false,
	requestReadoutData: (frameIndex: number) => {
		console.log('Requesting readout data for frame:', frameIndex)
	},
	sectorId: 'conus',
}
debugWithWeatherData.parameters = {
	docs: {
		description: {
			story: 'Shows both debug information and weather data together. Demonstrates the full tooltip with position info, lat/lon, and weather readouts.',
		},
	},
}

