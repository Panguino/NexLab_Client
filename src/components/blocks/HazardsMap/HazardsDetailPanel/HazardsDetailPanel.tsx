import styles from './HazardsDetailPanel.module.scss'
import { useRootStore } from '@/store/useRootStore'

const HazardsDetailPanel = () => {
	const selectedCounty = useRootStore.use.selectedCounty()
	console.log(selectedCounty)
	const {
		alerts,
		feature: {
			properties: { COUNTYNAME }
		}
	} = selectedCounty
	return (
		<div className={styles.HazardsDetailPanel}>
			<h1>{COUNTYNAME}</h1>
			{alerts.map((alert) => {
				return (
					<div key={alert.id}>
						<h4>{alert.properties.event}</h4>
					</div>
				)
			})}
		</div>
	)
}

export default HazardsDetailPanel
