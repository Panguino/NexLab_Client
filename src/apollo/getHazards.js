'use server'
import { gql } from '@apollo/client'
import { getDataClient } from '@/apollo/apollo-client'
import { rewind } from '@turf/turf'

export const getHazards = async () => {
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
									ends
									description
									event
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
								description
								event
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
							NAME
						}
						alerts {
							properties {
								headline
								ends
								description
								event
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

	return alerts
}
