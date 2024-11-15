import { ForecastTile } from './ForecastTile/ForecastTile'
import styles from './ForecastTiles.module.scss'

export const ForecastTiles = ({ tileData }) => {
	return (
		<div className={styles.forecastTiles}>
			{tileData.map(({ title, dayData, nightData, size }, index) => (
				<ForecastTile key={index} title={title} dayData={dayData} nightData={nightData} size={size} />
			))}
		</div>
	)
}
