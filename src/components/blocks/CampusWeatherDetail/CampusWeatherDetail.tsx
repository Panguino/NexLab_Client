// 'use client'

import styles from './CampusWeatherDetail.module.scss'

export const CampusWeatherDetail = ({ currentWeatherData, forecastData, campusDetails }) => {
	const { Name, Logo } = campusDetails
	const { temperature, dewpoint, windDirection, windSpeed, icon, relativeHumidity, windChill, heatIndex, textDescription } = currentWeatherData
	console.log('ob', currentWeatherData)

	const celsiusToFahrenheit = (celsius) => {
		return ((celsius * 9) / 5 + 32).toFixed(0)
	}
	const kphToMph = (kph) => {
		return (kph * 0.621371).toFixed(0)
	}
	const getCompassDirection = (degree) => {
		const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']
		const index = Math.round(degree / 22.5)
		return directions[index % 16]
	}
	return (
		<div className={styles.CampusWeatherDetail}>
			<h2 className={styles.CampusTitle}>{Name}</h2>
			<div className={styles.CurrentConditionsContainer}>
				<img src={icon} className={styles.weatherSymbol} />
				<div className={styles.airTemperature}>{celsiusToFahrenheit(temperature.value)}&deg;F</div>
				<div className={styles.weatherDescription}>{textDescription}</div>
				<div className={styles.apparentTemperature}>
					<h4 className={styles.label}>Feels Like:</h4>
					<span className={styles.value}>
						{celsiusToFahrenheit(
							windChill.value !== null ? windChill.value : heatIndex.value !== null ? heatIndex.value : temperature.value,
						)}
					</span>
					&deg;F
				</div>
				<div className={styles.dewpointTemperature}>
					<h4 className={styles.label}>Dewpoint:</h4>
					<span className={styles.value}>{celsiusToFahrenheit(dewpoint.value)}&deg;F</span>
				</div>
				<div className={styles.humidity}>
					<h4 className={styles.label}>Humidity:</h4>
					<span className={styles.value}>{relativeHumidity.value.toFixed(0)}%</span>
				</div>
				<div className={styles.wind}>
					<h4 className={styles.label}>Wind:</h4>
					<span className={styles.value}>
						{kphToMph(windSpeed.value)}mph ({getCompassDirection(windDirection.value)})
					</span>
				</div>
			</div>
			<div className={styles.Spacer}></div>
			<img src={Logo.data.attributes.url} className={styles.CampusLogo} />
			<div className={styles.CampusForecastContainer}>
				<h2>Forecast</h2>
				{forecastData.map((period, index) => (
					<div key={index} className={styles.period}>
						<h3>{period.name}</h3>
						<p>{period.detailedForecast}</p>
					</div>
				))}
			</div>
		</div>
	)
}
