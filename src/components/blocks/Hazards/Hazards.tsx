'use client'
import { useRootStore } from '@/store/useRootStore'
import HazardsMap from './HazardsMap/HazardsMap'
import HazardsTable from './HazardsTable/HazardsTable'
import { getHazards } from '@/apollo/getHazards'
import { useEffect } from 'react'
import { useInterval } from '@/hooks/useInterval'
import { rewind } from '@turf/turf'

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
			const conusCountiesData = await getHazards()
			const alerts = {}
			conusCountiesData.data.getRegions.forEach((region) => {
				alerts[region.name] = {}
				region.states.forEach((state) => {
					state.counties.forEach((county) => {
						if (county.alerts.length != 0) {
							const shapeFeature = { type: county.type, geometry: county.geometry, properties: {} }
							alerts[region.name][county.properties.ID] = {
								shape: rewind(shapeFeature, { reverse: true }),
								alerts: county.alerts.map((alert) => {
									return alert.properties
								}),
								properties: county.properties
							}
						}
					})
				})
				region.coasts.forEach((coast) => {
					if (coast.alerts.length != 0) {
						const shapeFeature = { type: coast.type, geometry: coast.geometry, properties: {} }
						alerts[region.name][coast.properties.ID] = {
							shape: rewind(shapeFeature, { reverse: true }),
							alerts: coast.alerts.map((alert) => {
								return alert.properties
							}),
							properties: coast.properties
						}
					}
				})
				region.offshores.forEach((offshore) => {
					if (offshore.alerts.length != 0) {
						const shapeFeature = { type: offshore.type, geometry: offshore.geometry, properties: {} }
						alerts[region.name][offshore.properties.ID] = {
							shape: rewind(shapeFeature, { reverse: true }),
							alerts: offshore.alerts.map((alert) => {
								return alert.properties
							}),
							properties: offshore.properties
						}
					}
				})
			})
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
