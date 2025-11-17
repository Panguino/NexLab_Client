'use client'

import { getLocalStormReports } from '@/util/dataCalls/text/query-storm-reports'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridReact } from 'ag-grid-react'
import { useEffect, useState } from 'react'
import styles from './LSRTable.module.scss'

interface StormReport {
	county: string
	event: string
	latlon: [number, number]
	local_time: string
	location: string
	magnitude_f: number
	magnitude_qualifier: string | null
	magnitude_str: string
	magnitude_units: string | null
	office: string
	office_plain: string
	remark: string
	source: string
	state: string
	valid_time: string
	valid_time_short: string
	valid_time_ts: string
}

const LSRTable = () => {
	const [searchText, setSearchText] = useState('')
	const [rowData, setRowData] = useState<StormReport[]>([])
	const [loading, setLoading] = useState(true)

	// Fetch storm reports on component mount
	useEffect(() => {
		const fetchReports = async () => {
			try {
				const data = await getLocalStormReports()
				// console.log('Storm reports data:', data)
				// console.log('Is array?', Array.isArray(data))
				if (data && Array.isArray(data)) {
					setRowData(data)
				}
			} catch (error) {
				console.error('Failed to fetch storm reports:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchReports()
	}, [])

	// Column Definitions: Defines the columns to be displayed.
	const colDefs: ColDef[] = [
		{ field: 'event', headerName: 'Event', resizable: true, flex: 1 },
		{ field: 'state', headerName: 'State', resizable: true, flex: 0.5 },
		{ field: 'county', headerName: 'County', resizable: true, flex: 1 },
		{ field: 'location', headerName: 'Location', resizable: true, flex: 1.5 },
		{ field: 'magnitude_str', headerName: 'Magnitude', resizable: true, flex: 0.8 },
		{ field: 'remark', headerName: 'Remark', resizable: true, flex: 3 },
		{ field: 'source', headerName: 'Source', resizable: true, flex: 1.2 },
		{ field: 'office_plain', headerName: 'Office', resizable: true, flex: 1 },
		{ field: 'valid_time_short', headerName: 'Valid Time', resizable: true, flex: 1.5 },
	]

	const onSearchTextBoxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value)
	}

	return (
		<div className={`${styles.lsrTable} ag-theme-material-dark`}>
			<div className={styles.searchbar}>
				<span>Search:</span>
				<input type="text" id="filter-text-box" placeholder="Filter..." onInput={onSearchTextBoxChanged} />
			</div>
			{loading ? (
				<div className={styles.loading}>Loading storm reports...</div>
			) : (
				<>
					<AgGridReact quickFilterText={searchText} rowData={rowData} columnDefs={colDefs} domLayout="autoHeight" />
				</>
			)}
		</div>
	)
}

export default LSRTable
