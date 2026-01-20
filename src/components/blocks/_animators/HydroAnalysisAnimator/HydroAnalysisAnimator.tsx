'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { HYDRO_FFG_PRODUCTS, HYDRO_TEXT_MRMS_QPE_PRODUCTS, HYDRO_TEXT_QPF_PRODUCTS } from '@/data/text/hydrological/products'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getHydroFFGData, getHydroMRMSData, getHydroQPFData } from '@/util/dataCalls/text/query-hydrological'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import HydroAnalysisAnimatorSettings from '../../_animatorSettingPanels/HydroAnalysisAnimatorSettings/HydroAnalysisAnimatorSettings'
import styles from './HydroAnalysisAnimator.module.scss'

interface HydroAnalysisAnimatorProps {
	productId: string
}

type ProductType = 'qpf' | 'mrms' | 'ffg'

const HydroAnalysisAnimator: React.FC<HydroAnalysisAnimatorProps> = ({ productId }) => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const mrmsNumberOfFrames = useRootStore.use.mrmsNumberOfFrames()
	const analysisFrameRate = useRootStore.use.analysisFrameRate()
	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const setAnalysisMapFullScreen = useRootStore.use.setAnalysisMapFullScreen()
	const analysisLastFrameDwell = useRootStore.use.analysisLastFrameDwell()
	const analysisLastFrameDwellTime = useRootStore.use.analysisLastFrameDwellTime()

	const [imageInfo, setImageInfo] = useState({ width: 800, height: 500 })
	const [frames, setFrames] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)

	// Determine product type
	const productType: ProductType = useMemo(() => {
		if (HYDRO_TEXT_QPF_PRODUCTS[productId]) return 'qpf'
		if (HYDRO_TEXT_MRMS_QPE_PRODUCTS[productId]) return 'mrms'
		if (HYDRO_FFG_PRODUCTS[productId]) return 'ffg'
		return 'qpf' // default
	}, [productId])

	// Get product label
	const productLabel = useMemo(() => {
		if (productType === 'qpf') {
			return HYDRO_TEXT_QPF_PRODUCTS[productId]?.label || 'QPF'
		}
		if (productType === 'mrms') {
			return HYDRO_TEXT_MRMS_QPE_PRODUCTS[productId]?.label || 'MRMS'
		}
		if (productType === 'ffg') {
			return HYDRO_FFG_PRODUCTS[productId]?.label || 'FFG'
		}
		return 'Analysis'
	}, [productId, productType])

	// Get page title
	const pageTitle = useMemo(() => {
		if (productType === 'qpf') return `WPC QPF - ${productLabel}`
		if (productType === 'mrms') return `MRMS QPE - ${productLabel}`
		if (productType === 'ffg') return `Flash Flood Guidance - ${productLabel}`
		return 'Analysis'
	}, [productType, productLabel])

	const getData = useCallback(async () => {
		let data: { error?: boolean; files?: string[]; img?: { width: number; height: number } } | false = false

		if (productType === 'qpf') {
			data = await getHydroQPFData(productId, mrmsNumberOfFrames)
		} else if (productType === 'mrms') {
			data = await getHydroMRMSData(productId, mrmsNumberOfFrames)
		} else if (productType === 'ffg') {
			data = await getHydroFFGData(productId, mrmsNumberOfFrames)
		}

		if (data && !data.error && data.files) {
			setFrames(data.files)
			// Start at the last frame (most recent)
			setStartFrame(data.files.length - 1)
			if (data.img) {
				setImageInfo(data.img)
			}
		}
	}, [productId, productType, mrmsNumberOfFrames])

	useEffect(() => {
		getData()
	}, [productId, mrmsNumberOfFrames, getData])

	return (
		<>
			<div className={styles.hydroAnalysisAnimatorContainer}>
				<Animator
					frames={frames}
					startFrame={startFrame}
					imageInfo={imageInfo}
					initialZoomState={analysisZoomState}
					setZoomState={setAnalysisZoomState}
					zoomFill={globalZoomFill}
					setZoomFill={setGlobalZoomFill}
					fullScreen={analysisMapFullScreen}
					setFullScreen={setAnalysisMapFullScreen}
					interval={1000 / analysisFrameRate}
					lastFrameDwell={analysisLastFrameDwell}
					lastFrameDwellTime={analysisLastFrameDwellTime * 1000}
					settingsComponent={
						<AnimatorSettings title={`${pageTitle} Settings`}>
							<HydroAnalysisAnimatorSettings refreshData={getData} />
						</AnimatorSettings>
					}
				/>
			</div>
			<MobileIconNav tab />
		</>
	)
}

export default HydroAnalysisAnimator
