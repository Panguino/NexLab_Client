import Sunny from '@/assets/icons/sunny.svg'
import styles from './CurrentConditions.module.scss'
import { CurrentValue } from './CurrentValue/CurrentValue'

export const CurrentConditions = ({ currentWeatherData }) => {
	const { temperature, dewpoint, apparentTemperature, relativeHumidity, windSpeed, windDirection, textDescription, icon } = currentWeatherData
	// const weatherIcon = icon !== null ? convertIconName(icon, sky, dayNight, dataSource) : ('/temp-icons/unknown.svg' as string)
	// console.log(currentWeatherData)
	return (
		<div className={styles.CurrentConditionsContainer}>
			<div className={styles.symbolContainer}>
				<img src={icon} className={styles.weatherSymbol} />
				<Sunny />
			</div>
			<div className={styles.weatherHeadlineContainer}>
				<div className={styles.airTemperature}>{temperature}&deg;F</div>
				<div className={styles.weatherDescription}>{textDescription}</div>
			</div>
			<div className={styles.valuesContainer}>
				<CurrentValue label="Feels Like" value={apparentTemperature + '\u00B0F'} />
				<CurrentValue label="Dewpoint" value={dewpoint + '\u00B0F'} />
				<CurrentValue label="Humidity" value={relativeHumidity + '%'} />
				<CurrentValue label="Wind" value={windSpeed + 'mph (' + windDirection + ')'} />
			</div>
		</div>
	)
}
