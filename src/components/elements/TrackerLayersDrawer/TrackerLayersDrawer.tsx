'use client'

import { TrackerMapLayer } from '@/types/tracker'
import { faChevronLeft, faChevronRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styles from './TrackerLayersDrawer.module.scss'

export type TrackerLayersDrawerProps = {
	layers: TrackerMapLayer[]
	onToggleLayer: (layerId: string) => void
}

const TrackerLayersDrawer = ({ layers, onToggleLayer }: TrackerLayersDrawerProps) => {
	const [open, setOpen] = useState(false)
	const [expandedInfo, setExpandedInfo] = useState<string | null>(null)

	return (
		<div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
			<div className={styles.panel}>
				<div className={styles.panelHeader}>Map Layers</div>
				<div className={styles.layerList}>
					{layers.map((layer) => (
						<div key={layer.id} className={styles.layerItem}>
							<div className={styles.layerRow}>
								<button
									className={`${styles.layerToggle} ${layer.active ? styles.layerToggleActive : ''}`}
									onClick={() => onToggleLayer(layer.id)}
								>
									<span className={styles.toggleTrack}>
										<span className={styles.toggleThumb} />
									</span>
								</button>
								<span className={`${styles.layerLabel} ${layer.active ? styles.layerLabelActive : ''}`}>{layer.label}</span>
								{layer.description && (
									<button
										className={styles.infoButton}
										onClick={() => setExpandedInfo(expandedInfo === layer.id ? null : layer.id)}
									>
										<FontAwesomeIcon icon={faCircleInfo} size="sm" />
									</button>
								)}
							</div>
							{layer.description && expandedInfo === layer.id && <div className={styles.layerDescription}>{layer.description}</div>}
						</div>
					))}
				</div>
			</div>
			<button className={styles.tab} onClick={() => setOpen(!open)}>
				<FontAwesomeIcon icon={open ? faChevronLeft : faChevronRight} size="sm" />
				<span className={styles.tabLabel}>Layers</span>
			</button>
		</div>
	)
}

export default TrackerLayersDrawer
