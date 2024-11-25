import { faArrowLeft, faArrowRight, faArrowsLeftRight, faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './BasicPlaybackControls.module.scss'

interface IBasicPlaybackControlsProps {
	isPlaying: boolean
	onPlayPauseClick: () => void
	onStepForwardClick: () => void
	onStepBackwardClick: () => void
	loopMethod: 'left-to-right' | 'right-to-left' | 'bounce'
	onLoopMethodToggle: () => void
}

const BasicPlaybackControls: React.FC<IBasicPlaybackControlsProps> = ({
	isPlaying,
	onPlayPauseClick,
	onStepForwardClick,
	onStepBackwardClick,
	loopMethod,
	onLoopMethodToggle,
}) => {
	const getLoopMethodIcon = () => {
		switch (loopMethod) {
			case 'left-to-right':
				return faArrowRight
			case 'right-to-left':
				return faArrowLeft
			case 'bounce':
				return faArrowsLeftRight
			default:
				return faArrowRight
		}
	}

	return (
		<div className={styles.basicPlaybackControls}>
			<div className={styles.controls}>
				<button onClick={onStepBackwardClick} className={styles.button}>
					<FontAwesomeIcon icon={faStepBackward} />
				</button>
				<button onClick={onPlayPauseClick} className={styles.button}>
					<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
				</button>
				<button onClick={onStepForwardClick} className={styles.button}>
					<FontAwesomeIcon icon={faStepForward} />
				</button>
				<button onClick={onLoopMethodToggle} className={styles.button}>
					<FontAwesomeIcon icon={getLoopMethodIcon()} />
				</button>
			</div>
		</div>
	)
}

export default BasicPlaybackControls
