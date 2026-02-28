'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { FORECAST_MODELS } from '@/data/forecast/models'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getForecastData } from '@/util/dataCalls/forecast/query-forecast'
import { getFrameReadoutData } from '@/util/dataCalls/forecast/query-readout'
import { getModelRuns } from '@/util/dataCalls/forecast/query-runs'
import { getLatLonFromXYandSector } from '@/util/forecast/common-functions'
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
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const router = useRouter()
	const pathname = usePathname()
	const { fcstModel: modelId, fcstRun: runId, fcstSector: sectorId, fcstLevel: levelId, fcstProduct: productId } = useParams()
	const setForecastSoundingRunId = useRootStore.use.setForecastSoundingRunId()
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
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const forecastFrameValidTime = useRootStore.use.forecastFrameValidTime()
	const setForecastFrameValidTime = useRootStore.use.setForecastFrameValidTime()
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])
	const [frameReadoutData, setFrameReadoutData] = useState(null)
	const [isLoadingReadoutData, setIsLoadingReadoutData] = useState(false)
	const frameDataTimeoutRef = useRef(null)

	const forecastSoundingsPickMode = useRootStore.use.forecastSoundingsPickMode()
	const setForecastSoundingsPickMode = useRootStore.use.setForecastSoundingsPickMode()

	const getData = useCallback(async () => {
		console.log('ForecastAnimator: Fetching data', modelId, runId, sectorId, levelId, productId)
		const data = await getForecastData(modelId, runId, sectorId, levelId, productId)
		const runs = await getModelRuns(modelId)
		const currentFrameValidTime = frameValidTimeRef.current || data.validtimes[0] // Use the current frame valid time or the first valid time if not set

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

	const onSoundingsClickthrough = ({ xPercent, yPercent }) => {
		// console.log('🎯 [ForecastAnimator] onSoundingsClickthrough called')
		// console.log('  📍 Input percentages:', { xPercent, yPercent })
		// console.log('  🗺️  Sector:', sectorId)

		const locationId = getLatLonFromXYandSector(xPercent, yPercent, sectorId as string)
		// console.log('  📌 Calculated locationId:', locationId)

		const baseParams = `/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${levelId}/${productId}`
		const soundingParams = `/sounding/${frameValidTimeRef.current}/${locationId}/ml/severe`
		const route = `${baseParams}${soundingParams}`
		// console.log('  🔗 Full route:', route)

		// Store current page as referrer for the sounding page
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('forecastSoundingReferrer', window.location.pathname)
		}

		router.push(route)
		setForecastSoundingsPickMode(false) // Deactivate soundings picker mode after navigation
	}

	// Add this handler function
	const handleReadoutDataRequest = useCallback(() => {
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
				const data = await getFrameReadoutData(modelId, runId, sectorId, levelId, productId, forecastFrameValidTime)
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
	}, [modelId, runId, sectorId, levelId, productId, forecastFrameValidTime])

	// Add a cleanup effect
	useEffect(() => {
		return () => {
			if (frameDataTimeoutRef.current) {
				clearTimeout(frameDataTimeoutRef.current)
			}
		}
	}, [])

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
						zoomFill={globalZoomFill}
						setZoomFill={setGlobalZoomFill}
						fullScreen={forecastMapFullScreen}
						setFullScreen={setForecastMapFullScreen}
						interval={1000 / forecastFrameRate}
						lastFrameDwell={forecastLastFrameDwell}
						lastFrameDwellTime={forecastLastFrameDwellTime * 1000}
						soundingsPicker={true}
						soundingsPickerMode={forecastSoundingsPickMode}
						setSoundingsPickerMode={setForecastSoundingsPickMode}
						onSoundingsClickthrough={onSoundingsClickthrough}
						sectorId={sectorId as string}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<ForecastAnimatorSettings refreshData={getData} />
							</AnimatorSettings>
						}
					/>
				</div>
			</div>
		</>
	)
}

export default ForecastAnimator
