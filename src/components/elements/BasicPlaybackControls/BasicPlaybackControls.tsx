import { faArrowLeft, faArrowRight, faArrowsLeftRight, faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './BasicPlaybackControls.module.scss'

export enum LoopMethod {
	LeftToRight = 'LOOP_METHOD_LEFT_TO_RIGHT',
	RightToLeft = 'LOOP_METHOD_RIGHT_TO_LEFT',
	Bounce = 'LOOP_METHOD_BOUNCE',
}

interface IBasicPlaybackControlsProps {
	isPlaying: boolean
	onPlayPauseClick: () => void
	onStepForwardClick: () => void
	onStepBackwardClick: () => void
	loopMethod: LoopMethod
	onLoopMethodToggle: (nextMethod: LoopMethod) => void
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
			case LoopMethod.RightToLeft:
				return faArrowLeft
			case LoopMethod.Bounce:
				return faArrowsLeftRight
			default:
				return faArrowRight
		}
	}
	const handleOnLoopMethodToggle = () => {
		onLoopMethodToggle(getNextLoopMethod())
	}

	const getNextLoopMethod = (): LoopMethod => {
		return loopMethod === LoopMethod.LeftToRight
			? LoopMethod.RightToLeft
			: loopMethod === LoopMethod.RightToLeft
				? LoopMethod.Bounce
				: LoopMethod.LeftToRight
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
				<button onClick={handleOnLoopMethodToggle} className={styles.button}>
					<FontAwesomeIcon icon={getLoopMethodIcon()} />
				</button>
			</div>
		</div>
	)
}

export default BasicPlaybackControls
