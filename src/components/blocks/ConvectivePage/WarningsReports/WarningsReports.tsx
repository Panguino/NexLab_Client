'use client'

import { ConvectiveProductCard } from '@/components/elements/ConvectiveProductCard/ConvectiveProductCard'
import { getLocalStormReports } from '@/util/dataCalls/text/query-convective'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './WarningsReports.module.scss'

export const WarningsReports = () => {
	const router = useRouter()
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

	const handleViewWarningsMap = () => {
		router.push('/weather-data/text-hazards-outlooks/spc-convective-weather/warnings/map')
	}

	const handleViewWarningsTable = () => {
		router.push('/weather-data/text-hazards-outlooks/spc-convective-weather/warnings/table')
	}

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
					<div className={styles.warningsSection}>
						<h2>Active Convective Warnings</h2>
						<p>
							View current tornado warnings, severe thunderstorm warnings, and flash flood warnings across the United States. Track
							active severe weather in real-time and access detailed warning information.
						</p>
						<div className={styles.buttonGroup}>
							<button className={styles.viewButton} onClick={handleViewWarningsMap}>
								View Warnings Map
							</button>
							<button className={`${styles.viewButton} ${styles.secondary}`} onClick={handleViewWarningsTable}>
								View Warnings Table
							</button>
						</div>
					</div>
					<ConvectiveProductCard
						icon={faTable}
						title="Local Storm Reports"
						description="View recent local storm reports"
						stat={`${reportCount} reports in last 3 days`}
						isLoading={isLoading}
						linkUrl="/weather-data/text-hazards-outlooks/spc-convective-weather/reports"
					/>
				</div>
			</div>
		</section>
	)
}
