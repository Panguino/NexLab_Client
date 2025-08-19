'use client'

import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { useParams } from 'next/navigation'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './ForecastCompareModelsSidebarPanel.module.scss'

const ForecastCompareModelsSidebarPanel = () => {
	const {
		fcstModel: modelId,
		fcstRun: runId,
		fcstSector: sectorId,
		fcstLevel: levelId,
		fcstProduct: productId,
		fcstCompareValid: validTimeId,
	} = useParams()
	const returnLink = `/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${levelId}/${productId}`

	return (
		<ScrollArea>
			<div className={styles.ForecastCompareModelsSidebarPanel}>
				<SidebarSectionHeader name="Return to Forecast Models" linkUrl={returnLink} />
				<p>Compare Models Sidebar</p>
				<p>Parameters:</p>
				<ul>
					<li>Model: {modelId}</li>
					<li>Run: {runId}</li>
					<li>Sector: {sectorId}</li>
					<li>Level: {levelId}</li>
					<li>Product: {productId}</li>
					<li>Valid Time: {validTimeId}</li>
				</ul>
			</div>
		</ScrollArea>
	)
}

export default ForecastCompareModelsSidebarPanel
