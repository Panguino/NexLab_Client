'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { useRootStore } from '@/store/useRootStore'
import { getLatLonFromXYandSector } from '@/util/forecast/common-functions'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

import styles from './SoundingPickerPanel.module.scss'

const SoundingPickerPanel = () => {
	const panelIsOpen = useRootStore.use.soundingPickerIsOpen()
	const closePanel = useRootStore.use.closeSoundingPicker()
	const frames = useRootStore.use.soundingPickerFrames()
	const imageInfo = useRootStore.use.soundingPickerImageInfo()
	const storeRunId = useRootStore.use.forecastSoundingRunId()
	const storeValidTime = useRootStore.use.forecastFrameValidTime()
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
		fcstSndLoc: loc,
	} = useParams()

	const currentMarker = useMemo(() => {
		console.log('loc', loc)
		if (!loc || typeof loc !== 'string') return null
		let decodedLoc: string
		try {
			decodedLoc = decodeURIComponent(String(loc))
		} catch {
			decodedLoc = String(loc)
		}
		if (!decodedLoc.includes(',')) return null
		const [latStr, lonStr] = decodedLoc.split(',')
		const lat = parseFloat(latStr)
		const lon = parseFloat(lonStr)
		console.log('lat, lon', lat, lon)
		console.log('sectorId', sectorId)
		const bounds = FORECAST_SECTORS[sectorId as string]?.coordinates
		if (!bounds) {
			console.debug('[SoundingPicker] No bounds for sector', { sectorId })
			return null
		}
		const lonSpan = bounds[1][0] - bounds[0][0]
		const latSpan = bounds[1][1] - bounds[0][1]
		// Convert lat/lon into raw geobox percents
		const rawX = (lon - bounds[0][0]) / lonSpan
		const rawY = 1 - (lat - bounds[0][1]) / latSpan
		const nativeH = imageInfo?.height || 0
		const xPercent = Math.max(0, Math.min(0.999, rawX))
		let yPercent = Math.max(0, Math.min(0.999, rawY))
		if (nativeH > 0) {
			// Apply DataTooltip's 26px top/bottom padding using native image height
			const padFrac = 26 / nativeH
			yPercent = Math.max(0, Math.min(0.999, padFrac + rawY * (1 - 2 * padFrac)))
		}
		const marker = isFinite(xPercent) && isFinite(yPercent) ? { xPercent, yPercent } : null
		console.debug('[SoundingPicker] currentMarker', { loc, sectorId, imageInfo, bounds, rawX, rawY, ...marker })
		return marker
	}, [loc, sectorId, imageInfo])

	const onSoundingsClickthrough = ({ xPercent, yPercent }) => {
		const locationId = getLatLonFromXYandSector(xPercent, yPercent, sectorId as string)
		const effectiveRunId = storeRunId || runId
		const effectiveValidTime = storeValidTime || validTimeId
		const baseParmsString = `${effectiveRunId}/${modelId}/${sectorId}/${levelId}/${productId}`
		const soundingParmsString = `${effectiveValidTime}/${locationId}/${parcelId}/${weatherId}`
		router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
		closePanel()
	}

	console.log('currentMarker', currentMarker)

	return (
		<>
			{panelIsOpen && (
				<div className={styles.soundingPickerPanel}>
					<div className={styles.soundingPickerPanelWrapper}>
						<div
							className={styles.closeButton}
							onClick={(e) => {
								e.stopPropagation()
								closePanel()
							}}
						>
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
										overlayMarkers={currentMarker ? [currentMarker] : []}
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
