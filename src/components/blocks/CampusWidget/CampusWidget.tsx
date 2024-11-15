import { Button } from '@/components/elements/Button/Button'
import { CurrentValue } from '../CampusWeatherDetail/CurrentConditions/CurrentValue/CurrentValue'
import { ForecastTile } from '../CampusWeatherDetail/ForecastTiles/ForecastTile/ForecastTile'
import styles from './CampusWidget.module.scss'

export const CampusWidget = ({ campusDetails, weatherData }) => {
	console.log('logging in component', campusDetails, weatherData)
	return (
		<div className={styles.widgetContainer}>
			<div className={styles.campusTitle}>
				<img src={campusDetails.attributes.Logo.data.attributes.url} alt={campusDetails.attributes.Name} />
				{campusDetails.attributes.Name}
			</div>
			<div className={styles.conditionsContainer}>
				<img src={weatherData.conditions.icon} className={styles.icon} />
				<div className={styles.temp}>{`${weatherData.conditions.temp}\u00B0F`}</div>
				<div className={styles.subValuesContainer}>
					<div className={styles.feels}>
						<CurrentValue value={`${weatherData.conditions.feels}\u00B0F`} label="Feels Like" />
					</div>
					<div className={styles.humidity}>
						<CurrentValue value={`${weatherData.conditions.humidity}%`} label="Humidity" />
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
