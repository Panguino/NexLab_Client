'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { FORECAST_MODELS } from '@/data/forecast/models'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getForecastData } from '@/util/dataCalls/forecast/query-forecast'
import { getFrameReadoutData } from '@/util/dataCalls/forecast/query-readout'
import { getModelRuns } from '@/util/dataCalls/forecast/query-runs'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForecastAnimatorSettings from '../../_animatorSettingPanels/ForecastAnimatorSettings/ForecastAnimatorSettings'
import styles from './ForecastAnimator.module.scss'

interface runsProps {
	unix: number
	readable: string
}

const ForecastAnimator: React.FC = () => {
	const { isMobile } = useIsMobile()
	const router = useRouter()
	const pathname = usePathname()
	const { fcstModel: modelId, fcstRun: runId, fcstSector: sectorId, fcstLevel: levelId, fcstProduct: productId } = useParams()
	const setForecastSoundingRunId = useRootStore.use.setForecastSoundingRunId()
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
	const [forecastRuns, setForecastRuns] = useState<Record<string, runsProps>>({})
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const forecastFrameValidTime = useRootStore.use.forecastFrameValidTime()
	const setForecastFrameValidTime = useRootStore.use.setForecastFrameValidTime()
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])
	const [frameReadoutData, setFrameReadoutData] = useState(null)
	const [isLoadingReadoutData, setIsLoadingReadoutData] = useState(false)
	const frameDataTimeoutRef = useRef(null)

	const getData = useCallback(async () => {
		console.log('ForecastAnimator: Fetching data', modelId, runId, sectorId, levelId, productId)
		const data = await getForecastData(modelId, runId, sectorId, levelId, productId)
		const runs = await getModelRuns(modelId)
		const currentFrameValidTime = frameValidTimeRef.current || data.validtimes[0] // Use the current frame valid time or the first valid time if not set
		console.log('ForecastAnimator: valid Time', currentFrameValidTime)

		if (!runs.runs[runId as string]) {
			// If this works then this would be where we'd make a more intelligent choice of run
			// e.g. if runId is properly formatted but not found, we could look for the closest match
			// ex: I don't have a 19Z but I've got an 18Z
			console.log('ForecastAnimator: could not find runId in runs, defaulting to current run')
			const currentRun = Object.keys(runs.runs).at(-1)
			router.push(`/weather-data/forecast-models/${currentRun}/${modelId}/${sectorId}/${levelId}/${productId}`)
		}

		const closestValidTimeIndex = findClosestValidTimeIndex(data.validtimes, currentFrameValidTime)

		setStartFrame(closestValidTimeIndex)
		setImageInfo(data.imageInfo)
		setForecastData(data.frames)
		setForecastRuns(runs.runs)
		setFrameValidTimes(data.validtimes)
	}, [runId, modelId, sectorId, levelId, productId, setForecastData, setForecastRuns, setFrameValidTimes, router])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, getData])

	useEffect(() => {
		frameValidTimeRef.current = forecastFrameValidTime
	}, [forecastFrameValidTime])

	// Add this handler function
	const handleReadoutDataRequest = useCallback(
		(frameIndex) => {
			// Clear any existing timeout
			if (frameDataTimeoutRef.current) {
				clearTimeout(frameDataTimeoutRef.current)
				frameDataTimeoutRef.current = null
			}

			// Reset state
			setFrameReadoutData(null)

			// Only fetch if we have all required parameters
			if (!(modelId && runId && sectorId && levelId && productId)) {
				console.log('Missing required parameters for readout data')
				return
			}

			// Set a timeout to fetch data after 1 seconds
			setIsLoadingReadoutData(true)
			frameDataTimeoutRef.current = setTimeout(async () => {
				try {
					const data = await getFrameReadoutData(modelId, runId, sectorId, levelId, productId, frameIndex)
					const readoutDataObj = { dataTypes: data.dataTypes, readoutData: data.readoutData }
					//console.log('READOUT TIMEOUT - Fetched frame readout data:', readoutDataObj)
					setFrameReadoutData(readoutDataObj)
				} catch (error) {
					console.error('Error fetching frame readout data:', error)
				} finally {
					setIsLoadingReadoutData(false)
					frameDataTimeoutRef.current = null
				}
			}, 1000) // 1-second delay
		},
		[modelId, runId, sectorId, levelId, productId],
	)

	// Add a cleanup effect
	useEffect(() => {
		return () => {
			if (frameDataTimeoutRef.current) {
				clearTimeout(frameDataTimeoutRef.current)
			}
		}
	}, [])

	useEffect(() => {
		setForecastZoomFill(isMobile)
	}, [isMobile, setForecastZoomFill])

	const transformedRuns = Object.entries(forecastRuns).map(([key, value]) => ({
		value: key,
		label: value.readable,
	}))

	// Use useMemo to derive the runsPerRow value based on modelId
	const runsPerRow = useMemo(() => {
		// Default to 4 if model doesn't exist or doesn't specify runsPerRow
		return FORECAST_MODELS[modelId as string]?.runsPerRow || 4
	}, [modelId])

	const handleRunChange = (newRun) => {
		const currentURL = pathname.split('/')
		currentURL[3] = newRun
		setForecastSoundingRunId(newRun) // Update the runId in the store
		router.push(currentURL.join('/'))
	}

	return (
		<>
			<div className={styles.forecastAnimatorContainer}>
				<div className={styles.forecastAnimator}>
					<Animator
						frames={forecastData}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setForecastFrameValidTime}
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
						zoomFill={forecastZoomFill}
						setZoomFill={setForecastZoomFill}
						fullScreen={forecastMapFullScreen}
						setFullScreen={setForecastMapFullScreen}
						interval={1000 / forecastFrameRate}
						lastFrameDwell={forecastLastFrameDwell}
						lastFrameDwellTime={forecastLastFrameDwellTime * 1000}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<ForecastAnimatorSettings refreshData={getData} />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default ForecastAnimator
