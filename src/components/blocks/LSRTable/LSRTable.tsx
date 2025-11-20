'use client'

import { getLocalStormReports } from '@/util/dataCalls/text/query-storm-reports'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridReact } from 'ag-grid-react'
import { useEffect, useRef, useState } from 'react'
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
	const [pageSize, setPageSize] = useState(25)
	const [currentPage, setCurrentPage] = useState(0)
	const [totalPages, setTotalPages] = useState(0)
	const [pageInput, setPageInput] = useState('1')
	const gridRef = useRef<AgGridReact>(null)

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

	const onPageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPageSize(Number(e.target.value))
	}

	const onGridReady = () => {
		updatePaginationInfo()
	}

	const updatePaginationInfo = () => {
		if (gridRef.current?.api) {
			const api = gridRef.current.api
			const page = api.paginationGetCurrentPage()
			setCurrentPage(page)
			setTotalPages(api.paginationGetTotalPages())
			setPageInput(String(page + 1))
		}
	}

	const onPaginationChanged = () => {
		updatePaginationInfo()
	}

	const goToFirstPage = () => {
		gridRef.current?.api.paginationGoToFirstPage()
	}

	const goToPreviousPage = () => {
		gridRef.current?.api.paginationGoToPreviousPage()
	}

	const goToNextPage = () => {
		gridRef.current?.api.paginationGoToNextPage()
	}

	const goToLastPage = () => {
		gridRef.current?.api.paginationGoToLastPage()
	}

	const onPageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPageInput(e.target.value)
	}

	const onPageInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			goToPage()
		}
	}

	const goToPage = () => {
		const pageNumber = parseInt(pageInput)
		if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
			gridRef.current?.api.paginationGoToPage(pageNumber - 1)
		} else {
			// Reset to current page if invalid
			setPageInput(String(currentPage + 1))
		}
	}

	// Reusable pagination navigation component
	const PaginationNavigation = () => (
		<div className={styles.pageNavigation}>
			<button onClick={goToFirstPage} disabled={currentPage === 0} title="First Page">
				«
			</button>
			<button onClick={goToPreviousPage} disabled={currentPage === 0} title="Previous Page">
				‹
			</button>
			<div className={styles.pageInput}>
				<span>Page</span>
				<input type="text" value={pageInput} onChange={onPageInputChange} onKeyPress={onPageInputKeyPress} onBlur={goToPage} />
				<span>of {totalPages}</span>
			</div>
			<button onClick={goToNextPage} disabled={currentPage === totalPages - 1} title="Next Page">
				›
			</button>
			<button onClick={goToLastPage} disabled={currentPage === totalPages - 1} title="Last Page">
				»
			</button>
		</div>
	)

	return (
		<div className={`${styles.lsrTable} ag-theme-material-dark`}>
			<div className={styles.controls}>
				<div className={styles.searchbar}>
					<span>Search:</span>
					<input type="text" id="filter-text-box" placeholder="Filter..." onInput={onSearchTextBoxChanged} />
				</div>
				<div className={styles.paginationControls}>
					<div className={styles.pageSize}>
						<label htmlFor="page-size">Reports per page:</label>
						<select id="page-size" value={pageSize} onChange={onPageSizeChanged}>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
							<option value="250">250</option>
							<option value="500">500</option>
						</select>
					</div>
					<PaginationNavigation />
				</div>
			</div>
			{loading ? (
				<div className={styles.loading}>Loading storm reports...</div>
			) : (
				<>
					<AgGridReact
						ref={gridRef}
						quickFilterText={searchText}
						rowData={rowData}
						columnDefs={colDefs}
						domLayout="autoHeight"
						pagination={true}
						paginationPageSize={pageSize}
						paginationPageSizeSelector={false}
						suppressPaginationPanel={true}
						onGridReady={onGridReady}
						onPaginationChanged={onPaginationChanged}
					/>
					<div className={styles.bottomPagination}>
						<PaginationNavigation />
					</div>
				</>
			)}
		</div>
	)
}

export default LSRTable
