'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { AcademicsSection } from './AcademicsSection/AcademicsSection'
import { DonateSection } from './DonateSection/DonateSection'
import { HomeHero } from './HomeHero/HomeHero'
import styles from './HomePage.module.scss'
import { StormChasingSection } from './StormChasingSection/StormChasingSection'
import { WeatherDataSection } from './WeatherDataSection/WeatherDataSection'

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
