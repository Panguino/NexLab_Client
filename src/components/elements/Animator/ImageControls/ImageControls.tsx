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
import styles from './ImageControls.module.scss'

const ImageControls = ({ zoomIn, zoomOut, resetTransform }) => {
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
		<div className={styles.imageControls}>
			{overlays && (
				<button onClick={() => setOverlayPanelOpen(true)}>
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
			<button onClick={() => zoomIn()}>
				<FontAwesomeIcon icon={faSearchPlus} />
			</button>
			<button onClick={() => zoomOut()}>
				<FontAwesomeIcon icon={faSearchMinus} />
			</button>
			<button onClick={() => resetTransform()}>
				<FontAwesomeIcon icon={faUndo} />
			</button>
			{setZoomFill && (
				<button onClick={() => expandToggle()} title={zoomFill ? 'Fit to container' : 'Fill container'}>
					<FontAwesomeIcon icon={zoomFill ? faCompress : faExpand} />
				</button>
			)}
			<button onClick={() => fullScreenToggle()}>
				<FontAwesomeIcon icon={fullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} />
			</button>
			{soundingsPicker && (
				<button
					onClick={() => !soundingsPickerDisabled && setSoundingsPickerMode(!soundingsPickerMode)}
					className={soundingsPickerDisabled ? styles.disabled : ''}
					disabled={soundingsPickerDisabled}
					title={soundingsPickerDisabled ? 'Soundings not supported for current model' : 'Toggle sounding picker'}
				>
					<WeatherBalloonIcon className={soundingsPickerMode && !soundingsPickerDisabled ? styles.active : ''} />
				</button>
			)}
			{pdfs && pdfs.length > 0 && (
				<button onClick={handlePdfButtonClick}>
					<FontAwesomeIcon icon={faFilePdf} />
				</button>
			)}
		</div>
	)
}

export default ImageControls
