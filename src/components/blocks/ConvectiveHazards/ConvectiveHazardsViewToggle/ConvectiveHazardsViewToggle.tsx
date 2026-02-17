'use client'

import Select from '@/components/elements/Select/Select'
import { useRootStore } from '@/store/useRootStore'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import ConvectiveHazards from '../ConvectiveHazards'
import styles from './ConvectiveHazardsViewToggle.module.scss'

interface ConvectiveHazardsViewToggleProps {
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
 * ConvectiveHazardsViewToggle - Wrapper component with view toggle buttons
 *
 * Provides a header with Map/Table toggle buttons above the ConvectiveHazards component
 */
const ConvectiveHazardsViewToggle = ({ alerts, displayOffshores, initialView = 'map' }: ConvectiveHazardsViewToggleProps) => {
	const [view, setView] = useState<'map' | 'table'>(initialView)
	const selectedRegion = useRootStore.use.selectedRegion()
	const setSelectedRegion = useRootStore.use.setSelectedRegion()
	const [settingsOpen, setSettingsOpen] = useState(false)

	return (
		<div className={styles.convectiveHazardsViewToggle}>
			{/* Header with view toggle */}
			<div className={styles.header}>
				<h1 className={styles.title}>Convective Weather Warnings</h1>
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

			{/* Mobile gear anchor (contains gear + popup) */}
			<div className={styles.settingsAnchor}>
				<div className={styles.settingsGear} onClick={() => setSettingsOpen((v) => !v)}>
					<FontAwesomeIcon icon={faGear} size="lg" />
				</div>
				{/* Mobile settings popup */}
				<div className={`${styles.settingsPopup} ${settingsOpen ? styles.open : ''}`}>
					<h2 className={styles.title}>Convective Weather Warnings</h2>
					<div className={styles.regionSelector}>
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
				<ConvectiveHazards alerts={alerts} displayOffshores={displayOffshores} view={view} />
			</div>
		</div>
	)
}

export default ConvectiveHazardsViewToggle
