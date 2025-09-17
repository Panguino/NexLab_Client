'use client'

import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import styles from './WeatherDataPage.module.scss'
import { DataHero } from './components/DataHero/DataHero'
import { CategoriesSection } from './components/CategoriesSection/CategoriesSection'
import { FeaturedSection } from './components/FeaturedSection/FeaturedSection'
import { DonateSection } from './components/DonateSection/DonateSection'

export const WeatherDataPage = () => {
	return (
		<ScrollArea>
			<div className={styles.weatherDataPage}>
				<DataHero />
				<CategoriesSection />
				<FeaturedSection />
				<DonateSection />
			</div>
			<Footer />
		</ScrollArea>
	)
}
