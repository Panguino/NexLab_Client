import styles from './HazardsDetailPanel.module.scss'
import { useRootStore } from '@/store/useRootStore'
import HazardsDetailAccordian from './HazardsDetailAccordian/HazardsDetailAccordian'
import { getTitleFromFeature } from '@/util/hazardMapUtils'

const HazardsDetailPanel = () => {
	const selectedCounty = useRootStore.use.selectedCounty()
	const selectedAlert = useRootStore.use.selectedAlert()
	const setSelectedAlert = useRootStore.use.setSelectedAlert()
	const { alerts, feature } = selectedCounty

	return (
		<div className={styles.HazardsDetailPanel}>
			<h1>{getTitleFromFeature(feature)}</h1>
			{alerts.map((alert, index) => {
				return (
					<HazardsDetailAccordian
						key={index}
						index={index}
						isOpen={selectedAlert === index}
						setSelectedAlert={setSelectedAlert}
						alert={alert}
					/>
				)
			})}
		</div>
	)
}

export default HazardsDetailPanel
