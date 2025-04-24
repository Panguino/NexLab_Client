import styles from './TextForecastPanel.module.scss'

type forecastPeriodData = {
	dateMonth: string
	dateDay: number
	daytimeForecastDetails: string
	eveningForecastDetails: string
}

interface IForecastData {
	forecastData: forecastPeriodData[]
}

export const TextForecastPanel = ({ forecastData }: IForecastData) => {
	return (
		<div className={styles.textForecastPanelWrapper}>
			<div className={styles.textForecastPanel}>
				<h2>Upcoming forecast Details</h2>
				{forecastData.map(({ dateMonth, dateDay, daytimeForecastDetails, eveningForecastDetails }, index) => (
					<div key={index} className={styles.period}>
						<div className={styles.date}>
							<div className={styles.month}>{dateMonth}</div>
							<div className={styles.day}>{dateDay}</div>
						</div>
						<div className={styles.details}>
							<h6>Daytime</h6>
							<p>{daytimeForecastDetails}</p>
						</div>
						<div className={styles.details}>
							<h6>Evening</h6>
							<p>{eveningForecastDetails}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
