import { gql } from '@apollo/client'
import { getDataClient } from '@/apollo/apollo-client'
import HazardsMap from '@/components/blocks/HazardsMap/HazardsMap'
import { rewind } from '@turf/turf'

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

	const conusCountiesData = await getDataClient().query({
		query: gql`
			query {
				getRegions(regions: [CONUS, ALASKA, HAWAII, PUERTO_RICO, GUAM, AMERICAN_SAMOA]) {
					name
					states {
						type
						geometry
						counties {
							type
							geometry
							properties {
								ID
								STATE
								COUNTYNAME
							}
							alerts {
								properties {
									headline
									event
									ends
									hazardInfo {
										type {
											type
											name
										}
										level {
											name
											level
										}
										color {
											HEX
										}
									}
								}
							}
						}
					}
					coasts {
						type
						geometry
						properties {
							ID
							NAME
						}
						alerts {
							properties {
								headline
								ends
								hazardInfo {
									type {
										type
										name
									}
									level {
										name
										level
									}
									color {
										HEX
									}
								}
							}
						}
					}
					offshores {
						type
						geometry
						properties {
							ID
							Name
						}
						alerts {
							properties {
								headline
								ends
								hazardInfo {
									type {
										type
										name
									}
									level {
										name
										level
									}
									color {
										HEX
									}
								}
							}
						}
					}
				}
			}
		`
	})
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

	const alerts = {}
	conusCountiesData.data.getRegions.forEach((region) => {
		alerts[region.name] = {}
		region.states.forEach((state) => {
			state.counties.forEach((county) => {
				if (county.alerts.length != 0) {
					const shapeFeature = { type: county.type, geometry: county.geometry, properties: {} }
					alerts[region.name][county.properties.ID] = {
						shape: rewind(shapeFeature, { reverse: true }),
						info: county.alerts.map((alert) => {
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
					info: coast.alerts.map((alert) => {
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
					info: offshore.alerts.map((alert) => {
						return alert.properties
					}),
					properties: offshore.properties
				}
			}
		})
	})

	return <HazardsMap displayRegions={displayRegionsFeatures} displayStates={displayStates} displayOffshores={displayOffshores} alerts={alerts} />
}

export default Page
