'use client'

import { HAZARD_TYPE_FIRE_ID } from '@/data/hazardMapVars'
import { DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridReact } from 'ag-grid-react'
import { useState } from 'react'
import styles from './FireHazardsTable.module.scss'

// Fire hazard type to filter for
const FIRE_HAZARD_TYPES = [HAZARD_TYPE_FIRE_ID]

/**
 * Check if a hazard is a fire type
 */
const isFireHazard = (hazardType: string): boolean => {
	return FIRE_HAZARD_TYPES.includes(hazardType)
}

const FireHazardsTable = () => {
	const [searchText, setSearchText] = useState('')
	const regionHazards = useRootStore.use.regionHazards()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()

	// Build row data filtered for fire hazards only
	const rowData: any[] = []
	Object.keys(regionHazards).forEach((key) => {
		const { alerts, properties } = regionHazards[key]
		const { STATE, COUNTYNAME, ID, NAME, LAT, LON } = properties
		alerts.forEach((alert: any) => {
			const { headline, event, hazardInfo } = alert
			const hazardType = hazardInfo?.type?.type

			// Only include fire hazards
			if (hazardType && isFireHazard(hazardType)) {
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

	// Show empty state if no fire hazards
	if (rowData.length === 0) {
		return (
			<div className={styles.fireHazardsTable}>
				<div className={styles.emptyState}>
					<p>No active fire hazards</p>
					<p className={styles.emptyStateSubtext}>
						No current Fire Warnings, Red Flag Warnings, or Fire Weather Watches. Check back during active fire weather events.
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={`${styles.fireHazardsTable} ag-theme-material-dark`}>
			<div className={styles.searchbar}>
				<span>Search:</span>
				<input type="text" id="filter-text-box" placeholder="Filter..." onInput={onSearchTextBoxChanged} />
			</div>
			<AgGridReact quickFilterText={searchText} rowData={rowData} columnDefs={colDefs} onRowClicked={onRowClicked} />
		</div>
	)
}

export default FireHazardsTable
