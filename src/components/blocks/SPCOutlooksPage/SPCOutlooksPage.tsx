'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CONVECTIVE_PRODUCTS } from '@/data/text/convective/products'
import { getConvectiveOutlookGraphics } from '@/util/dataCalls/text/query-convective'
import { useEffect, useState } from 'react'
import styles from './SPCOutlooksPage.module.scss'

interface SPCOutlooksPageProps {
	productId: string
	validTime: string
}

interface GraphicData {
	url: string
	period: string
	type: string
}

interface OutlookGraphicsData {
	graphics: GraphicData[]
	img: {
		height: number
		width: number
	}
}

export const SPCOutlooksPage = ({ productId, validTime }: SPCOutlooksPageProps) => {
	const [graphicsData, setGraphicsData] = useState<OutlookGraphicsData | null>(null)
	const [isLoadingGraphics, setIsLoadingGraphics] = useState(true)

	const product = CONVECTIVE_PRODUCTS[productId]
	const pageTitle = product ? `SPC Convective Outlook ${product.title}` : 'SPC Convective Outlook'

	useEffect(() => {
		const fetchGraphics = async () => {
			try {
				const data = await getConvectiveOutlookGraphics(productId, validTime)
				if (data) {
					setGraphicsData(data)
				}
			} catch (error) {
				console.error('Failed to fetch outlook graphics:', error)
			} finally {
				setIsLoadingGraphics(false)
			}
		}

		fetchGraphics()
	}, [productId, validTime])

	return (
		<ScrollArea>
			<div className={styles.spcOutlooksPage}>
				<div className={styles.titleSection}>
					<h1>{pageTitle}</h1>
					<p className={styles.validTime}>Valid Time: {validTime}</p>
				</div>

				<div className={styles.contentSection}>
					<div className={styles.graphicsPanel}>
						<h2>Graphics</h2>
						<div className={styles.graphicsContainer}>
							{isLoadingGraphics ? (
								<div className={styles.graphicPlaceholder}>
									<p>Loading graphics...</p>
								</div>
							) : graphicsData?.graphics && graphicsData.graphics.length > 0 ? (
								graphicsData.graphics.map((graphic, index) => (
									<div key={index} className={styles.graphicItem}>
										<p className={styles.graphicLabel}>
											Day {graphic.period} - {graphic.type} Risk
										</p>
										<img src={graphic.url} alt={`Day ${graphic.period} - ${graphic.type} Risk`} className={styles.graphic} />
									</div>
								))
							) : (
								<div className={styles.graphicPlaceholder}>
									<p>No graphics available</p>
								</div>
							)}
						</div>
					</div>

					<div className={styles.textPanel}>
						<h2>Discussion</h2>
						<div className={styles.textContent}>
							<p>
								<strong>Placeholder Discussion Text</strong>
							</p>
							<p>
								This is where the full text discussion from the SPC convective outlook will be displayed. The discussion typically
								includes detailed meteorological analysis, reasoning for the forecast, and specific threat areas.
							</p>
							<p>
								The text discussion will be fetched from the data query and displayed here with proper formatting and line breaks to
								maintain readability.
							</p>
							<p>
								Additional paragraphs and sections from the outlook discussion will follow, providing forecasters' insights into the
								severe weather potential for the day.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</ScrollArea>
	)
}
