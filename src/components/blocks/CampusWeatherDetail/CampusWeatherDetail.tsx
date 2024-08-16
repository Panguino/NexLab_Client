// 'use client'

import styles from './CampusWeatherDetail.module.scss'

export const CampusWeatherDetail = ({ currentWeatherData, forecastData, campusDetails }) => {
	const { Name, Logo } = campusDetails
	const { temperature, dewpoint, windDirection, windSpeed, icon, relativeHumidity, windChill, heatIndex } = currentWeatherData
	console.log('ob', currentWeatherData)

	const celsiusToFahrenheit = (celsius) => {
		return ((celsius * 9) / 5 + 32).toFixed(1)
	}
	const kphToMph = (kph) => {
		return (kph * 0.621371).toFixed(1)
	}
	const getCompassDirection = (degree) => {
		const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']
		const index = Math.round(degree / 22.5)
		return directions[index % 16]
	}
	return (
		<div className={styles.CampusWeatherDetail}>
			<div className={styles.CampusTitle}>{Name}</div>
			<div className={styles.CurrentConditionsContainer}>
				<img src={icon} className={styles.weatherSymbol} />
				<div className={styles.airTemperature}>{celsiusToFahrenheit(temperature.value)}&deg;F</div>
				<div className={styles.apparentTemperature}>
					Feels Like:{' '}
					{celsiusToFahrenheit(windChill.value !== null ? windChill.value : heatIndex.value !== null ? heatIndex.value : temperature.value)}
					&deg;F
				</div>
				<div className={styles.dewpointTemperature}>Dewpoint: {celsiusToFahrenheit(dewpoint.value)}&deg;F</div>
				<div className={styles.humidity}>Relative Humidity: {relativeHumidity.value.toFixed(1)} %</div>
				<div className={styles.wind}>
					Wind: {getCompassDirection(windDirection.value)} at {kphToMph(windSpeed.value)} mph
				</div>
			</div>
			<img src={Logo.data.attributes.url} className={styles.CampusLogo} />
			<h2>Forecast</h2>
			{forecastData.map((period, index) => (
				<div key={index}>
					<h3>{period.name}</h3>
					<p>{period.detailedForecast}</p>
				</div>
			))}
		</div>
	)
}
