// 'use client'

import styles from './CampusWeatherDetail.module.scss'
import { CurrentConditions } from './CurrentConditions/CurrentConditions'

export const CampusWeatherDetail = ({ currentWeatherData, forecastData, campusDetails }) => {
	const { Name, Logo } = campusDetails

	return (
		<div className={styles.CampusWeatherDetail}>
			<h2 className={styles.CampusTitle}>{Name}</h2>
			<CurrentConditions currentWeatherData={currentWeatherData} />
			<div className={styles.Spacer}></div>
			<img src={Logo.data.attributes.url} className={styles.CampusLogo} />
			<div className={styles.CampusForecastContainer}>
				<h2>Forecast</h2>
				{forecastData.map((period, index) => (
					<div key={index} className={styles.period}>
						<h3>{period.name}</h3>
						<p>{period.detailedForecast}</p>
					</div>
				))}
			</div>
		</div>
	)
}
