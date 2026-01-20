'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { AnalysisSection } from './AnalysisSection/AnalysisSection'
import { EROSection } from './EROSection/EROSection'
import { GeneralTextSection } from './GeneralTextSection/GeneralTextSection'
import styles from './TextHydrologicalPage.module.scss'

export const TextHydrologicalPage = () => {
	return (
		<ScrollArea>
			<div className={styles.textHydrologicalPage}>
				<EROSection />
				<AnalysisSection />
				<GeneralTextSection />
			</div>
			<Footer />
		</ScrollArea>
	)
}
