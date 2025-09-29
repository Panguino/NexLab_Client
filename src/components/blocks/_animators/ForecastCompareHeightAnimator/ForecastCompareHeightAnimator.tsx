'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { FORECAST_LEVELS } from '@/data/forecast/levels'
import { FORECAST_MODELS } from '@/data/forecast/models'
import { useRootStore } from '@/store/useRootStore'
import { getCompareHeightData } from '@/util/dataCalls/forecast/query-comparisons'
import { getFrameReadoutData } from '@/util/dataCalls/forecast/query-readout'
import { getModelRuns } from '@/util/dataCalls/forecast/query-runs'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForecastCompareHeightAnimatorSettings from '../../_animatorSettingPanels/ForecastCompareHeightAnimatorSettings/ForecastCompareHeightAnimatorSettings'
import styles from './ForecastCompareHeightAnimator.module.scss'

interface runsProps {
	unix: number
	readable: string
}

const ForecastCompareHeightAnimator: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()
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
	const [forecastRuns, setForecastRuns] = useState<Record<string, runsProps>>({})
	const [forecastLevels, setForecastLevels] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })

	// Readout state (mirrors main ForecastAnimator behavior)
	const [frameReadoutData, setFrameReadoutData] = useState<any>(null)
	const [isLoadingReadoutData, setIsLoadingReadoutData] = useState<boolean>(false)
	const frameDataTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const getData = useCallback(async () => {
		console.log('ForecastCompareHeightAnimator: Fetching data', modelId, runId, sectorId, productId, validTimeId)
		const data = await getCompareHeightData(modelId, runId, sectorId, productId, validTimeId)
		const runs = await getModelRuns(modelId)

		if (!runs.runs[runId as string]) {
			// If this works then this would be where we'd make a more intelligent choice of run
			// e.g. if runId is properly formatted but not found, we could look for the closest match
			// ex: I don't have a 19Z but I've got an 18Z
			console.log('ForecastCompareHeightAnimator: could not find runId in runs, defaulting to current run')
			const currentRun = Object.keys(runs.runs).at(-1)
			router.push(`/weather-data/forecast-models/${currentRun}/${modelId}/${sectorId}/${levelId}/${productId}/compare-height/${validTimeId}`)
		}
		setStartFrame(data.levels.indexOf(levelId as string) || 0)
		setForecastLevels(data.levels || [])
		setImageInfo(data.imageInfo)
		setForecastData(data.frames)
		setForecastRuns(runs.runs)
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, setForecastData, setForecastRuns, router])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, getData])


	const transformedRuns = Object.entries(forecastRuns).map(([key, value]) => ({
		value: key,
		label: value.readable,
	}))

	const transformedLevels = useMemo(() => {
		return (forecastLevels || []).map((lvl) => (FORECAST_LEVELS as any)[lvl]?.name ?? String(lvl))
	}, [forecastLevels])

	// Use useMemo to derive the runsPerRow value based on modelId
	const runsPerRow = useMemo(() => {
		// Default to 4 if model doesn't exist or doesn't specify runsPerRow
		return FORECAST_MODELS[modelId as string]?.runsPerRow || 4
	}, [modelId])

	const handleRunChange = (newRun) => {
		const currentURL = pathname.split('/')
		currentURL[3] = newRun
		router.push(currentURL.join('/'))
	}

	// Request readout data for the given frame (level). Debounced like main viewer.
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
			if (!(modelId && runId && sectorId && productId && validTimeId)) {
				console.log('Missing required parameters for readout data')
				return
			}

			// Map frame index to the corresponding level
			const levelForFrame = forecastLevels?.[frameIndex]
			if (!levelForFrame) {
				console.log('No level found for frame index', frameIndex)
				return
			}

			setIsLoadingReadoutData(true)
			frameDataTimeoutRef.current = setTimeout(async () => {
				try {
					const data = await getFrameReadoutData(modelId as string, runId as string, sectorId as string, levelForFrame as string, productId as string, validTimeId as string)
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
		[modelId, runId, sectorId, productId, validTimeId, forecastLevels]
	)

	return (
		<>
			<div className={styles.forecastAnimatorContainer}>
				<div className={styles.forecastAnimator}>
					<Animator
						frames={forecastData}
						frameLabels={transformedLevels}
						startFrame={startFrame}
						runs={transformedRuns}
						runsPerRow={runsPerRow}
						activeRun={runId as string}
						setActiveRun={handleRunChange}
						enableReadouts={true}
						frameReadoutData={frameReadoutData}
						isLoadingReadoutData={isLoadingReadoutData}
						requestReadoutData={handleReadoutDataRequest}
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
								<ForecastCompareHeightAnimatorSettings />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default ForecastCompareHeightAnimator
