'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import dynamic from 'next/dynamic'
import styles from './StormReportsPage.module.scss'

// Dynamically import LSRTable to avoid SSR issues with AG Grid
const LSRTable = dynamic(() => import('@/components/blocks/LSRTable/LSRTable'), {
	ssr: false,
})

export const StormReportsPage = () => {
	return (
		<ScrollArea>
			<div className={styles.stormReportsPage}>
				<div className={styles.header}>
					<h1>Local Storm Reports</h1>
					<p className={styles.description}>Combined local storm reports from the National Weather Service</p>
				</div>

				<div className={styles.tableContainer}>
					<LSRTable />
				</div>
			</div>
			<Footer />
		</ScrollArea>
	)
}
