'use client'
import { ForecastTile } from '@/components/elements/ForecastTile/ForecastTile'
import { useRootStore } from '@/store/useRootStore'
import { getWeatherIconComponent } from '@/util/getCampusWeatherIcon'
import { CurrentValue } from '../CampusWeatherDetail/CurrentConditions/CurrentValue/CurrentValue'
import styles from './CampusWidget.module.scss'

export const CampusWidget = ({ campusDetails, weatherData }) => {
	const temperatureUnit = useRootStore.use.temperatureUnit()
	const Icon = getWeatherIconComponent(weatherData.conditions.icon)
	return (
		<div className={styles.widgetContainer}>
			<div className={styles.campusTitle}>
				{campusDetails.Name}
				<img src={campusDetails.Logo.url} alt={campusDetails.Name} />
			</div>
			<div className={styles.conditionsContainer}>
				<Icon />
				<div className={styles.temp}>
					{weatherData.conditions.temp}
					<sup>{temperatureUnit}</sup>
				</div>
				<div className={styles.subValuesContainer}>
					<div className={styles.feels}>
						<CurrentValue value={weatherData.conditions.feels} unit={temperatureUnit} label="Feels Like" />
					</div>
					<div className={styles.humidity}>
						<CurrentValue value={weatherData.conditions.humidity} unit="%" label="Humidity" />
					</div>
				</div>
			</div>
			<div className={styles.forecastContainer}>
				{weatherData.forecast.map((forecast, index) => (
					<div className={styles.tileContainer} key={index}>
						<ForecastTile
							key={index}
							title={forecast.title}
							dayData={forecast.dayData}
							nightData={forecast.nightData}
							size={forecast.size}
						/>
					</div>
				))}
			</div>
			<div className={styles.buttonContainer}>
				<a href={`/campus-weather/${campusDetails.documentId}`} target="_self">
					More Details
				</a>
			</div>
		</div>
	)
}
