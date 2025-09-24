'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { FORECAST_MODELS } from '@/data/forecast/models'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getCompareModelsData } from '@/util/dataCalls/forecast/query-comparisons'
import { getLatLonFromXYandSector } from '@/util/forecast/common-functions'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForecastCompareModelsAnimatorSettings from '../../_animatorSettingPanels/ForecastCompareModelsAnimatorSettings/ForecastCompareModelsAnimatorSettings'
import styles from './ForecastCompareModelsAnimator.module.scss'

const ForecastCompareModelsAnimator: React.FC = () => {
	const { isMobile } = useIsMobile()
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
	const forecastZoomFill = useRootStore.use.forecastZoomFill()
	const setForecastZoomFill = useRootStore.use.setForecastZoomFill()
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

	// Determine if the current active model supports soundings
	const currentActiveModel = useMemo(() => {
		if (!forecastModels.length || currentFrame >= forecastModels.length) return null
		return forecastModels[currentFrame]
	}, [forecastModels, currentFrame])

	const soundingsSupported = useMemo(() => {
		if (!currentActiveModel) return false
		return FORECAST_MODELS[currentActiveModel]?.allowForecastSounding === true
	}, [currentActiveModel])

	// Handle frame updates to track current active model
	const handleFrameUpdate = useCallback((frameIndex: number) => {
		setCurrentFrame(frameIndex)
		// Update the frame valid time for sounding picker
		setForecastFrameValidTime(parseInt(validTimeId as string))
	}, [validTimeId, setForecastFrameValidTime])

	// Sounding clickthrough handler
	const onSoundingsClickthrough = useCallback(({ xPercent, yPercent }) => {
		if (!currentActiveModel || !soundingsSupported) return

		const locationId = getLatLonFromXYandSector(xPercent, yPercent, sectorId as string)
		const baseParams = `/weather-data/forecast-models/${runId}/${currentActiveModel}/${sectorId}/${levelId}/${productId}`
		const soundingParams = `/sounding/${validTimeId}/${locationId}/ml/severe`
		const route = `${baseParams}${soundingParams}`
		router.push(route)
	}, [currentActiveModel, soundingsSupported, sectorId, runId, levelId, productId, validTimeId, router])

	const getData = useCallback(async () => {
		console.log('ForecastCompareModelsAnimator: Fetching data', runId, sectorId, levelId, productId, validTimeId, runFlag)
		const data = await getCompareModelsData(runId, sectorId, levelId, productId, validTimeId, runFlag)

		console.log('ForecastCompareModelsAnimator: Data fetched', data)

		const initialFrame = data.models.indexOf(modelId as string) || 0
		setStartFrame(initialFrame)
		setCurrentFrame(initialFrame)
		setForecastModels(data.models || [])
		setImageInfo(data.imageInfo)
		setForecastData(data.frames)
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, setForecastData, runFlag, setForecastModels])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, runFlag, getData])

	useEffect(() => {
		setForecastZoomFill(isMobile)
	}, [isMobile, setForecastZoomFill])

	// Update sounding picker mode based on current model support
	useEffect(() => {
		if (!soundingsSupported && forecastSoundingsPickMode) {
			setForecastSoundingsPickMode(false)
		}
	}, [soundingsSupported, forecastSoundingsPickMode, setForecastSoundingsPickMode])

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
						zoomFill={forecastZoomFill}
						setZoomFill={setForecastZoomFill}
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
