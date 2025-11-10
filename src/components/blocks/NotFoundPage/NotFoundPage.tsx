'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { ContactUs } from './ContactUs/ContactUs'
import { NotFoundHero } from './NotFoundHero/NotFoundHero'
import styles from './NotFoundPage.module.scss'
import { Suggestions } from './Suggestions/Suggestions'

export const NotFoundPage = () => {
	return (
		<ScrollArea>
			<div className={styles.notFoundPage}>
				<NotFoundHero />
				<Suggestions />
				<ContactUs />
			</div>
			<Footer />
		</ScrollArea>
	)
}
