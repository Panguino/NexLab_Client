'use client'

import WeatherBalloonIcon from '@/components/icons/WeatherBalloonIcon'
import {
	faCompress,
	faDownLeftAndUpRightToCenter,
	faExpand,
	faFilePdf,
	faLayerGroup,
	faSearchMinus,
	faSearchPlus,
	faUndo,
	faUpRightAndDownLeftFromCenter,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useAnimator } from '../Animator'
import { OverlayPanel } from '../OverlayPanel/OverylayPanel'
import styles from './ViewControls.module.scss'

interface IViewControlsProps {
	// Image mode props
	zoomIn?: () => void
	zoomOut?: () => void
	resetTransform?: () => void
	// Map mode props
	mapZoom?: number
	// Shared props
	mode?: 'image' | 'map'
}

/**
 * ViewControls Component
 *
 * Unified controls component for both image and map modes.
 * Provides:
 * - Zoom in/out buttons (both modes)
 * - Reset view button (both modes)
 * - Fill/expand toggle (both modes)
 * - Fullscreen toggle (both modes)
 * - Overlay panel (image mode)
 * - Soundings picker (image mode)
 * - PDF button (image mode)
 */
const ViewControls = ({ zoomIn, zoomOut, resetTransform, mapZoom = 3, mode = 'image' }: IViewControlsProps) => {
	const {
		setZoomFill,
		zoomFill,
		setFullScreen,
		fullScreen,
		overlays,
		activeOverlays,
		setActiveOverlays,
		soundingsPickerMode,
		setSoundingsPickerMode,
		soundingsPicker,
		soundingsPickerDisabled,
		pdfs,
		pdfButtonClick,
		currentFrame,
	} = useAnimator()

	const [overlayPanelOpen, setOverlayPanelOpen] = useState(false)

	// Debug logging
	const DEBUG = false
	const log = (message: string, data?: any) => {
		if (DEBUG) {
			console.log(`[ViewControls] ${message}`, data || '')
		}
	}

	const expandToggle = () => {
		setZoomFill(!zoomFill)
	}

	const fullScreenToggle = () => {
		setFullScreen(!fullScreen)
	}

	const handlePdfButtonClick = () => {
		if (pdfs && pdfs.length > 0 && currentFrame < pdfs.length) {
			const pdfUrl = pdfs[currentFrame]
			if (pdfUrl) {
				pdfButtonClick?.(pdfUrl)
			}
		}
	}

	return (
		<div className={`${styles.viewControls} ${styles[mode]}`}>
			{/* Overlay Panel (Image Mode Only) */}
			{mode === 'image' && overlays && (
				<button onClick={() => setOverlayPanelOpen(true)} className={styles.controlButton}>
					<FontAwesomeIcon icon={faLayerGroup} />
					<OverlayPanel
						activeOverlays={activeOverlays}
						setActiveOverlays={setActiveOverlays}
						overlays={overlays}
						onClose={() => setOverlayPanelOpen(false)}
						open={overlayPanelOpen}
					/>
				</button>
			)}

			{/* Zoom Controls Container */}
			<div className={styles.zoomControlsGroup}>
				{/* Zoom In Button */}
				<button
					onClick={() => {
						log(`Zoom In button clicked (mode: ${mode})`, { zoomInExists: !!zoomIn })
						zoomIn?.()
					}}
					className={styles.controlButton}
					title="Zoom In"
					aria-label="Zoom In"
				>
					<FontAwesomeIcon icon={faSearchPlus} />
				</button>

				{/* Zoom Out Button */}
				<button
					onClick={() => {
						log(`Zoom Out button clicked (mode: ${mode})`, { zoomOutExists: !!zoomOut })
						zoomOut?.()
					}}
					className={styles.controlButton}
					title="Zoom Out"
					aria-label="Zoom Out"
				>
					<FontAwesomeIcon icon={faSearchMinus} />
				</button>

				{/* Reset View Button */}
				<button
					onClick={() => {
						log(`Reset View button clicked (mode: ${mode})`, { resetTransformExists: !!resetTransform })
						resetTransform?.()
					}}
					className={styles.controlButton}
					title="Reset View"
					aria-label="Reset View"
				>
					<FontAwesomeIcon icon={faUndo} />
				</button>

				{/* Zoom Level Display (Map Mode Only) */}
				{mode === 'map' && (
					<div className={styles.zoomLevel}>
						{(() => {
							log('Rendering zoom level display', { mapZoom })
							return mapZoom.toFixed(1)
						})()}
					</div>
				)}
			</div>

			{/* Fill/Expand Toggle */}
			{setZoomFill && (
				<button onClick={() => expandToggle()} className={styles.controlButton} title={zoomFill ? 'Fit to container' : 'Fill container'}>
					<FontAwesomeIcon icon={zoomFill ? faCompress : faExpand} />
				</button>
			)}

			{/* Fullscreen Toggle */}
			{setFullScreen && (
				<button
					onClick={() => fullScreenToggle()}
					className={styles.controlButton}
					title={fullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
				>
					<FontAwesomeIcon icon={fullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} />
				</button>
			)}

			{/* Soundings Picker (Image Mode Only) */}
			{mode === 'image' && soundingsPicker && (
				<button
					onClick={() => !soundingsPickerDisabled && setSoundingsPickerMode(!soundingsPickerMode)}
					className={`${styles.controlButton} ${soundingsPickerDisabled ? styles.disabled : ''}`}
					disabled={soundingsPickerDisabled}
					title={soundingsPickerDisabled ? 'Soundings not supported for current model' : 'Toggle sounding picker'}
				>
					<WeatherBalloonIcon className={soundingsPickerMode && !soundingsPickerDisabled ? styles.active : ''} />
				</button>
			)}

			{/* PDF Button (Image Mode Only) */}
			{mode === 'image' && pdfs && pdfs.length > 0 && (
				<button onClick={handlePdfButtonClick} className={styles.controlButton}>
					<FontAwesomeIcon icon={faFilePdf} />
				</button>
			)}
		</div>
	)
}

export default ViewControls
