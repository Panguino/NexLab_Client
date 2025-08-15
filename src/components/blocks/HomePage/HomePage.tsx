'use client'

import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import styles from './HomePage.module.scss'
import { HomeHero } from './HomeHero/HomeHero'
import { WeatherDataSection } from './WeatherDataSection/WeatherDataSection'
import { AcademicsSection } from './AcademicsSection/AcademicsSection'
import { StormChasingSection } from './StormChasingSection/StormChasingSection'
import { DonateSection } from './DonateSection/DonateSection'

export const HomePage = () => {
	return (
		<ScrollArea>
			<div className={styles.homePage}>
				<HomeHero />
				<WeatherDataSection />
				<AcademicsSection />
				<StormChasingSection />
				<DonateSection />
			</div>
			<Footer />
		</ScrollArea>
	)
}
