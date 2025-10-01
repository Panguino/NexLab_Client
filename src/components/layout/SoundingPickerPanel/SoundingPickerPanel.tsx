'use client'

import { Animator } from '@/components/elements/Animator/Animator'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { useRootStore } from '@/store/useRootStore'
import { getLatLonFromXYandSector } from '@/util/forecast/common-functions'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'

import styles from './SoundingPickerPanel.module.scss'

const SoundingPickerPanel = () => {
	const panelIsOpen = useRootStore.use.soundingPickerIsOpen()
	const closePanel = useRootStore.use.closeSoundingPicker()
	const setForecastSoundingsPickMode = useRootStore.use.setForecastSoundingsPickMode()
	const frames = useRootStore.use.soundingPickerFrames()
	const imageInfo = useRootStore.use.soundingPickerImageInfo()
	const storeRunId = useRootStore.use.forecastSoundingRunId()
	const storeValidTime = useRootStore.use.forecastFrameValidTime()
	const router = useRouter()
	const pathname = usePathname()
	const panelRef = useRef<HTMLDivElement>(null)
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

	// console.log('🔍 [SoundingPickerPanel] URL params:', { modelId, runId, sectorId, levelId, productId, validTimeId, parcelId, weatherId, loc })
	// console.log('🔍 [SoundingPickerPanel] sectorId value:', sectorId, 'type:', typeof sectorId)

	const currentMarker = useMemo(() => {
		// console.log('loc', loc)
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
		// console.log('lat, lon', lat, lon)
		// console.log('sectorId', sectorId)
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
		// console.log('🎯 [SoundingPickerPanel] onSoundingsClickthrough called')
		// console.log('  📍 Input percentages:', { xPercent, yPercent })
		// console.log('  🗺️  Sector:', sectorId)

		const locationId = getLatLonFromXYandSector(xPercent, yPercent, sectorId as string)
		// console.log('  📌 Calculated locationId:', locationId)

		const effectiveRunId = storeRunId || runId
		const effectiveValidTime = storeValidTime || validTimeId
		const baseParmsString = `${effectiveRunId}/${modelId}/${sectorId}/${levelId}/${productId}`
		const soundingParmsString = `${effectiveValidTime}/${locationId}/${parcelId}/${weatherId}`

		// Determine source parameter based on current pathname
		let sourceParam = 'forecast' // default
		if (pathname.includes('/compare-height/')) {
			sourceParam = 'compare-height'
		} else if (pathname.includes('/compare-runs/')) {
			sourceParam = 'compare-runs'
		} else if (pathname.includes('/compare-models/')) {
			sourceParam = 'compare-models'
		}

		const fullRoute = `/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}?source=${sourceParam}`

		// console.log('  🔗 Full route:', fullRoute)
		router.push(fullRoute)
		closePanel()
		setForecastSoundingsPickMode(false) // Also deactivate soundings picker mode
	}

	// Close panel on route change
	useEffect(() => {
		if (panelIsOpen) {
			closePanel()
			setForecastSoundingsPickMode(false)
		}
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	// Close panel on click outside
	useEffect(() => {
		if (!panelIsOpen) return undefined

		const handleClickOutside = (event: MouseEvent) => {
			if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
				closePanel()
				setForecastSoundingsPickMode(false)
			}
		}

		// Add a small delay to prevent immediate closing when opening
		const timeoutId = setTimeout(() => {
			document.addEventListener('mousedown', handleClickOutside)
		}, 100)

		return () => {
			clearTimeout(timeoutId)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [panelIsOpen, closePanel, setForecastSoundingsPickMode])

	// console.log('currentMarker', currentMarker)

	return (
		<>
			{panelIsOpen && (
				<div className={styles.soundingPickerPanel}>
					<div className={styles.soundingPickerPanelWrapper} ref={panelRef}>
						<div
							className={styles.closeButton}
							onClick={(e) => {
								e.stopPropagation()
								closePanel()
								setForecastSoundingsPickMode(false) // Also deactivate soundings picker mode
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
										sectorId={sectorId as string}
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
