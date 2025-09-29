'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useRootStore } from '@/store/useRootStore'
import { getCompareModelsData } from '@/util/dataCalls/forecast/query-comparisons'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import ForecastCompareModelsAnimatorSettings from '../../_animatorSettingPanels/ForecastCompareModelsAnimatorSettings/ForecastCompareModelsAnimatorSettings'
import styles from './ForecastCompareModelsAnimator.module.scss'

const ForecastCompareModelsAnimator: React.FC = () => {
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
	const [forecastData, setForecastData] = useState([])
	const [forecastModels, setForecastModels] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 800, height: 600 })

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
