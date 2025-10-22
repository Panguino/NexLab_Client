import Providers from '@/components/providers/Providers/Providers'
import { formatRunToZDate } from '@/util/dateFormat'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Animator } from './Animator'
import { testDataFrameLabels, testDataFrameLabels2, testDataWithOverlays, testFrames, testFrames16x9, testFrames8x6 } from './AnimatorTestData'
import { mockAlaskaFrames, mockHawaiiFrames, mockHurricaneTrackFrames } from './mockMapData'

/**
 * # Animator Component
 *
 * A comprehensive animation player for displaying sequences of images with advanced controls,
 * overlays, zoom capabilities, and interactive features.
 *
 * ## Key Features
 * - **Frame Animation**: Play/pause/step through image sequences
 * - **Zoom & Pan**: Interactive zoom and pan with react-zoom-pan-pinch
 * - **Overlays**: Support for static and dynamic overlay layers
 * - **Scrubber**: Timeline with frame labels and load states
 * - **Run Selection**: Dropdown for selecting different model runs
 * - **Soundings Picker**: Interactive click-through mode for selecting points
 * - **Data Readout**: Hover tooltips with data values and lat/lon
 * - **PDF Support**: Frame-specific PDF links
 * - **Responsive**: Adapts to container size with configurable aspect ratios
 *
 * ## Architecture
 * The component uses React Context to manage state across multiple sub-components:
 * - AnimatorImageSizer: Handles zoom/pan and image rendering
 * - AnimatorControls: Playback and navigation controls
 * - ImageControls: Image manipulation buttons
 * - DataTooltip: Hover information display
 *
 * See ANIMATOR_DOCUMENTATION.md for detailed prop reference and architecture.
 */
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
	parameters: {
		docs: {
			description: {
				component: 'A feature-rich animation player for image sequences with zoom, overlays, and interactive controls.',
			},
		},
	},
}

export default meta

const TemplateFactory = () => {
	const Template: StoryFn<typeof Animator> = (args) => {
		return <Animator {...args} />
	}
	return Template
}

/**
 * ## Basic Playback Stories
 * These stories demonstrate core playback functionality
 */

export const autoPlayNoControls: StoryFn<typeof Animator> = TemplateFactory()
autoPlayNoControls.args = {
	interval: 250,
	frames: testFrames,
	autoPlay: true,
	hideControls: true,
}
autoPlayNoControls.parameters = {
	docs: {
		description: {
			story: 'Animator with autoplay enabled and all controls hidden. Useful for background animations or hero sections.',
		},
	},
}

export const autoPlayControls: StoryFn<typeof Animator> = TemplateFactory()
autoPlayControls.args = {
	interval: 100,
	frames: testFrames,
	autoPlay: true,
}
autoPlayControls.parameters = {
	docs: {
		description: {
			story: 'Animator with autoplay and full controls visible. Users can pause, step, and adjust playback.',
		},
	},
}

export const autoPlayControlsNoZoom: StoryFn<typeof Animator> = TemplateFactory()
autoPlayControlsNoZoom.args = {
	interval: 250,
	frames: testFrames,
	autoPlay: true,
	hideZoomControls: true,
}
autoPlayControlsNoZoom.parameters = {
	docs: {
		description: {
			story: 'Autoplay with controls but zoom buttons hidden. Useful when zoom is not needed.',
		},
	},
}

export const manualPlayback: StoryFn<typeof Animator> = TemplateFactory()
manualPlayback.args = {
	interval: 250,
	frames: testFrames,
	autoPlay: false,
}
manualPlayback.parameters = {
	docs: {
		description: {
			story: 'Manual playback mode. Users must click play to start animation. Good for exploratory data.',
		},
	},
}

/**
 * ## Sizing & Aspect Ratio Stories
 * These stories demonstrate different sizing configurations
 */

export const responsiveSize: StoryFn<typeof Animator> = TemplateFactory()
responsiveSize.args = {
	interval: 250,
	frames: testFrames,
}
responsiveSize.parameters = {
	docs: {
		description: {
			story: 'Responsive sizing that fills the container while maintaining aspect ratio. Default behavior.',
		},
	},
}

export const specificRatio8x6: StoryFn<typeof Animator> = TemplateFactory()
specificRatio8x6.args = {
	interval: 250,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
}
specificRatio8x6.parameters = {
	docs: {
		description: {
			story: '4:3 aspect ratio (800x600). Maintains this ratio regardless of container size.',
		},
	},
}

