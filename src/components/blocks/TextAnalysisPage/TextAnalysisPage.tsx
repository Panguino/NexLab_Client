'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CitySummaries } from './CitySummaries/CitySummaries'
import { MRMSSection } from './MRMSSection/MRMSSection'
import { RegionalRoundups } from './RegionalRoundups/RegionalRoundups'
import { TempWeatherTables } from './TempWeatherTables/TempWeatherTables'
import styles from './TextAnalysisPage.module.scss'

export const TextAnalysisPage = () => {
	return (
		<ScrollArea>
			<div className={styles.textAnalysisPage}>
				<MRMSSection />
				<CitySummaries />
				<TempWeatherTables />
				<RegionalRoundups />
			</div>
			<Footer />
		</ScrollArea>
	)
}
