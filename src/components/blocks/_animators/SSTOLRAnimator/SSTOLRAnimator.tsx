'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { CLIMATE_SSTOLR_PRODUCTS } from '@/data/text/climate/products'
import { CLIMATE_TEXT_SSTOLR_SECTORS } from '@/data/text/climate/sectors'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getClimateSSTOLRData } from '@/util/dataCalls/text/query-climate'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import SSTOLRAnimatorSettings from '../../_animatorSettingPanels/SSTOLRAnimatorSettings/SSTOLRAnimatorSettings'
import styles from './SSTOLRAnimator.module.scss'

interface SSTOLRAnimatorProps {
	productId: string
	sectorId: string
}

const SSTOLRAnimator: React.FC<SSTOLRAnimatorProps> = ({ productId, sectorId }) => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const climateSSTOLRNumberOfFrames = useRootStore.use.climateSSTOLRNumberOfFrames()
	const climateSSTOLRFrameRate = useRootStore.use.climateSSTOLRFrameRate()
	const climateSSTOLRZoomState = useRootStore.use.climateSSTOLRZoomState()
	const setClimateSSTOLRZoomState = useRootStore.use.setClimateSSTOLRZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const climateSSTOLRMapFullScreen = useRootStore.use.climateSSTOLRMapFullScreen()
	const setClimateSSTOLRMapFullScreen = useRootStore.use.setClimateSSTOLRMapFullScreen()
	const climateSSTOLRLastFrameDwell = useRootStore.use.climateSSTOLRLastFrameDwell()
	const climateSSTOLRLastFrameDwellTime = useRootStore.use.climateSSTOLRLastFrameDwellTime()

	const [imageInfo, setImageInfo] = useState({ width: 800, height: 600 })
	const [frames, setFrames] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	// Get product and sector labels for display
	const productLabel = useMemo(() => {
		const product = CLIMATE_SSTOLR_PRODUCTS.find((p) => p.id === productId)
		return product?.name || productId
	}, [productId])

	const sectorLabel = useMemo(() => {
		const sector = CLIMATE_TEXT_SSTOLR_SECTORS.find((s) => s.id === sectorId)
		return sector?.name || sectorId
	}, [sectorId])

	const getData = useCallback(async () => {
		const data = await getClimateSSTOLRData(productId, sectorId, climateSSTOLRNumberOfFrames)

		if (data && !data.error && data.files) {
			setFrames(data.files)
			setFrameValidTimes(data.validtimes || [])
			// Start at the last frame (most recent)
			setStartFrame(data.files.length - 1)
			if (data.img) {
				setImageInfo(data.img)
			}
		}
	}, [productId, sectorId, climateSSTOLRNumberOfFrames])

	useEffect(() => {
		getData()
	}, [productId, sectorId, climateSSTOLRNumberOfFrames, getData])

	return (
		<>
			<div className={styles.sstolrAnimatorContainer}>
				<Animator
					frames={frames}
					frameValidTimes={frameValidTimes}
					startFrame={startFrame}
					imageInfo={imageInfo}
					initialZoomState={climateSSTOLRZoomState}
					setZoomState={setClimateSSTOLRZoomState}
					zoomFill={globalZoomFill}
					setZoomFill={setGlobalZoomFill}
					fullScreen={climateSSTOLRMapFullScreen}
					setFullScreen={setClimateSSTOLRMapFullScreen}
					interval={1000 / climateSSTOLRFrameRate}
					lastFrameDwell={climateSSTOLRLastFrameDwell}
					lastFrameDwellTime={climateSSTOLRLastFrameDwellTime * 1000}
					settingsComponent={
						<AnimatorSettings title={`${productLabel} - ${sectorLabel}`}>
							<SSTOLRAnimatorSettings />
						</AnimatorSettings>
					}
				/>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default SSTOLRAnimator
