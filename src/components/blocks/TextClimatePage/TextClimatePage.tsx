'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { DiscussionsSection } from './DiscussionsSection/DiscussionsSection'
import { SSTOLRSection } from './SSTOLRSection/SSTOLRSection'
import styles from './TextClimatePage.module.scss'

export const TextClimatePage = () => {
	return (
		<ScrollArea>
			<div className={styles.textClimatePage}>
				<DiscussionsSection />
				<SSTOLRSection />
			</div>
			<Footer />
		</ScrollArea>
	)
}
