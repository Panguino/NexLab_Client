import { Button } from '@/components/elements/Button/Button'
import { ForecastTile } from '../CampusWeatherDetail/ForecastTiles/ForecastTile'
import styles from './CampusWidget.module.scss'

export const CampusWidget = ({ campusDetails, weatherData }) => {
	console.log('logging in component', campusDetails, weatherData)
	return (
		<div className={styles.widgetContainer}>
			<h2 className={styles.campusTitle}>
				<img src={campusDetails.attributes.Logo.data.attributes.url} alt={campusDetails.attributes.Name} />
				{campusDetails.attributes.Name}
			</h2>
			<div className={styles.conditionsContainer}>
				<img src={weatherData.conditions.icon} />
				<p>temp: {weatherData.conditions.temp}</p>
				<p>feels: {weatherData.conditions.feels}</p>
				<p>humidity: {weatherData.conditions.humidity}</p>
			</div>
			<div className={styles.forecastContainer}>
				{weatherData.forecast.map((forecast, index) => (
					<ForecastTile key={index} title={forecast.title} dayData={forecast.dayData} nightData={forecast.nightData} size={forecast.size} />
				))}
			</div>
			<Button label="View Weather" link={`/campus-weather/${campusDetails.id}`} target="_self" />
		</div>
	)
}
