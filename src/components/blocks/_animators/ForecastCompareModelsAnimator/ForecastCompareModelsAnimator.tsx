'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { FORECAST_MODELS } from '@/data/forecast/models'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getCompareModelsData } from '@/util/dataCalls/forecast/query-comparisons'
import { getFrameReadoutData } from '@/util/dataCalls/forecast/query-readout'
import { getLatLonFromXYandSector } from '@/util/forecast/common-functions'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForecastCompareModelsAnimatorSettings from '../../_animatorSettingPanels/ForecastCompareModelsAnimatorSettings/ForecastCompareModelsAnimatorSettings'
import styles from './ForecastCompareModelsAnimator.module.scss'

const ForecastCompareModelsAnimator: React.FC = () => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const router = useRouter()
	const {
		fcstModel: modelId,
		fcstRun: runId,
		fcstSector: sectorId,
		fcstLevel: levelId,
		fcstProduct: productId,
		fcstCompareValid: validTimeId,
	} = useParams()
	const forecastFrameRate = useRootStore.use.forecastFrameRate()
	const forecastZoomState = useRootStore.use.forecastZoomState()
	const setForecastZoomState = useRootStore.use.setForecastZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const forecastMapFullScreen = useRootStore.use.forecastMapFullScreen()
	const setForecastMapFullScreen = useRootStore.use.setForecastMapFullScreen()
	const forecastLastFrameDwell = useRootStore.use.forecastLastFrameDwell()
	const forecastLastFrameDwellTime = useRootStore.use.forecastLastFrameDwellTime()
	const runFlag = useRootStore.use.runFlag()

	// Sounding picker state
	const forecastSoundingsPickMode = useRootStore.use.forecastSoundingsPickMode()
	const setForecastSoundingsPickMode = useRootStore.use.setForecastSoundingsPickMode()
	const setForecastFrameValidTime = useRootStore.use.setForecastFrameValidTime()

	const [forecastData, setForecastData] = useState([])
	const [forecastModels, setForecastModels] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 800, height: 600 })
	const [currentFrame, setCurrentFrame] = useState(0)

	// Readout state (mirrors ForecastCompareHeightAnimator behavior)
	const [frameReadoutData, setFrameReadoutData] = useState<any>(null)
	const [isLoadingReadoutData, setIsLoadingReadoutData] = useState<boolean>(false)
	const frameDataTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	// Determine if the current active model supports soundings
	const currentActiveModel = useMemo(() => {
		if (!forecastModels.length || currentFrame >= forecastModels.length) return null
		return forecastModels[currentFrame]
	}, [forecastModels, currentFrame])

	const soundingsSupported = useMemo(() => {
		if (!currentActiveModel) return false
		const modelConfig = FORECAST_MODELS[currentActiveModel]
		return modelConfig?.allowForecastSounding === true
	}, [currentActiveModel])

	// Handle frame updates to track current active model
	const handleFrameUpdate = useCallback(
		(frameIndex: number) => {
			setCurrentFrame(frameIndex)
			// Update the frame valid time for sounding picker
			setForecastFrameValidTime(parseInt(validTimeId as string))
		},
		[validTimeId, setForecastFrameValidTime],
	)

	// Sounding clickthrough handler
	const onSoundingsClickthrough = useCallback(
		(event: { xPercent: number; yPercent: number }) => {
			if (!currentActiveModel || !soundingsSupported) return

			const { xPercent, yPercent } = event
			const locationId = getLatLonFromXYandSector(xPercent, yPercent, sectorId as string)
			const baseParams = `/weather-data/forecast-models/${runId}/${currentActiveModel}/${sectorId}/${levelId}/${productId}`
			const soundingParams = `/sounding/${validTimeId}/${locationId}/ml/severe`
			const route = `${baseParams}${soundingParams}`

			// Store current page as referrer for the sounding page
			if (typeof window !== 'undefined') {
				sessionStorage.setItem('forecastSoundingReferrer', window.location.pathname)
			}

			router.push(route)
		},
		[currentActiveModel, soundingsSupported, sectorId, runId, levelId, productId, validTimeId, router],
	)

	const getData = useCallback(async () => {
		console.log('ForecastCompareModelsAnimator: Fetching data', runId, sectorId, levelId, productId, validTimeId, runFlag)
		const data = await getCompareModelsData(runId, sectorId, levelId, productId, validTimeId, runFlag)

		console.log('ForecastCompareModelsAnimator: Data fetched', data)

		const initialFrame = Math.max(0, data.models.indexOf(modelId as string))
		setStartFrame(initialFrame)
		setCurrentFrame(initialFrame)
		setForecastModels(data.models || [])
		setImageInfo(data.imageInfo)
		setForecastData(data.frames)
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, setForecastData, runFlag, setForecastModels])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, runFlag, getData])

	// Update sounding picker mode based on current model support
	useEffect(() => {
		if (!soundingsSupported && forecastSoundingsPickMode) {
			setForecastSoundingsPickMode(false)
		}
	}, [soundingsSupported, forecastSoundingsPickMode, setForecastSoundingsPickMode])

	// Request readout data for the given frame (model). Debounced like main viewer.
	const handleReadoutDataRequest = useCallback(
		async (frameIndex: number) => {
			// Clear any existing timeout
			if (frameDataTimeoutRef.current) {
				clearTimeout(frameDataTimeoutRef.current)
				frameDataTimeoutRef.current = null
			}

			// Reset state
			setFrameReadoutData(null)

			// Validate required params
			if (!(runId && sectorId && levelId && productId && validTimeId)) {
				console.log('Missing required parameters for readout data')
				return
			}

			// Map frame index to the corresponding model
			const modelForFrame = forecastModels?.[frameIndex]
			if (!modelForFrame) {
				console.log('No model found for frame index', frameIndex)
				return
			}

			setIsLoadingReadoutData(true)
			frameDataTimeoutRef.current = setTimeout(async () => {
				try {
					const data = await getFrameReadoutData(
						modelForFrame as string,
						runId as string,
						sectorId as string,
						levelId as string,
						productId as string,
						validTimeId as string,
					)
					const readoutDataObj = { dataTypes: data.dataTypes, readoutData: data.readoutData }
					setFrameReadoutData(readoutDataObj)
				} catch (error) {
					console.error('Error fetching frame readout data:', error)
				} finally {
					setIsLoadingReadoutData(false)
					frameDataTimeoutRef.current = null
				}
			}, 1000)
		},
		[runId, sectorId, levelId, productId, validTimeId, forecastModels],
	)

	return (
		<>
			<div className={styles.forecastAnimatorContainer}>
				<div className={styles.forecastAnimator}>
					<Animator
						frames={forecastData}
						frameLabels={forecastModels}
						startFrame={startFrame}
						imageInfo={imageInfo}
						initialZoomState={forecastZoomState}
						setZoomState={setForecastZoomState}
						zoomFill={globalZoomFill}
						setZoomFill={setGlobalZoomFill}
						fullScreen={forecastMapFullScreen}
						setFullScreen={setForecastMapFullScreen}
						interval={1000 / forecastFrameRate}
						lastFrameDwell={forecastLastFrameDwell}
						lastFrameDwellTime={forecastLastFrameDwellTime * 1000}
						onFrameUpdate={handleFrameUpdate}
						soundingsPicker={true}
						soundingsPickerMode={forecastSoundingsPickMode && soundingsSupported}
						soundingsPickerDisabled={!soundingsSupported}
						setSoundingsPickerMode={(mode: boolean) => {
							// Only allow enabling if current model supports soundings
							if (mode && !soundingsSupported) return
							setForecastSoundingsPickMode(mode)
						}}
						onSoundingsClickthrough={onSoundingsClickthrough}
						enableReadouts={true}
						frameReadoutData={frameReadoutData}
						isLoadingReadoutData={isLoadingReadoutData}
						requestReadoutData={handleReadoutDataRequest}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<ForecastCompareModelsAnimatorSettings />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default ForecastCompareModelsAnimator
