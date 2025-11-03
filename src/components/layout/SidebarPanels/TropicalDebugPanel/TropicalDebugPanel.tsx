'use client'

import Select from '@/components/elements/Select/Select'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import { useCallback, useEffect, useState } from 'react'
import styles from './TropicalDebugPanel.module.scss'

interface DebugOption {
	label: string
	value: string
}

const DEBUG_DATA_KEY = 'tropical_debug_data_url'
const BASE_URL = 'https://climate.cod.edu/data/tropical/currentstorms'

export const TropicalDebugPanel = () => {
	const [debugOptions, setDebugOptions] = useState<DebugOption[]>([])
	const [selectedDebug, setSelectedDebug] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// Fetch available debug data files from the directory listing
	useEffect(() => {
		const fetchAvailableFiles = async () => {
			setIsLoading(true)
			try {
				// Fetch the directory listing
				const response = await fetch(BASE_URL)
				const html = await response.text()

				// Parse the HTML to extract file names
				const fileRegex = /CurrentStorms_(\d{12})\.json/g
				const files = new Set<string>()
				let match

				while ((match = fileRegex.exec(html)) !== null) {
					files.add(match[1])
				}

				// Convert to sorted array and create options
				const sortedFiles = Array.from(files).sort().reverse() // Most recent first

				const options: DebugOption[] = [{ label: 'No Storms', value: 'none' }]

				// Group by day and pick one file per day (the latest one)
				const dayMap = new Map<string, string>()
				sortedFiles.forEach((timestamp) => {
					const day = timestamp.substring(0, 8) // YYYYMMDD
					if (!dayMap.has(day)) {
						dayMap.set(day, timestamp)
					}
				})

				// Convert to options, sorted by day
				const sortedDays = Array.from(dayMap.entries()).sort((a, b) => b[0].localeCompare(a[0]))

				sortedDays.forEach(([day, timestamp]) => {
					const year = day.substring(0, 4)
					const month = day.substring(4, 6)
					const dayNum = day.substring(6, 8)
					const time = timestamp.substring(8, 10) + ':' + timestamp.substring(10, 12)
					const label = `${year}-${month}-${dayNum} ${time}`
					const url = `${BASE_URL}/CurrentStorms_${timestamp}.json`
					options.push({ label, value: url })
				})

				setDebugOptions(options)

				// Load saved debug data from localStorage
				const saved = localStorage.getItem(DEBUG_DATA_KEY)
				setSelectedDebug(saved || 'none')
			} catch (error) {
				console.error('Error fetching debug options:', error)
				// Fallback to manual list if fetch fails
				const options: DebugOption[] = [{ label: 'No Storms', value: 'none' }]
				for (let day = 1; day <= 31; day++) {
					const dayStr = String(day).padStart(2, '0')
					const dateLabel = `2025-10-${dayStr} 00:00`
					const url = `${BASE_URL}/CurrentStorms_202510${dayStr}0000.json`
					options.push({ label: dateLabel, value: url })
				}
				setDebugOptions(options)
				const saved = localStorage.getItem(DEBUG_DATA_KEY)
				setSelectedDebug(saved || 'none')
			} finally {
				setIsLoading(false)
			}
		}

		fetchAvailableFiles()
	}, [])

	const handleDebugChange = useCallback((value: string) => {
		setSelectedDebug(value)

		// Save to localStorage
		if (value === 'none') {
			localStorage.setItem(DEBUG_DATA_KEY, 'none')
		} else {
			localStorage.setItem(DEBUG_DATA_KEY, value)
		}

		// Reload page to apply changes
		window.location.reload()
	}, [])

	return (
		<div className={styles.debugPanel}>
			<SidebarPanelPad>
				<div className={styles.debugSection}>
					<h3 className={styles.debugTitle}>Debug Data</h3>
					<p className={styles.debugDescription}>Load different tropical storm datasets for testing</p>

					<div className={styles.selectWrapper}>
						<Select
							value={selectedDebug}
							options={debugOptions}
							onChange={handleDebugChange}
							placeholder="Select debug data"
							disabled={isLoading}
						/>
					</div>

					{selectedDebug && selectedDebug !== 'none' && (
						<div className={styles.debugInfo}>
							<p className={styles.infoLabel}>Current:</p>
							<p className={styles.infoValue}>{debugOptions.find((o) => o.value === selectedDebug)?.label}</p>
						</div>
					)}
				</div>
			</SidebarPanelPad>
		</div>
	)
}

export default TropicalDebugPanel
