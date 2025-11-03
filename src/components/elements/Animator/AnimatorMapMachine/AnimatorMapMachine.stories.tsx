import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { AnimatorMapMachine } from './AnimatorMapMachine'
import { SAMPLE_HURRICANE_PATHS } from './staticMapData'

const meta = {
	title: 'Components/Animator/AnimatorMapMachine',
	component: AnimatorMapMachine,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AnimatorMapMachine>

export default meta
type Story = StoryObj<typeof meta>

const BasicMapRenderingComponent = () => {
	const [currentFrame, setCurrentFrame] = useState(0)

	return (
		<div style={{ width: '100%', height: '600px' }}>
			<AnimatorMapMachine frames={SAMPLE_HURRICANE_PATHS} currentFrame={currentFrame} region="conus" mapProvider="deckgl" />
			<div style={{ padding: '20px', background: '#f5f5f5' }}>
				<p>
					Current Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
				</p>
				<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>Previous</button>
				<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>Next</button>
			</div>
		</div>
	)
}

/**
 * Basic map rendering with hurricane path data
 */
export const BasicMapRendering: Story = {
	args: {
		frames: SAMPLE_HURRICANE_PATHS,
		currentFrame: 0,
		region: 'conus',
		mapProvider: 'deckgl',
	},
	render: () => <BasicMapRenderingComponent />,
}

const AutoPlayAnimationComponent = () => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [isPlaying, setIsPlaying] = useState(true)

	// Auto-play effect
	React.useEffect(() => {
		if (!isPlaying) {
			return undefined
		}

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
			<AnimatorMapMachine frames={SAMPLE_HURRICANE_PATHS} currentFrame={currentFrame} region="conus" mapProvider="deckgl" />
			<div style={{ padding: '20px', background: '#f5f5f5' }}>
				<p>
					Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
				</p>
				<button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
				<button onClick={() => setCurrentFrame(0)}>Reset</button>
			</div>
		</div>
	)
}

/**
 * Map with auto-play animation
 */
export const AutoPlayAnimation: Story = {
	args: {
		frames: SAMPLE_HURRICANE_PATHS,
		currentFrame: 0,
		region: 'conus',
		mapProvider: 'deckgl',
	},
	render: () => <AutoPlayAnimationComponent />,
}

const DifferentRegionsComponent = () => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [region, setRegion] = useState<'conus' | 'alaska' | 'hawaii' | 'namer'>('conus')

	return (
		<div style={{ width: '100%', height: '600px' }}>
			<AnimatorMapMachine frames={SAMPLE_HURRICANE_PATHS} currentFrame={currentFrame} region={region} mapProvider="deckgl" />
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
				<p>
					Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
				</p>
				<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>Previous</button>
				<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>Next</button>
			</div>
		</div>
	)
}

/**
 * Map with different regions
 */
export const DifferentRegions: Story = {
	args: {
		frames: SAMPLE_HURRICANE_PATHS,
		currentFrame: 0,
		region: 'conus',
		mapProvider: 'deckgl',
	},
	render: () => <DifferentRegionsComponent />,
}

const CustomOpacityComponent = () => {
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
					<input type="range" min="0" max="1" step="0.1" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} />
					<span>{(opacity * 100).toFixed(0)}%</span>
				</div>
				<p>
					Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
				</p>
				<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>Previous</button>
				<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>Next</button>
			</div>
		</div>
	)
}

/**
 * Map with custom opacity
 */
export const CustomOpacity: Story = {
	args: {
		frames: SAMPLE_HURRICANE_PATHS,
		currentFrame: 0,
		region: 'conus',
		mapProvider: 'deckgl',
		baseOpacity: 1,
	},
	render: () => <CustomOpacityComponent />,
}

const LoadingStateComponent = () => {
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
				<AnimatorMapMachine frames={SAMPLE_HURRICANE_PATHS} currentFrame={currentFrame} region="conus" mapProvider="deckgl" />
			)}
			<div style={{ padding: '20px', background: '#f5f5f5' }}>
				<p>
					Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
				</p>
				<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>Previous</button>
				<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>Next</button>
			</div>
		</div>
	)
}

/**
 * Map with loading state
 */
export const LoadingState: Story = {
	args: {
		frames: SAMPLE_HURRICANE_PATHS,
		currentFrame: 0,
		region: 'conus',
		mapProvider: 'deckgl',
	},
	render: () => <LoadingStateComponent />,
}

const WithMetadataDisplayComponent = () => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const frame = SAMPLE_HURRICANE_PATHS[currentFrame]

	return (
		<div style={{ width: '100%', height: '600px' }}>
			<AnimatorMapMachine frames={SAMPLE_HURRICANE_PATHS} currentFrame={currentFrame} region="conus" mapProvider="deckgl" />
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
				<p>
					Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
				</p>
				<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>Previous</button>
				<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>Next</button>
			</div>
		</div>
	)
}

/**
 * Map with metadata display
 */
export const WithMetadataDisplay: Story = {
	args: {
		frames: SAMPLE_HURRICANE_PATHS,
		currentFrame: 0,
		region: 'conus',
		mapProvider: 'deckgl',
	},
	render: () => <WithMetadataDisplayComponent />,
}

