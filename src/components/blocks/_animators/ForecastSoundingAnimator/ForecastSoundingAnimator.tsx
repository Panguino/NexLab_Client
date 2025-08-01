'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { FORECAST_MODELS } from '@/data/forecast/models'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getSoundingData, getSoundingRuns } from '@/util/dataCalls/forecast/query-sounding'
import { fetchStationCoordinates } from '@/util/forecast/common-functions'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import ForecastSoundingAnimatorSettings from '../../_animatorSettingPanels/ForecastSoundingAnimatorSettings/ForecastSoundingAnimatorSettings'
import styles from './ForecastSoundingAnimator.module.scss'

interface ForecastSoundingAnimatorProps {
	productInfo: ProductInfoProps
}

interface runsProps {
	unix: number
	readable: string
}

const ForecastSoundingAnimator: React.FC<ForecastSoundingAnimatorProps> = ({ productInfo }) => {
	// This first pass of the sounding animator should be unable to modify run and valid time
	// simply display what you can retrieve from the API with the current URL params
	// we have 2 problems to solve:
	// 1. how to change run and valid time without routing but also communicating those changes to the sidebar
	// 2. displaying an animator that has empty frames if the data is not available for the valid time
	const { isMobile } = useIsMobile()
	const router = useRouter()
	const pathname = usePathname()
	const {
		fcstModel: modelId,
		fcstRun: runId,
		fcstSector: sectorId,
		fcstLevel: levelId,
		fcstProduct: productId,
		fcstSndValid: validTimeId,
		fcstSndLoc: tempLocId,
		fcstSndParcel: parcelId,
		fcstSndWeather: weatherId,
	} = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const forecastSoundingFrameRate = useRootStore.use.forecastSoundingFrameRate()
	const forecastSoundingZoomState = useRootStore.use.forecastSoundingZoomState()
	const setForecastSoundingZoomState = useRootStore.use.setForecastSoundingZoomState()
	const forecastSoundingZoomFill = useRootStore.use.forecastSoundingZoomFill()
	const setForecastSoundingZoomFill = useRootStore.use.setForecastSoundingZoomFill()
	const forecastSoundingMapFullScreen = useRootStore.use.forecastSoundingMapFullScreen()
	const setForecastSoundingMapFullScreen = useRootStore.use.setForecastSoundingMapFullScreen()
	const forecastSoundingLastFrameDwell = useRootStore.use.forecastSoundingLastFrameDwell()
	const forecastSoundingLastFrameDwellTime = useRootStore.use.forecastSoundingLastFrameDwellTime()
	const forecastFrameValidTime = useRootStore.use.forecastFrameValidTime()
	const setForecastFrameValidTime = useRootStore.use.setForecastFrameValidTime() // sounding location prep
	// location prep
	const locationId = tempLocId ? decodeURIComponent(tempLocId as string) : null // removes encoding from URL, specifically commas
	const isStationId = locationId?.length === 4 && !locationId?.includes(',')
	const [forecastSoundingData, setForecastSoundingData] = useState([])
	const [forecastRuns, setForecastRuns] = useState<Record<string, runsProps>>({})
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 500, height: 500 })
	const frameValidTimeRef = useRef<number | null>(null)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	const getData = useCallback(async () => {
		console.log(
			'ForecastSoundingAnimator: Fetching data',
			modelId,
			runId,
			sectorId,
			levelId,
			productId,
			validTimeId,
			locationId,
			parcelId,
			weatherId,
		)
		// Location need special handling as it can accept either station ID or lat,lon format
		let sanitizedLocationId = locationId
		if (isStationId) {
			sanitizedLocationId = await fetchStationCoordinates(locationId)
		} else if (locationId && locationId.includes(',') && locationId.split(',').length === 2) {
			const [lat, lon] = locationId.split(',')
			if (parseFloat(lat) < -90 || parseFloat(lat) > 90 || parseFloat(lon) < -180 || parseFloat(lon) > 180) {
				sanitizedLocationId = '0,0' // Default to 0,0 if coordinates are invalid
			}
		}

		const data = await getSoundingData(modelId, runId, sectorId, levelId, productId, validTimeId, sanitizedLocationId, parcelId, weatherId)
		const runs = await getSoundingRuns(modelId)
		const currentFrameValidTime = frameValidTimeRef.current || data.validtimes[0] // Use the current frame valid time or the first valid time if not set

		console.log('ForecastSoundingAnimator: Data fetched', data)

		if (!runs.runs[runId as string]) {
			// If this works then this would be where we'd make a more intelligent choice of run
			// e.g. if runId is properly formatted but not found, we could look for the closest match
			// ex: I don't have a 19Z but I've got an 18Z
			console.log('ForecastSoundingAnimator: could not find runId in runs, defaulting to current run')
			const currentRun = Object.keys(runs.runs).at(-1)
			const baseParmString = `${currentRun}/${modelId}/${sectorId}/${levelId}/${productId}`
			const soundingParmString = `${validTimeId}/${sanitizedLocationId}/${parcelId}/${weatherId}`
			router.push(`/weather-data/forecast-models/${baseParmString}/sounding/${soundingParmString}`)
		}

		const closestValidTimeIndex = findClosestValidTimeIndex(data.validtimes, currentFrameValidTime)

		setStartFrame(closestValidTimeIndex)
		setImageInfo(data.imageInfo)
		setForecastSoundingData(data.frames)
		setForecastRuns(runs.runs)
		setFrameValidTimes(data.validtimes)
	}, [
		runId,
		modelId,
		sectorId,
		levelId,
		productId,
		validTimeId,
		locationId,
		parcelId,
		weatherId,
		isStationId,
		setForecastSoundingData,
		setForecastRuns,
		setFrameValidTimes,
		router,
	])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, getData])

	useEffect(() => {
		frameValidTimeRef.current = forecastFrameValidTime
	}, [forecastFrameValidTime])

	useEffect(() => {
		setForecastSoundingZoomFill(isMobile)
	}, [isMobile, setForecastSoundingZoomFill])

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
		// find a way to change the runId in the URL without reloading the page
		const currentURL = pathname.split('/')
		currentURL[3] = newRun
		router.push(currentURL.join('/'))
	}

	return (
		<>
			<div className={styles.forecastSoundingAnimatorContainer}>
				<div className={styles.forecastSoundingAnimator}>
					<Animator
						frames={forecastSoundingData}
						frameValidTimes={frameValidTimes}
						setFrameValidTime={setForecastFrameValidTime}
						startFrame={startFrame}
						runs={transformedRuns}
						runsPerRow={runsPerRow}
						activeRun={runId as string}
						setActiveRun={handleRunChange}
						imageInfo={imageInfo}
						initialZoomState={forecastSoundingZoomState}
						setZoomState={setForecastSoundingZoomState}
						zoomFill={forecastSoundingZoomFill}
						setZoomFill={setForecastSoundingZoomFill}
						fullScreen={forecastSoundingMapFullScreen}
						setFullScreen={setForecastSoundingMapFullScreen}
						interval={1000 / forecastSoundingFrameRate}
						lastFrameDwell={forecastSoundingLastFrameDwell}
						lastFrameDwellTime={forecastSoundingLastFrameDwellTime * 1000}
						settingsComponent={
							<AnimatorSettings title="Settings">
								<ForecastSoundingAnimatorSettings />
							</AnimatorSettings>
						}
					/>
				</div>
				<Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
					<Tab label="Product Info" icon={<FontAwesomeIcon icon={faInfoCircle} />}>
						<ProductInfo {...productInfo} />
					</Tab>
					<Tab label="Alerts" icon={<FontAwesomeIcon icon={faWarning} />}>
						Alerts TODO
					</Tab>
					<Tab label="Download" icon={<FontAwesomeIcon icon={faDownload} />}>
						Download / Save Gif TODO
					</Tab>
				</Tabs>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default ForecastSoundingAnimator
