'use client'

import LoadingPanel from '@/components/blocks/LoadingPanel/LoadingPanel'
import { WinterHazardsAnimator } from '@/components/elements/WinterHazardsAnimator/WinterHazardsAnimator'
import { useRootStore } from '@/store/useRootStore'
import { useCallback, useEffect, useState } from 'react'
import styles from './WinterHazards.module.scss'
import WinterHazardsTable from './WinterHazardsTable/WinterHazardsTable'

interface WinterHazardsProps {
	/** Pre-loaded alerts data */
	alerts: Record<string, Record<string, any>>
	/** All coastal/offshore regions for map display */
	displayOffshores?: any
	/** View mode: 'map' or 'table' */
	view?: 'map' | 'table'
}

// Region name mapping (store uses short codes, API uses full names)
const REGION_NAME_MAP: Record<string, string> = {
	conus: 'Continental United States',
	ak: 'Alaska',
	hi: 'Hawaii',
	pr: 'Puerto Rico',
	sam: 'American Samoa',
	gum: 'Guam',
}

/**
 * WinterHazards - Page component for displaying winter weather hazards
 *
 * This component displays a map or table filtered to only show winter hazards
 * (Blizzard, Winter Storm, Ice Storm, Wind Chill, Snow, Freeze warnings/watches/advisories).
 */
const WinterHazards = ({ alerts, displayOffshores, view = 'map' }: WinterHazardsProps) => {
	const setAllHazards = useRootStore.use.setAllHazards()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const selectedRegion = useRootStore.use.selectedRegion()
	const [isViewLoading, setIsViewLoading] = useState<boolean>(false)

	// Set loading when view changes, cleared by each view's onReady callback
	useEffect(() => {
		setIsViewLoading(true)
	}, [view])

	// Callback for when map view is ready to display
	const handleMapReady = useCallback(() => {
		setIsViewLoading(false)
	}, [])

	// Callback for when table view is ready to display
	const handleTableReady = useCallback(() => {
		setIsViewLoading(false)
	}, [])

	useEffect(() => {
		setAllHazards(alerts)
	}, [setAllHazards, alerts])

	// For table view, we need to set regionHazards from the alerts
	useEffect(() => {
		if (view === 'table' && selectedRegion && alerts) {
			const regionName = REGION_NAME_MAP[selectedRegion]
			if (regionName && alerts[regionName]) {
				setRegionHazards(alerts[regionName])
			}
		}
	}, [view, selectedRegion, alerts, setRegionHazards])

	return (
		<div className={styles.winterHazards}>
			{isViewLoading && (
				<div className={styles.loadingOverlay}>
					<LoadingPanel />
				</div>
			)}
			{Object.keys(alerts).length !== 0 ? (
				<>
					{view === 'map' ? (
						<WinterHazardsAnimator alerts={alerts} allCoastalRegions={displayOffshores} onReady={handleMapReady} />
					) : (
						<WinterHazardsTable onReady={handleTableReady} />
					)}
				</>
			) : null}
		</div>
	)
}

export default WinterHazards
