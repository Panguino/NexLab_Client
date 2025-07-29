import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import styles from './TimeSelector.module.css' // Import CSS module

type time = {
	label: string // Display label for the time
	value: string // Value of the time in the format "HHZ MM-DD-YYYY"
}
interface TimeSelectorProps {
	times: time[] // Array of times in the format "HHZ MM-DD-YYYY"
	time: string | null // Currently selected time
	timeName: string | null // Optional prop to display a custom name for the time selector
	timesPerRow?: number // New prop with default value
	opensDown?: boolean // Optional prop to control dropdown direction
	onSelect: (selectedTime: string) => void // Callback when a time is selected
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({ times, time, timeName, timesPerRow = 4, onSelect, opensDown = false }) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const selectedTimeLabel = times.find((t) => t.value === time)?.label || 'Select a Time'
	const arrowDirection = isOpen || !opensDown ? 'rotate(180deg)' : 'rotate(0deg)'

	const groupedTimes = times.reduce(
		(acc, currentTime) => {
			const [zValue, date] = currentTime.label.split(' ') // Extract zValue and date
			if (!acc[date]) acc[date] = []
			acc[date].push({ zValue, time: currentTime })
			return acc
		},
		{} as Record<string, { zValue: string; time: time }[]>,
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

	return (
		<div className={styles.timeSelector}>
			<div className={styles.timeSelectorButton} onClick={() => setIsOpen(!isOpen)}>
				<span>
					{timeName || 'Time'}: {selectedTimeLabel || `Select a ${timeName || 'Time'}`}
				</span>{' '}
				<motion.div className={styles.arrow} animate={{ transform: `${arrowDirection}` }}>
					<FontAwesomeIcon icon={faChevronDown} />
				</motion.div>
			</div>
			{isOpen && (
				<div className={`${styles.timeSelectorDropdown} ${opensDown ? styles.openDown : ''}`} ref={dropdownRef}>
					{Object.entries(groupedTimes)
						.reverse()
						.map(([date, zTimes]) => (
							<div key={date} className={styles.timeSelectorRow}>
								<div className={styles.timeSelectorDate}>{date}</div>
								<div className={styles.timeSelectorGridContainer}>
									{chunkArray(zTimes, timesPerRow)
										.reverse()
										.map((rowChunk, rowIndex) => (
											<div
												key={`${date}-row-${rowIndex}`}
												className={`${styles.timeSelectorGrid} ${styles[`timeSelectorGrid${timesPerRow}`]}`}
											>
												{rowChunk.map(({ zValue, time: { value } }) => (
													<div
														key={value}
														className={`${styles.timeSelectorCell} ${value === time ? styles.active : ''}`}
														onClick={() => {
															onSelect(value)
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
