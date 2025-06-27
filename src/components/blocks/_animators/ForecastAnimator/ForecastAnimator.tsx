'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { Tab, Tabs } from '@/components/elements/Tabs/Tabs'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { FORECAST_MODELS } from '@/data/forecast/models'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { getForecastData } from '@/util/dataCalls/forecast/query-forecast'
import { getModelRuns } from '@/util/dataCalls/forecast/query-runs'
import { faDownload, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ProductInfo, { ProductInfoProps } from '../../ProductInfo/ProductInfo'
import ForecastAnimatorSettings from '../../_animatorSettingPanels/ForecastAnimatorSettings/ForecastAnimatorSettings'
import styles from './ForecastAnimator.module.scss'

interface ForecastAnimatorProps {
	productInfo: ProductInfoProps
}

interface runsProps {
	unix: number
	readable: string
}

const ForecastAnimator: React.FC<ForecastAnimatorProps> = ({ productInfo }) => {
	const { isMobile } = useIsMobile()
	const router = useRouter()
	const {
		forecastRunId: runId,
		forecastModelId: modelId,
		forecastSectorId: sectorId,
		forecastLevelId: levelId,
		forecastProductId: productId,
	} = useParams()
	const [activeTab, setActiveTab] = useState(-1)
	const forecastFrameRate = useRootStore.use.forecastFrameRate()
	const forecastZoomState = useRootStore.use.forecastZoomState()
	const setForecastZoomState = useRootStore.use.setForecastZoomState()
	const forecastZoomFill = useRootStore.use.forecastZoomFill()
	const setForecastZoomFill = useRootStore.use.setForecastZoomFill()
	const forecastMapFullScreen = useRootStore.use.forecastMapFullScreen()
	const setForecastMapFullScreen = useRootStore.use.setForecastMapFullScreen()
	const forecastLastFrameDwell = useRootStore.use.forecastLastFrameDwell()
	const forecastLastFrameDwellTime = useRootStore.use.forecastLastFrameDwellTime()
	const [ratio, setRatio] = useState(1)
	const [forecastData, setForecastData] = useState([])
	const [forecastRuns, setForecastRuns] = useState<Record<string, runsProps>>({})

	const getData = useCallback(async () => {
		console.log('ForecastAnimator: Fetching data', modelId, runId, sectorId, levelId, productId)
		const data = await getForecastData(modelId, runId, sectorId, levelId, productId)
		const runs = await getModelRuns(modelId)
		setRatio(data.imageInfo.width / data.imageInfo.height)
		setForecastData(data.frames)
		setForecastRuns(runs.runs)
		if (!runs.runs[runId as string]) {
			// If this works then this would be where we'd make a more intelligent choice of run
			// e.g. if runId is properly formatted but not found, we could look for the closest match
			// ex: I don't have a 19Z but I've got an 18Z
			console.log('ForecastAnimator: could not find runId in runs, defaulting to current run')
			const currentRun = Object.keys(runs.runs).at(-1)
			router.push(`/weather-data/forecast-models/${currentRun}/${modelId}/${sectorId}/${levelId}/${productId}`)
		}
	}, [runId, modelId, sectorId, levelId, productId, setRatio, setForecastData, setForecastRuns, router])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, getData])

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

	return (
		<>
			<div className={styles.forecastAnimatorContainer}>
				<div className={styles.forecastAnimator}>
					<Animator
						frames={forecastData}
						startFrame={0}
						runs={transformedRuns}
						runsPerRow={runsPerRow}
						activeRun={runId as string}
						ratio={ratio}
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

export default ForecastAnimator
