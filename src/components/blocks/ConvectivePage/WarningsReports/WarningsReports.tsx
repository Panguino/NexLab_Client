'use client'

import { ConvectiveProductCard } from '@/components/elements/ConvectiveProductCard/ConvectiveProductCard'
import { getConvectiveHazardsCount, getLocalStormReports } from '@/util/dataCalls/text/query-convective'
import { faExclamationTriangle, faTable } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import styles from './WarningsReports.module.scss'

export const WarningsReports = () => {
	const [hazardCount, setHazardCount] = useState<number | null>(null)
	const [reportCount, setReportCount] = useState<number | null>(null)
	const [isLoadingHazards, setIsLoadingHazards] = useState(true)
	const [isLoadingReports, setIsLoadingReports] = useState(true)

	useEffect(() => {
		const fetchCounts = async () => {
			try {
				const [hazardsCount, reportsData] = await Promise.all([getConvectiveHazardsCount(), getLocalStormReports()])

				setHazardCount(hazardsCount)
				setIsLoadingHazards(false)

				if (reportsData && Array.isArray(reportsData)) {
					setReportCount(reportsData.length)
				} else {
					setReportCount(0)
				}
				setIsLoadingReports(false)
			} catch (error) {
				console.error('Error fetching warnings and reports data:', error)
				setHazardCount(0)
				setReportCount(0)
				setIsLoadingHazards(false)
				setIsLoadingReports(false)
			}
		}

		fetchCounts()
	}, [])

	return (
		<section className={styles.warningsReports}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Warnings and Reports</h1>
					<p className={styles.subtitle}>
						Real-time severe weather warnings and local storm reports provide critical information about active severe weather events.
						This section displays current warnings across the country and documented reports of tornadoes, large hail, and damaging winds.
					</p>
				</div>
				<div className={styles.content}>
					<ConvectiveProductCard
						icon={faExclamationTriangle}
						title="Active Convective Hazards"
						description="View current convective warnings"
						stat={`${hazardCount} currently active`}
						isLoading={isLoadingHazards}
						linkUrl="/weather-data/text-hazards-outlooks/spc-convective-weather/warnings"
					/>
					<ConvectiveProductCard
						icon={faTable}
						title="Local Storm Reports"
						description="View recent local storm reports"
						stat={`${reportCount} reports in last 3 days`}
						isLoading={isLoadingReports}
						linkUrl="/weather-data/text-hazards-outlooks/spc-convective-weather/reports"
					/>
				</div>
			</div>
		</section>
	)
}
