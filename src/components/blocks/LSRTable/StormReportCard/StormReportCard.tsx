'use client'

import { useEffect, useRef } from 'react'
import styles from './StormReportCard.module.scss'

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

interface StormReportCardProps {
	report: StormReport
	position: { top: number; left: number }
	showAbove: boolean
	onClose: () => void
}

const StormReportCard = ({ report, position, showAbove, onClose }: StormReportCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null)

	// Close card when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	return (
		<div
			ref={cardRef}
			className={`${styles.stormReportCard} ${showAbove ? styles.above : styles.below}`}
			style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
			}}
		>
			<div className={styles.cardHeader}>
				<div className={styles.eventTitle}>{report.event}</div>
				<button onClick={onClose} className={styles.closeButton} title="Close">
					×
				</button>
			</div>
			<div className={styles.cardContent}>
				<div className={styles.cardRow}>
					<span className={styles.label}>Time:</span>
					<span className={styles.value}>{report.valid_time_short}</span>
				</div>
				<div className={styles.cardRow}>
					<span className={styles.label}>Location:</span>
					<span className={styles.value}>{report.location}</span>
				</div>
				<div className={styles.cardRow}>
					<span className={styles.label}>County:</span>
					<span className={styles.value}>
						{report.county}, {report.state}
					</span>
				</div>
				<div className={styles.cardRow}>
					<span className={styles.label}>Coordinates:</span>
					<span className={styles.value}>
						{report.latlon[0].toFixed(4)}, {report.latlon[1].toFixed(4)}
					</span>
				</div>
				{report.magnitude_str && (
					<div className={styles.cardRow}>
						<span className={styles.label}>Magnitude:</span>
						<span className={styles.value}>{report.magnitude_str}</span>
					</div>
				)}
				<div className={styles.cardRow}>
					<span className={styles.label}>Source:</span>
					<span className={styles.value}>{report.source}</span>
				</div>
				<div className={styles.cardRow}>
					<span className={styles.label}>Office:</span>
					<span className={styles.value}>{report.office_plain}</span>
				</div>
				{report.remark && (
					<div className={styles.cardRow}>
						<span className={styles.label}>Remark:</span>
						<span className={styles.value}>{report.remark}</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default StormReportCard
