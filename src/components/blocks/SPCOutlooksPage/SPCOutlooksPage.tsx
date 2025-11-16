'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CONVECTIVE_PRODUCTS } from '@/data/text/convective/products'
import styles from './SPCOutlooksPage.module.scss'

interface SPCOutlooksPageProps {
	productId: string
	validTime: string
}

export const SPCOutlooksPage = ({ productId, validTime }: SPCOutlooksPageProps) => {
	const product = CONVECTIVE_PRODUCTS[productId]
	const pageTitle = product ? `SPC Convective Outlook ${product.title}` : 'SPC Convective Outlook'

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
							<div className={styles.graphicPlaceholder}>
								<p>Categorical Outlook Graphic</p>
							</div>
							<div className={styles.graphicPlaceholder}>
								<p>Tornado Probability Graphic</p>
							</div>
							<div className={styles.graphicPlaceholder}>
								<p>Wind Probability Graphic</p>
							</div>
							<div className={styles.graphicPlaceholder}>
								<p>Hail Probability Graphic</p>
							</div>
							<div className={styles.graphicPlaceholder}>
								<p>Significant Tornado Graphic</p>
							</div>
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
