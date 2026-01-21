'use client'

import { HAZARD_TYPE_MARINE_ID } from '@/data/hazardMapVars'
import { DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridReact } from 'ag-grid-react'
import { useState } from 'react'
import styles from './MarineHazardsTable.module.scss'

// Marine hazard type to filter for
const MARINE_HAZARD_TYPES = [HAZARD_TYPE_MARINE_ID]

/**
 * Check if a hazard is a marine type
 */
const isMarineHazard = (hazardType: string): boolean => {
	return MARINE_HAZARD_TYPES.includes(hazardType)
}

const MarineHazardsTable = () => {
	const [searchText, setSearchText] = useState('')
	const regionHazards = useRootStore.use.regionHazards()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()

	// Build row data filtered for marine hazards only
	const rowData: any[] = []
	Object.keys(regionHazards).forEach((key) => {
		const { alerts, properties } = regionHazards[key]
		const { STATE, COUNTYNAME, ID, NAME, LAT, LON } = properties
		alerts.forEach((alert: any) => {
			const { headline, event, hazardInfo } = alert
			const hazardType = hazardInfo?.type?.type

			// Only include marine hazards
			if (hazardType && isMarineHazard(hazardType)) {
				rowData.push({
					STATE,
					COUNTYNAME,
					NAME,
					ID,
					LAT,
					LON,
					headline: headline,
					event: event,
					hazardType: hazardInfo.type.name,
					hazardLevel: hazardInfo.level.name,
				})
			}
		})
	})

	// Column Definitions
	const colDefs: ColDef[] = [
		{ field: 'ID', resizable: true, width: 120 },
		{ field: 'LAT', resizable: true, width: 120 },
		{ field: 'LON', resizable: true, width: 120 },
		{ field: 'STATE', resizable: true, width: 100 },
		{ field: 'COUNTYNAME', resizable: true, width: 150 },
		{ field: 'NAME', resizable: true, width: 180 },
		{ field: 'headline', resizable: true, width: 450 },
		{ field: 'event', resizable: true },
		{ field: 'hazardType', resizable: true, width: 150 },
		{ field: 'hazardLevel', resizable: true, width: 150 },
	]

	const onSearchTextBoxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value)
	}

	const onRowClicked = (event: any) => {
		openSlideoutPanel(DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT)
		setSelectedCounty(event.data.ID)
	}

	// Show empty state if no marine hazards
	if (rowData.length === 0) {
		return (
			<div className={styles.marineHazardsTable}>
				<div className={styles.emptyState}>
					<p>No active marine hazards</p>
					<p className={styles.emptyStateSubtext}>
						No current Tsunami, Storm, Gale, High Surf, Coastal Flood, or Small Craft warnings/watches/advisories. Check back during
						active marine weather events.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={`${styles.marineHazardsTable} ag-theme-material-dark`}>
			<div className={styles.searchbar}>
				<span>Search:</span>
				<input type="text" id="filter-text-box" placeholder="Filter..." onInput={onSearchTextBoxChanged} />
			</div>
			<AgGridReact quickFilterText={searchText} rowData={rowData} columnDefs={colDefs} onRowClicked={onRowClicked} />
		</div>
	)
}

export default MarineHazardsTable
