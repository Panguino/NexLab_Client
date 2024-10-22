import { convertIconName } from '@/util/getCampusWeatherIcon'
import styles from './CurrentConditions.module.scss'
import { CurrentValue } from './CurrentValue/CurrentValue'

export const CurrentConditions = ({ currentWeatherData }) => {
	const {
		dataSource,
		dayNight,
		temperature,
		dewpoint,
		apparentTemperature,
		relativeHumidity,
		windSpeed,
		windDirection,
		sky,
		textDescription,
		icon,
	} = currentWeatherData
	const weatherIcon = icon !== null ? convertIconName(icon, sky, dayNight, dataSource) : ('/temp-icons/unknown.svg' as string)
	// console.log(currentWeatherData)
	return (
		<div className={styles.CurrentConditionsContainer}>
			<img src={weatherIcon} className={styles.weatherSymbol} />
			<div className={styles.airTemperature}>{temperature}&deg;F</div>
			<div className={styles.weatherDescription}>{textDescription}</div>
			<CurrentValue label="Feels Like" value={apparentTemperature + '\u00B0F'} />
			<CurrentValue label="Dewpoint" value={dewpoint + '\u00B0F'} />
			<CurrentValue label="Humidity" value={relativeHumidity + '%'} />
			<CurrentValue label="Wind" value={windSpeed + 'mph (' + windDirection + ')'} />
		</div>
	)
}
