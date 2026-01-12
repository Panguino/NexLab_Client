'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { FORECAST_TEXT_PRODUCTS, FORECAST_TEXT_WPC_FRONT_PRODUCTS } from '@/data/text/forecast/products'
import styles from './ForecastPanel.module.scss'

interface ForecastPanelProps {
	basepath: string
}

const ForecastPanel = ({ basepath }: ForecastPanelProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const { forecastTextProdId, wpcFrontsProdId } = useParams()

	// Full path to Forecast section
	const forecastBasePath = `${basepath}/forecast`

	// Check if we're deeper than the main forecast page
	const isOnSubpage = pathname !== forecastBasePath && pathname.startsWith(forecastBasePath)

	return (
		<>
			<SidebarSectionHeader name="Forecast" linkUrl={basepath} />

			{isOnSubpage && (
				<div className={styles.backToMain}>
					<button onClick={() => router.push(forecastBasePath)} className={styles.backButton}>
						&larr; Return to Forecast Main
					</button>
				</div>
			)}

			<SidebarGroup title="Forecast Discussions">
				<SidebarGrid columns={1}>
					{Object.entries(FORECAST_TEXT_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${forecastBasePath}/text/${productId}/latest`}
							active={forecastTextProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="WPC Surface Fronts">
				<SidebarGrid columns={4}>
					{Object.entries(FORECAST_TEXT_WPC_FRONT_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${forecastBasePath}/wpcfronts/${productId}`}
							active={wpcFrontsProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>
		</>
	)
}

export default ForecastPanel
