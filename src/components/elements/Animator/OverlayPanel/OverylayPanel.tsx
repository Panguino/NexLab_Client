'use client'
import { ALL_SATRAD_OVERLAY_GROUPS, SATRAD_OVERLAYS } from '@/data/satrad/overlays'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './OverlayPanel.module.scss'

export const OverlayPanel = ({ onClose, overlays, activeOverlays, setActiveOverlays, open }) => {
	const [groupOpen, setGroupOpen] = useState('maps')

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
		if (activeOverlays.includes(id)) {
			setActiveOverlays(activeOverlays.filter((overlayId) => overlayId !== id))
		} else {
			setActiveOverlays([...activeOverlays, id])
		}
	}

	return (
		<div className={styles.OverlayPanel} style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}>
			<div
				className={`${styles.overlayItem} ${styles.firstItem} ${activeOverlays.includes('data') ? styles.active : null}`}
				onClick={() => handleOverlayClick('data')}
			>
				Base Data Layer
			</div>
			{Object.entries(ALL_SATRAD_OVERLAY_GROUPS).map(([key, { name, overlays }]) => {
				const open = groupOpen === key
				const nameSortedOverlays = [...overlays].sort((a, b) => {
					const nameA = SATRAD_OVERLAYS[a]?.name?.toLowerCase() ?? ''
					const nameB = SATRAD_OVERLAYS[b]?.name?.toLowerCase() ?? ''
					return nameA.localeCompare(nameB)
				})
				return (
					<div key={key} className={styles.overlayGroup}>
						<div
							className={styles.overlayGroupTitle}
							onClick={() => {
								setGroupOpen(key)
							}}
						>
							{name}
							<motion.div animate={{ transform: `${open ? 'rotate(0deg)' : 'rotate(180deg)'}` }}>
								<FontAwesomeIcon icon={faChevronDown} />
							</motion.div>
						</div>
						<motion.div animate={{ height: open ? 'auto' : 0 }} className={styles.overlayItems}>
							{nameSortedOverlays.map((overlayId, index) => {
								if (!flattenedOverlays.includes(overlayId)) {
									return null
								}
								const isActive = activeOverlays.includes(overlayId)
								return (
									<div
										key={index}
										className={`${styles.overlayItem} ${isActive ? styles.active : null}`}
										onClick={() => handleOverlayClick(overlayId)}
									>
										{SATRAD_OVERLAYS[overlayId].name}
									</div>
								)
							})}
						</motion.div>
					</div>
				)
			})}
		</div>
	)
}
