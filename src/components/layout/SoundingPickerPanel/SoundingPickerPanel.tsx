'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { useRootStore } from '@/store/useRootStore'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SoundingPickerPanel.module.scss'

const SoundingPickerPanel = () => {
	const panelIsOpen = useRootStore.use.soundingPickerIsOpen()
	const closePanel = useRootStore.use.closeSoundingPicker()
	const frames = useRootStore.use.soundingPickerFrames()
	const imageInfo = useRootStore.use.soundingPickerImageInfo()

	return (
		<>
			{panelIsOpen && (
				<div className={styles.soundingPickerPanel}>
					<div className={styles.soundingPickerPanelWrapper}>
						<div className={styles.closeButton} onClick={closePanel}>
							<FontAwesomeIcon icon={faClose} />
						</div>
						<div className={styles.soundingPickerContent}>
							{frames && frames.length > 0 ? (
								<div style={{ width: '100%', height: '100%' }}>
									<Animator
										frames={frames}
										imageInfo={imageInfo || { width: 500, height: 500 }}
										hideControls
										hideZoomControls
										autoPlay={false}
										startFrame={0}
										disableZoom
										zoomFill={false}
									/>
								</div>
							) : (
								<div style={{ color: 'white' }}>Loading sounding image…</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default SoundingPickerPanel
