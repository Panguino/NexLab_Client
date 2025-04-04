'use client'
import { Button } from '@/components/elements/Button/Button'
import { useRootStore } from '@/store/useRootStore'
import { getWeatherIconComponent } from '@/util/getCampusWeatherIcon'
import { CurrentValue } from '../CampusWeatherDetail/CurrentConditions/CurrentValue/CurrentValue'
import { ForecastTile } from '../CampusWeatherDetail/ForecastTiles/ForecastTile/ForecastTile'
import styles from './CampusWidget.module.scss'

export const CampusWidget = ({ campusDetails, weatherData }) => {
	const temperatureUnit = useRootStore.use.temperatureUnit()
	const Icon = getWeatherIconComponent(weatherData.conditions.icon)
	return (
		<div className={styles.widgetContainer}>
			<div className={styles.campusTitle}>
				<img src={campusDetails.attributes.Logo.data.attributes.url} alt={campusDetails.attributes.Name} />
				{campusDetails.attributes.Name}
			</div>
			<div className={styles.conditionsContainer}>
				<Icon />
				<div className={styles.temp}>
					{weatherData.conditions.temp}
					<sup>&deg;{temperatureUnit}</sup>
				</div>
				<div className={styles.subValuesContainer}>
					<div className={styles.feels}>
						<CurrentValue value={weatherData.conditions.feels} unit={temperatureUnit} label="Feels Like" />
					</div>
					<div className={styles.humidity}>
						<CurrentValue value={weatherData.conditions.humidity} label="Humidity" />
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
				<Button label="View Weather" link={`/campus-weather/${campusDetails.id}`} target="_self" />
			</div>
		</div>
	)
}
