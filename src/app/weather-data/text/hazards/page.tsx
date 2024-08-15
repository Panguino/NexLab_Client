import { gql } from '@apollo/client'
import { getDataClient } from '@/apollo/apollo-client'
import { rewind } from '@turf/turf'
import Hazards from '@/components/blocks/Hazards/Hazards'
import { getHazards } from '@/apollo/getHazards'
import { prepareAlertsFromAPI } from '@/util/hazardMapUtils'

const Page = async () => {
	const regionData = await getDataClient().query({
		query: gql`
			query {
				getRegions(
					regions: [
						CANADA
						PANAMA
						MEXICO
						CUBA
						GUATEMALA
						BELIZE
						HONDURAS
						EL_SALVADOR
						DOMINICAN_REPUBLIC
						HAITI
						JAMAICA
						BAHAMAS
						NICARAGUA
						COSTA_RICA
					]
				) {
					name
					states {
						type
						geometry
					}
				}
			}
		`
	})

	const displayRegions = []

	regionData.data.getRegions.forEach((region) => {
		region.states.forEach((state) => {
			displayRegions.push(rewind(state, { reverse: true }))
		})
	})

	const displayRegionsFeatures = {
		type: 'FeatureCollection',
		features: displayRegions
	}

	// api call
	const conusCountiesData = await getHazards()

	const displayStateRegions = []

	conusCountiesData.data.getRegions.forEach((region) => {
		region.states.forEach((state) => {
			const optimizedState = { type: state.type, geometry: state.geometry, properties: {} }
			displayStateRegions.push(rewind(optimizedState, { reverse: true }))
		})
	})

	const displayStates = {
		type: 'FeatureCollection',
		features: displayStateRegions
	}

	const displayOffshoreRegions = []

	conusCountiesData.data.getRegions.forEach((region) => {
		region.coasts.forEach((coasts) => {
			const optimizedCoast = { type: coasts.type, geometry: coasts.geometry, properties: {} }
			displayOffshoreRegions.push(rewind(optimizedCoast, { reverse: true }))
		})
		region.offshores.forEach((offshores) => {
			const optimizedOffshore = { type: offshores.type, geometry: offshores.geometry, properties: {} }
			displayOffshoreRegions.push(rewind(optimizedOffshore, { reverse: true }))
		})
	})

	const displayOffshores = {
		type: 'FeatureCollection',
		features: displayOffshoreRegions
	}

	const alerts = prepareAlertsFromAPI(conusCountiesData)

	return <Hazards displayRegions={displayRegionsFeatures} displayStates={displayStates} displayOffshores={displayOffshores} alerts={alerts} />
}

export default Page
