import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Animator } from '../Animator'
import { testDataWithOverlays, testFrames8x6 } from '../AnimatorTestData'
import ImageControls from './ImageControls'

/**
 * # ImageControls Component
 *
 * Provides interactive buttons for image manipulation:
 * - Zoom in/out
 * - Reset zoom
 * - Toggle fill/fit mode
 * - Toggle fullscreen
 * - Toggle soundings picker
 * - Open overlay panel
 * - PDF button
 */
const meta: Meta<typeof ImageControls> = {
	title: 'Components/Animator/ImageControls',
	component: ImageControls,
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
				component: 'Control buttons for image manipulation including zoom, fill mode, fullscreen, and more.',
			},
		},
	},
}

export default meta

/**
 * Wrapper to demonstrate ImageControls with Animator context
 */
const ImageControlsDemo: StoryFn = (args) => {
	const [zoomFill, setZoomFill] = useState(true)
	const [fullScreen, setFullScreen] = useState(false)
	const [soundingsPickerMode, setSoundingsPickerMode] = useState(false)

	return (
		<Animator
			frames={args.frames}
			imageInfo={{ width: 800, height: 600 }}
			interval={250}
			autoPlay={false}
			zoomFill={zoomFill}
			setZoomFill={setZoomFill}
			fullScreen={fullScreen}
			setFullScreen={setFullScreen}
			soundingsPicker={args.soundingsPicker}
			soundingsPickerMode={soundingsPickerMode}
			setSoundingsPickerMode={setSoundingsPickerMode}
			soundingsPickerDisabled={args.soundingsPickerDisabled}
			overlays={args.overlays}
			activeOverlays={args.activeOverlays}
			setActiveOverlays={args.setActiveOverlays}
			pdfs={args.pdfs}
			pdfButtonClick={args.pdfButtonClick}
		/>
	)
}

export const allButtonsEnabled: StoryFn = (args) => <ImageControlsDemo {...args} />
allButtonsEnabled.args = {
	frames: testFrames8x6,
	soundingsPicker: true,
	soundingsPickerDisabled: false,
	overlays: testDataWithOverlays.overlays,
	activeOverlays: [],
	setActiveOverlays: (overlays: string[]) => console.log('Active overlays:', overlays),
	pdfs: ['https://example.com/pdf1.pdf', 'https://example.com/pdf2.pdf'],
	pdfButtonClick: (url: string) => console.log('PDF clicked:', url),
}
allButtonsEnabled.parameters = {
	docs: {
		description: {
			story: 'All control buttons enabled. Includes zoom, fill/fit toggle, fullscreen, soundings picker, overlays, and PDF button.',
		},
	},
}

export const zoomControlsOnly: StoryFn = (args) => <ImageControlsDemo {...args} />
zoomControlsOnly.args = {
	frames: testFrames8x6,
	soundingsPicker: false,
	soundingsPickerDisabled: false,
	overlays: null,
	activeOverlays: [],
	setActiveOverlays: undefined,
	pdfs: [],
	pdfButtonClick: undefined,
}
zoomControlsOnly.parameters = {
	docs: {
		description: {
			story: 'Only zoom controls visible (zoom in, zoom out, reset). Other buttons are hidden.',
		},
	},
}

export const withOverlaysOnly: StoryFn = (args) => <ImageControlsDemo {...args} />
withOverlaysOnly.args = {
	frames: testFrames8x6,
	soundingsPicker: false,
	soundingsPickerDisabled: false,
	overlays: testDataWithOverlays.overlays,
	activeOverlays: [],
	setActiveOverlays: (overlays: string[]) => console.log('Active overlays:', overlays),
	pdfs: [],
	pdfButtonClick: undefined,
}
withOverlaysOnly.parameters = {
	docs: {
		description: {
			story: 'Zoom controls and overlay panel button visible. Click the layers icon to open the overlay selection panel.',
		},
	},
}

export const withSoundingsPickerEnabled: StoryFn = (args) => <ImageControlsDemo {...args} />
withSoundingsPickerEnabled.args = {
	frames: testFrames8x6,
	soundingsPicker: true,
	soundingsPickerDisabled: false,
	overlays: null,
	activeOverlays: [],
	setActiveOverlays: undefined,
	pdfs: [],
	pdfButtonClick: undefined,
}
withSoundingsPickerEnabled.parameters = {
	docs: {
		description: {
			story: 'Soundings picker button enabled. Click the weather balloon icon to toggle picker mode.',
		},
	},
}

export const withSoundingsPickerDisabled: StoryFn = (args) => <ImageControlsDemo {...args} />
withSoundingsPickerDisabled.args = {
	frames: testFrames8x6,
	soundingsPicker: true,
	soundingsPickerDisabled: true,
	overlays: null,
	activeOverlays: [],
	setActiveOverlays: undefined,
	pdfs: [],
	pdfButtonClick: undefined,
}
withSoundingsPickerDisabled.parameters = {
	docs: {
		description: {
			story: 'Soundings picker button visible but disabled. Useful when soundings are not available for current data.',
		},
	},
}

export const withPdfButton: StoryFn = (args) => <ImageControlsDemo {...args} />
withPdfButton.args = {
	frames: testFrames8x6,
	soundingsPicker: false,
	soundingsPickerDisabled: false,
	overlays: null,
	activeOverlays: [],
	setActiveOverlays: undefined,
	pdfs: [
		'https://example.com/pdf1.pdf',
		'https://example.com/pdf2.pdf',
		'https://example.com/pdf3.pdf',
		'https://example.com/pdf4.pdf',
		'https://example.com/pdf5.pdf',
		'https://example.com/pdf6.pdf',
	],
	pdfButtonClick: (url: string) => {
		console.log('Opening PDF:', url)
		window.open(url, '_blank')
	},
}
withPdfButton.parameters = {
	docs: {
		description: {
			story: 'PDF button visible. Click to open the PDF for the current frame.',
		},
	},
}
