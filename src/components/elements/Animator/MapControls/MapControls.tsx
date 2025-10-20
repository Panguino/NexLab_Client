'use client'

import { useState } from 'react'
import styles from './MapControls.module.scss'

interface IMapControlsProps {
	region: 'conus' | 'alaska' | 'hawaii' | 'namer'
	onRegionChange: (region: 'conus' | 'alaska' | 'hawaii' | 'namer') => void
	onZoomIn: () => void
	onZoomOut: () => void
	onResetView: () => void
	zoom: number
}

/**
 * MapControls Component
 *
 * Provides controls for:
 * - Region selection (CONUS, Alaska, Hawaii, NAMER)
 * - Zoom in/out buttons
 * - Reset view button
 * - Zoom level display
 */
export const MapControls = ({
	region,
	onRegionChange,
	onZoomIn,
	onZoomOut,
	onResetView,
	zoom,
}: IMapControlsProps) => {
	const [showRegionMenu, setShowRegionMenu] = useState(false)

	const regions = [
		{ id: 'conus', label: 'Continental US' },
		{ id: 'alaska', label: 'Alaska' },
		{ id: 'hawaii', label: 'Hawaii' },
		{ id: 'namer', label: 'North America & Mexico' },
	]

	const handleRegionSelect = (selectedRegion: 'conus' | 'alaska' | 'hawaii' | 'namer') => {
		onRegionChange(selectedRegion)
		setShowRegionMenu(false)
	}

	return (
		<div className={styles.mapControls}>
			{/* Zoom Controls */}
			<div className={styles.zoomControls}>
				<button
					className={styles.zoomButton}
					onClick={onZoomIn}
					title="Zoom In"
					aria-label="Zoom In"
				>
					<span>+</span>
				</button>
				<div className={styles.zoomLevel}>{zoom.toFixed(1)}</div>
				<button
					className={styles.zoomButton}
					onClick={onZoomOut}
					title="Zoom Out"
					aria-label="Zoom Out"
				>
					<span>−</span>
				</button>
				<button
					className={styles.resetButton}
					onClick={onResetView}
					title="Reset View"
					aria-label="Reset View"
				>
					<span>⟲</span>
				</button>
			</div>

			{/* Region Selector */}
			<div className={styles.regionSelector}>
				<button
					className={styles.regionButton}
					onClick={() => setShowRegionMenu(!showRegionMenu)}
					title="Select Region"
					aria-label="Select Region"
				>
					<span>{regions.find((r) => r.id === region)?.label || 'Region'}</span>
					<span className={styles.chevron}>▼</span>
				</button>

				{showRegionMenu && (
					<div className={styles.regionMenu}>
						{regions.map((r) => (
							<button
								key={r.id}
								className={`${styles.regionOption} ${region === r.id ? styles.active : ''}`}
								onClick={() => handleRegionSelect(r.id as any)}
							>
								{r.label}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default MapControls

