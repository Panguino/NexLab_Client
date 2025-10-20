import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AnimatorMapMachine } from './AnimatorMapMachine'
import { STATIC_MAP_DATA, SAMPLE_HURRICANE_PATHS, SAMPLE_STATES_GEOJSON } from './staticMapData'
import { MapFrame } from './types'

const meta = {
	title: 'Elements/Animator/AnimatorMapMachine',
	component: AnimatorMapMachine,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AnimatorMapMachine>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic map rendering with hurricane path data
 */
export const BasicMapRendering: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)

		return (
			<div style={{ width: '100%', height: '600px' }}>
				<AnimatorMapMachine
					frames={SAMPLE_HURRICANE_PATHS}
					currentFrame={currentFrame}
					region="conus"
					mapProvider="deckgl"
				/>
				<div style={{ padding: '20px', background: '#f5f5f5' }}>
					<p>Current Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}</p>
					<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>
						Previous
					</button>
					<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>
						Next
					</button>
				</div>
			</div>
		)
	},
}

/**
 * Map with auto-play animation
 */
export const AutoPlayAnimation: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)
		const [isPlaying, setIsPlaying] = useState(true)

		// Auto-play effect
		React.useEffect(() => {
			if (!isPlaying) return

			const interval = setInterval(() => {
				setCurrentFrame((prev) => {
					if (prev >= SAMPLE_HURRICANE_PATHS.length - 1) {
						return 0 // Loop back to start
					}
					return prev + 1
				})
			}, 1000)

			return () => clearInterval(interval)
		}, [isPlaying])

		return (
			<div style={{ width: '100%', height: '600px' }}>
				<AnimatorMapMachine
					frames={SAMPLE_HURRICANE_PATHS}
					currentFrame={currentFrame}
					region="conus"
					mapProvider="deckgl"
				/>
				<div style={{ padding: '20px', background: '#f5f5f5' }}>
					<p>Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}</p>
					<button onClick={() => setIsPlaying(!isPlaying)}>
						{isPlaying ? 'Pause' : 'Play'}
					</button>
					<button onClick={() => setCurrentFrame(0)}>Reset</button>
				</div>
			</div>
		)
	},
}

/**
 * Map with different regions
 */
export const DifferentRegions: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)
		const [region, setRegion] = useState<'conus' | 'alaska' | 'hawaii' | 'namer'>('conus')

		return (
			<div style={{ width: '100%', height: '600px' }}>
				<AnimatorMapMachine
					frames={SAMPLE_HURRICANE_PATHS}
					currentFrame={currentFrame}
					region={region}
					mapProvider="deckgl"
				/>
				<div style={{ padding: '20px', background: '#f5f5f5' }}>
					<div>
						<label>Region: </label>
						<select value={region} onChange={(e) => setRegion(e.target.value as any)}>
							<option value="conus">Continental US</option>
							<option value="alaska">Alaska</option>
							<option value="hawaii">Hawaii</option>
							<option value="namer">North America & Mexico</option>
						</select>
					</div>
					<p>Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}</p>
					<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>
						Previous
					</button>
					<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>
						Next
					</button>
				</div>
			</div>
		)
	},
}

/**
 * Map with custom opacity
 */
export const CustomOpacity: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)
		const [opacity, setOpacity] = useState(1)

		return (
			<div style={{ width: '100%', height: '600px' }}>
				<AnimatorMapMachine
					frames={SAMPLE_HURRICANE_PATHS}
					currentFrame={currentFrame}
					region="conus"
					mapProvider="deckgl"
					baseOpacity={opacity}
				/>
				<div style={{ padding: '20px', background: '#f5f5f5' }}>
					<div>
						<label>Opacity: </label>
						<input
							type="range"
							min="0"
							max="1"
							step="0.1"
							value={opacity}
							onChange={(e) => setOpacity(parseFloat(e.target.value))}
						/>
						<span>{(opacity * 100).toFixed(0)}%</span>
					</div>
					<p>Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}</p>
					<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>
						Previous
					</button>
					<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>
						Next
					</button>
				</div>
			</div>
		)
	},
}

/**
 * Map with loading state
 */
export const LoadingState: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)
		const [isLoading, setIsLoading] = useState(true)

		React.useEffect(() => {
			const timer = setTimeout(() => setIsLoading(false), 2000)
			return () => clearTimeout(timer)
		}, [])

		return (
			<div style={{ width: '100%', height: '600px' }}>
				{isLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
						<p>Loading map data...</p>
					</div>
				) : (
					<AnimatorMapMachine
						frames={SAMPLE_HURRICANE_PATHS}
						currentFrame={currentFrame}
						region="conus"
						mapProvider="deckgl"
					/>
				)}
				<div style={{ padding: '20px', background: '#f5f5f5' }}>
					<p>Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}</p>
					<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>
						Previous
					</button>
					<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>
						Next
					</button>
				</div>
			</div>
		)
	},
}

/**
 * Map with metadata display
 */
export const WithMetadataDisplay: Story = {
	render: () => {
		const [currentFrame, setCurrentFrame] = useState(0)
		const frame = SAMPLE_HURRICANE_PATHS[currentFrame]

		return (
			<div style={{ width: '100%', height: '600px' }}>
				<AnimatorMapMachine
					frames={SAMPLE_HURRICANE_PATHS}
					currentFrame={currentFrame}
					region="conus"
					mapProvider="deckgl"
				/>
				<div style={{ padding: '20px', background: '#f5f5f5' }}>
					<div style={{ marginBottom: '10px' }}>
						<h3>Hurricane Data</h3>
						{frame.metadata && (
							<div>
								<p>Wind Speed: {frame.metadata.windSpeed} mph</p>
								<p>Category: {frame.metadata.category}</p>
								<p>Pressure: {frame.metadata.pressure} mb</p>
								<p>Time: {frame.timestamp.toISOString()}</p>
							</div>
						)}
					</div>
					<p>Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}</p>
					<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>
						Previous
					</button>
					<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>
						Next
					</button>
				</div>
			</div>
		)
	},
}

// Import React for useEffect
import React from 'react'

