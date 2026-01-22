'use client'
import { HazardsAnimator } from '@/components/elements/HazardsAnimator'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import { useRootStore } from '@/store/useRootStore'
import { useEffect } from 'react'
import HazardsMap from './HazardsMap/HazardsMap'
import HazardsTable from './HazardsTable/HazardsTable'

// Feature flag to toggle between old D3 map and new Animator map
const USE_ANIMATOR_MAP = true

const Hazards = ({ displayRegions, displayStates, displayOffshores, alerts }) => {
	const selectedView = useRootStore.use.selectedView()
	const setRegionHazards = useRootStore.use.setRegionHazards()
	const selectedRegion = useRootStore.use.selectedRegion()
	const allHazards = useRootStore.use.allHazards()
	const setAllHazards = useRootStore.use.setAllHazards()

	useEffect(() => {
		setAllHazards(alerts)
	}, [setAllHazards, alerts])

	// Only set region hazards for the old D3 map - HazardsAnimator handles this internally
	useEffect(() => {
		if (!USE_ANIMATOR_MAP && selectedRegion && Object.keys(allHazards).length !== 0) {
			const ids = {
				conus: 'Continental United States',
				ak: 'Alaska',
				hi: 'Hawaii',
				pr: 'Puerto Rico',
				sam: 'American Samoa',
				gum: 'Guam',
			}
			setRegionHazards(allHazards[ids[selectedRegion]])
		}
	}, [setRegionHazards, selectedRegion, allHazards])

	return (
		<>
			{Object.keys(allHazards).length !== 0 ? (
				<>
					{selectedView === 'map' ? (
						USE_ANIMATOR_MAP ? (
							<HazardsAnimator alerts={allHazards} allCoastalRegions={displayOffshores} />
						) : (
							<HazardsMap displayRegions={displayRegions} displayStates={displayStates} displayOffshores={displayOffshores} />
						)
					) : null}
					{selectedView === 'table' ? <HazardsTable /> : null}
				</>
			) : null}
			<MobileIconNav tab />
		</>
	)
}
export default Hazards
