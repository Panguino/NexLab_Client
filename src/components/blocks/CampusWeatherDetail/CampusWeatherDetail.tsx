// 'use client'

import { convertAPIiconName } from '@/util/getCampusWeatherIcon'
import styles from './CampusWeatherDetail.module.scss'
import { CurrentConditions } from './CurrentConditions/CurrentConditions'

export const CampusWeatherDetail = ({ currentWeatherData, forecastData, campusDetails }) => {
	const { Name, Logo } = campusDetails
	const tileData = []
	console.log(forecastData)

	for (const [index, period] of forecastData.entries()) {
		const tileObj = {}
		const startTime = new Date(period.startTime)
		const dateName = `${startTime.getMonth() + 1}/${startTime.getDate()}`

		if (period.isDaytime) {
			// naturally skips night periods in the loop, barring a leading night period
			tileObj['title'] = `${period.name} ${dateName}`
			tileObj['day'] = {}
			tileObj['day']['icon'] = convertAPIiconName(period.icon)
			tileObj['day']['temperature'] = `${period.temperature}\u00B0`
			tileObj['day']['wind'] = period.windSpeed
			tileObj['day']['precip'] = period.probabilityOfPrecipitation.value
			if (forecastData[index + 1] !== undefined) {
				// since we skip night periods, we need to populate the night period now
				tileObj['night'] = {}
				tileObj['night']['icon'] = convertAPIiconName(forecastData[index + 1].icon)
				tileObj['night']['temperature'] = `${forecastData[index + 1].temperature}\u00B0`
				tileObj['night']['wind'] = forecastData[index + 1].windSpeed
				tileObj['night']['precip'] = forecastData[index + 1].probabilityOfPrecipitation.value
			}
			tileData.push(tileObj)
		} else if (!period.isDaytime && forecastData[index - 1] === undefined) {
			// catch the first night period
			tileObj['title'] = period.name.replace(' Night', '')
			tileObj['night'] = {}
			tileObj['night']['icon'] = convertAPIiconName(period.icon)
			tileObj['night']['temperature'] = `${period.temperature}\u00B0`
			tileObj['night']['wind'] = period.windSpeed
			tileObj['night']['precip'] = period.probabilityOfPrecipitation.value
			tileData.push(tileObj)
		}
	}
	console.log(tileData)

	return (
		<div className={styles.CampusWeatherDetail}>
			<h2 className={styles.CampusTitle}>{Name}</h2>
			<CurrentConditions currentWeatherData={currentWeatherData} />
			<div className={styles.Spacer}></div>
			<img src={Logo.data.attributes.url} className={styles.CampusLogo} />
			<div className={styles.forecastTiles}>
				{tileData.map((tile, index) => (
					<div key={index} className={styles.CampusForecastTile}>
						<h3>{tile.title}</h3>
						<div className={styles.CampusForecastTileContent}>
							{tile.day !== undefined ? (
								<div className={styles.CampusForecastTileContentDay}>
									<p>Day</p>
									<img src={tile.day.icon} />
									<p>H: {tile.day.temperature}</p>
									<p>{tile.day.wind}</p>
								</div>
							) : (
								<div className={styles.CampusForecastTileContentDay}>&nbsp;</div>
							)}
							{tile.night !== undefined ? (
								<div className={styles.CampusForecastTileContentNight}>
									<p>Night</p>
									<img src={tile.night.icon} />
									<p>L: {tile.night.temperature}</p>
									<p>{tile.night.wind}</p>
								</div>
							) : (
								<div className={styles.CampusForecastTileContentNight}>&nbsp;</div>
							)}
						</div>
					</div>
				))}
			</div>
			<div className={styles.CampusForecastContainer}>
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
