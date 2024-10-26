import styles from './ForecastTile.module.scss'

type ForecastTileDisplayPane = {
	icon: string
	temp: string
	wind: string
}

export interface IForecastTile {
	title: string
	dayData: ForecastTileDisplayPane | null
	nightData: ForecastTileDisplayPane | null
	size?: 'default' | 'small'
}

export const ForecastTile = ({ title, dayData, nightData, size = 'default' }: IForecastTile) => {
	return (
		<div className={styles.ForecastTile}>
			<h2>{title}</h2>
			<div className={styles.content}>
				<div className={styles.info}>
					{dayData && (
						<>
							<h3>Day</h3>
							<img src={dayData.icon} />
							<p className={styles.temp}>H: {dayData.temp}</p>
							{size === 'default' && <p className={styles.wind}>{dayData.wind}</p>}
						</>
					)}
				</div>
				<div className={styles.info}>
					{nightData && (
						<>
							<h3>Night</h3>
							<img src={nightData.icon} />
							<p className={styles.temp}>L: {nightData.temp}</p>
							{size === 'default' && <p className={styles.wind}>{nightData.wind}</p>}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
