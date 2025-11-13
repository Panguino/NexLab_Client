import { CampusWidget } from '@/components/blocks/CampusWidget/CampusWidget'
import styles from './WidgetShowcase.module.scss'

interface IWidgetShowcaseProps {
	campusDetails: any
	weatherData: any
}

export const WidgetShowcase = ({ campusDetails, weatherData }: IWidgetShowcaseProps) => {
	return (
		<section className={styles.showcase}>
			<div className={styles.showcaseInner}>
				<div className={styles.widgetDemo}>
					<CampusWidget campusDetails={campusDetails} weatherData={weatherData} />
				</div>
				<div className={styles.description}>
					<h2>Weather Widget</h2>
					<p>
						Demonstrated here and coming in a small variety of sizes and layouts, we also provide a widget which can be easily embedded in
						your school's website providing some current weather conditions and an abbreviated forecast.
					</p>
				</div>
			</div>
		</section>
	)
}
