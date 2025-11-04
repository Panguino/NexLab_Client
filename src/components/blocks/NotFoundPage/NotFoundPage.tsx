'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { NotFoundHero } from './NotFoundHero/NotFoundHero'
import styles from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
	return (
		<ScrollArea>
			<div className={styles.notFoundPage}>
				<NotFoundHero />
			</div>
			<Footer />
		</ScrollArea>
	)
}
