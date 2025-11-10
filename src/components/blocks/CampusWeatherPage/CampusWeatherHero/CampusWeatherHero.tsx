import { Button } from '@/components/elements/Button/Button'
import { COLLEGE_OF_DUPAGE_ID } from '@/data/campusweather/schools'
import styles from './CampusWeatherHero.module.scss'

interface ICampusWeatherHeroProps {
	bannerUrl: string
}

export const CampusWeatherHero = ({ bannerUrl }: ICampusWeatherHeroProps) => {
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.container}>
					<div className={styles.heroContent}>
						<h1>Campus Weather</h1>
						<p>
							Campus Weather is a free service provided by the College of DuPage Meteorology Department to serve the local schools
							within Community College District 502. The service provides a personalized website containing weather information for each
							school. The current suite of features includes the following:
						</p>
						<ul className={styles.featureList}>
							<li>Full set of current weather conditions</li>
							<li>7-day forecast</li>
							<li>
								Helpful links for information on school closings, weather safety and preparedness, and even your own school or
								districts written protocols for handling extreme weather.
							</li>
						</ul>
						<p className={styles.ctaText}>
							Check out our own Campus Weather page to see what it's all about! If you like what you see and would like to request this
							service for your campus, let us know!
						</p>
						<div className={styles.heroActions}>
							<Button label="View COD Campus Weather" link={`/weather-data/campus-weather/${COLLEGE_OF_DUPAGE_ID}`} target="_self" />
							<Button label="Request Campus Weather" link="/feedback/webform" target="_self" />
						</div>
					</div>
				</div>
				<div className={styles.heroImage}>
					<img src={bannerUrl} alt="College of DuPage" className={styles.image} />
				</div>
			</div>
		</section>
	)
}
