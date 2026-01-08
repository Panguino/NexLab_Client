import { getHazards } from '@/apollo/data/getHazards'
import ConvectiveHazards from '@/components/blocks/ConvectiveHazards/ConvectiveHazards'
import { prepareAlertsFromAPI } from '@/util/hazardMapUtils'
import { AllGeoJSON, rewind } from '@turf/turf'

const Page = async () => {
	// Fetch hazard data
	const conusCountiesData = await getHazards()

	// Prepare offshore/coastal regions for map display (needed for consistency)
	const displayOffshoreRegions: AllGeoJSON[] = []
	if (conusCountiesData && conusCountiesData.getRegions) {
		conusCountiesData.getRegions.forEach((region) => {
			if (region && region.coasts) {
				region.coasts.forEach((coasts) => {
					if (coasts && coasts.type && coasts.geometry) {
						const optimizedCoast = { type: coasts.type, geometry: coasts.geometry, properties: coasts.properties || {} }
						displayOffshoreRegions.push(rewind(optimizedCoast as AllGeoJSON, { reverse: true }))
					}
				})
			}
			if (region && region.offshores) {
				region.offshores.forEach((offshores) => {
					if (offshores && offshores.type && offshores.geometry) {
						const optimizedOffshore = { type: offshores.type, geometry: offshores.geometry, properties: offshores.properties || {} }
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

	// Prepare alerts data
	const alerts = prepareAlertsFromAPI(conusCountiesData)

	return <ConvectiveHazards alerts={alerts} displayOffshores={displayOffshores} view="table" />
}

export default Page

export const dynamic = 'force-dynamic'

