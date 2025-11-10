import { Button } from '@/components/elements/Button/Button'
import { faChartLine, faCloudSun, faGraduationCap, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Suggestions.module.scss'

export const Suggestions = () => {
	return (
		<section id="suggestions" className={styles.suggestions}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Where Would You Like to Go?</h2>
					<p>Explore our main content areas to find what you're looking for.</p>
				</div>

				<div className={styles.suggestionCards}>
					<div className={styles.card}>
						<div className={styles.cardIcon}>
							<FontAwesomeIcon icon={faCloudSun} />
						</div>
						<div className={styles.cardContent}>
							<h3>Looking for Weather Data?</h3>
							<p>Access real-time radar, satellite imagery, forecasts, and weather analysis tools.</p>
						</div>
						<div className={styles.cardAction}>
							<Button label="View Weather Data" link="/weather-data" target="_self" />
						</div>
					</div>

					<div className={styles.card}>
						<div className={styles.cardIcon}>
							<FontAwesomeIcon icon={faGraduationCap} />
						</div>
						<div className={styles.cardContent}>
							<h3>Interested in Academic Programs?</h3>
							<p>Explore our meteorology courses, degree programs, and educational resources.</p>
						</div>
						<div className={styles.cardAction}>
							<Button label="Explore Academics" link="/academics" target="_self" />
						</div>
					</div>

					<div className={styles.card}>
						<div className={styles.cardIcon}>
							<FontAwesomeIcon icon={faChartLine} />
						</div>
						<div className={styles.cardContent}>
							<h3>Searching for Storm Chasing Info?</h3>
							<p>Find field operations, chase logs, research initiatives, and storm reports.</p>
						</div>
						<div className={styles.cardAction}>
							<Button label="Storm Chasing" link="/storm-chasing" target="_self" />
						</div>
					</div>
				</div>

				<div className={styles.additionalInfo}>
					<div className={styles.infoBlock}>
						<div className={styles.infoIcon}>
							<FontAwesomeIcon icon={faHouse} />
						</div>
						<div className={styles.infoText}>
							<h4>Personalized Content</h4>
							<p>
								If you have logged into the site, personalized content and settings are available in your{' '}
								<a href="/dashboard" className={styles.link}>
									Dashboard
								</a>
								.
							</p>
						</div>
					</div>

					<div className={styles.infoBlock}>
						<p className={styles.footerNote}>
							You can also find links to additional pages and resources in our <strong>Footer</strong> at the bottom of any page.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
