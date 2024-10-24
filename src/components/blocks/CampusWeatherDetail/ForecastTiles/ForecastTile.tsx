import styles from './ForecastTile.module.scss'

export const ForecastTile = ({ forecastTileData, size = 'default', index }) => {
	size = size === 'default' ? 'default' : 'small'
	return (
		<div key={index} className={styles.CampusForecastTile}>
			<h2>{forecastTileData.title}</h2>
			<div className={styles.CampusForecastTileContent}>
				{forecastTileData.day !== undefined ? (
					<div className={styles.CampusForecastTileContentDay}>
						<p className={styles.tilePortionTitle}>Day</p>
						<img src={forecastTileData.day.icon} />
						<p className={styles.temperatureLabel}>H: {forecastTileData.day.temperature}</p>
						{size === 'default' && <p className={styles.windLabel}>{forecastTileData.day.wind}</p>}
					</div>
				) : (
					<div className={styles.CampusForecastTileContentDay}>&nbsp;</div>
				)}
				{forecastTileData.night !== undefined ? (
					<div className={styles.CampusForecastTileContentNight}>
						<p className={styles.tilePortionTitle}>Night</p>
						<img src={forecastTileData.night.icon} />
						<p className={styles.temperatureLabel}>L: {forecastTileData.night.temperature}</p>
						{size === 'default' && <p className={styles.windLabel}>{forecastTileData.night.wind}</p>}
					</div>
				) : (
					<div className={styles.CampusForecastTileContentNight}>&nbsp;</div>
				)}
			</div>
		</div>
	)
}
