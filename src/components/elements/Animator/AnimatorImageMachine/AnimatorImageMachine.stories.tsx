import { Meta, StoryFn } from '@storybook/react'
import { useRef, useState } from 'react'
import { AnimatorImageMachine } from './AnimatorImageMachine'
import { testFrames, testFrames8x6 } from '../AnimatorTestData'

/**
 * # AnimatorImageMachine Component
 *
 * Core component responsible for rendering image frames with opacity-based transitions.
 * Features:
 * - Lazy loads frames
 * - Caches frames in localStorage
 * - Manages frame loading states
 * - Handles opacity calculations for smooth transitions
 */
const meta: Meta<typeof AnimatorImageMachine> = {
	title: 'Components/Animator/AnimatorImageMachine',
	component: AnimatorImageMachine,
	parameters: {
		docs: {
			description: {
				component: 'Core component that renders image frames with opacity transitions. Handles lazy loading and caching.',
			},
		},
	},
}

export default meta

export const basicFrameRendering: StoryFn<typeof AnimatorImageMachine> = (args) => {
	const ref = useRef<HTMLDivElement>(null)
	const [currentFrame, setCurrentFrame] = useState(0)
	const [loadedFrames, setLoadedFrames] = useState<any[]>([])

	return (
		<div style={{ width: '100%', height: '600px', backgroundColor: '#f0f0f0', position: 'relative' }}>
			<AnimatorImageMachine
				ref={ref}
				frames={testFrames8x6}
				currentFrame={currentFrame}
				loadedFrames={loadedFrames}
				setLoadedFrames={setLoadedFrames}
				baseOpacity={1}
				zIndex={30}
			/>
			<div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '4px' }}>
				<p>Current Frame: {currentFrame}</p>
				<p>Loaded Frames: {loadedFrames.length}</p>
				<button onClick={() => setCurrentFrame((prev) => (prev + 1) % testFrames8x6.length)}>Next Frame</button>
				<button onClick={() => setCurrentFrame((prev) => (prev - 1 + testFrames8x6.length) % testFrames8x6.length)}>Previous Frame</button>
			</div>
		</div>
	)
}
basicFrameRendering.args = {}
basicFrameRendering.parameters = {
	docs: {
		description: {
			story: 'Basic frame rendering with manual frame navigation. Click Next/Previous to step through frames and see opacity transitions.',
		},
	},
}

export const autoPlayFrames: StoryFn<typeof AnimatorImageMachine> = (args) => {
	const ref = useRef<HTMLDivElement>(null)
	const [currentFrame, setCurrentFrame] = useState(0)
	const [loadedFrames, setLoadedFrames] = useState<any[]>([])
	const [isPlaying, setIsPlaying] = useState(true)

	// Auto-advance frames
	React.useEffect(() => {
		if (!isPlaying) return
		const interval = setInterval(() => {
			setCurrentFrame((prev) => (prev + 1) % testFrames.length)
		}, 250)
		return () => clearInterval(interval)
	}, [isPlaying])

	return (
		<div style={{ width: '100%', height: '600px', backgroundColor: '#f0f0f0', position: 'relative' }}>
			<AnimatorImageMachine
				ref={ref}
				frames={testFrames}
				currentFrame={currentFrame}
				loadedFrames={loadedFrames}
				setLoadedFrames={setLoadedFrames}
				baseOpacity={1}
				zIndex={30}
			/>
			<div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '4px' }}>
				<p>Current Frame: {currentFrame + 1} / {testFrames.length}</p>
				<p>Loaded Frames: {loadedFrames.length}</p>
				<button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
			</div>
		</div>
	)
}
autoPlayFrames.args = {}
autoPlayFrames.parameters = {
	docs: {
		description: {
			story: 'Auto-playing frame animation. Frames advance automatically and opacity transitions between them. Click Pause to stop.',
		},
	},
}

export const withReducedOpacity: StoryFn<typeof AnimatorImageMachine> = (args) => {
	const ref = useRef<HTMLDivElement>(null)
	const [currentFrame, setCurrentFrame] = useState(0)
	const [loadedFrames, setLoadedFrames] = useState<any[]>([])

	return (
		<div style={{ width: '100%', height: '600px', backgroundColor: '#f0f0f0', position: 'relative' }}>
			<AnimatorImageMachine
				ref={ref}
				frames={testFrames8x6}
				currentFrame={currentFrame}
				loadedFrames={loadedFrames}
				setLoadedFrames={setLoadedFrames}
				baseOpacity={0.7}
				zIndex={30}
			/>
			<div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '4px' }}>
				<p>Current Frame: {currentFrame}</p>
				<p>Base Opacity: 0.7</p>
				<button onClick={() => setCurrentFrame((prev) => (prev + 1) % testFrames8x6.length)}>Next Frame</button>
			</div>
		</div>
	)
}
withReducedOpacity.args = {}
withReducedOpacity.parameters = {
	docs: {
		description: {
			story: 'Frame rendering with reduced opacity (0.7). Useful for overlay layers that should be semi-transparent.',
		},
	},
}

export const loadingState: StoryFn<typeof AnimatorImageMachine> = (args) => {
	const ref = useRef<HTMLDivElement>(null)
	const [currentFrame, setCurrentFrame] = useState(0)
	const [loadedFrames, setLoadedFrames] = useState<any[]>([])

	return (
		<div style={{ width: '100%', height: '600px', backgroundColor: '#f0f0f0', position: 'relative' }}>
			<AnimatorImageMachine
				ref={ref}
				frames={testFrames8x6}
				currentFrame={currentFrame}
				loadedFrames={loadedFrames}
				setLoadedFrames={setLoadedFrames}
				baseOpacity={1}
				zIndex={30}
			/>
			<div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'white', padding: '10px', borderRadius: '4px' }}>
				<p>Current Frame: {currentFrame}</p>
				<p>Loaded Frames: {loadedFrames.length} / {testFrames8x6.length}</p>
				<p>Loading Progress: {Math.round((loadedFrames.length / testFrames8x6.length) * 100)}%</p>
				<button onClick={() => setCurrentFrame((prev) => (prev + 1) % testFrames8x6.length)}>Next Frame</button>
			</div>
		</div>
	)
}
loadingState.args = {}
loadingState.parameters = {
	docs: {
		description: {
			story: 'Shows frame loading progress. As you navigate frames, they are lazy-loaded and cached. Watch the loading progress increase.',
		},
	},
}

