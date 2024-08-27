import { celsiusToFahrenheit, getCompassDirection, kphToMph } from '@/util/unitConversion'
import styles from './CampusWeatherCurrentConditions.module.scss'
import { CampusWeatherCurrentValue } from './CampusWeatherCurrentValue/CampusWeatherCurrentValue'

export const CampusWeatherCurrentConditions = ({ currentWeatherData }) => {
	const { temperature, dewpoint, windDirection, windSpeed, icon, relativeHumidity, windChill, heatIndex, textDescription } = currentWeatherData
	let apparentTemperature
	if (windChill.value !== null) {
		apparentTemperature = windChill.value
	} else if (heatIndex !== null) {
		apparentTemperature = heatIndex.value
	} else {
		apparentTemperature = temperature.value
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
