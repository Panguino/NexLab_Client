'use client'

import { GraphicLink } from '@/components/elements/GraphicLink/GraphicLink'
import {
	CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_HAWAIIAN_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_SEASONAL_TEMP_OUTLOOK_ID,
	CLIMATE_TEXT_PRODUCT_TROPICAL_PACIFIC_SST_ID,
	CLIMATE_TEXT_PRODUCTS,
} from '@/data/text/climate/products'
import { getClimateLatestGraphics } from '@/util/dataCalls/text/query-climate'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './DiscussionsSection.module.scss'

interface LatestGraphicsResponse {
	error?: []
	files?: {
		'6_10_temp'?: string
		'6_10_prcp'?: string
		'8_14_temp'?: string
		'8_14_prcp'?: string
		monthly_temp?: string
		monthly_prcp?: string
		seasonal_temp?: string
		seasonal_prcp?: string
		sstolr?: string
	}
}

export const DiscussionsSection = () => {
	const router = useRouter()
	const climateBasePath = '/weather-data/text-hazards-outlooks/cpc-climate'
	const [latestGraphics, setLatestGraphics] = useState<LatestGraphicsResponse | null>(null)

	useEffect(() => {
		const fetchLatestGraphics = async () => {
			const data = await getClimateLatestGraphics()
			if (data) {
				setLatestGraphics(data)
			}
		}
		fetchLatestGraphics()
	}, [])

	// Products with graphics
	const graphicProducts = [
		{
			id: CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID,
			graphicKey: '6_10_temp' as const,
			linkUrl: `${climateBasePath}/outlooks/${CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID}/latest`,
		},
		{
			id: CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID,
			graphicKey: 'monthly_temp' as const,
			linkUrl: `${climateBasePath}/outlooks/${CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID}/latest`,
		},
		{
			id: CLIMATE_TEXT_PRODUCT_SEASONAL_TEMP_OUTLOOK_ID,
			graphicKey: 'seasonal_temp' as const,
			linkUrl: `${climateBasePath}/seasonal/${CLIMATE_TEXT_PRODUCT_SEASONAL_TEMP_OUTLOOK_ID}/latest`,
		},
	]

	// Text-only products
	const textOnlyProducts = [
		{
			id: CLIMATE_TEXT_PRODUCT_HAWAIIAN_OUTLOOK_ID,
			linkUrl: `${climateBasePath}/text/${CLIMATE_TEXT_PRODUCT_HAWAIIAN_OUTLOOK_ID}/latest`,
		},
		{
			id: CLIMATE_TEXT_PRODUCT_TROPICAL_PACIFIC_SST_ID,
			linkUrl: `${climateBasePath}/text/${CLIMATE_TEXT_PRODUCT_TROPICAL_PACIFIC_SST_ID}/latest`,
		},
	]

	const handleTextLinkClick = (linkUrl: string) => {
		router.push(linkUrl)
	}

	return (
		<section className={styles.discussionsSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Climate Outlooks & Discussions</h1>
					<p className={styles.subtitle}>
						Climate Prediction Center (CPC) outlooks provide extended-range forecasts of temperature and precipitation probabilities.
						These products help users understand expected climate conditions from 6 days to several months ahead, supporting long-range
						planning and decision-making.
					</p>
				</div>
				<div className={styles.content}>
					{graphicProducts.map(({ id, graphicKey, linkUrl }) => {
						const product = CLIMATE_TEXT_PRODUCTS[id]
						const graphicUrl = latestGraphics?.files?.[graphicKey] || ''
						if (!product) return null

						return <GraphicLink key={id} imageUrl={graphicUrl} label={`View ${product.label}`} linkUrl={linkUrl} />
					})}
				</div>
				<div className={styles.textLinks}>
					<h2>Text-Only Discussions</h2>
					<div className={styles.splitContent}>
						<div className={styles.descriptionSection}>
							<p>
								Additional climate products from the Climate Prediction Center provide specialized outlooks for specific regions and
								ocean conditions that are available as text-only discussions.
							</p>
						</div>
						<div className={styles.linksSection}>
							{textOnlyProducts.map(({ id, linkUrl }) => {
								const product = CLIMATE_TEXT_PRODUCTS[id]
								if (!product) return null

								return (
									<div key={id} className={styles.linkItem} onClick={() => handleTextLinkClick(linkUrl)}>
										<FontAwesomeIcon icon={faFileLines} className={styles.linkIcon} />
										<span className={styles.linkText}>{product.label}</span>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
