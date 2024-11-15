import styles from './TextForecastPanel.module.scss'

export const TextForecastPanel = ({ forecastData }) => {
	return (
		<div className={styles.CampusForecastContainer}>
			{forecastData.map((period, index) => (
				<div key={index} className={styles.period}>
					<h2>{period.name}</h2>
					<p>{period.detailedForecast}</p>
				</div>
			))}
		</div>
	)
}
