'use client'

import { GraphicLink } from '@/components/elements/GraphicLink/GraphicLink'
import { HYDRO_TEXT_PRODUCT_FFG_1HR_ID, HYDRO_TEXT_PRODUCT_MRMS_QPE_1HR_ID, HYDRO_TEXT_PRODUCT_QPF_DAY1_ID } from '@/data/text/hydrological/products'
import { getHydroLatestGraphics } from '@/util/dataCalls/text/query-hydrological'
import { useEffect, useState } from 'react'
import styles from './AnalysisSection.module.scss'

interface LatestGraphicsResponse {
	error?: boolean
	files?: {
		eroday1?: string
		eroday2?: string
		eroday3?: string
		qpfday1?: string
		mrms1hr?: string
		ffg1hr?: string
	}
}

export const AnalysisSection = () => {
	const hydroBasePath = '/weather-data/text-hazards-outlooks/nws-rfc-hydrological'
	const [latestGraphics, setLatestGraphics] = useState<LatestGraphicsResponse | null>(null)

	useEffect(() => {
		const fetchLatestGraphics = async () => {
			const data = await getHydroLatestGraphics()
			if (data) {
				setLatestGraphics(data as LatestGraphicsResponse)
			}
		}
		fetchLatestGraphics()
	}, [])

	const analysisProducts = [
		{
			id: 'qpf',
			label: 'Day 1 QPF',
			graphicKey: 'qpfday1' as const,
			linkUrl: `${hydroBasePath}/graphics/${HYDRO_TEXT_PRODUCT_QPF_DAY1_ID}`,
		},
		{
			id: 'mrms',
			label: '1 Hour MRMS',
			graphicKey: 'mrms1hr' as const,
			linkUrl: `${hydroBasePath}/graphics/${HYDRO_TEXT_PRODUCT_MRMS_QPE_1HR_ID}`,
		},
		{
			id: 'ffg',
			label: '1 Hour FFG',
			graphicKey: 'ffg1hr' as const,
			linkUrl: `${hydroBasePath}/graphics/${HYDRO_TEXT_PRODUCT_FFG_1HR_ID}`,
		},
	]

	return (
		<section className={styles.analysisSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Analysis Products</h1>
					<p className={styles.subtitle}>
						Quantitative Precipitation Forecasts (QPF), Multi-Radar Multi-Sensor (MRMS) precipitation estimates, and Flash Flood Guidance
						(FFG) products provide critical data for flood forecasting. These analyses help forecasters identify areas where rainfall may
						exceed the capacity of local drainage systems.
					</p>
				</div>
				<div className={styles.content}>
					{analysisProducts.map(({ id, label, graphicKey, linkUrl }) => {
						const graphicUrl = latestGraphics?.files?.[graphicKey] || ''

						return <GraphicLink key={id} imageUrl={graphicUrl} label={`View ${label}`} linkUrl={linkUrl} />
					})}
				</div>
			</div>
		</section>
	)
}
