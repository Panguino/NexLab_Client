import { convertAPIiconName } from '@/util/getCampusWeatherIcon'
import styles from './CurrentConditions.module.scss'
import { CurrentValue } from './CurrentValue/CurrentValue'

export const CurrentConditions = ({ currentWeatherData }) => {
	const {
		temperature,
		dewpoint,
		apparentTemperature,
		relativeHumidity,
		windSpeed,
		windDirection,
		textDescription,
		icon = null,
	} = currentWeatherData
	const weatherIcon = icon !== null ? convertAPIiconName(icon) : ('/temp-icons/unknown.svg' as string)
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
