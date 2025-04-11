'use client'
import Windy from '@/assets/icons/windy.svg'
import { useRootStore } from '@/store/useRootStore'
import { getWeatherIconComponent } from '@/util/getCampusWeatherIcon'
import styles from './ForecastTile.module.scss'

type ForecastTileDisplayPane = {
	icon: string
	temp: string
	wind?: string
}

export interface IForecastTile {
	title: string
	dayData: ForecastTileDisplayPane | null
	nightData: ForecastTileDisplayPane | null
	size?: 'default' | 'small'
}

interface IForecastTileInfoProps extends ForecastTileDisplayPane {
	title: string
	tempType: 'H' | 'L'
}

const ForecastTileInfo = ({ title, icon, temp, wind, tempType }: IForecastTileInfoProps) => {
	const temperatureUnit = useRootStore.use.temperatureUnit()

	const Icon = getWeatherIconComponent(icon)

	return (
		<>
			<h3>{title}</h3>
			<Icon />
			<div className={styles.temp}>
				<div className={styles.tempType}>{tempType}</div>
				<div className={styles.tempValue}>
					{temp}
					<sup>{temperatureUnit}</sup>
				</div>
			</div>
			{wind && (
				<div className={styles.wind}>
					<Windy />
					<div className={styles.windValue}>
						<span>{wind}</span>
						<span>MPH</span>
					</div>
				</div>
			)}
		</>
	)
}

export const ForecastTile = ({ title, dayData, nightData, size }: IForecastTile) => {
	const removeWind = (data: any) => {
		if (!data) return null
		const dataCopy = { ...data }
		delete dataCopy.wind
		return dataCopy
	}

	const processedDayData = size === 'small' ? removeWind(dayData) : dayData
	const processedNightData = size === 'small' ? removeWind(nightData) : nightData

	return (
		<div className={`${styles.ForecastTile} ${size === 'small' ? styles.small : ''}`}>
			<h2>{title}</h2>
			<div className={styles.content}>
				<div className={styles.info}>{processedDayData && <ForecastTileInfo tempType="H" title="Day" {...processedDayData} />}</div>
				<div className={styles.info}>{processedNightData && <ForecastTileInfo tempType="L" title="Night" {...processedNightData} />}</div>
			</div>
		</div>
	)
}
