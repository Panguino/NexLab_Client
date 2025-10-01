import { getHazards } from '@/apollo/data/getHazards'
import { getRegionShapes } from '@/apollo/data/getRegionShapes'
import Hazards from '@/components/blocks/Hazards/Hazards'
import { prepareAlertsFromAPI } from '@/util/hazardMapUtils'
import { AllGeoJSON, rewind } from '@turf/turf'

const Page = async () => {
	const displayRegions: AllGeoJSON[] = []
	const regionData = await getRegionShapes()
	if (regionData && regionData.getRegions) {
		regionData.getRegions.forEach((region) => {
			if (region && region.states) {
				region.states.forEach((state) => {
					displayRegions.push(rewind(state as AllGeoJSON, { reverse: true }))
				})
			}
		})
	}
	const displayRegionsFeatures = {
		type: 'FeatureCollection',
		features: displayRegions,
	}

	const displayStateRegions: AllGeoJSON[] = []
	const conusCountiesData = await getHazards()
	if (conusCountiesData && conusCountiesData.getRegions) {
		conusCountiesData.getRegions.forEach((region) => {
			if (region && region.states) {
				region.states.forEach((state) => {
					if (state && state.type && state.geometry) {
						const optimizedState = { type: state.type, geometry: state.geometry, properties: {} }
						displayStateRegions.push(rewind(optimizedState as AllGeoJSON, { reverse: true }))
					}
				})
			}
		})
	}
	const displayStates = {
		type: 'FeatureCollection',
		features: displayStateRegions,
	}
	const displayOffshoreRegions: AllGeoJSON[] = []
	if (conusCountiesData && conusCountiesData.getRegions) {
		conusCountiesData.getRegions.forEach((region) => {
			if (region && region.coasts) {
				region.coasts.forEach((coasts) => {
					if (coasts && coasts.type && coasts.geometry) {
						const optimizedCoast = { type: coasts.type, geometry: coasts.geometry, properties: {} }
						displayOffshoreRegions.push(rewind(optimizedCoast as AllGeoJSON, { reverse: true }))
					}
				})
			}
			if (region && region.offshores) {
				region.offshores.forEach((offshores) => {
					if (offshores && offshores.type && offshores.geometry) {
						const optimizedOffshore = { type: offshores.type, geometry: offshores.geometry, properties: {} }
						displayOffshoreRegions.push(rewind(optimizedOffshore as AllGeoJSON, { reverse: true }))
					}
				})
			}
		})
	}
	const displayOffshores = {
		type: 'FeatureCollection',
		features: displayOffshoreRegions,
	}
	const alerts = prepareAlertsFromAPI(conusCountiesData)

	return <Hazards displayRegions={displayRegionsFeatures} displayStates={displayStates} displayOffshores={displayOffshores} alerts={alerts} />
}

export default Page

export const dynamic = 'force-dynamic'