const BoundsConstraintsComponent = () => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [viewState, setViewState] = useState({ longitude: -95, latitude: 37, zoom: 3 })

	return (
		<div style={{ width: '100%', height: '600px' }}>
			<AnimatorMapMachine
				frames={SAMPLE_HURRICANE_PATHS}
				currentFrame={currentFrame}
				region="conus"
				mapProvider="deckgl"
				onViewStateChange={setViewState}
			/>
			<div style={{ padding: '20px', background: '#f5f5f5' }}>
				<h3>Bounds Constraints Test</h3>
				<p>
					<strong>Current View State:</strong>
				</p>
				<ul>
					<li>Longitude: {viewState.longitude.toFixed(2)}</li>
					<li>Latitude: {viewState.latitude.toFixed(2)}</li>
					<li>Zoom: {viewState.zoom.toFixed(2)}</li>
				</ul>
				<p>
					<strong>Constraints:</strong>
				</p>
				<ul>
					<li>Zoom: 2 - 20</li>
					<li>Longitude: -130 to -65</li>
					<li>Latitude: 24 to 50</li>
				</ul>
				<p style={{ color: '#666', fontSize: '12px' }}>
					Try scrolling to zoom out (should stop at zoom 2) or dragging to pan beyond the bounds (should snap back).
				</p>
				<p>
					Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
				</p>
				<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>Previous</button>
				<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>Next</button>
			</div>
		</div>
	)
}

/**
 * Map with zoom and pan constraints
 * Tests the bounds constraints - try to zoom out or pan beyond the CONUS bounds
 */
export const BoundsConstraints: Story = {
	args: {
		frames: SAMPLE_HURRICANE_PATHS,
		currentFrame: 0,
		region: 'conus',
		mapProvider: 'deckgl',
	},
	render: () => <BoundsConstraintsComponent />,
}

// ============================================================================
// Layer Configuration Stories
// ============================================================================

import { MapLayerPanel } from '../MapLayerPanel/MapLayerPanel'
import { LAYER_CONFIG_PRESETS, layerConfigToVisibility } from './config/layerConfigTypes'

const LayerConfigurationComponent = ({ configPreset }: { configPreset: string }) => {
	const [currentFrame, setCurrentFrame] = useState(0)
	const [layerPanelOpen, setLayerPanelOpen] = useState(false)
	const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>(() => {
		const config = LAYER_CONFIG_PRESETS[configPreset as keyof typeof LAYER_CONFIG_PRESETS]
		return layerConfigToVisibility(config)
	})

	const config = LAYER_CONFIG_PRESETS[configPreset as keyof typeof LAYER_CONFIG_PRESETS]

	return (
		<div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<div style={{ flex: 1, position: 'relative' }}>
				<AnimatorMapMachine
					frames={SAMPLE_HURRICANE_PATHS}
					currentFrame={currentFrame}
					region="conus"
					mapProvider="deckgl"
					layerVisibility={layerVisibility}
				/>
				<button
					onClick={() => setLayerPanelOpen(!layerPanelOpen)}
					style={{
						position: 'absolute',
						top: '20px',
						right: '20px',
						padding: '10px 20px',
						backgroundColor: '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
						zIndex: 100,
					}}
				>
					{layerPanelOpen ? 'Close' : 'Open'} Layers
				</button>
				<MapLayerPanel
					open={layerPanelOpen}
					onClose={() => setLayerPanelOpen(false)}
					layerVisibility={layerVisibility}
					setLayerVisibility={setLayerVisibility}
					dataType="all"
					layerConfig={config}
				/>
			</div>
			<div style={{ padding: '20px', background: '#f5f5f5', borderTop: '1px solid #ddd' }}>
				<p>
					<strong>Configuration:</strong> {configPreset}
				</p>
				<p>
					Frame: {currentFrame + 1} / {SAMPLE_HURRICANE_PATHS.length}
				</p>
				<button onClick={() => setCurrentFrame((prev) => Math.max(0, prev - 1))}>Previous</button>
				<button onClick={() => setCurrentFrame((prev) => Math.min(SAMPLE_HURRICANE_PATHS.length - 1, prev + 1))}>Next</button>
				<button onClick={() => setCurrentFrame(0)} style={{ marginLeft: '10px' }}>
					Reset
				</button>
			</div>
		</div>
	)
}

/**
 * Tropical Hurricane Animator Configuration
 * Shows only base map layers and hurricane-specific data layers
 * Hides county and coastal alert layers
 */
export const TropicalConfiguration: Story = {
	render: () => <LayerConfigurationComponent configPreset="TROPICAL" />,
}

/**
 * County Alerts Animator Configuration
 * Shows base map layers and county alert data layers
 * Hides coastal alert and hurricane layers
 */
export const CountyAlertsConfiguration: Story = {
	render: () => <LayerConfigurationComponent configPreset="COUNTY_ALERTS" />,
}

/**
 * Coastal Alerts Animator Configuration
 * Shows base map layers and coastal alert data layers
 * Hides county alert and hurricane layers
 */
export const CoastalAlertsConfiguration: Story = {
	render: () => <LayerConfigurationComponent configPreset="COASTAL_ALERTS" />,
}

/**
 * Full Animator Configuration
 * Shows all available layers
 * Useful for testing and development
 */
export const FullConfiguration: Story = {
	render: () => <LayerConfigurationComponent configPreset="FULL" />,
}
