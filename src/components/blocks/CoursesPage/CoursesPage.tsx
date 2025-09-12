'use client'

import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { Footer } from '../PageBlocks/Footer/Footer'
import { CoursesHero } from './CoursesHero/CoursesHero'
import styles from './CoursesPage.module.scss'
import { GetStartedSection } from './GetStartedSection/GetStartedSection'
import { OutcomesSection } from './OutcomesSection/OutcomesSection'
import { ProgramOverview } from './ProgramOverview/ProgramOverview'
import { StormChasingSection } from './StormChasingSection/StormChasingSection'
import { YearByYearOverview } from './YearByYearOverview/YearByYearOverview'

export const CoursesPage = () => {
	return (
		<ScrollArea>
			<div className={styles.coursesPage}>
				<CoursesHero />
				<YearByYearOverview />
				<ProgramOverview />
				<StormChasingSection />
				<OutcomesSection />
				<GetStartedSection />
			</div>
			<Footer />
		</ScrollArea>
	)
}
