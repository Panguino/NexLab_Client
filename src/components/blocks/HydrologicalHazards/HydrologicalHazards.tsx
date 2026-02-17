'use client'

import { HydrologicalHazardsAnimator } from '@/components/elements/HydrologicalHazardsAnimator/HydrologicalHazardsAnimator'
import { useRootStore } from '@/store/useRootStore'
import { useEffect } from 'react'
import HydrologicalHazardsTable from './HydrologicalHazardsTable/HydrologicalHazardsTable'

interface HydrologicalHazardsProps {
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
 * HydrologicalHazards - Page component for displaying hydrological hazards
 *
 * This component displays a map or table filtered to only show hydrological hazards
 * (Flash Flood, Flood, Coastal Flood warnings/watches/advisories).
 */
const HydrologicalHazards = ({ alerts, displayOffshores, view = 'map' }: HydrologicalHazardsProps) => {
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
					{view === 'map' ? (
						<HydrologicalHazardsAnimator alerts={alerts} allCoastalRegions={displayOffshores} />
					) : (
						<HydrologicalHazardsTable />
					)}
				</>
			) : null}
		</>
	)
}

export default HydrologicalHazards
