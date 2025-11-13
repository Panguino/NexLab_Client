'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import styles from './AnalysisPage.module.scss'
import { AnalysisHero } from './components/AnalysisHero/AnalysisHero'
import { CategoriesSection } from './components/CategoriesSection/CategoriesSection'
import { DonateSection } from './components/DonateSection/DonateSection'

export const AnalysisPage = () => {
	return (
		<ScrollArea>
			<div className={styles.analysisPage}>
				<AnalysisHero />
				<CategoriesSection />
				<DonateSection />
			</div>
			<Footer />
		</ScrollArea>
	)
}
