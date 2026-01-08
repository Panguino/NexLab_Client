'use client'

import { ConvectiveHazardsAnimator } from '@/components/elements/ConvectiveHazardsAnimator'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useRootStore } from '@/store/useRootStore'
import { useEffect } from 'react'
import ConvectiveHazardsTable from './ConvectiveHazardsTable/ConvectiveHazardsTable'

interface ConvectiveHazardsProps {
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
 * ConvectiveHazards - Page component for displaying convective weather hazards
 *
 * This component displays a map or table filtered to only show convective hazards
 * (Tornado, Severe Thunderstorm, and Hydrological warnings/watches).
 */
const ConvectiveHazards = ({ alerts, displayOffshores, view = 'map' }: ConvectiveHazardsProps) => {
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
				<>
					{view === 'map' ? <ConvectiveHazardsAnimator alerts={alerts} allCoastalRegions={displayOffshores} /> : <ConvectiveHazardsTable />}
				</>
			) : null}
			<MobileIconNav />
		</>
	)
}

export default ConvectiveHazards
