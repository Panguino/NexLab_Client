'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { ForecastDiscussions } from './ForecastDiscussions/ForecastDiscussions'
import styles from './TextForecastPage.module.scss'
import { WPCFrontsSection } from './WPCFrontsSection/WPCFrontsSection'

export const TextForecastPage = () => {
	return (
		<ScrollArea>
			<div className={styles.textForecastPage}>
				<WPCFrontsSection />
				<ForecastDiscussions />
			</div>
			<Footer />
		</ScrollArea>
	)
}
