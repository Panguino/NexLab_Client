'use client'
import { zoomState } from '@/types/general'
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import AnimatorLayout from './AnimatorLayout/AnimatorLayout'

interface IAnimatorProps {
	frames: string[]
	frameValidTimes?: number[]
	setFrameValidTime?: (validtime: number) => void
	startFrame?: number
	runs?: { value: string; label: string }[] | null
	activeRun?: string
	setActiveRun?: (run: string) => void
	runsPerRow?: number
	overlays?: { static: object; dynamic: object }
	enableReadouts?: boolean
	frameReadoutData?: any
	isLoadingReadoutData?: boolean
	requestReadoutData?: (frameIndex: number) => void
	imageInfo: { width: number; height: number }
	height?: number
	width?: number
	hideControls?: boolean
	hideZoomControls?: boolean
	autoPlay?: boolean
	disableZoom?: boolean
	interval?: number
	lastFrameDwell?: boolean
	lastFrameDwellTime?: number
	settingsComponent?: React.ReactNode | null
	initialZoomState?: zoomState
	setZoomState?: (zoomState: zoomState) => void
	activeOverlays?: string[]
	setActiveOverlays?: (overlays: string[]) => void
	setZoomFill?: (zoomFill: boolean) => void
	zoomFill?: boolean
	fullScreen?: boolean
	setFullScreen?: (fullScreen: boolean) => void
}
interface IAnimatorProvider extends IAnimatorProps {
	loadedFrames: any[] // Replace `any` with the actual type of frames
	setLoadedFrames: Dispatch<SetStateAction<any[]>>
	currentFrame: number
	setCurrentFrame: Dispatch<SetStateAction<number>>
	isPlaying: boolean
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	ratio: number
}

const AnimatorContext = createContext<IAnimatorProvider | undefined>(undefined)
export const useAnimator = () => useContext(AnimatorContext)
export const Animator = ({
	frames,
	frameValidTimes,
	startFrame,
	runs,
	activeRun,
	setActiveRun = (run: string) => {
		console.warn('setActiveRun function not provided, active run will not be updated.', run)
	},
	runsPerRow = 4,
	overlays,
	enableReadouts = false,
	frameReadoutData,
	isLoadingReadoutData,
	requestReadoutData,
	imageInfo = { width: 500, height: 500 },
	interval = 200,
	lastFrameDwell = true,
	lastFrameDwellTime = 1000,
	hideControls = false,
	autoPlay = false,
	disableZoom = false,
	hideZoomControls = false,
	zoomFill = true,
	settingsComponent = null,
	initialZoomState = { scale: 1, positionX: 0, positionY: 0, previousScale: 1 },
	activeOverlays = ['data', 'map'],
	fullScreen = false,
	setFrameValidTime = (validtime: number) => {
		console.warn('setFrameValidTime function not provided, frame valid time will not be updated.', validtime)
	},
	setActiveOverlays = (overlays: string[]) => {
		console.warn('setActiveOverlays function not provided, active overlays will not be updated.', overlays)
	},
	setZoomState = (zoomState: zoomState) => {
		console.warn('setZoomState function not provided, zoom state will not be updated.', zoomState)
	},
	setZoomFill = (zoomFill: boolean) => {
		console.warn('setZoomFill function not provided, zoom fill will not be updated.', zoomFill)
	},
	setFullScreen = (fullScreen: boolean) => {
		console.warn('setFullScreen function not provided, full screen state will not be updated.', fullScreen)
	},
}: IAnimatorProps) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [loadedFrames, setLoadedFrames] = useState([])
	const [currentFrame, setCurrentFrame] = useState(startFrame !== undefined ? startFrame : frames.length - 1)
	return (
		<AnimatorContext.Provider
			value={{
				isPlaying,
				setIsPlaying,
				loadedFrames,
				setLoadedFrames,
				currentFrame,
				setCurrentFrame,
				frames,
				frameValidTimes,
				startFrame,
				runs,
				activeRun,
				setActiveRun,
				runsPerRow,
				overlays,
				enableReadouts,
				frameReadoutData,
				isLoadingReadoutData,
				requestReadoutData,
				ratio: imageInfo.width / imageInfo.height,
				imageInfo,
				interval,
				lastFrameDwell,
				lastFrameDwellTime,
				hideControls,
				autoPlay,
				disableZoom,
				hideZoomControls,
				zoomFill,
				settingsComponent,
				initialZoomState,
				activeOverlays,
				fullScreen,
				setFrameValidTime,
				setActiveOverlays,
				setZoomState,
				setZoomFill,
				setFullScreen,
			}}
		>
			<AnimatorLayout />
		</AnimatorContext.Provider>
	)
}
