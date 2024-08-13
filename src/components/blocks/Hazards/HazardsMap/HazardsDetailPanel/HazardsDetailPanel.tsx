import styles from './HazardsDetailPanel.module.scss'
import { useRootStore } from '@/store/useRootStore'
import HazardsDetailAccordian from './HazardsDetailAccordian/HazardsDetailAccordian'
import { getTitleFromFeature } from '@/util/hazardMapUtils'

const HazardsDetailPanel = () => {
	const selectedCounty = useRootStore.use.selectedCounty()
	const selectedAlert = useRootStore.use.selectedAlert()
	const setSelectedAlert = useRootStore.use.setSelectedAlert()
	const regionHazards = useRootStore.use.regionHazards()

	const county = regionHazards[selectedCounty]

	return (
		<div className={styles.HazardsDetailPanel}>
			{county && (
				<>
					<h1>{getTitleFromFeature(county.properties)}</h1>
					{county.alerts &&
						county.alerts.map((alert, index) => {
							//console.log('alert', alert)
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
				</>
			)}
		</div>
	)
}

export default HazardsDetailPanel