export const specificRatio16x9: StoryFn<typeof Animator> = TemplateFactory()
specificRatio16x9.args = {
	interval: 250,
	frames: testFrames16x9,
	imageInfo: { width: 1600, height: 900 },
}
specificRatio16x9.parameters = {
	docs: {
		description: {
			story: '16:9 aspect ratio (1600x900). Common for widescreen displays.',
		},
	},
}

export const fixedDimensions: StoryFn<typeof Animator> = TemplateFactory()
fixedDimensions.args = {
	interval: 250,
	frames: testFrames,
	width: 500,
	height: 500,
}
fixedDimensions.parameters = {
	docs: {
		description: {
			story: 'Fixed width and height. Animator will not exceed these dimensions.',
		},
	},
}
/**
 * ## Overlay Stories
 * These stories demonstrate overlay functionality
 */

export const overlays: StoryFn<typeof Animator> = TemplateFactory()
overlays.args = {
	interval: 250,
	frames: testDataWithOverlays.files,
	overlays: testDataWithOverlays.overlays,
	imageInfo: { width: 1600, height: 900 },
}
overlays.parameters = {
	docs: {
		description: {
			story: 'Animator with static and dynamic overlay layers. Users can toggle overlays via the overlay panel button.',
		},
	},
}

/**
 * ## Scrubber Stories
 * These stories demonstrate scrubber and frame label functionality
 */

export const withScrubberFrameStates: StoryFn<typeof Animator> = TemplateFactory()
withScrubberFrameStates.args = {
	interval: 250,
	frames: testFrames8x6.concat(testFrames8x6), // 12 frames
	scrubberFrameLoadStates: [true, false, true, true, false, true, true, true, false, true, false, true],
}
withScrubberFrameStates.parameters = {
	docs: {
		description: {
			story: 'Scrubber with frame load states. Loaded frames show as filled, unloaded as empty in the scrubber.',
		},
	},
}

