'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { useRootStore } from '@/store/useRootStore'
import { getLatLonFromXYandSector } from '@/util/forecast/common-functions'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, useRouter } from 'next/navigation'
import styles from './SoundingPickerPanel.module.scss'

const SoundingPickerPanel = () => {
	const panelIsOpen = useRootStore.use.soundingPickerIsOpen()
	const closePanel = useRootStore.use.closeSoundingPicker()
	const frames = useRootStore.use.soundingPickerFrames()
	const imageInfo = useRootStore.use.soundingPickerImageInfo()
	const router = useRouter()
	const {
		fcstModel: modelId,
		fcstRun: runId,
		fcstSector: sectorId,
		fcstLevel: levelId,
		fcstProduct: productId,
		fcstSndValid: validTimeId,
		fcstSndParcel: parcelId,
		fcstSndWeather: weatherId,
	} = useParams()

	const onSoundingsClickthrough = ({ xPercent, yPercent }) => {
		const locationId = getLatLonFromXYandSector(xPercent, yPercent, sectorId as string)
		const baseParmsString = `${runId}/${modelId}/${sectorId}/${levelId}/${productId}`
		const soundingParmsString = `${validTimeId}/${locationId}/${parcelId}/${weatherId}`
		router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
		closePanel()
	}

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
										soundingsPicker
										soundingsPickerMode={true}
										onSoundingsClickthrough={onSoundingsClickthrough}
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
