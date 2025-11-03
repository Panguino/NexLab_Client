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

// Hardcoded list of available files - one per day, using the latest timestamp for each day
const AVAILABLE_FILES = [
	{ day: '2025-10-01', timestamp: '202510011830' },
	{ day: '2025-10-02', timestamp: '202510022350' },
	{ day: '2025-10-03', timestamp: '202510032130' },
	{ day: '2025-10-04', timestamp: '202510042350' },
	{ day: '2025-10-05', timestamp: '202510052340' },
	{ day: '2025-10-06', timestamp: '202510062350' },
	{ day: '2025-10-07', timestamp: '202510072350' },
	{ day: '2025-10-08', timestamp: '202510082340' },
	{ day: '2025-10-09', timestamp: '202510092240' },
	{ day: '2025-10-10', timestamp: '202510102340' },
	{ day: '2025-10-11', timestamp: '202510112130' },
	{ day: '2025-10-12', timestamp: '202510121050' },
	{ day: '2025-10-13', timestamp: '202510132130' },
	{ day: '2025-10-14', timestamp: '202510142130' },
	{ day: '2025-10-15', timestamp: '202510152040' },
	{ day: '2025-10-16', timestamp: '202510160440' },
	{ day: '2025-10-21', timestamp: '202510212350' },
	{ day: '2025-10-22', timestamp: '202510222130' },
	{ day: '2025-10-23', timestamp: '202510232340' },
	{ day: '2025-10-24', timestamp: '202510242350' },
	{ day: '2025-10-25', timestamp: '202510252350' },
	{ day: '2025-10-26', timestamp: '202510262130' },
	{ day: '2025-10-27', timestamp: '202510272130' },
	{ day: '2025-10-28', timestamp: '202510282350' },
	{ day: '2025-10-29', timestamp: '202510292130' },
	{ day: '2025-10-30', timestamp: '202510302130' },
	{ day: '2025-10-31', timestamp: '202510312320' },
]

export const TropicalDebugPanel = () => {
	const [debugOptions, setDebugOptions] = useState<DebugOption[]>([])
	const [selectedDebug, setSelectedDebug] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// Initialize debug options on mount
	useEffect(() => {
		setIsLoading(true)
		try {
			const options: DebugOption[] = [{ label: 'No Storms', value: 'none' }]

			// Add all available files
			AVAILABLE_FILES.forEach(({ day, timestamp }) => {
				const time = timestamp.substring(8, 10) + ':' + timestamp.substring(10, 12)
				const label = `${day} ${time}`
				const url = `${BASE_URL}/CurrentStorms_${timestamp}.json`
				options.push({ label, value: url })
			})

			setDebugOptions(options)

			// Load saved debug data from localStorage
			const saved = localStorage.getItem(DEBUG_DATA_KEY)
			setSelectedDebug(saved || 'none')
		} finally {
			setIsLoading(false)
		}
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
