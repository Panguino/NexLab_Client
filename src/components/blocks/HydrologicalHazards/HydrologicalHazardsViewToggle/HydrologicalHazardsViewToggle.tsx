'use client'

import Select from '@/components/elements/Select/Select'
import { useRootStore } from '@/store/useRootStore'
import { useState } from 'react'
import HydrologicalHazards from '../HydrologicalHazards'
import styles from './HydrologicalHazardsViewToggle.module.scss'

interface HydrologicalHazardsViewToggleProps {
	/** Pre-loaded alerts data */
	alerts: Record<string, Record<string, any>>
	/** All coastal/offshore regions for map display */
	displayOffshores?: any
	/** Initial view mode */
	initialView?: 'map' | 'table'
}

const REGION_OPTIONS = [
	{ value: 'conus', label: 'Continental US' },
	{ value: 'ak', label: 'Alaska' },
	{ value: 'hi', label: 'Hawaii' },
	{ value: 'gum', label: 'Guam' },
	{ value: 'pr', label: 'Puerto Rico' },
	{ value: 'sam', label: 'American Samoa' },
]

/**
 * HydrologicalHazardsViewToggle - Wrapper component with view toggle buttons
 *
 * Provides a header with Map/Table toggle buttons above the HydrologicalHazards component
 */
const HydrologicalHazardsViewToggle = ({ alerts, displayOffshores, initialView = 'map' }: HydrologicalHazardsViewToggleProps) => {
	const [view, setView] = useState<'map' | 'table'>(initialView)
	const selectedRegion = useRootStore.use.selectedRegion()
	const setSelectedRegion = useRootStore.use.setSelectedRegion()

	return (
		<div className={styles.hydrologicalHazardsViewToggle}>
			{/* Header with view toggle */}
			<div className={styles.header}>
				<h1 className={styles.title}>Hydrological Hazards</h1>
				<div className={styles.controls}>
					<div className={`${styles.regionSelector} ${view === 'table' ? styles.hidden : ''}`}>
						<Select value={selectedRegion} options={REGION_OPTIONS} onChange={setSelectedRegion} placeholder="Select Region" />
					</div>
					<div className={styles.toggleContainer}>
						<span className={styles.label}>Switch Mode:</span>
						<button onClick={() => setView('map')} className={`${styles.toggleButton} ${view === 'map' ? styles.active : ''}`}>
							Map
						</button>
						<button onClick={() => setView('table')} className={`${styles.toggleButton} ${view === 'table' ? styles.active : ''}`}>
							Table
						</button>
					</div>
				</div>
			</div>

			{/* Content area */}
			<div className={styles.content}>
				<HydrologicalHazards alerts={alerts} displayOffshores={displayOffshores} view={view} />
			</div>
		</div>
	)
}

export default HydrologicalHazardsViewToggle
