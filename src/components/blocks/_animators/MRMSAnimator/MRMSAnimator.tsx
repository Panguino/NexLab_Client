'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getAnalysisMRMSData } from '@/util/dataCalls/text/query-analysis'
import React, { useCallback, useEffect, useState } from 'react'
import MRMSAnimatorSettings from '../../_animatorSettingPanels/MRMSAnimatorSettings/MRMSAnimatorSettings'
import styles from './MRMSAnimator.module.scss'

interface MRMSAnimatorProps {
	productId: string
}

const MRMSAnimator: React.FC<MRMSAnimatorProps> = ({ productId }) => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const mrmsNumberOfFrames = useRootStore.use.mrmsNumberOfFrames()
	const analysisFrameRate = useRootStore.use.analysisFrameRate()
	const setAnalysisFrameRate = useRootStore.use.setAnalysisFrameRate()
	const analysisZoomState = useRootStore.use.analysisZoomState()
	const setAnalysisZoomState = useRootStore.use.setAnalysisZoomState()
	const globalZoomFill = useRootStore.use.globalZoomFill()
	const setGlobalZoomFill = useRootStore.use.setGlobalZoomFill()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const setAnalysisMapFullScreen = useRootStore.use.setAnalysisMapFullScreen()
	const analysisLastFrameDwell = useRootStore.use.analysisLastFrameDwell()
	const analysisLastFrameDwellTime = useRootStore.use.analysisLastFrameDwellTime()
	const setAnalysisLastFrameDwellTime = useRootStore.use.setAnalysisLastFrameDwellTime()

	const [imageInfo, setImageInfo] = useState({ width: 800, height: 600 })
	const [frames, setFrames] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	const getData = useCallback(async () => {
		const data = await getAnalysisMRMSData(productId, mrmsNumberOfFrames)

		if (data && !data.error && data.files) {
			setFrames(data.files)
			setFrameValidTimes(data.validtimes || [])
			// Start at the last frame (most recent)
			setStartFrame(data.files.length - 1)
			if (data.img) {
				setImageInfo(data.img)
			}
		}
	}, [productId, mrmsNumberOfFrames])

	useEffect(() => {
		getData()
	}, [productId, mrmsNumberOfFrames, getData])

	return (
		<>
			<div className={styles.mrmsAnimatorContainer}>
				<Animator
					frames={frames}
					frameValidTimes={frameValidTimes}
					startFrame={startFrame}
					imageInfo={imageInfo}
					initialZoomState={analysisZoomState}
					setZoomState={setAnalysisZoomState}
					zoomFill={globalZoomFill}
					setZoomFill={setGlobalZoomFill}
					fullScreen={analysisMapFullScreen}
					setFullScreen={setAnalysisMapFullScreen}
					playbackFps={analysisFrameRate}
					setPlaybackFps={setAnalysisFrameRate}
					interval={1000 / analysisFrameRate}
					lastFrameDwell={analysisLastFrameDwell}
					edgeDwellSeconds={analysisLastFrameDwellTime}
					setEdgeDwellSeconds={setAnalysisLastFrameDwellTime}
					lastFrameDwellTime={analysisLastFrameDwellTime * 1000}
					settingsComponent={
						<AnimatorSettings title="MRMS Settings">
							<MRMSAnimatorSettings refreshData={getData} />
						</AnimatorSettings>
					}
				/>
			</div>
		</>
	)
}

export default MRMSAnimator
