'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { FORECAST_TEXT_WPC_FRONT_PRODUCTS } from '@/data/text/forecast/products'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getWPCFrontsData } from '@/util/dataCalls/text/query-forecast'
import React, { useCallback, useEffect, useState } from 'react'
import WPCFrontsAnimatorSettings from '../../_animatorSettingPanels/WPCFrontsAnimatorSettings/WPCFrontsAnimatorSettings'
import styles from './WPCFrontsAnimator.module.scss'

interface WPCFrontsAnimatorProps {
	productId: string
}

const WPCFrontsAnimator: React.FC<WPCFrontsAnimatorProps> = ({ productId }) => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const forecastFrameRate = useRootStore.use.forecastFrameRate()
	const forecastZoomState = useRootStore.use.forecastZoomState()
	const setForecastZoomState = useRootStore.use.setForecastZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const forecastMapFullScreen = useRootStore.use.forecastMapFullScreen()
	const setForecastMapFullScreen = useRootStore.use.setForecastMapFullScreen()
	const forecastLastFrameDwell = useRootStore.use.forecastLastFrameDwell()
	const forecastLastFrameDwellTime = useRootStore.use.forecastLastFrameDwellTime()

	const [imageInfo, setImageInfo] = useState({ width: 800, height: 600 })
	const [frames, setFrames] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	// Get the query ID from the product definition
	const product = FORECAST_TEXT_WPC_FRONT_PRODUCTS[productId]
	const queryId = product?.queryId || productId

	const getData = useCallback(async () => {
		const data = await getWPCFrontsData(queryId)

		if (data && !data.error && data.files) {
			setFrames(data.files)
			setFrameValidTimes(data.validtimes || [])
			// Start at the last frame (most recent)
			setStartFrame(data.files.length - 1)
			if (data.img) {
				setImageInfo(data.img)
			}
		}
	}, [queryId])

	useEffect(() => {
		getData()
	}, [queryId, getData])

	return (
		<>
			<div className={styles.wpcFrontsAnimatorContainer}>
				<Animator
					frames={frames}
					frameValidTimes={frameValidTimes}
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
						<AnimatorSettings title="WPC Fronts Settings">
							<WPCFrontsAnimatorSettings refreshData={getData} />
						</AnimatorSettings>
					}
				/>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default WPCFrontsAnimator
