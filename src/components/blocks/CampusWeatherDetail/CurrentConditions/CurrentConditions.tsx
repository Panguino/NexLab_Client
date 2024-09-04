import { celsiusToFahrenheit, getCompassDirection, kphToMph } from '@/util/unitConversion'
import styles from './CurrentConditions.module.scss'
import { CurrentValue } from './CurrentValue/CurrentValue'

export const CurrentConditions = ({ currentWeatherData }) => {
	const { temperature, dewpoint, windDirection, windSpeed, icon, relativeHumidity, windChill, heatIndex, textDescription } = currentWeatherData
	let apparentTemperature
	if (windChill.value !== null) {
		apparentTemperature = windChill.value
	} else if (heatIndex !== null) {
		apparentTemperature = heatIndex.value
	} else {
		apparentTemperature = temperature.value
	}
	// console.log('ob', currentWeatherData)

	return (
		<div className={styles.CurrentConditionsContainer}>
			<img src={icon} className={styles.weatherSymbol} />
			<div className={styles.airTemperature}>{celsiusToFahrenheit(temperature.value)}&deg;F</div>
			<div className={styles.weatherDescription}>{textDescription}</div>
			<CurrentValue label="Feels Like" value={celsiusToFahrenheit(apparentTemperature) + '\u00B0F'} />
			<CurrentValue label="Dewpoint" value={celsiusToFahrenheit(dewpoint.value) + '\u00B0F'} />
			<CurrentValue label="Humidity" value={relativeHumidity.value.toFixed(0) + '%'} />
			<CurrentValue label="Wind" value={kphToMph(windSpeed.value) + 'mph (' + getCompassDirection(windDirection.value) + ')'} />
		</div>
	)
}
