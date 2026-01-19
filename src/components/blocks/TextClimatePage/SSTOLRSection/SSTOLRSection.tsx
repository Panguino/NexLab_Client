'use client'

import { GraphicLink } from '@/components/elements/GraphicLink/GraphicLink'
import { CLIMATE_TEXT_PRODUCT_SST_ID } from '@/data/text/climate/products'
import { CLIMATE_TEXT_SSTOLR_SECTOR_WORLD_ID } from '@/data/text/climate/sectors'
import { getClimateLatestGraphics } from '@/util/dataCalls/text/query-climate'
import { useEffect, useState } from 'react'
import styles from './SSTOLRSection.module.scss'

interface LatestGraphicsResponse {
	error: string[]
	files: {
		sstolr?: string
		[key: string]: string | undefined
	}
}

export const SSTOLRSection = () => {
	const climateBasePath = '/weather-data/text-hazards-outlooks/cpc-climate'
	const [latestGraphics, setLatestGraphics] = useState<LatestGraphicsResponse | null>(null)

	useEffect(() => {
		const fetchLatestGraphics = async () => {
			const data = await getClimateLatestGraphics()
			if (data) {
				setLatestGraphics(data as LatestGraphicsResponse)
			}
		}
		fetchLatestGraphics()
	}, [])

	const sstolrGraphicUrl = latestGraphics?.files?.sstolr || ''

	return (
		<section className={styles.sstolrSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>SST & OLR Analysis</h1>
					<p className={styles.subtitle}>
						Sea Surface Temperature (SST) and Outgoing Longwave Radiation (OLR) products provide critical data for understanding
						ocean-atmosphere interactions. These analyses are essential for monitoring El Niño/La Niña conditions, tropical convection
						patterns, and global climate variability.
					</p>
				</div>
				<div className={styles.content}>
					<GraphicLink
						imageUrl={sstolrGraphicUrl}
						label="View SST & OLR Animator"
						linkUrl={`${climateBasePath}/sst-olr/${CLIMATE_TEXT_PRODUCT_SST_ID}/${CLIMATE_TEXT_SSTOLR_SECTOR_WORLD_ID}`}
					/>
				</div>
			</div>
		</section>
	)
}
