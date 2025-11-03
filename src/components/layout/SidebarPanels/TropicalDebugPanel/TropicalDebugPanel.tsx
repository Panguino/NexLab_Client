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

export const TropicalDebugPanel = () => {
	const [debugOptions, setDebugOptions] = useState<DebugOption[]>([])
	const [selectedDebug, setSelectedDebug] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	// Fetch available debug data files
	useEffect(() => {
		const fetchAvailableFiles = async () => {
			setIsLoading(true)
			try {
				// Create options for all days in October 2025
				const options: DebugOption[] = [{ label: 'No Storms', value: 'none' }]

				// Add all 31 days of October 2025
				for (let day = 1; day <= 31; day++) {
					const dayStr = String(day).padStart(2, '0')
					const dateLabel = `2025-10-${dayStr} 23:40`
					const url = `https://climate.cod.edu/data/tropical/currentstorms/CurrentStorms_202510${dayStr}2340.json`
					options.push({ label: dateLabel, value: url })
				}

				setDebugOptions(options)

				// Load saved debug data from localStorage
				const saved = localStorage.getItem(DEBUG_DATA_KEY)
				setSelectedDebug(saved || 'none')
			} catch (error) {
				console.error('Error fetching debug options:', error)
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
