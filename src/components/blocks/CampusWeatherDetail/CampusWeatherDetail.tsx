// 'use client'

import { convertIconName } from '@/util/getCampusWeatherIcon'
import styles from './CampusWeatherDetail.module.scss'
import { CurrentConditions } from './CurrentConditions/CurrentConditions'
import { ForecastTile } from './ForecastTiles/ForecastTile'

export const CampusWeatherDetail = ({ currentWeatherData, forecastData, campusDetails }) => {
	const { Name, Logo } = campusDetails
	const tileData = []

	for (const [index, period] of forecastData.entries()) {
		const tileObj = {}
		const startTime = new Date(period.startTime)
		const dateName = `${startTime.getMonth() + 1}/${startTime.getDate()}`

		if (period.isDaytime) {
			// naturally skips night periods in the loop, barring a leading night period
			tileObj['title'] = `${period.name} ${dateName}`
			tileObj['day'] = {}
			tileObj['day']['icon'] = convertIconName(period.icon, null, 'day', 'api')
			tileObj['day']['temperature'] = `${period.temperature}\u00B0`
			tileObj['day']['wind'] = period.windSpeed
			tileObj['day']['precip'] = period.probabilityOfPrecipitation.value
			if (forecastData[index + 1] !== undefined) {
				// since we skip night periods, we need to populate the night period now
				tileObj['night'] = {}
				tileObj['night']['icon'] = convertIconName(forecastData[index + 1].icon, null, 'day', 'api')
				tileObj['night']['temperature'] = `${forecastData[index + 1].temperature}\u00B0`
				tileObj['night']['wind'] = forecastData[index + 1].windSpeed
				tileObj['night']['precip'] = forecastData[index + 1].probabilityOfPrecipitation.value
			}
			tileData.push(tileObj)
		} else if (!period.isDaytime && forecastData[index - 1] === undefined) {
			// catch a leading solo night period
			// exclude date in title on this occasion, once passed midnight it will match "tomorrow's" date and appear confusing
			tileObj['title'] = period.name.replace(' Night', '')
			tileObj['night'] = {}
			tileObj['night']['icon'] = convertIconName(period.icon, null, 'day', 'api')
			tileObj['night']['temperature'] = `${period.temperature}\u00B0`
			tileObj['night']['wind'] = period.windSpeed
			tileObj['night']['precip'] = period.probabilityOfPrecipitation.value
			tileData.push(tileObj)
		}
	}

	return (
		<div className={styles.CampusWeatherDetail}>
			<div className={styles.topSectionContainer}>
				<h2 className={styles.CampusTitle}>
					<img src={Logo.data.attributes.url} className={styles.logo} />
					{Name}
				</h2>
				<div className={styles.CurrentDataContainer}>
					<div className={styles.conditionsContainer}>
						<CurrentConditions currentWeatherData={currentWeatherData} />
					</div>
					<div className={styles.skycamContainer}>{/* <SkyCam /> */}</div>
					<div className={styles.radarContainer}>{/* <Radar /> */}</div>
				</div>
			</div>
			<div className={styles.forecastTiles}>
				{tileData.map((tile, index) => (
					<ForecastTile key={index} index={index} forecastTileData={tile} />
				))}
			</div>
			<div className={styles.CampusForecastContainer}>
				{forecastData.map((period, index) => (
					<div key={index} className={styles.period}>
						<h2>{period.name}</h2>
						<p>{period.detailedForecast}</p>
					</div>
				))}
			</div>
		</div>
	)
}
