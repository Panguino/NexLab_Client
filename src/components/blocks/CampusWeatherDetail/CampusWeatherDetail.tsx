// 'use client'

import styles from './CampusWeatherDetail.module.scss'

export const CampusWeatherDetail = ({ currentWeatherData, forecastData, campusDetails }) => {
	const { Name, Latitude, Longitude, id } = campusDetails
	const { rawMessage, temperature, dewpoint } = currentWeatherData
	console.log('fcst data', forecastData)
	return (
		<div className={styles.CampusWeatherDetail}>
			<p>Campus {id}</p>
			<p>Name: {Name}</p>
			<p>Latitude: {Latitude}</p>
			<p>Longitude: {Longitude}</p>
			<p>Obs Data From: {rawMessage}</p>
			<p>Temperature: {temperature.value}&deg;C</p>
			<p>Dewpoint: {dewpoint.value}&deg;C</p>
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
