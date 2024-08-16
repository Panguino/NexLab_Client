'use server'
import { getDataClient } from '@/apollo/apollo-client'
import { GetHazardsQuery } from '@/gql/generated/graphql'
import { gql } from '@apollo/client'

export const getHazards = async (): Promise<GetHazardsQuery> => {
	const getRegionsResponse = await getDataClient().query({
		query: gql`
			query getHazards {
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
								LAT
								LON
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
							LAT
							LON
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
							LAT
							LON
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
		`,
	})

	return getRegionsResponse.data as GetHazardsQuery
}