export const withScrubberPlaceholder: StoryFn<typeof Animator> = TemplateFactory()
withScrubberPlaceholder.args = {
	interval: 250,
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
withScrubberPlaceholder.parameters = {
	docs: {
		description: {
			story: 'Scrubber with placeholder images for unloaded frames. Useful for progressive loading.',
		},
	},
}

export const withFrameLabels: StoryFn<typeof Animator> = TemplateFactory()
withFrameLabels.args = {
	interval: 250,
	frames: testDataFrameLabels.frames,
	imageInfo: { width: testDataFrameLabels.img.width, height: testDataFrameLabels.img.height },
	frameLabels: testDataFrameLabels.levels,
	scrubberFrameLoadStates: new Array(testDataFrameLabels.frames.length).fill(true),
	displayAllLabels: true,
}
withFrameLabels.parameters = {
	docs: {
		description: {
			story: 'All frame labels displayed in the scrubber. Good for showing all available options.',
		},
	},
}

export const withActiveFrameLabel: StoryFn<typeof Animator> = TemplateFactory()
withActiveFrameLabel.args = {
	interval: 250,
	frames: testDataFrameLabels2.frames,
	imageInfo: { width: testDataFrameLabels2.img.width, height: testDataFrameLabels2.img.height },
	frameLabels: testDataFrameLabels2.runs.map(formatRunToZDate),
	displayAllLabels: false,
	scrubberFrameLoadStates: new Array(testDataFrameLabels2.frames.length).fill(true),
}
withActiveFrameLabel.parameters = {
	docs: {
		description: {
			story: 'Only the active frame label is displayed above the scrubber handle. Cleaner UI for many frames.',
		},
	},
}

/**
 * ## Soundings Picker Stories
 * These stories demonstrate interactive soundings picker functionality
 */

export const soundingPickerEnabled: StoryFn<typeof Animator> = TemplateFactory()
soundingPickerEnabled.args = {
	interval: 250,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	soundingsPicker: true,
	soundingsPickerMode: false,
	soundingsPickerDisabled: false,
	onSoundingsClickthrough: ({ xPercent, yPercent }: { xPercent: number; yPercent: number }) => {
		console.log('Sounding clicked at:', { xPercent, yPercent })
	},
}
soundingPickerEnabled.parameters = {
	docs: {
		description: {
			story: 'Soundings picker enabled. Click the weather balloon icon to enter picker mode, then click on the image to select a point.',
		},
	},
}

export const soundingPickerDisabled: StoryFn<typeof Animator> = TemplateFactory()
soundingPickerDisabled.args = {
	interval: 250,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	soundingsPicker: true,
	soundingsPickerMode: false,
	soundingsPickerDisabled: true,
	onSoundingsClickthrough: ({ xPercent, yPercent }: { xPercent: number; yPercent: number }) => {
		console.log('Sounding clicked at:', { xPercent, yPercent })
	},
}
soundingPickerDisabled.parameters = {
	docs: {
		description: {
			story: 'Soundings picker button is visible but disabled. Useful when soundings are not available for current data.',
		},
	},
}

export const soundingPickerModelComparison: StoryFn<typeof Animator> = TemplateFactory()
soundingPickerModelComparison.args = {
	interval: 250,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	frameLabels: ['RAP', 'NAM', 'ECMWF', 'GFS', 'HRRR', 'RDPS'],
	soundingsPicker: true,
	soundingsPickerMode: false,
	soundingsPickerDisabled: false,
	onSoundingsClickthrough: ({ xPercent, yPercent }: { xPercent: number; yPercent: number }) => {
		console.log('Sounding clicked at:', { xPercent, yPercent })
	},
	onFrameUpdate: (frameIndex) => {
		const supportedModels = ['RAP', 'NAM', 'GFS', 'HRRR']
		const currentModel = ['RAP', 'NAM', 'ECMWF', 'GFS', 'HRRR', 'RDPS'][frameIndex]
		const isSupported = supportedModels.includes(currentModel)
		console.log(`Frame ${frameIndex}: ${currentModel} - Soundings ${isSupported ? 'supported' : 'not supported'}`)
	},
}
soundingPickerModelComparison.parameters = {
	docs: {
		description: {
			story: 'Model comparison with soundings picker. Demonstrates dynamic enabling/disabling based on model support.',
		},
	},
}

/**
 * ## PDF Stories
 * These stories demonstrate PDF functionality
 */

export const pdfButtonEnabled: StoryFn<typeof Animator> = TemplateFactory()
pdfButtonEnabled.args = {
	interval: 250,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	pdfs: [
		'https://example.com/pdf1.pdf',
		'https://example.com/pdf2.pdf',
		'https://example.com/pdf3.pdf',
		'https://example.com/pdf4.pdf',
		'https://example.com/pdf5.pdf',
		'https://example.com/pdf6.pdf',
	],
	pdfButtonClick: (pdfUrl: string) => {
		console.log('PDF button clicked for URL:', pdfUrl)
	},
}
pdfButtonEnabled.parameters = {
	docs: {
		description: {
			story: "PDF button enabled with URLs for each frame. Click the PDF icon to open the current frame's PDF.",
		},
	},
}

export const pdfButtonDisabled: StoryFn<typeof Animator> = TemplateFactory()
pdfButtonDisabled.args = {
	interval: 250,
	frames: testFrames8x6,
	imageInfo: { width: 800, height: 600 },
	pdfs: [],
	pdfButtonClick: (pdfUrl: string) => {
		console.log('PDF button clicked for URL:', pdfUrl)
	},
}
pdfButtonDisabled.parameters = {
	docs: {
		description: {
			story: 'Empty PDF array - button will not appear. Useful when PDFs are not available.',
		},
	},
}

/**
 * ## Zoom Fill Mode Stories
 * These stories demonstrate the zoom fill toggle functionality
 */

export const zoomFillModeEnabled: StoryFn<typeof Animator> = (args) => {
	const [zoomFill, setZoomFill] = useState(true)
	return <Animator {...args} zoomFill={zoomFill} setZoomFill={setZoomFill} />
}
zoomFillModeEnabled.args = {
	interval: 250,
	frames: testFrames16x9,
	imageInfo: { width: 1600, height: 900 },
	autoPlay: true,
}
zoomFillModeEnabled.parameters = {
	docs: {
		description: {
			story: 'Zoom fill mode enabled (default). Image fills the container, may extend beyond bounds. Click the expand/compress button to toggle between fill and fit modes.',
		},
	},
}

export const zoomFitModeEnabled: StoryFn<typeof Animator> = (args) => {
	const [zoomFill, setZoomFill] = useState(false)
	return <Animator {...args} zoomFill={zoomFill} setZoomFill={setZoomFill} />
}
zoomFitModeEnabled.args = {
	interval: 250,
	frames: testFrames16x9,
	imageInfo: { width: 1600, height: 900 },
	autoPlay: true,
}
zoomFitModeEnabled.parameters = {
	docs: {
		description: {
			story: 'Zoom fit mode enabled. Image fits within the container bounds. Click the expand/compress button to toggle between fill and fit modes.',
		},
	},
}

export const fullscreenModeEnabled: StoryFn<typeof Animator> = (args) => {
	const [fullScreen, setFullScreen] = useState(false)
	return <Animator {...args} fullScreen={fullScreen} setFullScreen={setFullScreen} />
}
fullscreenModeEnabled.args = {
	interval: 250,
	frames: testFrames16x9,
	imageInfo: { width: 1600, height: 900 },
	autoPlay: true,
}
fullscreenModeEnabled.parameters = {
	docs: {
		description: {
			story: 'Fullscreen mode enabled. Click the fullscreen button to toggle fullscreen mode. The animator will expand to fill the entire viewport.',
		},
	},
}

/**
 * ## Map Mode Stories
 * These stories demonstrate the Animator component in map mode with geographic data
 */

export const BasicMapAnimator: StoryFn<typeof Animator> = TemplateFactory()
BasicMapAnimator.args = {
	frames: mockHurricaneTrackFrames,
	mode: 'map',
	mapRegion: 'conus',
	interval: 500,
	autoPlay: false,
	imageInfo: { width: 800, height: 600 },
}
BasicMapAnimator.parameters = {
	docs: {
		description: {
			story: 'Basic map animation showing hurricane track data. Use the scrubber to navigate frames, zoom buttons to zoom in/out, and region selector to change regions.',
		},
	},
}

export const MapAnimatorAutoPlay: StoryFn<typeof Animator> = TemplateFactory()
MapAnimatorAutoPlay.args = {
	frames: mockHurricaneTrackFrames,
	mode: 'map',
	mapRegion: 'conus',
	interval: 800,
	autoPlay: true,
	imageInfo: { width: 800, height: 600 },
}
MapAnimatorAutoPlay.parameters = {
	docs: {
		description: {
			story: 'Map animation with auto-play enabled. The animation will start playing automatically. Use zoom controls and region selector while playing.',
		},
	},
}

export const MapAnimatorWithControls: StoryFn<typeof Animator> = TemplateFactory()
MapAnimatorWithControls.args = {
	frames: mockHurricaneTrackFrames,
	mode: 'map',
	mapRegion: 'namer',
	interval: 600,
	autoPlay: false,
	imageInfo: { width: 800, height: 600 },
}
MapAnimatorWithControls.parameters = {
	docs: {
		description: {
			story: 'Map animator with all controls visible. Shows region selector (CONUS, Alaska, Hawaii, NAMER), zoom controls, and playback controls working together.',
		},
	},
}

export const MapAnimatorFullscreen: StoryFn<typeof Animator> = TemplateFactory()
MapAnimatorFullscreen.args = {
	frames: mockHurricaneTrackFrames,
	mode: 'map',
	mapRegion: 'conus',
	interval: 500,
	autoPlay: false,
	imageInfo: { width: 800, height: 600 },
	fullScreen: false,
}
MapAnimatorFullscreen.parameters = {
	docs: {
		description: {
			story: 'Map animator with fullscreen capability. Click the fullscreen button in the controls to expand the map to fill the viewport.',
		},
	},
}

export const MapAnimatorDifferentRegions: StoryFn<typeof Animator> = (args) => {
	const [region, setRegion] = useState<'conus' | 'alaska' | 'hawaii' | 'namer'>('conus')
	const frames = region === 'alaska' ? mockAlaskaFrames : region === 'hawaii' ? mockHawaiiFrames : mockHurricaneTrackFrames

	return (
		<Animator
			{...args}
			frames={frames}
			mode="map"
			mapRegion={region}
			onMapZoomIn={() => console.log('Zoom in')}
			onMapZoomOut={() => console.log('Zoom out')}
			onMapResetView={() => console.log('Reset view')}
		/>
	)
}
MapAnimatorDifferentRegions.args = {
	interval: 500,
	autoPlay: false,
	imageInfo: { width: 800, height: 600 },
}
MapAnimatorDifferentRegions.parameters = {
	docs: {
		description: {
			story: 'Map animator demonstrating different regions. Use the region selector to switch between CONUS, Alaska, Hawaii, and NAMER regions. Each region has different data and zoom constraints.',
		},
	},
}
