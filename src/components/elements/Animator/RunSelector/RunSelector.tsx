import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import styles from './RunSelector.module.css' // Import CSS module

type run = {
	label: string // Display label for the run
	value: string // Value of the run in the format "XXZ MM-DD-YYYY"
}
interface RunSelectorProps {
	runs: run[] // Array of runs in the format "XXZ MM-DD-YYYY"
	run: string | null // Currently selected run
	onSelect: (selectedRun: string) => void // Callback when a run is selected
}

export const RunSelector: React.FC<RunSelectorProps> = ({ runs, run, onSelect }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const selectedRunLabel = runs.find((r) => r.value === run)?.label || 'Select a Run'

	const groupedRuns = runs.reduce(
		(acc, currentRun) => {
			const [zValue, date] = currentRun.label.split(' ') // Extract zValue and date
			if (!acc[date]) acc[date] = []
			acc[date].push({ zValue, run: currentRun })
			return acc
		},
		{} as Record<string, { zValue: string; run: run }[]>,
	)

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

	return (
		<div className={styles.runSelector}>
			<div className={styles.runSelectorButton} onClick={() => setIsOpen(!isOpen)}>
				<span>Run: {selectedRunLabel || 'Select a Run'}</span>{' '}
				<motion.div className={styles.arrow} animate={{ transform: `${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}` }}>
					<FontAwesomeIcon icon={faChevronDown} />
				</motion.div>
			</div>
			{isOpen && (
				<div className={styles.runSelectorDropdown} ref={dropdownRef}>
					{Object.entries(groupedRuns)
						.reverse()
						.map(([date, zRuns]) => (
							<div key={date} className={styles.runSelectorRow}>
								<div className={styles.runSelectorDate}>{date}</div>
								<div className={styles.runSelectorGrid}>
									{zRuns.map(({ zValue, run: { value } }) => (
										<div
											key={value}
											className={`${styles.runSelectorCell} ${value === run ? styles.active : ''}`}
											onClick={() => {
												onSelect(value)
												setIsOpen(false)
											}}
										>
											{zValue}
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
