'use client'

import { useRootStore } from '@/store/useRootStore'
import { WindDirection } from '@/types/WindDirection'
import styles from './CurrentConditions.module.scss'
import { CurrentValue } from './CurrentValue/CurrentValue'

interface ICurrentConditionsProps {
	logo: string
	temperature: number
	dewpoint: number
	feelsLikeTemperature: number
	relativeHumidity: number
	windSpeed: number
	windDirection: WindDirection
	icon: string
}

export const CurrentConditions = ({
	logo,
	temperature,
	dewpoint,
	feelsLikeTemperature,
	relativeHumidity,
	windSpeed,
	windDirection,
	icon,
}: ICurrentConditionsProps) => {
	const temperatureUnit = useRootStore.use.temperatureUnit()
	return (
		<div className={styles.currentConditions}>
			<img src={logo} className={styles.logo} alt="" />
			{/* <div className={styles.symbolContainer}>
				<img src={icon} className={styles.weatherSymbol} alt="" />
			</div> */}
			<div className={styles.mainTemp}>
				{temperature}&deg;{temperatureUnit}
			</div>
			<div className={styles.detailsGrid}>
				<CurrentValue label="Feels Like" value={feelsLikeTemperature} unit={`\u00B0${temperatureUnit}`} />
				<CurrentValue label="Dew Point" value={dewpoint} unit={`\u00B0${temperatureUnit}`} />
				<CurrentValue label="Humidity" value={relativeHumidity} unit="%" />
				<CurrentValue label="Wind" value={windSpeed} specialUnit1="MPH" specialUnit2={windDirection} />
			</div>
		</div>
	)
}
