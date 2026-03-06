'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { AreasOfConcern } from './AreasOfConcern/AreasOfConcern'
import styles from './ConvectivePage.module.scss'
import { SPCOutlooks } from './SPCOutlooks/SPCOutlooks'
import { StatsMessages } from './StatsMessages/StatsMessages'
import { WarningsReports } from './WarningsReports/WarningsReports'

export const ConvectivePage = () => {
	return (
		<ScrollArea>
			<div className={styles.convectivePage}>
				<SPCOutlooks />
				<WarningsReports />
				<AreasOfConcern />
				<StatsMessages />
			</div>

			<Footer />
		</ScrollArea>
	)
}
