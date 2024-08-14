'use client'
import { useRootStore } from '@/store/useRootStore'
import HazardsMap from './HazardsMap/HazardsMap'
import HazardsTable from './HazardsTable/HazardsTable'
import { getHazards } from '@/apollo/getHazards'
import { useEffect } from 'react'
import { useInterval } from '@/hooks/useInterval'

const Hazards = ({ displayRegions, displayStates, displayOffshores, alerts }) => {
	const selectedView = useRootStore.use.selectedView()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const selectedRegion = useRootStore.use.selectedRegion()
	const allHazards = useRootStore.use.allHazards()
	const setAllHazards = useRootStore.use.setAllHazards()
	const hazardRefreshInterval = useRootStore.use.hazardRefreshInterval()
	const hazardRefreshActive = useRootStore.use.hazardRefreshActive()
	const slideoutPanelIsOpen = useRootStore.use.slideoutPanelIsOpen()

	useEffect(() => {
		setAllHazards(alerts)
	}, [setAllHazards, alerts])

	const refreshAlertData = async () => {
		if (hazardRefreshActive && !slideoutPanelIsOpen) {
			const alerts = await getHazards()
			setAllHazards(alerts)
		}
	}
	useInterval(refreshAlertData, hazardRefreshInterval * 60 * 1000)

	useEffect(() => {
		if (selectedRegion && Object.keys(allHazards).length !== 0) {
			const ids = {
				conus: 'Continental United States',
				ak: 'Alaska',
				hi: 'Hawaii',
				pr: 'Puerto Rico',
				sam: 'American Samoa',
				gum: 'Guam'
			}
			setRegionHazards(allHazards[ids[selectedRegion]])
		}
	}, [setRegionHazards, selectedRegion, allHazards])

	return (
		<>
			{Object.keys(allHazards).length !== 0 ? (
				<>
					{selectedView === 'map' ? (
						<HazardsMap displayRegions={displayRegions} displayStates={displayStates} displayOffshores={displayOffshores} />
					) : null}
					{selectedView === 'table' ? <HazardsTable /> : null}
				</>
			) : null}
		</>
	)
}
export default Hazards
