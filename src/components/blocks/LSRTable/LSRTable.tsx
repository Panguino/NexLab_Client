'use client'

import { getLocalStormReports } from '@/util/dataCalls/text/query-convective'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridReact } from 'ag-grid-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import styles from './LSRTable.module.scss'
import StormReportCard from './StormReportCard/StormReportCard'

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
	const { theme } = useTheme()
	const [searchText, setSearchText] = useState('')
	const [rowData, setRowData] = useState<StormReport[]>([])
	const [loading, setLoading] = useState(true)
	const [pageSize, setPageSize] = useState(25)
	const [currentPage, setCurrentPage] = useState(0)
	const [totalPages, setTotalPages] = useState(0)
	const [pageInput, setPageInput] = useState('1')
	const [selectedFilters, setSelectedFilters] = useState<string[]>([])
	const [showFilterMenu, setShowFilterMenu] = useState(false)
	const [wholeWord, setWholeWord] = useState(false)
	const [caseSensitive, setCaseSensitive] = useState(false)
	const [selectedReport, setSelectedReport] = useState<StormReport | null>(null)
	const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })
	const [showCardAbove, setShowCardAbove] = useState(false)
	const gridRef = useRef<AgGridReact>(null)
	const tableRef = useRef<HTMLDivElement>(null)

	// Available filter fields
	const availableFilters = [
		{ field: 'event', label: 'Event' },
		{ field: 'state', label: 'State' },
		{ field: 'county', label: 'County' },
		{ field: 'location', label: 'Location' },
		{ field: 'magnitude_str', label: 'Magnitude' },
		{ field: 'remark', label: 'Remark' },
		{ field: 'source', label: 'Source' },
		{ field: 'office_plain', label: 'Office' },
		{ field: 'valid_time_short', label: 'Valid Time' },
	]

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

	// Handle cell click to show report card
	const onCellClicked = (event: any) => {
		const clickedReport = event.data as StormReport
		const cellElement = event.event.target.closest('.ag-cell')
		const tableElement = tableRef.current

		if (cellElement && tableElement) {
			const cellRect = cellElement.getBoundingClientRect()
			const tableRect = tableElement.getBoundingClientRect()

			// Calculate position relative to table container
			const cellCenterX = cellRect.left + cellRect.width / 2 - tableRect.left
			const cellBottomY = cellRect.bottom - tableRect.top

			// Determine if card should show above or below based on available space
			const spaceBelow = window.innerHeight - cellRect.bottom
			const spaceAbove = cellRect.top
			const showAbove = spaceBelow < 400 && spaceAbove > spaceBelow

			// Constrain horizontal position to keep card within content area
			// Account for sidebar (300px on desktop, hidden on mobile < 900px)
			const isMobile = window.innerWidth <= 900
			const sidebarWidth = isMobile ? 0 : 300
			const cardWidth = 500 // max-width of card
			const halfCardWidth = cardWidth / 2
			const viewportWidth = window.innerWidth

			let adjustedX = cellCenterX
			const cardLeftEdge = cellRect.left + cellRect.width / 2 - halfCardWidth
			const cardRightEdge = cellRect.left + cellRect.width / 2 + halfCardWidth

			if (cardLeftEdge < sidebarWidth) {
				// Card would overflow behind sidebar on left edge
				const overflow = sidebarWidth - cardLeftEdge
				adjustedX = cellCenterX + overflow + 10
			} else if (cardRightEdge > viewportWidth) {
				// Card would overflow right edge
				adjustedX = cellCenterX - (cardRightEdge - viewportWidth) - 10
			}

			setSelectedReport(clickedReport)
			setCardPosition({
				top: showAbove ? cellRect.top - tableRect.top : cellBottomY,
				left: adjustedX,
			})
			setShowCardAbove(showAbove)
		}
	}

	const closeCard = () => {
		setSelectedReport(null)
	}

	// Helper function to check if text matches based on search options
	const matchesSearch = (value: any, searchStr: string): boolean => {
		if (!value) return false

		const valueStr = String(value)

		// Apply case sensitivity
		const valueToSearch = caseSensitive ? valueStr : valueStr.toLowerCase()
		const textToFind = caseSensitive ? searchStr : searchStr.toLowerCase()

		// Apply whole word matching
		if (wholeWord) {
			// Create regex for whole word matching
			// Word boundaries: start of string, space, or after punctuation
			// End boundaries: end of string, space, or before punctuation
			const escapedSearch = textToFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
			const pattern = `(^|\\s)${escapedSearch}(\\s|[.,;:?!)*%'"\u2019\u201D]|$)`
			const regex = new RegExp(pattern, caseSensitive ? '' : 'i')
			return regex.test(valueToSearch)
		} else {
			return valueToSearch.includes(textToFind)
		}
	}

	// Custom filter logic based on selected fields
	const doesExternalFilterPass = (node: any) => {
		if (!searchText) return true

		// If specific filters are selected, search only those fields
		if (selectedFilters.length > 0) {
			return selectedFilters.some((field) => matchesSearch(node.data[field], searchText))
		}

		// Otherwise search all fields
		const fieldsToSearch = ['event', 'state', 'county', 'location', 'magnitude_str', 'remark', 'source', 'office_plain', 'valid_time_short']
		return fieldsToSearch.some((field) => matchesSearch(node.data[field], searchText))
	}

	const isExternalFilterPresent = () => {
		return searchText.length > 0
	}

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

	const addFilter = (field: string) => {
		if (!selectedFilters.includes(field)) {
			setSelectedFilters([...selectedFilters, field])
		}
		setShowFilterMenu(false)
	}

	const removeFilter = (field: string) => {
		setSelectedFilters(selectedFilters.filter((f) => f !== field))
	}

	const toggleFilterMenu = () => {
		setShowFilterMenu(!showFilterMenu)
	}

	// Apply column-specific filtering
	useEffect(() => {
		if (gridRef.current?.api) {
			gridRef.current.api.onFilterChanged()
		}
	}, [searchText, selectedFilters, wholeWord, caseSensitive])

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
		<div className={`${styles.lsrTable} ${theme === 'dark' ? 'ag-theme-material-dark' : 'ag-theme-material'}`} ref={tableRef}>
			<div className={styles.controls}>
				<div className={styles.searchbar}>
					<span>Search:</span>
					<div className={styles.searchInputWrapper}>
						<div className={styles.filterTags}>
							{selectedFilters.map((field) => {
								const filterLabel = availableFilters.find((f) => f.field === field)?.label || field
								return (
									<span key={field} className={styles.filterTag}>
										{filterLabel}
										<button onClick={() => removeFilter(field)} className={styles.removeFilter} title="Remove filter">
											×
										</button>
									</span>
								)
							})}
						</div>
						<input type="text" id="filter-text-box" placeholder="Filter..." onInput={onSearchTextBoxChanged} />
						<div className={styles.searchOptions}>
							<button
								onClick={() => setCaseSensitive(!caseSensitive)}
								className={`${styles.searchToggle} ${caseSensitive ? styles.active : ''}`}
								title="Case sensitive"
							>
								<span className={styles.toggleIcon}>Aa</span>
							</button>
							<button
								onClick={() => setWholeWord(!wholeWord)}
								className={`${styles.searchToggle} ${wholeWord ? styles.active : ''}`}
								title="Match whole word"
							>
								<span className={styles.toggleIcon}>
									ab
									<span className={styles.bracket}>⎵</span>
								</span>
							</button>
						</div>
						<div className={styles.addFilterWrapper}>
							<button onClick={toggleFilterMenu} className={styles.addFilterButton} title="Add field filter">
								+
							</button>
							{showFilterMenu && (
								<div className={styles.filterMenu}>
									{availableFilters
										.filter((f) => !selectedFilters.includes(f.field))
										.map((filter) => (
											<button key={filter.field} onClick={() => addFilter(filter.field)} className={styles.filterMenuItem}>
												{filter.label}
											</button>
										))}
								</div>
							)}
						</div>
					</div>
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
						rowData={rowData}
						columnDefs={colDefs}
						domLayout="autoHeight"
						pagination={true}
						paginationPageSize={pageSize}
						paginationPageSizeSelector={false}
						suppressPaginationPanel={true}
						onGridReady={onGridReady}
						onPaginationChanged={onPaginationChanged}
						isExternalFilterPresent={isExternalFilterPresent}
						doesExternalFilterPass={doesExternalFilterPass}
						onCellClicked={onCellClicked}
					/>
					<div className={styles.bottomPagination}>
						<PaginationNavigation />
					</div>
					{selectedReport && (
						<StormReportCard report={selectedReport} position={cardPosition} showAbove={showCardAbove} onClose={closeCard} />
					)}
				</>
			)}
		</div>
	)
}

export default LSRTable
