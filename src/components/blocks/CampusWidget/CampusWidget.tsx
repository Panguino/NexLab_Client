import { Button } from '@/components/elements/Button/Button'
import styles from './CampusWidget.module.scss'

export const CampusWidget = ({ campusDetails, weatherData }) => {
	console.log(campusDetails, weatherData)
	return (
		<div className={styles.widgetContainer}>
			<h2 className={styles.campusTitle}>
				<img src={campusDetails.attributes.Logo.data.attributes.url} alt={campusDetails.attributes.Name} />
				{campusDetails.attributes.Name}
			</h2>
			<div className={styles.conditionsContainer}>&nbsp;</div>
			<div className={styles.forecastContainer}>&nbsp;</div>
			<Button label="View Weather" link={`/campus-weather/${campusDetails.id}`} target="_self" />
		</div>
	)
}
