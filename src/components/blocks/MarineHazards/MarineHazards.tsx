'use client'

import { MarineHazardsAnimator } from '@/components/elements/MarineHazardsAnimator/MarineHazardsAnimator'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useRootStore } from '@/store/useRootStore'
import { useEffect } from 'react'
import MarineHazardsTable from './MarineHazardsTable/MarineHazardsTable'

interface MarineHazardsProps {
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
 * MarineHazards - Page component for displaying marine hazards
 *
 * This component displays a map or table filtered to only show marine hazards
 * (Tsunami, Storm, Gale, High Surf, Coastal Flood, Small Craft warnings/watches/advisories).
 */
const MarineHazards = ({ alerts, displayOffshores, view = 'map' }: MarineHazardsProps) => {
	const setAllHazards = useRootStore.use.setAllHazards()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const selectedRegion = useRootStore.use.selectedRegion()

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
		<>
			{Object.keys(alerts).length !== 0 ? (
				<>{view === 'map' ? <MarineHazardsAnimator alerts={alerts} allCoastalRegions={displayOffshores} /> : <MarineHazardsTable />}</>
			) : null}
			<MobileIconNav />
		</>
	)
}

export default MarineHazards
