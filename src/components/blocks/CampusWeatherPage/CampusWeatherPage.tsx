'use client'

import { CampusWidget } from '@/components/blocks/CampusWidget/CampusWidget'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CampusWeatherHero } from './CampusWeatherHero/CampusWeatherHero'
import styles from './CampusWeatherPage.module.scss'
import { WidgetShowcase } from './WidgetShowcase/WidgetShowcase'

interface ICampusWeatherPageProps {
	codCampusBannerUrl: string
	codCampusDetails: any
	codWeatherData: any
	allCampuses: any[]
	allWeatherData: any[]
}

export const CampusWeatherPage = ({ codCampusBannerUrl, codCampusDetails, codWeatherData, allCampuses, allWeatherData }: ICampusWeatherPageProps) => {
	return (
		<ScrollArea>
			<div className={styles.campusWeatherPage}>
				<CampusWeatherHero bannerUrl={codCampusBannerUrl} />
				<WidgetShowcase campusDetails={codCampusDetails} weatherData={codWeatherData} />
				<section className={styles.allWidgets}>
					<div className={styles.allWidgetsInner}>
						<h2>All Campuses Served</h2>
						<div className={styles.widgetGrid}>
							{allCampuses.map((campus) => {
								const weatherData = allWeatherData.find((weather) => weather.id === campus.documentId)
								return <CampusWidget key={campus.documentId} campusDetails={campus} weatherData={weatherData} />
							})}
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</ScrollArea>
	)
}
