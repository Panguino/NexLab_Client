'use client'
import { useRootStore } from '@/store/useRootStore'
import HazardsMap from './HazardsMap/HazardsMap'
import HazardsTable from './HazardsTable/HazardsTable'
import { useEffect } from 'react'

const Hazards = ({ displayRegions, displayStates, displayOffshores, alerts }) => {
	const selectedView = useRootStore.use.selectedView()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const selectedRegion = useRootStore.use.selectedRegion()

	useEffect(() => {
		if (selectedRegion) {
			const ids = {
				conus: 'Continental United States',
				ak: 'Alaska',
				hi: 'Hawaii',
				pr: 'Puerto Rico',
				sam: 'American Samoa',
				gum: 'Guam'
			}
			setRegionHazards(alerts[ids[selectedRegion]])
		}
	}, [setRegionHazards, selectedRegion, alerts])

	return (
		<>
			{selectedView === 'map' ? (
				<HazardsMap displayRegions={displayRegions} displayStates={displayStates} displayOffshores={displayOffshores} />
			) : null}
			{selectedView === 'table' ? <HazardsTable /> : null}
		</>
	)
}
export default Hazards
