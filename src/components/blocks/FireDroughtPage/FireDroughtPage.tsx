'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { FireDiscussions } from './FireDiscussions/FireDiscussions'
import styles from './FireDroughtPage.module.scss'
import { FireGraphics } from './FireGraphics/FireGraphics'
import { FireHazards } from './FireHazards/FireHazards'

export const FireDroughtPage = () => {
	return (
		<ScrollArea>
			<div className={styles.fireDroughtPage}>
				<FireDiscussions />
				<FireHazards />
				<FireGraphics />
			</div>
			<Footer />
		</ScrollArea>
	)
}
