import { celsiusToFahrenheit, getCompassDirection, kphToMph } from '@/util/campusUnitConversion'
import styles from './CampusWeatherCurrentConditions.module.scss'
import { CampusWeatherCurrentValue } from './CampusWeatherCurrentValue/CampusWeatherCurrentValue'

export const CampusWeatherCurrentConditions = ({ currentWeatherData }) => {
	const { temperature, dewpoint, windDirection, windSpeed, icon, relativeHumidity, windChill, heatIndex, textDescription } = currentWeatherData
	let apparentTemperature
	switch (apparentTemperature) {
		// Wind Chill and Heat Index are "apparent" temperature values, colloquially referred to as "feels like"
		// they can not occur at the same time so there will never be overlapping cases
		case windChill.value !== null:
			apparentTemperature = windChill.value
			break
		case heatIndex.value !== null:
			apparentTemperature = heatIndex.value
			break
		default:
			apparentTemperature = temperature.value
			break
	}
	console.log('ob', currentWeatherData)

	return (
		<div className={styles.CurrentConditionsContainer}>
			<img src={icon} className={styles.weatherSymbol} />
			<div className={styles.airTemperature}>{celsiusToFahrenheit(temperature.value)}&deg;F</div>
			<div className={styles.weatherDescription}>{textDescription}</div>
			<CampusWeatherCurrentValue label="Feels Like" value={celsiusToFahrenheit(apparentTemperature) + '\u00B0F'} />
			<CampusWeatherCurrentValue label="Dewpoint" value={celsiusToFahrenheit(dewpoint.value) + '\u00B0F'} />
			<CampusWeatherCurrentValue label="Humidity" value={relativeHumidity.value.toFixed(0) + '%'} />
			<CampusWeatherCurrentValue label="Wind" value={kphToMph(windSpeed.value) + 'mph (' + getCompassDirection(windDirection.value) + ')'} />
		</div>
	)
}
