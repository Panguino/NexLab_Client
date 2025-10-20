import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Providers from '@/components/providers/Providers/Providers'
import { Animator } from '../Animator'
import { SAMPLE_HURRICANE_PATHS } from '../AnimatorMapMachine/staticMapData'

const meta = {
	title: 'Elements/Animator/AnimatorMapSizer',
	component: Animator,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Providers>
				<Story />
			</Providers>
		),
	],
} satisfies Meta<typeof Animator>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic map animator with CONUS region
 */
export const BasicMapAnimator: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)

		return (
			<div style={{ width: '100%', height: '800px' }}>
				<Animator
					frames={SAMPLE_HURRICANE_PATHS}
					mode="map"
					mapRegion="conus"
					imageInfo={{ width: 1000, height: 600 }}
					currentFrame={currentFrame}
					setCurrentFrame={setCurrentFrame}
					hideControls={false}
					hideZoomControls={false}
					disableZoom={false}
				/>
			</div>
		)
	},
}

/**
 * Map animator with different regions
 */
export const MultipleRegions: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)
		const [region, setRegion] = useState<'conus' | 'alaska' | 'hawaii' | 'namer'>('conus')

		return (
			<div style={{ width: '100%', height: '800px' }}>
				<div style={{ marginBottom: '10px', padding: '10px', background: '#f5f5f5' }}>
					<label>Select Region: </label>
					<select value={region} onChange={(e) => setRegion(e.target.value as any)}>
						<option value="conus">Continental US</option>
						<option value="alaska">Alaska</option>
						<option value="hawaii">Hawaii</option>
						<option value="namer">North America & Mexico</option>
					</select>
				</div>
				<Animator
					frames={SAMPLE_HURRICANE_PATHS}
					mode="map"
					mapRegion={region}
					imageInfo={{ width: 1000, height: 600 }}
					currentFrame={currentFrame}
					setCurrentFrame={setCurrentFrame}
					hideControls={false}
					hideZoomControls={false}
					disableZoom={false}
				/>
			</div>
		)
	},
}

/**
 * Map animator with auto-play
 */
export const AutoPlayMap: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)
		const [isPlaying, setIsPlaying] = useState(true)

		React.useEffect(() => {
			if (!isPlaying) return

			const interval = setInterval(() => {
				setCurrentFrame((prev) => {
					if (prev >= SAMPLE_HURRICANE_PATHS.length - 1) {
						return 0
					}
					return prev + 1
				})
			}, 1000)

			return () => clearInterval(interval)
		}, [isPlaying])

		return (
			<div style={{ width: '100%', height: '800px' }}>
				<div style={{ marginBottom: '10px', padding: '10px', background: '#f5f5f5' }}>
					<button onClick={() => setIsPlaying(!isPlaying)}>
						{isPlaying ? 'Pause' : 'Play'}
					</button>
					<button onClick={() => setCurrentFrame(0)}>Reset</button>
					<span style={{ marginLeft: '20px' }}>
						Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
					</span>
				</div>
				<Animator
					frames={SAMPLE_HURRICANE_PATHS}
					mode="map"
					mapRegion="conus"
					imageInfo={{ width: 1000, height: 600 }}
					currentFrame={currentFrame}
					setCurrentFrame={setCurrentFrame}
					hideControls={false}
					hideZoomControls={false}
					disableZoom={false}
					autoPlay={false}
				/>
			</div>
		)
	},
}

/**
 * Map animator with zoom disabled
 */
export const ZoomDisabled: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)

		return (
			<div style={{ width: '100%', height: '800px' }}>
				<Animator
					frames={SAMPLE_HURRICANE_PATHS}
					mode="map"
					mapRegion="conus"
					imageInfo={{ width: 1000, height: 600 }}
					currentFrame={currentFrame}
					setCurrentFrame={setCurrentFrame}
					hideControls={false}
					hideZoomControls={true}
					disableZoom={true}
				/>
			</div>
		)
	},
}

/**
 * Map animator with controls hidden
 */
export const ControlsHidden: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)

		return (
			<div style={{ width: '100%', height: '800px' }}>
				<Animator
					frames={SAMPLE_HURRICANE_PATHS}
					mode="map"
					mapRegion="conus"
					imageInfo={{ width: 1000, height: 600 }}
					currentFrame={currentFrame}
					setCurrentFrame={setCurrentFrame}
					hideControls={true}
					hideZoomControls={true}
					disableZoom={false}
				/>
			</div>
		)
	},
}

/**
 * Map animator with frame labels
 */
export const WithFrameLabels: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)

		const frameLabels = SAMPLE_HURRICANE_PATHS.map((frame, index) => {
			const date = new Date(frame.timestamp)
			return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
		})

		return (
			<div style={{ width: '100%', height: '800px' }}>
				<Animator
					frames={SAMPLE_HURRICANE_PATHS}
					mode="map"
					mapRegion="conus"
					imageInfo={{ width: 1000, height: 600 }}
					currentFrame={currentFrame}
					setCurrentFrame={setCurrentFrame}
					hideControls={false}
					hideZoomControls={false}
					disableZoom={false}
					frameLabels={frameLabels}
					displayAllLabels={true}
				/>
			</div>
		)
	},
}

// Import React for useEffect
import React from 'react'

