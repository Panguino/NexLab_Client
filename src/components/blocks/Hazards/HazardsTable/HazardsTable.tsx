'use client'
import { DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridReact } from 'ag-grid-react'
import { useState } from 'react'
import styles from './HazardsTable.module.scss'

const HazardsTable = () => {
	const [searchText, setSearchText] = useState('')
	const regionHazards = useRootStore.use.regionHazards()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const setSelectedCounty = useRootStore.use.setSelectedCounty()

	// Row Data: The data to be displayed.
	const rowData = []
	Object.keys(regionHazards).forEach((key) => {
		const { alerts, properties } = regionHazards[key]
		const { STATE, COUNTYNAME, ID, NAME, LAT, LON } = properties
		alerts.forEach((alert) => {
			const { headline, event, hazardInfo } = alert
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
		})
	})
	// Column Definitions: Defines the columns to be displayed.
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

	const onSearchTextBoxChanged = (e) => {
		setSearchText(e.target.value)
	}

	const onRowClicked = (event) => {
		openSlideoutPanel(DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT)
		setSelectedCounty(event.data.ID)
	}

	return (
		<div className={`${styles.hazardsTable} ag-theme-material-dark`}>
			<div className={styles.searchbar}>
				<span>Search:</span>
				<input type="text" id="filter-text-box" placeholder="Filter..." onInput={onSearchTextBoxChanged} />
			</div>
			<AgGridReact quickFilterText={searchText} rowData={rowData} columnDefs={colDefs} onRowClicked={onRowClicked} />
		</div>
	)
}
export default HazardsTable
