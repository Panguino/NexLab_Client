'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { FORECAST_MODELS } from '@/data/forecast/models'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getSoundingData, getSoundingRuns } from '@/util/dataCalls/forecast/query-sounding'
import { fetchStationCoordinates, forecastHourFromUnixValidtime } from '@/util/forecast/common-functions'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
	// data prep
	const locationId = tempLocId ? decodeURIComponent(tempLocId as string) : null // removes encoding from URL, specifically commas
	const isStationId = locationId?.length === 4 && !locationId?.includes(',')
	const [forecastSoundingData, setForecastSoundingData] = useState([])
	const [forecastRuns, setForecastRuns] = useState<Record<string, runsProps>>({})
	const setForecastSoundingRunId = useRootStore.use.setForecastSoundingRunId()
	const [startFrame, setStartFrame] = useState(0)
	const [imageInfo, setImageInfo] = useState({ width: 1180, height: 783 })
	const setForecastFrameValidTime = useRootStore.use.setForecastFrameValidTime()
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])
	const [placeholderImage, setPlaceholderImage] = useState(null)

	const getData = useCallback(async () => {
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

		const runs = await getSoundingRuns(modelId)

		if (!runs.runs[runId as string]) {
			// If this works then this would be where we'd make a more intelligent choice of run
			// e.g. if runId is properly formatted but not found, we could look for the closest match
			// ex: I don't have a 19Z but I've got an 18Z
			const currentRun = Object.keys(runs.runs).at(-1)
			const baseParmString = `${currentRun}/${modelId}/${sectorId}/${levelId}/${productId}`
			const soundingParmString = `${validTimeId}/${sanitizedLocationId}/${parcelId}/${weatherId}`
			router.push(`/weather-data/forecast-models/${baseParmString}/sounding/${soundingParmString}`)
		}
		const unixRun = runs.runs[runId as string]?.unix
		const typeSafeValidTimeId = parseInt(validTimeId as string)
		const paddedForecastHour = forecastHourFromUnixValidtime(unixRun, typeSafeValidTimeId) // this is kind of a bandaid solution, see get snd fn for details
		const data = await getSoundingData(modelId, runId, sectorId, levelId, productId, paddedForecastHour, sanitizedLocationId, parcelId, weatherId)
		const sanitizedValidTimeId = data.validtimes.indexOf(typeSafeValidTimeId) !== -1 ? typeSafeValidTimeId : data.validtimes[0] // Fallback to first valid time if not found
		const closestValidTimeIndex = findClosestValidTimeIndex(data.validtimes, sanitizedValidTimeId)

		setStartFrame(closestValidTimeIndex)
		setImageInfo(data.imageInfo)
		setForecastSoundingData(data.frames)
		setForecastRuns(runs.runs)
		setFrameValidTimes(data.validtimes)
		setPlaceholderImage(data.placeholderImage)
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
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, locationId, parcelId, weatherId, getData])

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
		setForecastSoundingRunId(newRun) // Update the runId in the store
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
						scrubberPlaceholderImageUrl={placeholderImage}
						scrubberFrameLoadStates={forecastSoundingData.map((frame) => frame !== placeholderImage)}
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
