'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getCompareRunsData } from '@/util/dataCalls/forecast/query-comparisons'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import ForecastCompareRunsAnimatorSettings from '../../_animatorSettingPanels/ForecastCompareRunsAnimatorSettings/ForecastCompareRunsAnimatorSettings'
import styles from './ForecastCompareRunsAnimator.module.scss'

const ForecastCompareRunsAnimator: React.FC = () => {
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
	const [forecastData, setForecastData] = useState([])
	const [forecastRuns, setForecastRuns] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })

	const getData = useCallback(async () => {
		console.log('ForecastCompareRunsAnimator: Fetching data', modelId, sectorId, levelId, productId, validTimeId)
		const data = await getCompareRunsData(modelId, sectorId, levelId, productId, validTimeId)
		// const runs = await getModelRuns(modelId)

		if (!data.runs.includes(runId as string)) {
			// If this works then this would be where we'd make a more intelligent choice of run
			// e.g. if runId is properly formatted but not found, we could look for the closest match
			// ex: I don't have a 19Z but I've got an 18Z
			console.log('ForecastCompareRunsAnimator: could not find runId in runs, defaulting to current run')
			const currentRun = data.runs[data.runs.length - 1]
			router.push(`/weather-data/forecast-models/${currentRun}/${modelId}/${sectorId}/${levelId}/${productId}/compare-runs/${validTimeId}`)
		}
		console.log('setStartFrame index:', data.runs.indexOf(runId as string), data.runs, runId)
		setStartFrame(data.runs.indexOf(runId as string) || 0)
		setForecastRuns(data.runs || [])
		setImageInfo(data.imageInfo)
		setForecastData(data.frames)
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, setForecastData, router])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, getData])

	useEffect(() => {
		setForecastZoomFill(isMobile)
	}, [isMobile, setForecastZoomFill])

	return (
		<>
			<div className={styles.forecastAnimatorContainer}>
				<div className={styles.forecastAnimator}>
					<Animator
						frames={forecastData}
						frameLabels={forecastRuns}
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
						settingsComponent={
							<AnimatorSettings title="Settings">
								<ForecastCompareRunsAnimatorSettings />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default ForecastCompareRunsAnimator
