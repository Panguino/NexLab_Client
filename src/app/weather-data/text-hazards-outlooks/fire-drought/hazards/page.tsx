import { getHazards } from '@/apollo/data/getHazards'
import FireHazardsViewToggle from '@/components/blocks/FireHazards/FireHazardsViewToggle/FireHazardsViewToggle'
import { prepareAlertsFromAPI } from '@/util/hazardMapUtils'
import { AllGeoJSON, rewind } from '@turf/turf'

/**
 * Fire & Drought Hazards page with Map/Table toggle
 */
const Page = async () => {
	// Fetch hazard data
	const conusCountiesData = await getHazards()

	// Prepare offshore/coastal regions for map display
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

	return <FireHazardsViewToggle alerts={alerts} displayOffshores={displayOffshores} />
}

export default Page

export const dynamic = 'force-dynamic'
