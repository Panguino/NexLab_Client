'use client'

import { ALL_SATRAD_OVERLAY_GROUPS, SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import { useEffect } from 'react'
import styles from './OverlayPanel.module.scss'

export const OverlayPanel = ({ onClose, overlays, activeOverlays, setActiveOverlays }) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if ((event.target as HTMLElement).closest(`.${styles.OverlayPanel}`) === null) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	const flattenedOverlays = [...Object.keys(overlays.static), ...Object.keys(overlays.dynamic)]

	const handleOverlayClick = (id) => {
		setActiveOverlays((prev) => {
			if (prev.includes(id)) {
				return prev.filter((overlayId) => overlayId !== id)
			} else {
				return [...prev, id]
			}
		})
	}

	return (
		<div className={styles.OverlayPanel}>
			<div className={styles.overlayItem} onClick={() => handleOverlayClick('data')}>
				Base Data Layer {activeOverlays.includes('data') ? '✓' : ''}
			</div>
			{Object.entries(ALL_SATRAD_OVERLAY_GROUPS).map(([key, { name, overlays }]) => {
				return (
					<div key={key} className={styles.overlayGroup}>
						<div>{name}</div>
						{overlays.map((overlayId, index) => {
							if (!flattenedOverlays.includes(overlayId)) {
								return null
							}
							return (
								<div key={index} className={styles.overlayItem} onClick={() => handleOverlayClick(overlayId)}>
									{SATRAD_OVERLAYS[overlayId].name} {activeOverlays.includes(overlayId) ? '✓' : ''}
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
