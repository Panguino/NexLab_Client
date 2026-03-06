'use client'
import { mapZoomState, zoomState } from '@/types/general'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import AnimatorLayout from './AnimatorLayout/AnimatorLayout'

// Default map zoom state - defined outside component to prevent new object creation on every render
const DEFAULT_MAP_ZOOM_STATE: mapZoomState = { zoom: 3, latitude: 37, longitude: -95 }

export interface IAnimatorProps {
	frames: string[] | any[] // Can be image URLs or MapFrame objects
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
	initialZoomState?: zoomState | null
	setZoomState?: (zoomState: zoomState) => void
	activeOverlays?: string[]
	setActiveOverlays?: (overlays: string[]) => void
	setZoomFill?: (zoomFill: boolean) => void
	zoomFill?: boolean
	fullScreen?: boolean
	setFullScreen?: (fullScreen: boolean) => void
	soundingsPicker?: boolean
	soundingsPickerMode?: boolean
	soundingsPickerDisabled?: boolean
	setSoundingsPickerMode?: (mode: boolean) => void
	onSoundingsClickthrough?: (event: { xPercent: number; yPercent: number }) => void
	sectorId?: string // For lat/lon conversion in DataTooltip
	// Scrubber enhancements
	scrubberPlaceholderImageUrl?: string
	scrubberFrameLoadStates?: boolean[]
	frameLabels?: string[]
	displayAllLabels?: boolean // true = show all labels row; false = show only active label above handle
	// Simple overlay markers (percent positions inside the image content)
	overlayMarkers?: { xPercent: number; yPercent: number }[]
	onFrameUpdate?: (frameIndex: number) => void
	// PDF functionality
	pdfs?: string[]
	pdfButtonClick?: (pdfUrl: string) => void
	// Map mode support
	mode?: 'image' | 'map' // 'image' for images, 'map' for geographic data
	mapRegion?: 'conus' | 'alaska' | 'hawaii' | 'namer' // Region for map mode
	initialMapZoomState?: mapZoomState // Initial map zoom state
	setMapZoomState?: (mapZoomState: mapZoomState) => void // Callback for map zoom state changes
	// Map layer visibility
	mapLayerVisibility?: Record<string, boolean> // Visibility state for map layers
	setMapLayerVisibility?: (visibility: Record<string, boolean>) => void // Callback for layer visibility changes
	mapDataType?: 'alerts' | 'hurricane' | 'all' // Type of data being displayed
	// Layer configuration
	layerConfig?: any // Layer configuration for filtering which layers are shown (LayerConfig type) - REQUIRED
	// Storm click handler
	onStormClick?: (stormId: string) => void
	// CWA zone click handler
	onCwaClick?: (cwaId: string, wfoId: string) => void
	// County click handler
	onCountyClick?: (countyId: string, countyData: any) => void
	// Selected WFO ID for filtering counties in detail view
	selectedWFOId?: string | null
	// Disable CWA zone hover/click detection entirely (for hazards page)
	disableCwaDetection?: boolean
	// Hazard filter for sidebar hover interaction - returns opacity 0-1 for counties
	hazardOpacityFn?: (alerts: any[]) => number
	// All coastal/offshore regions for showing inactive borders (not just those with alerts)
	allCoastalRegions?: any
}
interface IAnimatorProvider extends IAnimatorProps {
	loadedFrames: any[] // Replace `any` with the actual type of frames
	setLoadedFrames: Dispatch<SetStateAction<any[]>>
	currentFrame: number
	setCurrentFrame: Dispatch<SetStateAction<number>>
	isPlaying: boolean
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	ratio: number
	mode: 'image' | 'map'
	mapRegion: 'conus' | 'alaska' | 'hawaii' | 'namer'
	mapZoomState: mapZoomState // Current map zoom state
	setMapZoomState: (mapZoomState: mapZoomState, keepTarget?: boolean) => void // Update map zoom state
	targetMapZoomState: mapZoomState | null // Target zoom state for smooth animation
	mapLayerVisibility: Record<string, boolean> // Map layer visibility state
	setMapLayerVisibility: (visibility: Record<string, boolean>) => void // Update map layer visibility
	onStormClick?: (stormId: string) => void // Storm click handler
	onCwaClick?: (cwaId: string, wfoId: string) => void // CWA zone click handler
	onCountyClick?: (countyId: string, countyData: any) => void // County click handler
	mapDataType: 'alerts' | 'hurricane' | 'all' // Type of data being displayed
	layerConfig?: any // Layer configuration for filtering which layers are shown
	selectedWFOId?: string | null // Selected WFO ID for filtering counties in detail view
	disableCwaDetection?: boolean // Disable CWA zone hover/click detection entirely
	hazardOpacityFn?: (alerts: any[]) => number // Hazard filter for sidebar hover
	allCoastalRegions?: any // All coastal/offshore regions for showing inactive borders
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
	overlayMarkers = [],
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
	initialZoomState = null,
	activeOverlays = ['data', 'map'],
	fullScreen = false,
	soundingsPicker = false,
	soundingsPickerMode = false,
	soundingsPickerDisabled = false,
	setSoundingsPickerMode = (mode: boolean) => {
		console.warn('setSoundingsPickerMode function not provided, soundings picker mode will not be updated.', mode)
	},
	onSoundingsClickthrough = (event: { xPercent: number; yPercent: number }) => {
		console.warn('onSoundingsClickthrough function not provided, soundings click-through will not be handled.', event)
	},
	sectorId,
	scrubberPlaceholderImageUrl,
	scrubberFrameLoadStates,
	frameLabels,
	displayAllLabels = true,
	setFrameValidTime = (validtime: number) => {
		console.warn('setFrameValidTime function not provided, frame valid time will not be updated.', validtime)
	},
	setActiveOverlays = (overlays: string[]) => {
		console.warn('setActiveOverlays function not provided, active overlays will not be updated.', overlays)
	},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setZoomState = (_zoomState: zoomState) => {
		// Silently ignore if not provided - this is optional
	},
	setZoomFill,
	setFullScreen,
	onFrameUpdate = () => {
		// console.warn('onFrameUpdate function not provided, frame update will not be handled.')
	},
	pdfs = [],
	pdfButtonClick = (pdfUrl: string) => {
		console.warn('pdfButtonClick function not provided, PDF button click will not be handled.', pdfUrl)
	},
	mode = 'image',
	mapRegion = 'conus',
	initialMapZoomState = DEFAULT_MAP_ZOOM_STATE,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setMapZoomState = (_mapZoomState: mapZoomState) => {
		// Silently ignore if not provided - this is optional
	},
	mapLayerVisibility,
	setMapLayerVisibility,
	mapDataType = 'all',
	layerConfig,
	onStormClick,
	onCwaClick,
	onCountyClick,
	selectedWFOId,
	disableCwaDetection = false,
	hazardOpacityFn,
	allCoastalRegions,
}: IAnimatorProps) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [loadedFrames, setLoadedFrames] = useState([])
	const [currentFrame, setCurrentFrame] = useState(startFrame !== undefined ? startFrame : frames.length - 1)
	const [mapZoomState, setMapZoomStateLocal] = useState<mapZoomState>(initialMapZoomState)
	const [targetMapZoomState, setTargetMapZoomState] = useState<mapZoomState | null>(null)

	// Update target map zoom state when initialMapZoomState prop changes
	// This triggers smooth animation instead of instant snap
	// Use individual values as dependencies to avoid infinite loop from object reference changes
	useEffect(() => {
		if (initialMapZoomState) {
			// Check if the new initial state is actually different from the CURRENT state
			// If they are the same (or very close), it's likely just a sync from a manual pan,
			// so we shouldn't set a target (which would lock the controller)
			const isDifferentFromCurrent =
				Math.abs(initialMapZoomState.zoom - mapZoomState.zoom) > 0.001 ||
				Math.abs(initialMapZoomState.latitude - mapZoomState.latitude) > 0.001 ||
				Math.abs(initialMapZoomState.longitude - mapZoomState.longitude) > 0.001

			// Only update if the values actually changed to prevent infinite loop
			const hasChanged =
				!targetMapZoomState ||
				targetMapZoomState.zoom !== initialMapZoomState.zoom ||
				targetMapZoomState.latitude !== initialMapZoomState.latitude ||
				targetMapZoomState.longitude !== initialMapZoomState.longitude

			console.log('Animator Zoom Update:', {
				initial: initialMapZoomState,
				current: mapZoomState,
				target: targetMapZoomState,
				isDifferent: isDifferentFromCurrent,
				hasChanged,
			})

			if (hasChanged && isDifferentFromCurrent) {
				console.log('Setting target map zoom state:', initialMapZoomState)
				setTargetMapZoomState(initialMapZoomState)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialMapZoomState])

	// Initialize layer visibility from layerConfig (required)
	// If mapLayerVisibility prop is provided AND has keys, use it (controlled component)
	// Otherwise, use layerConfig with defaults for missing layers
	const getInitialLayerVisibility = () => {
		// Only use mapLayerVisibility if it's provided and has keys
		if (mapLayerVisibility && Object.keys(mapLayerVisibility).length > 0) {
			return mapLayerVisibility
		}

		// Convert layerConfig to visibility state using initialValue
		// For any layer not in layerConfig, default to false
		const visibility: Record<string, boolean> = {}

		// Get all possible layer IDs from mapLayers
		const { getAllLayerIds } = require('./AnimatorMapMachine/config/mapLayers')
		const allLayerIds = getAllLayerIds()

		// Set visibility for all layers
		allLayerIds.forEach((layerId: string) => {
			if (layerConfig && layerId in layerConfig) {
				// Use initialValue from layerConfig
				visibility[layerId] = layerConfig[layerId].initialValue
			} else {
				// Default to false for layers not in layerConfig
				visibility[layerId] = false
			}
		})

		return visibility
	}

	const [mapLayerVisibilityLocal, setMapLayerVisibilityLocal] = useState<Record<string, boolean>>(getInitialLayerVisibility())

	// Sync external mapLayerVisibility prop changes to local state
	// Only sync if mapLayerVisibility has keys (not an empty object)
	useEffect(() => {
		if (mapLayerVisibility && Object.keys(mapLayerVisibility).length > 0) {
			setMapLayerVisibilityLocal(mapLayerVisibility)
		}
	}, [mapLayerVisibility])

	// Update layer visibility when layerConfig changes
	useEffect(() => {
		// Only update if mapLayerVisibility is not controlling the state
		if (!mapLayerVisibility || Object.keys(mapLayerVisibility).length === 0) {
			setMapLayerVisibilityLocal(getInitialLayerVisibility())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [layerConfig])
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
				overlayMarkers,
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
				soundingsPicker,
				soundingsPickerMode,
				soundingsPickerDisabled,
				setSoundingsPickerMode,
				onSoundingsClickthrough,
				sectorId,
				scrubberPlaceholderImageUrl,
				scrubberFrameLoadStates,
				frameLabels,
				displayAllLabels,
				onFrameUpdate,
				pdfs,
				pdfButtonClick,
				mode,
				mapRegion,
				mapZoomState,
				setMapZoomState: (newMapZoomState: mapZoomState, keepTarget = false) => {
					setMapZoomStateLocal(newMapZoomState)
					// Only notify parent if NOT keeping target (i.e. manual move or end of animation)
					// This prevents the parent from syncing intermediate animation states back to us
					if (!keepTarget) {
						setMapZoomState(newMapZoomState)
					}
					// Clear target when user manually changes zoom, unless keepTarget is true
					if (!keepTarget) {
						setTargetMapZoomState(null)
					}
				},
				targetMapZoomState,
				mapLayerVisibility: mapLayerVisibilityLocal,
				setMapLayerVisibility: (newVisibility: Record<string, boolean>) => {
					setMapLayerVisibilityLocal(newVisibility)
					setMapLayerVisibility?.(newVisibility)
				},
				mapDataType: mapDataType || 'all',
				layerConfig,
				onStormClick,
				onCwaClick,
				onCountyClick,
				selectedWFOId,
				disableCwaDetection,
				hazardOpacityFn,
				allCoastalRegions,
			}}
		>
			<AnimatorLayout />
		</AnimatorContext.Provider>
	)
}
