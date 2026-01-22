'use client'

import { FireHazardsAnimator } from '@/components/elements/FireHazardsAnimator/FireHazardsAnimator'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useRootStore } from '@/store/useRootStore'
import { useEffect } from 'react'
import FireHazardsTable from './FireHazardsTable/FireHazardsTable'

interface FireHazardsProps {
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
 * FireHazards - Page component for displaying fire hazards
 *
 * This component displays a map or table filtered to only show fire hazards
 * (Fire Warning, Red Flag Warning, Fire Weather Watch).
 */
const FireHazards = ({ alerts, displayOffshores, view = 'map' }: FireHazardsProps) => {
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
				<>{view === 'map' ? <FireHazardsAnimator alerts={alerts} allCoastalRegions={displayOffshores} /> : <FireHazardsTable />}</>
			) : null}
			<MobileIconNav tab />
		</>
	)
}

export default FireHazards
