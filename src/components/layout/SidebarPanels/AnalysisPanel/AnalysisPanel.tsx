'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'

import SidebarGrid from '@/components/elements/SidebarGrid/SidebarGrid'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import {
	ANALYSIS_TEXT_MRMS_QPE_PRODUCTS,
	ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS,
	ANALYSIS_TEXT_SEL_CITY_PRODUCTS,
	ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS,
} from '@/data/text/analysis/products'
import styles from './AnalysisPanel.module.scss'

interface AnalysisPanelProps {
	basepath: string
}

const AnalysisPanel = ({ basepath }: AnalysisPanelProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const { analysisProdId, mrmsProdId } = useParams()

	// Full path to Analysis section
	const analysisBasePath = `${basepath}/analysis`

	// Check if we're deeper than the main analysis page
	const isOnSubpage = pathname !== analysisBasePath && pathname.startsWith(analysisBasePath)

	return (
		<>
			<SidebarSectionHeader name="Analysis" linkUrl={basepath} />

			{isOnSubpage && (
				<div className={styles.backToMain}>
					<button onClick={() => router.push(analysisBasePath)} className={styles.backButton}>
						&larr; Return to Analysis Main
					</button>
				</div>
			)}

			<SidebarGroup title="Selected City Summaries">
				<SidebarGrid columns={2}>
					{Object.entries(ANALYSIS_TEXT_SEL_CITY_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${analysisBasePath}/text/${productId}/latest`}
							active={analysisProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="Temp & Weather Tables">
				<SidebarGrid columns={2}>
					{Object.entries(ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${analysisBasePath}/text/${productId}/latest`}
							active={analysisProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="Regional Weather Roundups">
				<SidebarGrid columns={2}>
					{Object.entries(ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${analysisBasePath}/text/${productId}/latest`}
							active={analysisProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>

			<SidebarGroup title="MRMS QPE Analysis">
				<SidebarGrid columns={4}>
					{Object.entries(ANALYSIS_TEXT_MRMS_QPE_PRODUCTS).map(([productId, product]) => (
						<SidebarLink
							key={productId}
							name={product.label}
							linkUrl={`${analysisBasePath}/MRMS/${productId}`}
							active={mrmsProdId === productId}
						/>
					))}
				</SidebarGrid>
			</SidebarGroup>
		</>
	)
}

export default AnalysisPanel
