'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getCompareRunsData } from '@/util/dataCalls/forecast/query-comparisons'
import { getFrameReadoutData } from '@/util/dataCalls/forecast/query-readout'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForecastCompareRunsAnimatorSettings from '../../_animatorSettingPanels/ForecastCompareRunsAnimatorSettings/ForecastCompareRunsAnimatorSettings'
import styles from './ForecastCompareRunsAnimator.module.scss'

const ForecastCompareRunsAnimator: React.FC = () => {
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
	const [forecastData, setForecastData] = useState([])
	const [forecastRuns, setForecastRuns] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })

	// Readout state (mirrors ForecastCompareHeightAnimator behavior)
	const [frameReadoutData, setFrameReadoutData] = useState<any>(null)
	const [isLoadingReadoutData, setIsLoadingReadoutData] = useState<boolean>(false)
	const frameDataTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
		setStartFrame(data.runs.indexOf(runId as string) || 0)
		setForecastRuns(data.runs || [])
		setImageInfo(data.imageInfo)
		setForecastData(data.frames)
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, setForecastData, router])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, getData])


	const formatRunTimeLabel = (ts: string | number, model: string) => {
		// expect YYYYMMDDHH as string or number
		const s = String(ts)
		// simple guard: must be at least 10 chars (YYYYMMDDHH)
		if (s.length < 10) return s
		const mm = s.slice(4, 6)
		const dd = s.slice(6, 8)
		const hh = s.slice(8, 10)
		const manyRunModel = ['HRRR', 'RAP']
		return manyRunModel.includes(model) ? `${hh}Z` : `${mm}/${dd} ${hh}Z`
	}

	const transformedRuns = useMemo(() => {
		return (forecastRuns || []).map((run) => formatRunTimeLabel(run, modelId as string))
	}, [forecastRuns, modelId])

	// Request readout data for the given frame (run). Debounced like main viewer.
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
			if (!(modelId && sectorId && levelId && productId && validTimeId)) {
				console.log('Missing required parameters for readout data')
				return
			}

			// Map frame index to the corresponding run
			const runForFrame = forecastRuns?.[frameIndex]
			if (!runForFrame) {
				console.log('No run found for frame index', frameIndex)
				return
			}

			setIsLoadingReadoutData(true)
			frameDataTimeoutRef.current = setTimeout(async () => {
				try {
					const data = await getFrameReadoutData(modelId as string, runForFrame as string, sectorId as string, levelId as string, productId as string, validTimeId as string)
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
		[modelId, sectorId, levelId, productId, validTimeId, forecastRuns]
	)

	return (
		<>
			<div className={styles.forecastAnimatorContainer}>
				<div className={styles.forecastAnimator}>
					<Animator
						frames={forecastData}
						frameLabels={transformedRuns}
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
						enableReadouts={true}
						frameReadoutData={frameReadoutData}
						isLoadingReadoutData={isLoadingReadoutData}
						requestReadoutData={handleReadoutDataRequest}
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
