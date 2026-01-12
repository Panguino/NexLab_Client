'use client'

import { ConvectiveProductCard } from '@/components/elements/ConvectiveProductCard/ConvectiveProductCard'
import { getLocalStormReports } from '@/util/dataCalls/text/query-convective'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import styles from './WarningsReports.module.scss'

export const WarningsReports = () => {
	const [reportCount, setReportCount] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchReportCount = async () => {
			try {
				const data = await getLocalStormReports()
				if (data && Array.isArray(data)) {
					setReportCount(data.length)
				} else {
					setReportCount(0)
				}
			} catch (error) {
				console.error('Error fetching local storm reports:', error)
				setReportCount(0)
			} finally {
				setIsLoading(false)
			}
		}

		fetchReportCount()
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
					<div className={styles.graphicPlaceholder}>
						<p>Active Warnings Map</p>
					</div>
					<ConvectiveProductCard
						icon={faTable}
						title="Local Storm Reports"
						description="View recent local storm reports"
						stat={`${reportCount} reports in last 3 days`}
						isLoading={isLoading}
						linkUrl="/weather-data/text-hazards-outlooks/spc-convective-weather/local-storm-reports"
					/>
				</div>
			</div>
		</section>
	)
}
