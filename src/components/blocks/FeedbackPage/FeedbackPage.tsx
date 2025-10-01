'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { DiscordRequirements } from './DiscordRequirements/DiscordRequirements'
import { FeedbackHero } from './FeedbackHero/FeedbackHero'
import styles from './FeedbackPage.module.scss'

export const FeedbackPage = () => {
	return (
		<ScrollArea>
			<div className={styles.feedbackPage}>
				<FeedbackHero />
				<DiscordRequirements />
			</div>
			<Footer />
		</ScrollArea>
	)
}
