'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getCompareModelsData } from '@/util/dataCalls/forecast/query-comparisons'
import { getFrameReadoutData } from '@/util/dataCalls/forecast/query-readout'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ForecastCompareModelsAnimatorSettings from '../../_animatorSettingPanels/ForecastCompareModelsAnimatorSettings/ForecastCompareModelsAnimatorSettings'
import styles from './ForecastCompareModelsAnimator.module.scss'

const ForecastCompareModelsAnimator: React.FC = () => {
	const { isMobile } = useIsMobile()
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
	const [forecastData, setForecastData] = useState([])
	const [forecastModels, setForecastModels] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 800, height: 600 })

	// Readout state (mirrors ForecastCompareHeightAnimator behavior)
	const [frameReadoutData, setFrameReadoutData] = useState<any>(null)
	const [isLoadingReadoutData, setIsLoadingReadoutData] = useState<boolean>(false)
	const frameDataTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const getData = useCallback(async () => {
		console.log('ForecastCompareModelsAnimator: Fetching data', runId, sectorId, levelId, productId, validTimeId, runFlag)
		const data = await getCompareModelsData(runId, sectorId, levelId, productId, validTimeId, runFlag)

		console.log('ForecastCompareModelsAnimator: Data fetched', data)

		setStartFrame(data.models.indexOf(modelId as string) || 0)
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
					const data = await getFrameReadoutData(modelForFrame as string, runId as string, sectorId as string, levelId as string, productId as string, validTimeId as string)
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
		[runId, sectorId, levelId, productId, validTimeId, forecastModels]
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
						zoomFill={forecastZoomFill}
						setZoomFill={setForecastZoomFill}
						fullScreen={forecastMapFullScreen}
						setFullScreen={setForecastMapFullScreen}
						interval={1000 / forecastFrameRate}
						lastFrameDwell={forecastLastFrameDwell}
						lastFrameDwellTime={forecastLastFrameDwellTime * 1000}
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
