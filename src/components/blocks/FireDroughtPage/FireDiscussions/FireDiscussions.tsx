'use client'

import { GraphicLink } from '@/components/elements/GraphicLink/GraphicLink'
import { getLatestFireGraphics } from '@/util/dataCalls/text/query-fire'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './FireDiscussions.module.scss'

interface FireGraphicsData {
	fwo_day1?: { name: string; url: string }
	fwo_day2?: { name: string; url: string }
	usdm?: { name: string; url: string }
}

export const FireDiscussions = () => {
	const router = useRouter()
	const [graphicsData, setGraphicsData] = useState<FireGraphicsData | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const fireBasePath = '/weather-data/text-hazards-outlooks/fire-drought'

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

	const handleDay38Click = () => {
		router.push(`${fireBasePath}/discussions/fwdd38/us/latest`)
	}

	return (
		<section className={styles.fireDiscussions}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Fire Weather Outlooks & Drought Monitor</h1>
					<p className={styles.subtitle}>
						The Storm Prediction Center issues fire weather outlooks highlighting areas of critical fire weather conditions. The U.S.
						Drought Monitor provides weekly updates on drought conditions across the nation.
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
							{graphicsData?.fwo_day1 && (
								<GraphicLink
									imageUrl={graphicsData.fwo_day1.url}
									label="View Day 1 Fire Weather Outlook"
									linkUrl={`${fireBasePath}/discussions/fwody1/us/latest`}
								/>
							)}
							{graphicsData?.fwo_day2 && (
								<GraphicLink
									imageUrl={graphicsData.fwo_day2.url}
									label="View Day 2 Fire Weather Outlook"
									linkUrl={`${fireBasePath}/discussions/fwody2/us/latest`}
								/>
							)}
							{graphicsData?.usdm && (
								<GraphicLink
									imageUrl={graphicsData.usdm.url}
									label="View U.S. Drought Monitor"
									linkUrl={`${fireBasePath}/discussions/usdm/Midwest/latest`}
								/>
							)}
						</>
					)}
				</div>
				<div className={styles.textLinkSection}>
					<div className={styles.linkItem} onClick={handleDay38Click}>
						<FontAwesomeIcon icon={faFileLines} className={styles.linkIcon} />
						<span className={styles.linkText}>Fire Weather Outlook Days 3-8 (Text Only)</span>
					</div>
				</div>
			</div>
		</section>
	)
}
