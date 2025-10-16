'use client'

import { GoogleFormEmbed } from '@/components/blocks/FeedbackPage/GoogleFormEmbed/GoogleFormEmbed'
import { WebFormHero } from '@/components/blocks/FeedbackPage/WebFormHero/WebFormHero'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import styles from './WebFormPage.module.scss'

export const WebFormPage = () => {
	return (
		<ScrollArea>
			<div className={styles.webFormPage}>
				<WebFormHero />
				<GoogleFormEmbed />
			</div>
			<Footer />
		</ScrollArea>
	)
}
