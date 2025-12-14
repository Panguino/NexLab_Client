'use client'

import { GraphicLink } from '@/components/elements/GraphicLink/GraphicLink'
import { getLatestFireGraphics } from '@/util/dataCalls/text/query-fire'
import { useEffect, useState } from 'react'
import styles from './FireGraphics.module.scss'

interface FireGraphicsData {
	wfa_kbdi?: { name: string; url: string }
	pdi?: { name: string; url: string }
	soil_moisture?: { name: string; url: string }
}

export const FireGraphics = () => {
	const [graphicsData, setGraphicsData] = useState<FireGraphicsData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const fireBasePath = '/weather-data/text-hazards-outlooks/spc-usdm-fire-weather-drought'

	useEffect(() => {
		const fetchGraphics = async () => {
			try {
				const data = await getLatestFireGraphics()
				if (data) {
					setGraphicsData(data)
				}
			} catch (error) {
				console.error('Failed to fetch fire graphics:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchGraphics()
	}, [])

	return (
		<section className={styles.fireGraphics}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Graphical Analysis Products</h1>
					<p className={styles.subtitle}>
						Explore detailed drought and fire weather analysis products including drought indices, fuel moisture conditions, and soil
						moisture data to assess current conditions and fire risk potential.
					</p>
				</div>
				<div className={styles.content}>
					{isLoading ? (
						<>
							{[1, 2, 3].map((num) => (
								<div key={num} className={styles.graphicPlaceholder}>
									<p>Loading...</p>
								</div>
							))}
						</>
					) : (
						<>
							{graphicsData?.wfa_kbdi && (
								<GraphicLink
									imageUrl={graphicsData.wfa_kbdi.url}
									label="View Keetch-Byram Drought Index"
									linkUrl={`${fireBasePath}/graphic-analysis/wfa_kbdi`}
								/>
							)}
							{graphicsData?.pdi && (
								<GraphicLink
									imageUrl={graphicsData.pdi.url}
									label="View Palmer Drought Index"
									linkUrl={`${fireBasePath}/graphic-analysis/pdi`}
								/>
							)}
							{graphicsData?.soil_moisture && (
								<GraphicLink
									imageUrl={graphicsData.soil_moisture.url}
									label="View Daily Soil Moisture"
									linkUrl={`${fireBasePath}/graphic-analysis/sm_total_daily`}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</section>
	)
}
