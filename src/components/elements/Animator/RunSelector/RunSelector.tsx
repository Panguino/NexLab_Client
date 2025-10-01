import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import styles from './RunSelector.module.css' // Import CSS module

type run = {
	label: string // Display label for the run
	value: string // Value of the run in the format "HHZ MM-DD-YYYY"
}
interface RunSelectorProps {
	runs: run[] // Array of runs in the format "HHZ MM-DD-YYYY"
	run: string | null // Currently selected run
	runsPerRow?: number // New prop with default value
	onSelect: (selectedRun: string) => void // Callback when a run is selected
}

export const RunSelector: React.FC<RunSelectorProps> = ({ runs, run, runsPerRow = 4, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const [selectedRunLabel, setSelectedRunLabel] = useState<string | null>('Select a Run')
	const [activeRun, setActiveRun] = useState<string | null>(run)

	useEffect(() => {
		if (run) {
			const selectedRun = runs.find((r) => r.value === run)
			setSelectedRunLabel(selectedRun?.label || 'Select a Run')
		}
	}, [run, runs])

	const groupedRuns = runs.reduce(
		(acc, currentRun) => {
			const [zValue, date] = currentRun.label.split(' ') // Extract zValue and date
			if (!acc[date]) acc[date] = []
			acc[date].push({ zValue, run: currentRun })
			return acc
		},
		{} as Record<string, { zValue: string; run: run }[]>,
	)

	// Helper function to chunk array into smaller arrays
	const chunkArray = <T,>(array: T[], size: number): T[][] => {
		return array.reduce((chunks, item, index) => {
			const chunkIndex = Math.floor(index / size)

			if (!chunks[chunkIndex]) {
				chunks[chunkIndex] = [] // Start a new chunk
			}

			chunks[chunkIndex].push(item)
			return chunks
		}, [] as T[][])
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const doInternalOnSelect = (selectedRun: string) => {
		onSelect(selectedRun)
		setActiveRun(selectedRun)
		setSelectedRunLabel(runs.find((r) => r.value === selectedRun)?.label || 'Select a Run')
	}

	return (
		<div className={styles.runSelector}>
			<div className={styles.runSelectorButton} onClick={() => setIsOpen(!isOpen)}>
				<span>Run: {selectedRunLabel || 'Select a Run'}</span>{' '}
				<motion.div className={styles.arrow} animate={{ transform: `${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}` }}>
					<FontAwesomeIcon icon={faChevronDown} />
				</motion.div>
			</div>
			{isOpen && (
				<div className={`${styles.runSelectorDropdown}`} ref={dropdownRef}>
					{Object.entries(groupedRuns)
						.reverse()
						.map(([date, zRuns]) => (
							<div key={date} className={styles.runSelectorRow}>
								<div className={styles.runSelectorDate}>{date}</div>
								<div className={styles.runSelectorGridContainer}>
									{chunkArray(zRuns, runsPerRow)
										.reverse()
										.map((rowChunk, rowIndex) => (
											<div
												key={`${date}-row-${rowIndex}`}
												className={`${styles.runSelectorGrid} ${styles[`runSelectorGrid${runsPerRow}`]}`}
											>
												{rowChunk.map(({ zValue, run: { value } }) => (
													<div
														key={value}
														className={`${styles.runSelectorCell} ${value === activeRun ? styles.active : ''}`}
														onClick={() => {
															doInternalOnSelect(value)
															setIsOpen(false)
														}}
													>
														{zValue}
													</div>
												))}
											</div>
										))}
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	)
}
