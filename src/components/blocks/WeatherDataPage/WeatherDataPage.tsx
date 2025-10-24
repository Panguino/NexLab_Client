'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import styles from './WeatherDataPage.module.scss'
import { CategoriesSection } from './components/CategoriesSection/CategoriesSection'
import { DataHero } from './components/DataHero/DataHero'
import { DonateSection } from './components/DonateSection/DonateSection'
import { FeaturedSection } from './components/FeaturedSection/FeaturedSection'

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
