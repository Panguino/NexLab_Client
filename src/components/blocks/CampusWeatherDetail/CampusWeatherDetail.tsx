import { Animator } from '@/components/elements/Animator/Animator'
import styles from './CampusWeatherDetail.module.scss'
import { CurrentConditions } from './CurrentConditions/CurrentConditions'
import { ForecastTile } from './ForecastTiles/ForecastTile'

export const CampusWeatherDetail = ({ currentWeatherData, tileData, forecastData, campusDetails }) => {
	const { Name, Logo, banner } = campusDetails
	const banner_class = `banner${banner.data.id}`
	console.log('logging in detail', campusDetails)

	return (
		<div className={styles.CampusWeatherDetail}>
			<div className={`${styles.topSectionContainer} ${styles[banner_class]}`}>
				<h2 className={styles.CampusTitle}>
					<img src={Logo.data.attributes.url} className={styles.logo} />
					{Name}
				</h2>
				<div className={styles.CurrentDataContainer}>
					<div className={styles.conditionsContainer}>
						<CurrentConditions currentWeatherData={currentWeatherData} />
					</div>
					<div className={styles.skycamContainer}>{/* <SkyCam /> */}</div>
					<div className={styles.radarContainer}>
						<Animator frames={nexradData} />
					</div>
				</div>
			</div>
			<div className={styles.forecastTiles}>
				{tileData.map(({ title, dayData, nightData, size }, index) => (
					<ForecastTile key={index} title={title} dayData={dayData} nightData={nightData} size={size} />
				))}
			</div>
			<div className={styles.CampusForecastContainer}>
				{forecastData.map((period, index) => (
					<div key={index} className={styles.period}>
						<h2>{period.name}</h2>
						<p>{period.detailedForecast}</p>
					</div>
				))}
			</div>
		</div>
	)
}
