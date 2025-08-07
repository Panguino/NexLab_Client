import WeatherBalloonIcon from '@/components/icons/WeatherBalloonIcon'
import {
	faCompress,
	faDownLeftAndUpRightToCenter,
	faExpand,
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
	const { setZoomFill, zoomFill, setFullScreen, fullScreen, overlays, activeOverlays, setActiveOverlays } = useAnimator()
	const [overlayPanelOpen, setOverlayPanelOpen] = useState(false)
	const expandToggle = () => {
		setZoomFill(!zoomFill)
	}

	const fullScreenToggle = () => {
		setFullScreen(!fullScreen)
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
			<button onClick={() => expandToggle()}>
				<FontAwesomeIcon icon={zoomFill ? faCompress : faExpand} />
			</button>
			<button onClick={() => fullScreenToggle()}>
				<FontAwesomeIcon icon={fullScreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} />
			</button>
			<button onClick={() => console.log('sounding')}>
				<WeatherBalloonIcon />
			</button>
		</div>
	)
}

export default ImageControls
